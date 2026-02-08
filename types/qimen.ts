// 📋 奇门遁甲类型定义
// Qimen Dunjia Type Definitions

// 🎯 事项类型
export enum QimenCategory {
  WEALTH = 'wealth',           // 求财
  CAREER = 'career',           // 事业/工作
  LOVE = 'love',               // 感情/婚姻
  LOST = 'lost',               // 寻人寻物
  TRAVEL = 'travel',           // 出行/旅游
  HEALTH = 'health',           // 疾病/健康
  LAWSUIT = 'lawsuit'          // 官司/诉讼
}

// 🌟 九星（Nine Stars）
export enum JiuXing {
  TIAN_PENG = '天蓬',          // 天蓬星
  TIAN_XIN = '天心',          // 天心星
  TIAN_ZHU = '天柱',          // 天柱星
  TIAN_REN = '天任',          // 天任星
  TIAN_YING = '天英',          // 天英星
  TIAN_FU = '天辅',           // 天辅星
  TIAN_CHONG = '天冲',         // 天冲星
  TIAN_QIN = '天禽',          // 天禽星
  TIAN_RUI = '天芮'           // 天芮星
}

// 🚪 八门（Eight Gates）
export enum BaMen {
  XIU_MEN = '休门',            // 休门
  SHENG_MEN = '生门',          // 生门
  SHANG_MEN = '伤门',          // 伤门
  DU_MEN = '杜门',             // 杜门
  JING_MEN = '景门',           // 景门
  SI_MEN = '死门',             // 死门
  JING_MEN_GATE = '惊门',      // 惊门
  KAI_MEN = '开门'             // 开门
}

// 🎭 八神（Eight Spirits）
export enum BaShen {
  ZHI_FU = '值符',             // 值符
  TENG_SHE = '腾蛇',           // 腾蛇
  TAI_YIN = '太阴',            // 太阴
  LIU_HE = '六合',             // 六合
  BAI_HU = '白虎',             // 白虎
  XUAN_WU = '玄武',            // 玄武
  JIU_DI = '九地',             // 九地
  JIU_TIAN = '九天'            // 九天
}

// 🌍 九宫（Nine Palaces）
export enum JiuGong {
  QIAN = '乾',                 // 乾宫
  KAN = '坎',                  // 坎宫
  GEN = '艮',                  // 艮宫
  ZHEN = '震',                 // 震宫
  ZHONG = '中',                // 中宫
  XUN = '巽',                  // 巽宫
  LI = '离',                   // 离宫
  KUN = '坤',                  // 坤宫
  DUI = '兑'                   // 兑宫
}

// 🔢 地支
export enum DiZhi {
  ZI = '子',                   // 子
  CHOU = '丑',                 // 丑
  YIN = '寅',                  // 寅
  MAO = '卯',                  // 卯
  CHEN = '辰',                 // 辰
  SI = '巳',                   // 巳
  WU = '午',                   // 午
  WEI = '未',                  // 未
  SHEN = '申',                 // 申
  YOU = '酉',                  // 酉
  XU = '戌',                   // 戌
  HAI = '亥'                   // 亥
}

// ☀️ 天干
export enum TianGan {
  JIA = '甲',                  // 甲
  YI = '乙',                   // 乙
  BING = '丙',                 // 丙
  DING = '丁',                 // 丁
  WU = '戊',                   // 戊
  JI = '己',                   // 己
  GENG = '庚',                 // 庚
  XIN = '辛',                  // 辛
  REN = '壬',                  // 壬
  GUI = '癸'                   // 癸
}

// 🏠 九宫八卦配置
export interface GongConfig {
  name: JiuGong;
  position: { row: number; col: number };
  element: 'metal' | 'wood' | 'water' | 'fire' | 'earth';
  direction: string;
}

// 🎯 宫格信息（Palace Info）
export interface GongInfo {
  gong: JiuGong;
  diPan: {
    gan?: TianGan;
    zhi?: DiZhi;
  };
  tianPan: {
    xing: JiuXing;
    gan?: TianGan;
  };
  renPan: {
    men: BaMen;
  };
  shenPan: {
    shen: BaShen;
  };
  isZhiFu: boolean;      // 是否值符
  isZhiShi: boolean;     // 是否值使
}

// 📊 奇门盘面（Qimen Board）
export interface QimenPan {
  panJu: number;          // 局数（1-9）
  isYinDun: boolean;      // 是否阴遁
  zhiFu: {
    gong: JiuGong;
    xing: JiuXing;
  };
  zhiShi: {
    gong: JiuGong;
    men: BaMen;
  };
  jiuGong: GongInfo[];    // 九宫信息
  year: number;           // 年
  month: number;          // 月
  day: number;            // 日
  hour: number;           // 时
  jieQi: string;          // 节气
}

// 📝 起盘请求（Qimen Request）
export interface QimenRequest {
  year: number;
  month: number;
  day: number;
  hour: number;
  category: QimenCategory;
  question?: string;
}

// 🎯 用神（Yong Shen - Deity for Divination）
export interface YongShen {
  name: string;
  description: string;
  category: QimenCategory;
  positions: (JiuXing | BaMen | BaShen | TianGan)[];
}

// 📊 分析结果（Analysis Result）
export interface QimenAnalysis {
  request: QimenRequest;
  pan: QimenPan;
  yongShen: YongShen;
  scores: {
    timing: number;        // 时机评分（-100到100）
    direction: number;     // 方位评分
    relationship: number;   // 人际评分
    total: number;         // 综合评分
  };
  result: {
    level: '大吉' | '吉' | '平' | '凶' | '大凶';
    advice: string;
    strategy: string;
    bestDirection?: string;
    bestTime?: string;
    warnings: string[];
  };
  details: {
    timing: string;        // 时机分析
    self: string;          // 自身状态
    environment: string;   // 环境分析
    action: string;       // 行动指南
  };
  timestamp: string;
}

// 📊 吉凶评分（Fortune Score）
export interface FortuneScore {
  score: number;
  level: '大吉' | '吉' | '平' | '凶' | '大凶';
  color: string;
  description: string;
}

// 🔗 规则条件（Rule Condition）
export interface RuleCondition {
  type: 'xing_gong' | 'men_gong' | 'shen_gong' | 'gan_xing' | 'gan_men' | 'gong_gong';
  operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'contains';
  value: string | string[];
}

// 📋 规则（Rule）
export interface Rule {
  id: string;
  category: QimenCategory;
  conditions: RuleCondition[];
  result: string;
  score: number;
  priority: number;
}

// 📦 规则库（Ruleset）
export interface Ruleset {
  category: QimenCategory;
  yongShen: string[];
  rules: Rule[];
}

// 📝 文案模板（Text Template）
export interface TextTemplate {
  category: QimenCategory;
  scoreRange: { min: number; max: number };
  template: string;
  variables: string[];
}

// 🎨 UI Props
export interface QimenGridProps {
  pan: QimenPan;
  onGongClick?: (gong: JiuGong) => void;
  selectedGong?: JiuGong;
  className?: string;
}

export interface TermPopupProps {
  term: string;
  description: string;
  onClose: () => void;
  position: { x: number; y: number };
}

// 📊 API响应类型
export interface QimenResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface QimenPaiResponse extends QimenResponse<QimenPan> {}
export interface QimenAnalyzeResponse extends QimenResponse<QimenAnalysis> {}
export interface QimenYongShenResponse extends QimenResponse<YongShen> {}

// 🔧 配置类型
export interface QimenConfig {
  defaultCategory: QimenCategory;
  enableCache: boolean;
  cacheTimeout: number;
  enableAI: boolean;
  apiKey?: string;
}

// 📱 存储类型
export interface QimenStorage {
  history: QimenAnalysis[];
  settings: QimenConfig;
  lastUpdate: string;
}

// 导出所有类型
export type {
  GongConfig,
  GongInfo,
  QimenPan,
  QimenRequest,
  YongShen,
  QimenAnalysis,
  FortuneScore,
  RuleCondition,
  Rule,
  Ruleset,
  TextTemplate,
  QimenGridProps,
  TermPopupProps,
  QimenResponse,
  QimenPaiResponse,
  QimenAnalyzeResponse,
  QimenYongShenResponse,
  QimenConfig,
  QimenStorage
};
