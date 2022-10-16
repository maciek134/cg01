import { expect } from 'chai';
import { flatten } from './01';

describe('01', () => {
  it('returns a flattened array', () => {
    const result = flatten([ 1, 2, [ 3, 4 ], 5, [ 6, 7 ]]);
    expect(result).to.deep.equal([ 1, 2, 3, 4, 5, 6, 7 ]);
  });

  it('throws on circular input', () => {
    const a: any[] = [ 1, 2, 3 ];
    const b = [ 4, 5, a ];
    const c = [ 0, b, 0 ]
    a[3] = c;

    function testFlatten() {
      flatten(a);
    }

    expect(testFlatten).to.throw(TypeError, 'input is circular');
  });

  it('should not throw on repeated references', () => {
    const a: any[] = [ 1, 2, 3 ];
    const b = [ a, 5, a ];

    const result = flatten(b);

    expect(result).to.deep.equal([ 1, 2, 3, 5, 1, 2, 3 ]);
  });
});