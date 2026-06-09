import type { Attributes, AttrKey } from '../types';
import { roll, growCheck } from './dice';

export const ATTR_META: { key: AttrKey; label: string; en: string }[] = [
  { key: 'str', label: '力量', en: 'STR' },
  { key: 'con', label: '体质', en: 'CON' },
  { key: 'siz', label: '体型', en: 'SIZ' },
  { key: 'dex', label: '敏捷', en: 'DEX' },
  { key: 'app', label: '外貌', en: 'APP' },
  { key: 'int', label: '智力', en: 'INT' },
  { key: 'pow', label: '意志', en: 'POW' },
  { key: 'edu', label: '教育', en: 'EDU' },
  { key: 'luck', label: '幸运', en: 'LUCK' },
];

/** 随机生成属性（7版规则）：普通属性 3D6×5，SIZ/INT/EDU 为 (2D6+6)×5 */
export function rollAttributes(): Attributes {
  const normal: AttrKey[] = ['str', 'con', 'dex', 'app', 'pow', 'luck'];
  const higher: AttrKey[] = ['siz', 'int', 'edu'];
  const result = {} as Attributes;
  normal.forEach((k) => (result[k] = roll(6, 3) * 5));
  higher.forEach((k) => (result[k] = roll(6, 2, 6) * 5));
  return result;
}

function num(v: number | ''): number {
  return typeof v === 'number' ? v : 0;
}

/** 按年龄调整属性（7版规则） */
export function applyAge(attrs: Attributes, age: number): Attributes {
  const a: Record<AttrKey, number> = {
    str: num(attrs.str),
    con: num(attrs.con),
    siz: num(attrs.siz),
    dex: num(attrs.dex),
    app: num(attrs.app),
    int: num(attrs.int),
    pow: num(attrs.pow),
    edu: num(attrs.edu),
    luck: num(attrs.luck),
  };

  // 在指定属性间扣减 total 点（尽量平均、保底 1）
  const reduce = (keys: AttrKey[], total: number) => {
    let rest = total;
    keys.forEach((k, i) => {
      const isLast = i === keys.length - 1;
      const minus = isLast ? rest : Math.min(rest, roll(rest + 1) - 1);
      a[k] = Math.max(1, a[k] - minus);
      rest -= minus;
    });
  };

  if (age >= 15 && age < 20) {
    reduce(['str', 'siz'], 5);
    a.edu = a.edu; // 无成长
    a.luck = Math.max(a.luck, roll(6, 3) * 5); // 取较大幸运
  } else if (age < 40) {
    a.edu = growCheck(a.edu);
  } else if (age < 50) {
    reduce(['str', 'con', 'dex'], 5);
    a.app = Math.max(1, a.app - 5);
    a.edu = growCheck(growCheck(a.edu));
  } else if (age < 60) {
    reduce(['str', 'con', 'dex'], 10);
    a.app = Math.max(1, a.app - 10);
    a.edu = growCheck(growCheck(growCheck(a.edu)));
  } else if (age < 70) {
    reduce(['str', 'con', 'dex'], 20);
    a.app = Math.max(1, a.app - 15);
    for (let i = 0; i < 4; i++) a.edu = growCheck(a.edu);
  } else if (age < 80) {
    reduce(['str', 'con', 'dex'], 40);
    a.app = Math.max(1, a.app - 20);
    for (let i = 0; i < 4; i++) a.edu = growCheck(a.edu);
  } else if (age >= 80) {
    reduce(['str', 'con', 'dex'], 80);
    a.app = Math.max(1, a.app - 25);
    for (let i = 0; i < 4; i++) a.edu = growCheck(a.edu);
  }

  a.edu = Math.min(a.edu, 99);
  return a;
}
