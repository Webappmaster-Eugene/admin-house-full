import { Program, SourceFile, TransformationContext } from 'typescript/lib/tsserverlibrary';
export declare class ModelVisitor {
  private static readonly metadataMap;
  private static readonly importsMap;
  private static isCommonJS;
  static reset(): void;
  static visit(sourceFile: SourceFile, context: TransformationContext, program: Program): SourceFile;
  private static addMetadataFactory;
  private static createMetadataFactoryMethod;
  private static addMetadata;
  private static inspectNode;
  private static createMetadataObjectLiteral;
  private static getClassMetadata;
  private static tryGetTypeReferenceFromNodeType;
  private static cloneImportDeclaration;
}