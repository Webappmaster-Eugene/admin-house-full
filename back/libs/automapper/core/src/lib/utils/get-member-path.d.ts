import type { Selector } from '../types';
/**
 * For a given JS function selector, return a list of all members that were selected.
 *
 * @returns `null` if the given `fnSelector` doesn't match with anything.
 */
export declare function getMembers(fnSelector: Selector): string[] | null;
/**
 * Get a dot-separated string of the properties selected by a given `fn` selector
 * function.
 *
 * @example
 * ```js
 * getMemberPath(s => s.foo.bar) === 'foo.bar'
 * getMemberPath(s => s['foo']) === 'foo'
 * getMemberPath(s => s.foo['']) === 'foo.'
 * // invalid usage
 * getMemberPath(s => s) === ''
 * ```
 */
export declare function getMemberPath(fn: Selector): string[];