import type { Attributes, SkillRow, SkillDef } from '../types';
import { skillTable, allSkillDefs } from '../data/skills';

function num(v: number | ''): number {
  return typeof v === 'number' ? v : 0;
}

/** 计算某技能定义在给定属性下的初始值 */
export function skillInit(def: SkillDef, attrs: Attributes): number {
  if (def.dynamic === 'edu') return num(attrs.edu);
  if (def.dynamic === 'halfDex') return Math.floor(num(attrs.dex) / 2);
  return def.init;
}

/** 生成默认技能行列表（含专攻类技能的默认子项展开） */
export function createDefaultSkillRows(attrs: Attributes): SkillRow[] {
  const rows: SkillRow[] = [];
  for (const def of allSkillDefs) {
    const baseInit = skillInit(def, attrs);
    if (def.group) {
      def.group.defaults.forEach((sub) => {
        rows.push({
          defName: def.name,
          sub,
          label: sub ? `${def.name}(${sub})` : def.name,
          init: baseInit,
          point: { pro: 0, interest: 0, grow: 0 },
        });
      });
    } else {
      rows.push({
        defName: def.name,
        label: def.name,
        init: baseInit,
        point: { pro: 0, interest: 0, grow: 0 },
      });
    }
  }
  return rows;
}

/** 属性变化后刷新动态技能（母语=教育，闪避=敏捷一半）的初始值 */
export function refreshDynamicInits(rows: SkillRow[], attrs: Attributes): SkillRow[] {
  return rows.map((row) => {
    const def = allSkillDefs.find((d) => d.name === row.defName);
    if (def && def.dynamic) {
      return { ...row, init: skillInit(def, attrs) };
    }
    return row;
  });
}

/** 技能行的总成功率 */
export function skillTotal(row: SkillRow): number {
  return row.init + row.point.pro + row.point.interest + row.point.grow;
}

export function half(v: number): number {
  return Math.floor(v / 2);
}
export function fifth(v: number): number {
  return Math.floor(v / 5);
}

/** 已分配的职业点数总和 */
export function usedOccPoints(rows: SkillRow[]): number {
  return rows.reduce((s, r) => s + r.point.pro, 0);
}
/** 已分配的兴趣点数总和 */
export function usedIntPoints(rows: SkillRow[]): number {
  return rows.reduce((s, r) => s + r.point.interest, 0);
}

export { skillTable };
