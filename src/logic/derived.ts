import type { Attributes } from '../types';

function n(v: number | ''): number | undefined {
  return typeof v === 'number' ? v : undefined;
}

export interface Derived {
  hpMax?: number;
  mpMax?: number;
  sanStart?: number;
  db?: string; // 伤害加值
  build?: string; // 体格
  mov?: number; // 移动力
}

/** 根据属性与年龄计算衍生属性（7版规则） */
export function computeDerived(attrs: Attributes, age: number): Derived {
  const str = n(attrs.str);
  const con = n(attrs.con);
  const siz = n(attrs.siz);
  const dex = n(attrs.dex);
  const pow = n(attrs.pow);

  const d: Derived = {};

  if (con !== undefined && siz !== undefined) d.hpMax = Math.floor((con + siz) / 10);
  if (pow !== undefined) {
    d.mpMax = Math.floor(pow / 5);
    d.sanStart = pow;
  }

  // 伤害加值 DB / 体格 Build
  if (str !== undefined && siz !== undefined) {
    const v = str + siz;
    if (v < 65) {
      d.db = '-2';
      d.build = '-2';
    } else if (v < 85) {
      d.db = '-1';
      d.build = '-1';
    } else if (v < 125) {
      d.db = '0';
      d.build = '0';
    } else if (v < 165) {
      d.db = '+1D4';
      d.build = '1';
    } else if (v < 205) {
      d.db = '+1D6';
      d.build = '2';
    } else {
      const rate = Math.floor((v - 205) / 80) + 2;
      d.db = `+${rate}D6`;
      d.build = `${rate + 1}`;
    }
  }

  // 移动力 MOV
  if (str !== undefined && siz !== undefined && dex !== undefined) {
    let mov: number;
    if (str < siz && dex < siz) mov = 7;
    else if (str > siz && dex > siz) mov = 9;
    else mov = 8;
    if (age > 40) {
      mov -= Math.min(5, Math.ceil((age - 40) / 10));
    }
    d.mov = mov;
  }

  return d;
}
