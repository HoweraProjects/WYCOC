import type { SkillDef } from '../types';

// CoC 第七版技能表，按组别组织。init 为基础成功率。
// 专攻类技能（group）可填写具体子项；defaults 为默认展开的子项数量占位。
export interface SkillGroup {
  group: string;
  skills: SkillDef[];
}

export const skillTable: SkillGroup[] = [
  {
    group: '特殊',
    skills: [
      { name: '信用评级', init: 0 },
      { name: '克苏鲁神话', init: 0 },
    ],
  },
  {
    group: '探索',
    skills: [
      { name: '侦查', init: 25 },
      { name: '聆听', init: 20 },
      { name: '图书馆使用', init: 20 },
      { name: '计算机使用', init: 5 },
      { name: '潜行', init: 20 },
      { name: '追踪', init: 10 },
      { name: '导航', init: 10 },
      { name: '读唇', init: 1 },
    ],
  },
  {
    group: '社交',
    skills: [
      { name: '话术', init: 5 },
      { name: '说服', init: 10 },
      { name: '取悦', init: 15 },
      { name: '恐吓', init: 15 },
      { name: '心理学', init: 10 },
      {
        name: '母语',
        init: 0,
        dynamic: 'edu',
        group: {
          defaults: ['汉语'],
          options: ['汉语', '英语', '日语', '法语', '俄语', '德语', '韩语', '粤语', '拉丁语', '西班牙语', '阿拉伯语'],
        },
      },
      {
        name: '外语',
        init: 1,
        group: {
          defaults: ['', ''],
          options: ['汉语', '英语', '日语', '法语', '俄语', '德语', '韩语', '粤语', '拉丁语', '西班牙语', '阿拉伯语'],
        },
      },
    ],
  },
  {
    group: '战斗',
    skills: [
      { name: '闪避', init: 0, dynamic: 'halfDex' },
      {
        name: '格斗',
        init: 0,
        group: {
          defaults: ['斗殴'],
          options: ['斗殴', '刀剑', '矛', '斧', '绞索', '链锯', '链枷', '鞭'],
        },
      },
      {
        name: '射击',
        init: 0,
        group: {
          defaults: ['手枪', '步/霰'],
          options: ['手枪', '步/霰', '冲锋枪', '弓弩', '机枪', '重武器'],
        },
      },
      { name: '投掷', init: 20 },
      { name: '爆破', init: 1 },
      { name: '炮术', init: 1 },
    ],
  },
  {
    group: '医疗',
    skills: [
      { name: '急救', init: 30 },
      { name: '医学', init: 1 },
      { name: '精神分析', init: 1 },
      { name: '催眠', init: 1 },
    ],
  },
  {
    group: '运动',
    skills: [
      { name: '攀爬', init: 20 },
      { name: '跳跃', init: 20 },
      { name: '游泳', init: 20 },
      { name: '潜水', init: 1 },
    ],
  },
  {
    group: '知识',
    skills: [
      { name: '会计', init: 5 },
      { name: '估价', init: 5 },
      { name: '考古学', init: 1 },
      { name: '人类学', init: 1 },
      { name: '博物学', init: 10 },
      { name: '神秘学', init: 5 },
      { name: '历史', init: 5 },
      { name: '法律', init: 5 },
      { name: '电子学', init: 1 },
      {
        name: '科学',
        init: 1,
        group: {
          defaults: ['', ''],
          options: ['数学', '物理', '化学', '药学', '地质学', '生物学', '动物学', '植物学', '天文学', '气象学', '密码学', '法证'],
        },
      },
    ],
  },
  {
    group: '技术',
    skills: [
      { name: '乔装', init: 5 },
      { name: '妙手', init: 10 },
      { name: '锁匠', init: 1 },
      { name: '机械维修', init: 10 },
      { name: '电气维修', init: 10 },
      { name: '驯兽', init: 5 },
      { name: '生存', init: 5 },
      {
        name: '技艺',
        init: 5,
        group: {
          defaults: ['', ''],
          options: ['表演', '音乐', '绘画', '艺术', '摄影', '写作', '书法', '打字', '速记', '烹饪', '理发', '木工', '裁缝'],
        },
      },
    ],
  },
  {
    group: '操纵',
    skills: [
      { name: '汽车驾驶', init: 20 },
      { name: '骑术', init: 5 },
      { name: '操作重型机械', init: 1 },
      {
        name: '驾驶',
        init: 1,
        group: {
          defaults: [''],
          options: ['船', '马车', '飞行器'],
        },
      },
    ],
  },
];

/** 扁平化的技能定义表（按显示顺序） */
export const allSkillDefs: SkillDef[] = skillTable.flatMap((g) => g.skills);

export function findSkillDef(name: string): SkillDef | undefined {
  return allSkillDefs.find((s) => s.name === name);
}
