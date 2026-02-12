// 📋 Horoscope Types
// "科学算命"项目的完整类型定义系统

// 🌙 历法类型
export interface SolarDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  isLeapMonth: boolean;
  isLeapYear: boolean;
  monthTerm: string;
  dayTerm: string;
}

export interface LunarDate {
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  isLeapYear: boolean;
  leapMonth: number;
  monthTerm: string;
  dayTerm: string;
  yearTerm: string;
}

export interface SolarTerm {
  year: number;
  month: number;
  day: number;
  name: string;
  timestamp: Date;
}

// 🎯 八字类型
export interface Bazi {
  year: BaziPillar;
  month: BaziPillar;
  day: BaziPillar;
  hour: BaziPillar;
  gender: 'male' | 'female';
  name?: string;
  birthType: 'lunar' | 'solar';
}

export interface BaziPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenHeavenlyStem?: string;
  hiddenEarthlyBranch?: string;
  hiddenHeavenlyStem2?: string;
  hiddenEarthlyBranch2?: string;
  hiddenHeavenlyStem3?: string;
  hiddenEarthlyBranch3?: string;
}

// 📊 五行类型
export type WuXing = 'METAL' | 'WOOD' | 'WATER' | 'FIRE' | 'EARTH';

export interface WuXingScore {
  element: WuXing;
  count: number;
  strength: number;
  balance: string;
  hasElement: boolean;
}

export interface WuXingAnalysis {
  scores: {
    metal: WuXingScore;
    wood: WuXingScore;
    water: WuXingScore;
    fire: WuXingScore;
    earth: WuXingScore;
  };
  strongElements: WuXing[];
  weakElements: WuXing[];
  missingElements: WuXing[];
  dominantElement: WuXing;
  balanceLevel: string;
  interactions: {
    generated: string[];
    克制: string[];
    冲克: string[];
    三会: string[];
    三害: string[];
    六合: string[];
  };
  suggestions: string[];
  overallScore: number;
}

// 🌙 十神类型
export enum ShenType {
  ZHENG_CAI = '正财',
  PIAN_CAI = '偏财',
  QI_SHA = '七杀',
  ZHENG_GUAN = '正官',
  ZHENG_YIN = '正印',
  PIAN_YIN = '偏印',
  SHANG_GUAN = '伤官',
  SHI_SHEN = '食神',
  BI_JIAN = '比肩',
  JIE_CAI = '劫财',
  WU_CAI = '无财',
  WU_GUAN = '无官',
  WU_YIN = '无印'
}

export interface Shen {
  type: ShenType;
  name: string;
  element: WuXing;
  positive: boolean;
  negative: boolean;
  description: string;
}

export interface ShenSystem {
  positiveShen: Shen[];
  negativeShen: Shen[];
  careerShen: Shen[];
  wealthShen: Shen[];
  learningShen: Shen[];
  emotionShen: Shen[];
}

export interface ShenAnalysis {
  dayShen: Shen;
  monthShen: Shen | null;
  hourShen: Shen | null;
  yearShen: Shen | null;
  shenCount: {
    positive: number;
    negative: number;
    neutral: number;
  };
  suggestions: string[];
}

// 📅 大运类型
export interface DaYunPhase {
  year: number;
  age: number;
  ageEnd: number;
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenHeavenlyStem?: string;
  hiddenEarthlyBranch?: string;
  analysis: string;
  score: number;
  phaseNumber: number;
}

export interface LiuNian {
  year: number;
  heavenlyStem: string;
  earthlyBranch: string;
  analysis: string;
  score: number;
}

export interface DaYunCycle {
  phases: DaYunPhase[];
  currentPhase: DaYunPhase | null;
  currentYear: LiuNian | null;
  score: number;
  analysis: string;
  suggestions: string[];
}

// 🔗 关系类型
export enum RelationType {
  SAN_HE = '三合',
  LIU_CHONG = '六冲',
  SAN_HUI = '三会',
  SAN_HAI = '三害',
  LIU_HE = '六合'
}

export interface StemBranchRelation {
  type: RelationType;
  description: string;
  isGood: boolean;
  isBad: boolean;
  effect: string;
}

export interface StemBranchRelation {
  from: string;
  to: string;
  type: RelationType;
  description: string;
  isGood: boolean;
  isBad: boolean;
  effect: string;
}

export interface RelationshipAnalysis {
  stemsRelations: {
    sanHe: string[];
    liuChong: string[];
  };
  branchesRelations: {
    sanHe: string[];
    liuChong: string[];
    sanHui: string[];
    sanHai: string[];
    liuHe: string[];
  };
  interactions: StemBranchRelation[];
  overall: {
    goodRelations: number;
    badRelations: number;
    harmonyLevel: string;
  };
  suggestions: string[];
}

// 🎨 运势类型
export interface YearFortune {
  year: number;
  overall: {
    score: number;          // 综合评分（0-100）
    star: number;           // 星级（0-5）
    trend: string;          // 趋势（上升/平稳/下降）
  };
  career: {
    score: number;          // 事业/学业评分（0-100）
    rating: string;         // 评级（优秀/良好/一般/较差）
    forecast: string;       // 运势预测
    suggestion: string;     // 建议
  };
  wealth: {
    score: number;
    rating: string;
    forecast: string;
    suggestion: string;
  };
  emotion: {
    score: number;
    rating: string;
    forecast: string;
    suggestion: string;
  };
  health: {
    score: number;
    rating: string;
    forecast: string;
    suggestion: string;
    bodySystems: string[]; // 脏腑调理建议
  };
  lucky: {
    color: string;          // 幸运色
    number: number;         // 幸运数字
    direction: string;      // 幸运方位
    day: string;            // 幸运日
  };
  warnings: string[];       // 警告和忠告
  advice: string;          // 综合建议
}

// 📱 组件类型
export interface InputFormData {
  name: string;
  gender: 'male' | 'female';
  birthType: 'lunar' | 'solar';
  birthDate: {
    year: number;
    month: number;
    day: number;
    hour: number;
  };
}

export interface BaziFormData extends InputFormData {
  year: number;
  month: number;
  day: number;
  hour: number;
}

export interface WuXingFormData extends InputFormData {
  bazi: Bazi;
}

export interface ShenFormData extends InputFormData {
  bazi: Bazi;
}

export interface DaYunFormData extends InputFormData {
  bazi: Bazi;
  currentAge: number;
  currentYear: number;
}

// 📊 图表类型
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}

export interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  };
}

export interface TimelineData {
  years: number[];
  phases: DaYunPhase[];
  currentPhaseIndex: number;
}

// 📱 存储类型
export interface StorageData {
  baziHistory: Bazi[];
  currentBazi: Bazi | null;
  settings: {
    calendarType: 'lunar' | 'solar';
    showShen: boolean;
    showDayun: boolean;
    showWuxing: boolean;
    defaultGender: 'male' | 'female';
    defaultBirthType: 'lunar' | 'solar';
  };
}

export interface StorageBazi extends Bazi {
  timestamp: number;
  createdAt: string;
}

// 📊 API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface BaziResponse extends ApiResponse<Bazi> {
  bazi?: Bazi;
}

export interface WuXingResponse extends ApiResponse<WuXingAnalysis> {
  wuxing?: WuXingAnalysis;
}

export interface ShenResponse extends ApiResponse<ShenAnalysis> {
  shen?: ShenAnalysis;
}

export interface DaYunResponse extends ApiResponse<DaYunCycle> {
  dayun?: DaYunCycle;
}

export interface RelationshipsResponse extends ApiResponse<RelationshipAnalysis> {
  relationships?: RelationshipAnalysis;
}

export interface YearFortuneResponse extends ApiResponse<YearFortune> {
  fortune?: YearFortune;
}

// 🎨 组件Props类型
export interface BaseComponentProps {
  className?: string;
}

export interface InputFormProps extends BaseComponentProps {
  onSubmit: (data: BaziFormData) => void;
  loading?: boolean;
  initialData?: Partial<InputFormData>;
}

export interface BaziDisplayProps extends BaseComponentProps {
  bazi: Bazi;
  showDetails?: boolean;
}

export interface WuXingDisplayProps extends BaseComponentProps {
  wuxing: WuXingAnalysis;
}

export interface ShenDisplayProps extends BaseComponentProps {
  shen: ShenAnalysis;
}

export interface DaYunDisplayProps extends BaseComponentProps {
  dayun: DaYunCycle;
}

export interface YearFortuneDisplayProps extends BaseComponentProps {
  fortune: YearFortune;
}

// 📊 工具类型
export interface ColorScheme {
  metal: string;    // 金：白色、银色、灰色
  wood: string;     // 木：青色、绿色、碧色
  water: string;    // 水：黑色、深蓝、湛蓝
  fire: string;     // 火：红色、橙色、朱色
  earth: string;    // 土：黄色、棕色、米色
}

export const WU_XING_COLORS: ColorScheme = {
  metal: '#8B8B83',
  wood: '#228B22',
  water: '#000080',
  fire: '#FF4500',
  earth: '#D2B48C'
};

export const WU_XING_GRADIENTS = {
  metal: ['#8B8B83', '#C0C0C0', '#D3D3D3'],
  wood: ['#228B22', '#32CD32', '#00FF00'],
  water: ['#000080', '#0000FF', '#87CEEB'],
  fire: ['#FF4500', '#FF8C00', '#FFD700'],
  earth: ['#D2B48C', '#DEB887', '#F5DEB3']
};

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  muted: string;
  accent: string;
}

export const THEME = {
  light: {
    primary: '#1a1a1a',
    secondary: '#2563eb',
    background: '#ffffff',
    text: '#0a0a0a',
    muted: '#71717a',
    accent: '#3b82f6'
  },
  dark: {
    primary: '#fafafa',
    secondary: '#60a5fa',
    background: '#0a0a0a',
    text: '#f0f0f0',
    muted: '#a1a1aa',
    accent: '#3b82f6'
  }
};

// 所有类型已在定义时单独导出
