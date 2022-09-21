
import { sum } from './utils';

describe('sum', () => {
    it('correctly sums elements of array', () => {
      expect(sum([1, 2, 3])).toBe(6);
      expect(sum([])).toBe(0);
      expect(sum([-2, 3])).toBe(1);
    });
  });