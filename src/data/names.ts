// 随机姓名生成数据

const surnames =
  '王李张刘陈杨黄赵吴周徐孙马朱胡郭何高林罗郑梁谢宋唐许韩冯邓曹彭曾肖田董袁潘于蒋蔡余杜叶程苏魏吕丁任沈姚卢姜崔钟谭陆汪范金石廖贾夏韦付方白邹孟熊秦邱江尹薛闫段雷侯龙史陶黎贺顾毛郝龚邵万钱严覃武戴莫孔向汤'.split('');

const maleGiven =
  '伟刚勇毅俊峰强军平保东文辉力明永健世广志义兴良海山仁波宁贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博诚先敬震振壮会思群豪心邦承乐绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏泽晨辰士以建家致树炎德行时泰盛雄琛钧冠策腾楠榕风航弘'.split('');

const femaleGiven =
  '芳娜秀英华慧巧美娟英华慧巧美娟兰凤洁梅琳素云莲真环雪荣爱妹霞香月莺媛艳瑞凡佳嘉琼勤珍贞莉桂娣叶璧璐娅琦晶妍茜秋珊莎锦黛青倩婷姣婉娴瑾颖露瑶怡婵雁蓓纨仪荷丹蓉眉君琴蕊薇菁梦岚苑婕馨瑗琰韵融园艺咏卿聪澜纯毓悦昭冰爽琬茗羽希宁欣飘育滢馥筠柔竹霭凝晓欢霄枫芸菲寒伊亚宜可姬舒影荔枝思丽'.split('');

const westMale =
  'James,John,Robert,Michael,William,David,Richard,Charles,Joseph,Thomas,Henry,Walter,Arthur,Albert,Frank,Edward,Harold,George,Howard,Ernest,Carl,Roy,Samuel,Louis,Raymond,Lawrence,Victor,Theodore,Clarence,Vincent'.split(',');

const westFemale =
  'Mary,Helen,Margaret,Anna,Ruth,Elizabeth,Dorothy,Marie,Florence,Mildred,Alice,Ethel,Lillian,Gladys,Edna,Frances,Rose,Annie,Grace,Bertha,Emma,Bessie,Clara,Hazel,Irene,Gertrude,Louise,Catherine,Martha,Mabel'.split(',');

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export type NameStyle = '中文' | '西式';
export type Gender = '男' | '女';

export function generateName(style: NameStyle, gender: Gender): string {
  if (style === '西式') {
    const given = gender === '男' ? pick(westMale) : pick(westFemale);
    const family = pick(
      'Smith,Johnson,Williams,Brown,Jones,Miller,Davis,Wilson,Moore,Taylor,Anderson,Thomas,Jackson,White,Harris,Martin,Thompson,Garcia,Clark,Lewis,Walker,Hall,Young,King,Wright,Scott,Green,Baker,Carter,Mitchell'.split(','),
    );
    return `${given} ${family}`;
  }
  const family = pick(surnames);
  const pool = gender === '男' ? maleGiven : femaleGiven;
  const len = Math.random() < 0.55 ? 2 : 1;
  let given = pick(pool);
  if (len === 2) given += pick(pool);
  return `${family}${given}`;
}
