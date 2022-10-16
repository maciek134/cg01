/**
 * Performs the flattening while checking the `parents` WeakSet for circularity
 * 
 * @param input the array to flatten
 * @param parents internal array references
 * @returns flattened array
 */
 function flattenInternal(input: any[], parents: WeakSet<any>[]): any[] {
  const ret: any[] = [];
  const newParents = new WeakSet();

  for (const value of input) {
    if (!Array.isArray(value)) {
      ret.push(value);
      continue;
    }

    if (parents.some((set) => set.has(value))) {
      throw new TypeError('input is circular');
    }

    newParents.add(value);
    ret.push(...flattenInternal(value, [ ...parents, newParents ]));
  }

  return ret;
}

/**
 * Flattens an arbitrary array
 * @param input the array to flatten
 * @returns flattened array
 */
export function flatten(input: any[]): any[] {
  return flattenInternal(input, []);
}
