import { describe, expect, it } from 'vitest';
import { calculatePaces } from './paceUtils';

describe('pace utils', () => {
  it('calculates paces from 5k time', () => {
    const p = calculatePaces(1680);
    expect(p.longRun).toBe(p.easy);
    expect(p.easy).toMatch(/\/km$/);
  });
});
