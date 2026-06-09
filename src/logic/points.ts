import type { Attributes, AttrKey } from '../types';
import { findOccupation } from '../data/occupations';

function num(v: number | ''): number {
  return typeof v === 'number' ? v : 0;
}

/** 兴趣点 = 智力 × 2 */
export function computeIntPoints(attrs: Attributes): number {
  return num(attrs.int) * 2;
}

/**
 * 职业点：按所选职业的公式计算。
 * 未选择职业或属性未投掷（结果为 0）时返回 undefined。
 */
export function computeOccPoints(occupationName: string, attrs: Attributes): number | undefined {
  const occ = findOccupation(occupationName);
  if (!occ) return undefined;
  const get = (k: AttrKey) => num(attrs[k]);
  const f = occ.formula;
  let val =
    (f.alts ? Math.max(get(f.primary), ...f.alts.map(get)) : get(f.primary)) * (f.secondary ? 2 : 4);
  if (f.secondary) {
    const sec = f.secondaryAlts
      ? Math.max(get(f.secondary), ...f.secondaryAlts.map(get))
      : get(f.secondary);
    val += sec * 2;
  }
  return val || undefined;
}
