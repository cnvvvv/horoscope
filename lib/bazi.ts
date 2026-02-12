// 🎯 Bazi Calculation Engine
// 八字排盘核心算法实现
// 支持年柱、月柱、日柱、时柱计算
// 支持藏干藏支
// 支持公历/农历

import { HEAVENLY_STEMS, EARTHLY_BRANCHES, STEM_BRANCH_MAP } from './solar';

// 📊 八字结构定义

interface Bazi {
  year: BaziYear;      // 年柱
  month: BaziMonth;    // 月柱
  day: BaziDay;       // 日柱
  hour: BaziHour;      // 时柱
  gender: 'male' | 'female';
  name?: string;       // 姓名（可选）
  birthType: 'lunar' | 'solar'; // 出生类型（农历/公历）
}

interface BaziYear {
  heavenlyStem: string;   // 天干（甲、乙、丙、丁、戊、己、庚、辛、壬、癸）
  earthlyBranch: string;  // 地支（子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥）
  hiddenHeavenlyStem?: string;  // 藏干
  hiddenEarthlyBranch?: string; // 藏支
}

interface BaziMonth {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenHeavenlyStem?: string;
  hiddenEarthlyBranch?: string;
}

interface BaziDay {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenHeavenlyStem?: string;
  hiddenEarthlyBranch?: string;
  hiddenHeavenlyStem2?: string; // 中气藏干
  hiddenEarthlyBranch2?: string; // 中气藏支
  hiddenHeavenlyStem3?: string; // 余气藏干
  hiddenEarthlyBranch3?: string; // 余气藏支
}

interface BaziHour {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenHeavenlyStem?: string;
  hiddenEarthlyBranch?: string;
}

// 🧪 天干地支常量

const EARTHLY_BRANCH_HIDDENS: Record<string, {
  hiddenHeavenlyStem: string;
  hiddenEarthlyBranch: string;
  hiddenHeavenlyStem2?: string;
  hiddenEarthlyBranch2?: string;
  hiddenHeavenlyStem3?: string;
  hiddenEarthlyBranch3?: string;
}> = {
  '子': { hiddenHeavenlyStem: '癸', hiddenEarthlyBranch: '癸' },
  '丑': { hiddenHeavenlyStem: '己', hiddenEarthlyBranch: '己' },
  '寅': { hiddenHeavenlyStem: '戊', hiddenEarthlyBranch: '戊', hiddenHeavenlyStem2: '丙', hiddenEarthlyBranch2: '戊' },
  '卯': { hiddenHeavenlyStem: '乙', hiddenEarthlyBranch: '乙', hiddenHeavenlyStem2: '己', hiddenEarthlyBranch2: '癸' },
  '辰': { hiddenHeavenlyStem: '乙', hiddenEarthlyBranch: '乙', hiddenHeavenlyStem2: '辛', hiddenEarthlyBranch2: '丁' },
  '巳': { hiddenHeavenlyStem: '丙', hiddenEarthlyBranch: '丙', hiddenHeavenlyStem2: '戊', hiddenEarthlyBranch2: '申' },
  '午': { hiddenHeavenlyStem: '丁', hiddenEarthlyBranch: '丁', hiddenHeavenlyStem2: '己', hiddenEarthlyBranch2: '癸' },
  '未': { hiddenHeavenlyStem: '己', hiddenEarthlyBranch: '己', hiddenHeavenlyStem2: '己', hiddenEarthlyBranch2: '丁' },
  '申': { hiddenHeavenlyStem: '庚', hiddenEarthlyBranch: '庚', hiddenHeavenlyStem2: '壬', hiddenEarthlyBranch2: '辰' },
  '酉': { hiddenHeavenlyStem: '辛', hiddenEarthlyBranch: '辛', hiddenHeavenlyStem2: '庚', hiddenEarthlyBranch2: '丁' },
  '戌': { hiddenHeavenlyStem: '戊', hiddenEarthlyBranch: '戊', hiddenHeavenlyStem2: '戊', hiddenEarthlyBranch2: '寅' },
  '亥': { hiddenHeavenlyStem: '壬', hiddenEarthlyBranch: '壬', hiddenHeavenlyStem2: '甲', hiddenEarthlyBranch2: '辛' }
};

// 🔄 天干地支循环（60甲子）

const SIXTY_JIAZI = [
  { year: '甲子', month: '甲戌', day: '甲申', hour: '甲午' },
  { year: '甲子', month: '甲戌', day: '甲申', hour: '甲午' },
  // ... 更多组合
];

// 📅 节气判断（用于月柱分界）
// 简化版：根据月份和日期判断
function getMonthPillar(year: number, month: number, day: number): BaziMonth {
  // 1. 计算年柱天干
  const yearIndex = (year - 4) % 10;
  const yearStem = HEAVENLY_STEMS[yearIndex];

  // 2. 计算月柱地支
  const monthIndex = ((year - 4) * 12 + month - 1) % 12;
  const monthBranch = EARTHLY_BRANCHES[monthIndex];

  // 3. 计算月柱天干
  const stemIndex = ((year - 4) * 12 + month - 1) % 10;
  const monthStem = HEAVENLY_STEMS[stemIndex];

  // 4. 获取藏干
  const hiddenStem = EARTHLY_BRANCH_HIDDENS[monthBranch].hiddenHeavenlyStem || undefined;

  // 5. 获取藏支
  const hiddenBranch = EARTHLY_BRANCH_HIDDENS[monthBranch].hiddenEarthlyBranch || undefined;

  return {
    heavenlyStem: yearStem,
    earthlyBranch: monthBranch,
    hiddenHeavenlyStem: hiddenStem || undefined,
    hiddenEarthlyBranch: hiddenBranch
  };
}

// 📅 日柱计算
function getDayPillar(year: number, month: number, day: number): BaziDay {
  // 1. 计算日柱天干
  const dayStem = HEAVENLY_STEMS[((year - 4) * 12 + month - 1 + day - 1) % 10];

  // 2. 计算日柱地支
  const dayBranch = EARTHLY_BRANCHES[((year - 4) * 12 + month - 1 + day - 1) % 12];

  // 3. 获取藏干（主气）
  const hiddenStem = EARTHLY_BRANCH_HIDDENS[dayBranch].hiddenHeavenlyStem || undefined;

  // 4. 获取藏支（主气）
  const hiddenBranch = EARTHLY_BRANCH_HIDDENS[dayBranch].hiddenEarthlyBranch || undefined;

  // 5. 获取中气藏干和藏支
  const hiddenStem2 = EARTHLY_BRANCH_HIDDENS[dayBranch].hiddenHeavenlyStem2 || undefined;
  const hiddenBranch2 = EARTHLY_BRANCH_HIDDENS[dayBranch].hiddenEarthlyBranch2 || undefined;

  // 6. 获取余气藏干和藏支
  const hiddenStem3 = EARTHLY_BRANCH_HIDDENS[dayBranch].hiddenHeavenlyStem3 || undefined;
  const hiddenBranch3 = EARTHLY_BRANCH_HIDDENS[dayBranch].hiddenEarthlyBranch3 || undefined;

  return {
    heavenlyStem: dayStem,
    earthlyBranch: dayBranch,
    hiddenHeavenlyStem: hiddenStem,
    hiddenEarthlyBranch: hiddenBranch,
    hiddenHeavenlyStem2: hiddenStem2,
    hiddenEarthlyBranch2: hiddenBranch2,
    hiddenHeavenlyStem3: hiddenStem3,
    hiddenEarthlyBranch3: hiddenBranch3
  };
}

// ⏰ 时柱计算
function getHourPillar(year: number, month: number, day: number, hour: number): BaziHour {
  // 1. 计算时柱地支（根据时辰）
  const hourBranch = EARTHLY_BRANCHES[hour % 12];

  // 2. 计算时柱天干
  const dayIndex = (year - 4) * 12 + month - 1 + day - 1;
  const hourStem = HEAVENLY_STEMS[(dayIndex * 12 + hour) % 10];

  // 3. 获取藏干
  const hiddenStem = EARTHLY_BRANCH_HIDDENS[hourBranch].hiddenHeavenlyStem || undefined;

  // 4. 获取藏支
  const hiddenBranch = EARTHLY_BRANCH_HIDDENS[hourBranch].hiddenEarthlyBranch || undefined;

  return {
    heavenlyStem: hourStem,
    earthlyBranch: hourBranch,
    hiddenHeavenlyStem: hiddenStem,
    hiddenEarthlyBranch: hiddenBranch
  };
}

// 📅 年柱计算
function getYearPillar(year: number): BaziYear {
  // 1. 计算年柱天干
  const yearIndex = (year - 4) % 10;
  const yearStem = HEAVENLY_STEMS[yearIndex];

  // 2. 计算年柱地支
  const yearBranch = EARTHLY_BRANCHES[(year - 4) % 12];

  // 3. 获取藏干
  const hiddenStem = EARTHLY_BRANCH_HIDDENS[yearBranch].hiddenHeavenlyStem || undefined;

  // 4. 获取藏支
  const hiddenBranch = EARTHLY_BRANCH_HIDDENS[yearBranch].hiddenEarthlyBranch || undefined;

  return {
    heavenlyStem: yearStem,
    earthlyBranch: yearBranch,
    hiddenHeavenlyStem: hiddenStem,
    hiddenEarthlyBranch: hiddenBranch
  };
}

// 🧪 完整八字排盘函数
function calculateBazi(birthDate: Date, birthHour: number, gender: 'male' | 'female', type: 'lunar' | 'solar' = 'solar'): Bazi | null {
  try {
    // 1. 提取日期信息
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;  // 1-12
    const day = birthDate.getDate();

    // 2. 验证输入
    if (year < 1900 || year > 2100) {
      console.error('年份不在支持范围内: 1900-2100');
      return null;
    }

    if (month < 1 || month > 12) {
      console.error('月份不在有效范围内: 1-12');
      return null;
    }

    if (day < 1 || day > 31) {
      console.error('日期不在有效范围内: 1-31');
      return null;
    }

    if (birthHour < 0 || birthHour > 23) {
      console.error('时辰不在有效范围内: 0-23');
      return null;
    }

    // 3. 计算四柱
    const yearPillar = getYearPillar(year);
    const monthPillar = getMonthPillar(year, month, day);
    const dayPillar = getDayPillar(year, month, day);
    const hourPillar = getHourPillar(year, month, day, birthHour);

    // 4. 组装八字
    const bazi: Bazi = {
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      hour: hourPillar,
      gender: gender,
      name: '',
      birthType: type
    };

    return bazi;
  } catch (error) {
    console.error('八字排盘失败:', error);
    return null;
  }
}

// 导出类型和函数
export type {
  Bazi,
  BaziYear,
  BaziMonth,
  BaziDay,
  BaziHour
};

export {
  calculateBazi,
  getYearPillar,
  getMonthPillar,
  getDayPillar,
  getHourPillar
};
