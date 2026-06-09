// ===== 属性 =====
export type AttrKey =
  | 'str'
  | 'con'
  | 'siz'
  | 'dex'
  | 'app'
  | 'int'
  | 'pow'
  | 'edu'
  | 'luck';

export type Attributes = Record<AttrKey, number | ''>;

// ===== 技能 =====
export interface SkillDef {
  name: string;
  /** 初始值（基础成功率） */
  init: number;
  /** 动态初始值：'edu' = 教育, 'halfDex' = 敏捷的一半 */
  dynamic?: 'edu' | 'halfDex';
  /** 分组（专攻类技能），可填写具体子项 */
  group?: { defaults: string[]; options: string[] };
  intro?: string;
}

/** 玩家某条技能的点数分配 */
export interface SkillPoint {
  /** 职业点数 */
  pro: number;
  /** 兴趣点数 */
  interest: number;
  /** 成长/其它点数 */
  grow: number;
  /** 标记为职业技能 */
  occ?: boolean;
}

/** 实例化的技能行（含子项展开） */
export interface SkillRow {
  /** 关联的技能定义名 */
  defName: string;
  /** 显示名（专攻类含子项，如 "母语:汉语"） */
  label: string;
  /** 子项名（专攻类技能） */
  sub?: string;
  /** 该行初始值（已计算动态值） */
  init: number;
  point: SkillPoint;
}

// ===== 武器 =====
export interface Weapon {
  name: string;
  skill: string;
  damage: string;
  range: string;
  attacks: string;
  ammo: string;
  malfunction: string;
}

// ===== 背景故事 =====
export interface Backstory {
  appearance: string; // 形象描述
  belief: string; // 思想与信念
  significantPerson: string; // 重要之人
  significantPlace: string; // 意义非凡之地
  treasure: string; // 宝贵之物
  trait: string; // 特质
  injury: string; // 伤口与疤痕
  phobia: string; // 恐惧症与狂躁症
  arcane: string; // 第三类接触 / 法术与神器
  description: string; // 个人描述
}

// ===== 资产 =====
export interface Assets {
  cash: string;
  spending: string;
  assets: string;
  items: string;
}

// ===== 人物卡 =====
export interface Character {
  // 基础信息
  name: string;
  player: string;
  occupation: string;
  age: string;
  gender: string;
  residence: string;
  hometown: string;
  avatar?: string;
  // 属性
  attributes: Attributes;
  // 战斗/衍生（可手动覆盖）
  hpNow: string;
  mpNow: string;
  sanNow: string;
  armor: string;
  // 技能点池（手填，便于核对）
  occPoints: string;
  intPoints: string;
  // 技能
  skills: SkillRow[];
  // 武器
  weapons: Weapon[];
  // 背景
  backstory: Backstory;
  // 资产
  assets: Assets;
  // 关系 / 经历
  friends: string;
  experiences: string;
}
