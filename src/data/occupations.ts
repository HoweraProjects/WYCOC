import type { AttrKey } from '../types';

// CoC 第七版常见职业。formula 为职业技能点公式。
// credit 为信用评级范围。skills 为职业技能列表（含可选的“任选”项说明）。
export interface Occupation {
  name: string;
  /** 职业技能点公式，返回数值 */
  formula: { label: string; primary: AttrKey; alts?: AttrKey[]; secondary?: AttrKey; secondaryAlts?: AttrKey[] };
  credit: [number, number];
  skills: string[];
  note?: string;
}

// formula 说明：primary×4 （+ secondary×2 如有），alts/secondaryAlts 表示“任选其一×?”
export const occupations: Occupation[] = [
  {
    name: '医生',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [30, 80],
    skills: ['急救', '医学', '其它语言（拉丁语）', '心理学', '科学（生物学）', '科学（药学）', '任选两项'],
  },
  {
    name: '记者',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [9, 30],
    skills: ['人类学', '历史', '图书馆使用', '母语', '心理学', '话术', '摄影', '任选一项'],
  },
  {
    name: '私家侦探',
    formula: { label: '教育×2 + (敏捷或力量)×2', primary: 'edu', secondary: 'dex', secondaryAlts: ['str'] },
    credit: [9, 30],
    skills: ['估价', '乔装', '法律', '图书馆使用', '侦查', '心理学', '任选两项'],
  },
  {
    name: '警察',
    formula: { label: '教育×2 + (敏捷或力量)×2', primary: 'edu', secondary: 'dex', secondaryAlts: ['str'] },
    credit: [9, 30],
    skills: ['格斗（斗殴）', '射击（手枪）', '法律', '心理学', '侦查', '驾驶或骑术', '任选两项'],
  },
  {
    name: '教授/学者',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [20, 70],
    skills: ['图书馆使用', '其它语言', '母语', '心理学', '任选四项专业技能'],
  },
  {
    name: '考古学家',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [10, 40],
    skills: ['考古学', '估价', '历史', '图书馆使用', '其它语言', '导航', '科学', '机械维修'],
  },
  {
    name: '古董商',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [30, 50],
    skills: ['会计', '估价', '历史', '图书馆使用', '其它语言', '导航', '话术', '任选一项'],
  },
  {
    name: '作家',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [9, 30],
    skills: ['人类学', '历史', '图书馆使用', '博物学', '其它语言', '母语', '心理学', '任选一项'],
  },
  {
    name: '艺术家',
    formula: { label: '教育×2 + (力量或敏捷)×2', primary: 'edu', secondary: 'str', secondaryAlts: ['dex'] },
    credit: [9, 50],
    skills: ['技艺', '历史或博物学', '其它语言', '心理学', '侦查', '任选三项'],
  },
  {
    name: '律师',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [30, 80],
    skills: ['会计', '法律', '图书馆使用', '说服', '心理学', '任选三项'],
  },
  {
    name: '神职人员',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [9, 60],
    skills: ['会计', '历史', '图书馆使用', '聆听', '其它语言', '心理学', '说服', '任选一项'],
  },
  {
    name: '工程师',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [30, 60],
    skills: ['技艺（绘图）', '电气维修', '图书馆使用', '机械维修', '操作重型机械', '科学（工程学）', '科学（物理）', '任选一项'],
  },
  {
    name: '军人',
    formula: { label: '教育×2 + (敏捷或力量)×2', primary: 'edu', secondary: 'dex', secondaryAlts: ['str'] },
    credit: [9, 30],
    skills: ['格斗', '射击', '潜行', '生存', '急救', '机械维修', '任选两项'],
  },
  {
    name: '飞行员',
    formula: { label: '教育×2 + 敏捷×2', primary: 'edu', secondary: 'dex' },
    credit: [20, 70],
    skills: ['电气维修', '机械维修', '导航', '操作重型机械', '科学（天文学）', '驾驶（飞行器）', '任选两项'],
  },
  {
    name: '运动员',
    formula: { label: '教育×2 + (力量或敏捷)×2', primary: 'edu', secondary: 'str', secondaryAlts: ['dex'] },
    credit: [9, 70],
    skills: ['攀爬', '格斗（斗殴）', '跳跃', '骑术', '游泳', '投掷', '任选两项'],
  },
  {
    name: '罪犯/黑帮',
    formula: { label: '教育×2 + (敏捷或外貌)×2', primary: 'edu', secondary: 'dex', secondaryAlts: ['app'] },
    credit: [5, 65],
    skills: ['估价', '乔装', '格斗或射击', '法律', '锁匠', '妙手', '心理学', '潜行'],
  },
  {
    name: '商人',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [9, 40],
    skills: ['会计', '估价', '法律', '聆听', '说服', '心理学', '话术', '任选一项'],
  },
  {
    name: '护士',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [9, 30],
    skills: ['急救', '医学', '聆听', '博物学', '心理学', '科学（生物学）', '科学（化学）', '侦查'],
  },
  {
    name: '探险家',
    formula: { label: '教育×2 + (敏捷或力量)×2', primary: 'edu', secondary: 'dex', secondaryAlts: ['str'] },
    credit: [55, 90],
    skills: ['攀爬', '其它语言', '博物学', '导航', '骑术', '生存', '任选两项'],
  },
  {
    name: '黑客/程序员',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [10, 70],
    skills: ['计算机使用', '电子学', '电气维修', '图书馆使用', '侦查', '科学（数学）', '任选两项'],
  },
  {
    name: '自定义',
    formula: { label: '教育×4', primary: 'edu' },
    credit: [0, 99],
    skills: ['（自由分配职业技能）'],
  },
];

export function findOccupation(name: string): Occupation | undefined {
  return occupations.find((o) => o.name === name);
}
