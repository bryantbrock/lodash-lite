import { omit } from './omit';

describe('omit', () => {
  it('omits provided paths from an object', () => {
    const obj = { extra: 'path', some: { test: 'path' } };
    const paths = ['some.test'];

    expect(omit(obj, paths)).toEqual({ extra: 'path', some: {} });
  });

  it('omits provided paths from an array', () => {
    const arr = [1, 2, 3];
    const paths = ['0', '2'];

    expect(omit(arr, paths)).toEqual([2]);
  });

  it('omits provided paths from arrays with nested objects', () => {
    const arr = [1, [1, 2, 3, 4, 5], 3, { some: [1, 2] }];
    const paths = ['1.2', '0', '3.some.0'];

    expect(omit(arr, paths)).toEqual([[1, 2, 4, 5], 3, { some: [2] }]);
  });
});
