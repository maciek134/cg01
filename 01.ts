/**
 * Performs the flattening while checking the `parents` WeakSet for circularity
 * 
 * @param input the array to flatten
 * @param parents internal array references
 * @returns flat array
 */
function flattenInternal(input: any[], parents: WeakSet<any>): any[] {
  const ret: any[] = [];

  for (const value of input) {
    if (!Array.isArray(value)) {
      ret.push(value);
      continue;
    }

    if (parents.has(value)) {
      throw new TypeError('input is circular');
    }

    parents.add(value);
    ret.push(...flattenInternal(value, parents));
  }

  return ret;
}

export function flatten(input: any[]): any[] {
  return flattenInternal(input, new WeakSet());
}
