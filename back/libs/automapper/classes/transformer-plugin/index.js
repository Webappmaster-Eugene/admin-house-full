import { AUTOMAPPER_METADATA_FACTORY_KEY } from 'automapper/classes';
import {
  isArrayTypeNode,
  isTypeNode,
  NodeBuilderFlags,
  TypeFlags,
  TypeFormatFlags,
  SyntaxKind,
  ModuleKind,
  visitNode,
  isImportDeclaration,
  isClassDeclaration,
  visitEachChild,
  isPropertyDeclaration,
  isGetAccessorDeclaration,
  getDecorators,
  getAllJSDocTags,
} from 'typescript/lib/tsserverlibrary';
import { posix, dirname } from 'path';

const AUTOMAPPER_DECORATOR_NAME = 'AutoMap';
const JSDOC_KEY = 'jsDoc';
const AUTOMAP_IGNORE_TAG = 'autoMapIgnore';

function isFilenameMatched(patterns, filename) {
  return patterns.some(path => filename.includes(path));
}
function isNullableUnionType(type) {
  return type.isUnion() && type.isNullableType();
}
function getDecoratorOrUndefinedByNames(names, decorators) {
  return (decorators ? decorators : []).find(item => names.includes(getDecoratorName(item)));
}
function getTypeReference(type, typeNode, typeChecker, isArray = false) {
  if (isArrayType(type) || isArrayTypeNode(typeNode)) {
    const [arrayType] = type.typeArguments || type.aliasTypeArguments || (typeNode.elementType ? [typeNode.elementType] : []) || [];
    const isArrayTypeNode = isTypeNode(arrayType);
    return getTypeReference(
      isArrayTypeNode ? typeChecker.getTypeAtLocation(arrayType) : arrayType,
      isArrayTypeNode ? arrayType : typeChecker.typeToTypeNode(arrayType, typeNode, NodeBuilderFlags.NoTruncation),
      typeChecker,
      true,
    );
  }
  if (isBoolean(type)) {
    return [Boolean.name, isArray];
  }
  if (isNumber(type) || isNumberEnum(type)) {
    return [Number.name, isArray];
  }
  if (isString(type) || isStringEnum(type)) {
    return [String.name, isArray];
  }
  if (isDate(type)) {
    return [Date.name, isArray];
  }
  if (isBigInt(type)) {
    return [BigInt.name, isArray];
  }
  if (type.isClass() || type.aliasSymbol) {
    return [getText(type, typeChecker), isArray];
  }
  return [undefined, isArray];
}
function replaceImportPath(typeReference, fileName) {
  let importPath = /\("([^)]).+(")/.exec(typeReference)?.[0];
  if (!importPath) {
    return undefined;
  }
  if (process.platform === 'win32') {
    return typeReference.replace('import', 'require');
  }
  importPath = importPath.slice(2, importPath.length - 1);
  let relativePath = posix.relative(dirname(fileName), importPath);
  relativePath = relativePath[0] !== '.' ? './' + relativePath : relativePath;
  typeReference = typeReference.replace(importPath, relativePath);
  return typeReference.replace('import', 'require');
}
function hasFlag(type, flag) {
  return (type.flags & flag) === flag;
}
function isDynamicallyAdded(identifier) {
  return identifier && !identifier.parent && identifier.pos === -1;
}
function isArrayType(type) {
  const symbol = type.getSymbol() || type.aliasSymbol;
  if (!symbol) {
    return false;
  }
  return symbol.getName() === 'Array' && (type.typeArguments?.length === 1 || type.aliasTypeArguments?.length === 1);
}
function isBoolean(type) {
  return hasFlag(type, TypeFlags.Boolean) || (type.isUnionOrIntersection() && type.types[0].flags === TypeFlags.BooleanLiteral);
}
function isEnumType(type) {
  if (hasFlag(type, TypeFlags.Enum)) {
    return true;
  }
  if (hasFlag(type, TypeFlags.EnumLiteral) && !type.isUnion()) return false;
  const symbol = type.getSymbol();
  if (symbol == null) {
    return false;
  }
  const { valueDeclaration } = symbol;
  return valueDeclaration != null && valueDeclaration.kind === SyntaxKind.EnumDeclaration;
}
function isNumber(type) {
  return hasFlag(type, TypeFlags.Number);
}
function isNumberEnum(type) {
  const isEnum = isEnumType(type);
  const valueDeclaration = type.getSymbol()?.valueDeclaration;
  return (isEnum && valueDeclaration?.members?.some(member => member.initializer == null)) || false;
}
function isString(type) {
  return hasFlag(type, TypeFlags.String);
}
function isStringEnum(type) {
  const isEnum = isEnumType(type);
  const valueDeclaration = type.getSymbol()?.valueDeclaration;
  return (isEnum && valueDeclaration?.members?.some(member => member.initializer != null)) || false;
}
function isDate(type) {
  return type.symbol && type.symbol.escapedName === 'Date';
}
function isBigInt(type) {
  return type.symbol && type.symbol.escapedName === 'BigInt';
}
function getDecoratorName(decorator) {
  const isDecoratorFactory = decorator.expression.kind === SyntaxKind.CallExpression;
  if (isDecoratorFactory) {
    const callExpression = decorator.expression;
    const expression = callExpression.expression;
    const identifier = expression;
    if (isDynamicallyAdded(identifier)) {
      return '';
    }
    return getIdentifierFromExpression(expression).getText();
  }
  return getIdentifierFromExpression(decorator.expression).getText();
}
function getNameFromExpression(expression) {
  if (expression && expression.kind === SyntaxKind.PropertyAccessExpression) {
    return expression.name;
  }
  return expression;
}
function getIdentifierFromExpression(expression) {
  const identifier = getNameFromExpression(expression);
  if (identifier && identifier.kind !== SyntaxKind.Identifier) {
    throw new Error();
  }
  return identifier;
}
function getText(type, typeChecker, enclosingNode, typeFormatFlags) {
  if (!typeFormatFlags) {
    typeFormatFlags = getDefaultTypeFormatFlags(enclosingNode);
  }
  const compilerNode = !enclosingNode ? undefined : enclosingNode;
  return typeChecker.typeToString(type, compilerNode, typeFormatFlags);
}
function getDefaultTypeFormatFlags(enclosingNode) {
  let formatFlags =
    TypeFormatFlags.UseTypeOfFunction |
    TypeFormatFlags.NoTruncation |
    TypeFormatFlags.UseFullyQualifiedType |
    TypeFormatFlags.WriteTypeArgumentsOfSignature;
  if (enclosingNode && enclosingNode.kind === SyntaxKind.TypeAliasDeclaration) formatFlags |= TypeFormatFlags.InTypeAlias;
  return formatFlags;
}

class ModelVisitor {
  static reset() {
    this.metadataMap.clear();
    this.importsMap.clear();
    this.isCommonJS = false;
  }
  static visit(sourceFile, context, program) {
    const typeChecker = program.getTypeChecker();
    ModelVisitor.isCommonJS = context.getCompilerOptions().module === ModuleKind.CommonJS;
    function nodeVisitorFactory(ctx, sf) {
      const nodeVisitor = node => {
        // if there is import, save the cloned in our importsMap for the file
        if (isImportDeclaration(node)) {
          ModelVisitor.importsMap.set(node.moduleSpecifier.text, ModelVisitor.cloneImportDeclaration(ctx.factory, node));
          return node;
        }
        // if this is a class node, traverse all properties in this class
        // after traverse finishes, we add the metadata factory method to the class
        // because all nodes' metadata should have been saved
        if (isClassDeclaration(node)) {
          // visit each property/methods/nodes/comments in the class
          node = visitEachChild(node, nodeVisitor, ctx);
          return ModelVisitor.addMetadataFactory(node, ctx.factory);
        }
        // if the node is property or a getter
        // foo: string
        // get foo(): string {}
        if (isPropertyDeclaration(node) || isGetAccessorDeclaration(node)) {
          const decorators = getDecorators(node);
          const existingAutoMapDecorator = getDecoratorOrUndefinedByNames([AUTOMAPPER_DECORATOR_NAME], decorators);
          // if the property already has AutoMap decorator on it, skip
          if (existingAutoMapDecorator) {
            return node;
          }
          const isPropertyStaticOrPrivate = (node.modifiers || []).some(
            modifier => modifier.kind === SyntaxKind.StaticKeyword || modifier.kind === SyntaxKind.PrivateKeyword,
          );
          // if this property is static or private, skip because
          // we shouldn't/can't access this property when mapping
          if (isPropertyStaticOrPrivate) {
            return node;
          }
          // Check jsDoc for ignore tag
          const jsDocKey = JSDOC_KEY;
          if (node[jsDocKey]) {
            const ignoreTag = getAllJSDocTags(node[jsDocKey], tag => tag.tagName.escapedText === AUTOMAP_IGNORE_TAG);
            if (ignoreTag) {
              return node;
            }
          }
          return ModelVisitor.inspectNode(ctx.factory, node, typeChecker, sf);
        }
        // visit each node in the file
        return visitEachChild(node, nodeVisitor, ctx);
      };
      return nodeVisitor;
    }
    const visitedSourceFile = visitNode(sourceFile, nodeVisitorFactory(context, sourceFile));
    // if the target is CommonJS, keep as is
    if (ModelVisitor.isCommonJS) {
      return visitedSourceFile;
    }
    // if the target is not CommonJS, we need to re-map the imports
    return context.factory.updateSourceFile(
      visitedSourceFile,
      [...ModelVisitor.importsMap.values()].concat(
        (visitedSourceFile.statements || []).filter(statement => statement.kind !== SyntaxKind.ImportDeclaration),
      ),
      visitedSourceFile.isDeclarationFile,
      visitedSourceFile.referencedFiles,
      visitedSourceFile.typeReferenceDirectives,
      visitedSourceFile.hasNoDefaultLib,
      visitedSourceFile.libReferenceDirectives,
    );
  }
  static addMetadataFactory(classNode, factory) {
    const classMetadata = this.getClassMetadata(classNode);
    // return early, no class metadata
    if (!classMetadata) {
      return classNode;
    }
    // add the factory static method at the end of the class
    return factory.updateClassDeclaration(
      classNode,
      classNode.modifiers,
      classNode.name,
      classNode.typeParameters,
      classNode.heritageClauses,
      [...classNode.members, this.createMetadataFactoryMethod(factory, classMetadata)],
    );
  }
  static createMetadataFactoryMethod(factory, metadata) {
    /**
     * should be: [
     *    ['property1', {type, depth}],
     *    ['property2', {type, depth}]
     *  ]
     */
    const metadataAsReturnBlock = factory.createArrayLiteralExpression(
      Object.entries(metadata).reduce((expressions, [propertyKey, propertyMetadata]) => {
        if (propertyMetadata) {
          expressions.push(factory.createArrayLiteralExpression([factory.createStringLiteral(propertyKey), propertyMetadata]));
        }
        return expressions;
      }, []),
      true,
    );
    /**
     * should be: static __AUTOMAPPER_METDATA_FACTORY__() {
     *   return [...]
     * }
     */
    return factory.createMethodDeclaration(
      [factory.createModifier(SyntaxKind.StaticKeyword)],
      undefined,
      factory.createIdentifier(AUTOMAPPER_METADATA_FACTORY_KEY),
      undefined,
      undefined,
      [],
      undefined,
      factory.createBlock([factory.createReturnStatement(metadataAsReturnBlock)], true),
    );
  }
  static addMetadata(
    node,
    metadata,
    // { type, depth }
    sourceFile,
  ) {
    const hostClass = node.parent;
    const className = hostClass.name?.getText();
    // cannot find the class of this property, skip
    if (!className) {
      return node;
    }
    const existingMetadata = this.metadataMap.get(className) || {};
    const propertyName = node.name?.getText(sourceFile);
    // defensive, no name for this property, skip
    // or this property name is computed like: object[computed]
    if (!propertyName || (node.name && node.name.kind === SyntaxKind.ComputedPropertyName)) {
      return node;
    }
    this.metadataMap.set(className, {
      ...existingMetadata,
      [propertyName]: metadata,
    });
    return node;
  }
  static inspectNode(factory, node, typeChecker, sourceFile) {
    // try getting type from typeChecker
    let type = typeChecker.getTypeAtLocation(node);
    const typeNode = node.type;
    // no type for property node, skip
    if (!type || !typeNode) return node;
    // union with undefined or null like string | null, ?: string
    if (isNullableUnionType(type)) {
      type = type.getNonNullableType();
    }
    // typeReference is [the type, if the type is array or not]
    const typeReference = getTypeReference(type, typeNode, typeChecker);
    if (!typeReference[0]) {
      const typeReferenceFromNodeType = this.tryGetTypeReferenceFromNodeType(node);
      if (typeReferenceFromNodeType) {
        typeReference[0] = typeReferenceFromNodeType;
      }
    }
    // failed to infer type, skip
    if (!typeReference[0]) return node;
    // if typeReference includes an import statement, extract the correct import symbol
    if (typeReference[0].includes('import')) {
      if (ModelVisitor.isCommonJS) {
        const replacedImportPath = replaceImportPath(typeReference[0], sourceFile.fileName);
        if (replacedImportPath) {
          typeReference[0] = replacedImportPath;
        }
      } else {
        const typeName = typeReference[0].split('.').pop();
        if (typeName) {
          typeReference[0] = typeName;
        }
      }
    }
    return this.addMetadata(node, this.createMetadataObjectLiteral(factory, typeReference), sourceFile);
  }
  static createMetadataObjectLiteral(factory, [type, isArray]) {
    // result should be: { type: () => typeReference | [typeReference], depth: 1 }
    return factory.createObjectLiteralExpression([
      factory.createPropertyAssignment(
        factory.createIdentifier('type'),
        factory.createArrowFunction(
          undefined,
          undefined,
          [],
          undefined,
          factory.createToken(SyntaxKind.EqualsGreaterThanToken),
          isArray ? factory.createArrayLiteralExpression([factory.createIdentifier(type)]) : factory.createIdentifier(type),
        ),
      ),
      factory.createPropertyAssignment(factory.createIdentifier('depth'), factory.createNumericLiteral(1)),
    ]);
  }
  static getClassMetadata(classNode) {
    if (!classNode.name) {
      return;
    }
    return this.metadataMap.get(classNode.name.getText());
  }
  static tryGetTypeReferenceFromNodeType(node) {
    return node.type.typeName?.escapedText;
  }
  static cloneImportDeclaration(factory, importDeclaration) {
    return factory.createImportDeclaration(importDeclaration.modifiers, importDeclaration.importClause, importDeclaration.moduleSpecifier);
  }
}
ModelVisitor.metadataMap = new Map();
ModelVisitor.importsMap = new Map();
ModelVisitor.isCommonJS = false;

/* generated */
const version$1 = 881;

const defaultOptions = {
  modelFileNameSuffix: ['.entities.ts', '.model.ts', '.dto.ts', '.vm.ts'],
};
/**
 * Remember to increase the version whenever transformer's content is changed. This is to inform Jest to not reuse
 * the previous cache which contains old transformer's content
 */
const version = version$1;
// Used for constructing cache key
const name = 'automapper-transformer-plugin';
function automapperTransformerPlugin(program, options = {}) {
  options = {
    ...defaultOptions,
    ...options,
  };
  return {
    before(context) {
      // Reset ModelVisitor before going into a new file
      ModelVisitor.reset();
      return sourceFile => {
        // only check files that contain models
        if (isFilenameMatched(options.modelFileNameSuffix || [], sourceFile.fileName)) {
          return ModelVisitor.visit(sourceFile, context, program);
        }
        return sourceFile;
      };
    },
  };
}
const before = (options, program) => automapperTransformerPlugin(program, options).before;
const tspBefore = (program, options) => automapperTransformerPlugin(program, options).before;

export {
  AUTOMAPPER_DECORATOR_NAME,
  AUTOMAP_IGNORE_TAG,
  JSDOC_KEY,
  before,
  automapperTransformerPlugin as default,
  name,
  tspBefore,
  version,
};