// 🎯 奇门遁甲核心算法
// Qimen Dunjia Core Algorithm

import {
  JiuGong, JiuXing, BaMen, BaShen, TianGan, DiZhi,
  QimenPan, GongInfo, GongConfig
} from '../types/qimen';

// 🌍 九宫八卦配置
export const JIU_GONG_CONFIG: Record<JiuGong, GongConfig> = {
  [JiuGong.QIAN]: { name: JiuGong.QIAN, position: { row: 0, col: 2 }, element: 'metal', direction: '西北' },
  [JiuGong.KAN]: { name: JiuGong.KAN, position: { row: 2, col: 0 }, element: 'water', direction: '北方' },
  [JiuGong.GEN]: { name: JiuGong.GEN, position: { row: 0, col: 0 }, element: 'earth', direction: '东北' },
  [JiuGong.ZHEN]: { name: JiuGong.ZHEN, position: { row: 2, col: 2 }, element: 'wood', direction: '东方' },
  [JiuGong.ZHONG]: { name: JiuGong.ZHONG, position: { row: 1, col: 1 }, element: 'earth', direction: '中央' },
  [JiuGong.XUN]: { name: JiuGong.XUN, position: { row: 0, col: 2 }, element: 'wood', direction: '东南' },
  [JiuGong.LI]: { name: JiuGong.LI, position: { row: 2, col: 2 }, element: 'fire', direction: '南方' },
  [JiuGong.KUN]: { name: JiuGong.KUN, position: { row: 2, col: 2 }, element: 'earth', direction: '西南' },
  [JiuGong.DUI]: { name: JiuGong.DUI, position: { row: 2, col: 2 }, element: 'metal', direction: '西方' }
};

// 🌟 九星属性
export const JIU_XING_ATTR = {
  [JiuXing.TIAN_PENG]: { element: 'water', direction: '北方', nature: '吉凶参半', description: '智谋星，利智谋不利行动' },
  [JiuXing.TIAN_XIN]: { element: 'metal', direction: '西方', nature: '吉星', description: '医生星，利医疗和解难' },
  [JiuXing.TIAN_ZHU]: { element: 'metal', direction: '西方', nature: '凶星', description: '破坏星，利于破坏不利于建设' },
  [JiuXing.TIAN_REN]: { element: 'earth', direction: '东北', nature: '吉星', description: '生旺星，利于生旺和建设' },
  [JiuXing.TIAN_YING]: { element: 'fire', direction: '南方', nature: '凶星', description: '灾难星，利灾难不利于平安' },
  [JiuXing.TIAN_FU]: { element: 'wood', direction: '东南', nature: '吉星', description: '文昌星，利文运和考试' },
  [JiuXing.TIAN_CHONG]: { element: 'wood', direction: '东方', nature: '凶星', description: '武力星，利武职不利于文职' },
  [JiuXing.TIAN_QIN]: { element: 'earth', direction: '中央', nature: '吉星', description: '谋略星，利谋略不利于行动' },
  [JiuXing.TIAN_RUI]: { element: 'earth', direction: '西南', nature: '凶星', description: '疾病星，利疾病不利于健康' }
};

// 🚪 八门属性
export const BA_MEN_ATTR = {
  [BaMen.XIU_MEN]: { element: 'water', nature: '吉门', description: '休门，主休闲、养生' },
  [BaMen.SHENG_MEN]: { element: 'earth', nature: '吉门', description: '生门，主生气、创业' },
  [BaMen.SHANG_MEN]: { element: 'wood', nature: '凶门', description: '伤门，主伤害、斗争' },
  [BaMen.DU_MEN]: { element: 'wood', nature: '凶门', description: '杜门，主阻碍、不通' },
  [BaMen.JING_MEN]: { element: 'fire', nature: '凶门', description: '景门，主文书、口舌' },
  [BaMen.SI_MEN]: { element: 'earth', nature: '凶门', description: '死门，主死气、不通' },
  [BaMen.JING_MEN_GATE]: { element: 'metal', nature: '凶门', description: '惊门，主惊恐、意外' },
  [BaMen.KAI_MEN]: { element: 'metal', nature: '吉门', description: '开门，主开启、事业' }
};

// 🎭 八神属性
export const BA_SHEN_ATTR = {
  [BaShen.ZHI_FU]: { nature: '吉神', description: '值符，主贵人、助力' },
  [BaShen.TENG_SHE]: { nature: '凶神', description: '腾蛇，主虚惊、变化' },
  [BaShen.TAI_YIN]: { nature: '吉神', description: '太阴，主隐秘、阴柔' },
  [BaShen.LIU_HE]: { nature: '吉神', description: '六合，主和谐、合作' },
  [BaShen.BAI_HU]: { nature: '凶神', description: '白虎，主凶灾、刑伤' },
  [BaShen.XUAN_WU]: { nature: '凶神', description: '玄武，主欺诈、盗贼' },
  [BaShen.JIU_DI]: { nature: '吉神', description: '九地，主潜藏、防守' },
  [BaShen.JIU_TIAN]: { nature: '吉神', description: '九天，主飞扬、发展' }
};

// 🔢 天干
export const TIAN_GAN_LIST = [
  TianGan.JIA, TianGan.YI, TianGan.BING, TianGan.DING,
  TianGan.WU, TianGan.JI, TianGan.GENG, TianGan.XIN,
  TianGan.REN, TianGan.GUI
];

// 🔢 地支
export const DI_ZHI_LIST = [
  DiZhi.ZI, DiZhi.CHOU, DiZhi.YIN, DiZhi.MAO,
  DiZhi.CHEN, DiZhi.SI, DiZhi.WU, DiZhi.WEI,
  DiZhi.SHEN, DiZhi.YOU, DiZhi.XU, DiZhi.HAI
];

// 🌟 九星序列（顺时针）
export const JIU_XING_SEQUENCE = [
  JiuXing.TIAN_PENG, JiuXing.TIAN_XIN, JiuXing.TIAN_ZHU,
  JiuXing.TIAN_REN, JiuXing.TIAN_YING, JiuXing.TIAN_FU,
  JiuXing.TIAN_CHONG, JiuXing.TIAN_QIN, JiuXing.TIAN_RUI
];

// 🚪 八门序列
export const BA_MEN_SEQUENCE = [
  BaMen.XIU_MEN, BaMen.SHENG_MEN, BaMen.SHANG_MEN,
  BaMen.DU_MEN, BaMen.JING_MEN, BaMen.SI_MEN,
  BaMen.JING_MEN_GATE, BaMen.KAI_MEN
];

// 🎭 八神序列
export const BA_SHEN_SEQUENCE = [
  BaShen.ZHI_FU, BaShen.TENG_SHE, BaShen.TAI_YIN,
  BaShen.LIU_HE, BaShen.BAI_HU, BaShen.XUAN_WU,
  BaShen.JIU_DI, BaShen.JIU_TIAN
];

// 🌍 九宫序列（洛书数序：坎一坤二震三巽四中五乾六兑七艮八离九）
export const JIU_GONG_SEQUENCE = [
  JiuGong.KAN, JiuGong.KUN, JiuGong.ZHEN, JiuGong.XUN,
  JiuGong.ZHONG, JiuGong.QIAN, JiuGong.DUI, JiuGong.GEN, JiuGong.LI
];

// 📅 节气（24 Solar Terms）
export const JIE_QI_LIST = [
  '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
  '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
  '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'
];

// 🎯 常用术语
export const QIMEN_TERMS: Record<string, string> = {
  // 九星
  '天蓬': '水星，主智谋，利于策划和谋略，但不利于行动和战斗',
  '天心': '金星，主医疗，利于治病、解难和寻找贵人',
  '天柱': '金星，主破坏，利于破坏旧事物，但不利于建设',
  '天任': '土星，主生旺，利于生旺事业和建设',
  '天英': '火星，主灾难，利于军事和对抗，但不利于平安',
  '天辅': '木星，主文昌，利于考试、学习和文运',
  '天冲': '木星，主武力，利于武职和斗争，但不利于文职',
  '天禽': '土星，主谋略，利于谋略和策划，但不利于行动',
  '天芮': '土星，主疾病，利于治病，但不利于健康',

  // 八门
  '休门': '水门，吉门，主休闲、养生、休息',
  '生门': '土门，吉门，主生气、创业、发展',
  '伤门': '木门，凶门，主伤害、斗争、损伤',
  '杜门': '木门，凶门，主阻碍、不通、困难',
  '景门': '火门，凶门，主文书、口舌、是非',
  '死门': '土门，凶门，主死气、不通、凶灾',
  '惊门': '金门，凶门，主惊恐、意外、变化',
  '开门': '金门，吉门，主开启、事业、发展',

  // 八神
  '值符': '吉神，主贵人、助力、支持',
  '腾蛇': '凶神，主虚惊、变化、不安',
  '太阴': '吉神，主隐秘、阴柔、暗中',
  '六合': '吉神，主和谐、合作、婚姻',
  '白虎': '凶神，主凶灾、刑伤、疾病',
  '玄武': '凶神，主欺诈、盗贼、口舌',
  '九地': '吉神，主潜藏、防守、稳定',
  '九天': '吉神，主飞扬、发展、上升',

  // 用神
  '用神': '奇门占测时，根据所问之事选取的代表符号',
  '值符星': '时干所在之星为值符，为八神之首',
  '值使': '时支所在之门为值使，为八门之首',
  '阴遁': '局数从九到一顺排，主收敛、潜藏',
  '阳遁': '局数从一到九顺排，主发展、扩张'
};

// 🧮 工具函数：获取天干索引
export function getTianGanIndex(gan: TianGan): number {
  return TIAN_GAN_LIST.indexOf(gan);
}

// 🧮 工具函数：获取地支索引
export function getDiZhiIndex(zhi: DiZhi): number {
  return DI_ZHI_LIST.indexOf(zhi);
}

// 🧮 工具函数：获取九星索引
export function getJiuXingIndex(xing: JiuXing): number {
  return JIU_XING_SEQUENCE.indexOf(xing);
}

// 🧮 工具函数：获取八门索引
export function getBaMenIndex(men: BaMen): number {
  return BA_MEN_SEQUENCE.indexOf(men);
}

// 🧮 工具函数：获取八神索引
export function getBaShenIndex(shen: BaShen): number {
  return BA_SHEN_SEQUENCE.indexOf(shen);
}

// 🧮 工具函数：获取九宫索引
export function getJiuGongIndex(gong: JiuGong): number {
  return JIU_GONG_SEQUENCE.indexOf(gong);
}

// 🧮 工具函数：循环索引
export function cycleIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

// 🧮 工具函数：判断吉凶
export function isLucky(element: JiuXing | BaMen | BaShen): boolean {
  if (element in JIU_XING_ATTR) {
    return JIU_XING_ATTR[element as JiuXing].nature === '吉星';
  }
  if (element in BA_MEN_ATTR) {
    return BA_MEN_ATTR[element as BaMen].nature === '吉门';
  }
  if (element in BA_SHEN_ATTR) {
    return BA_SHEN_ATTR[element as BaShen].nature === '吉神';
  }
  return false;
}
