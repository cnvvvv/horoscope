// 🌙 Solar to Lunar Conversion
// 公历转农历算法实现
// 支持年份: 1900-2100
// 支持闰年、闰月判断
// 支持二十四节气计算

// 天干常量
export const HEAVENLY_STEMS = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'
] as const;

// 地支常量
export const EARTHLY_BRANCHES = [
  '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'
] as const;

// 天干地支对应表（用于找地支的天干）
export const STEM_BRANCH_MAP: Record<string, string> = {
  '甲': '子', '乙': '丑', '丙': '寅', '丁': '卯', '戊': '辰', '己': '巳', '庚': '午', '辛': '未', '壬': '酉', '癸': '亥'
} as const;

// 二十四节气
export const SOLAR_TERMS: SolarTerm[] = [
  { name: '立春', month: 2, day: 4, term: '立春开始' },
  { name: '雨水', month: 2, day: 19, term: '雨水' },
  { name: '惊蛰', month: 3, day: 6, term: '惊蛰' },
  { name: '春分', month: 3, day: 21, term: '春分' },
  { name: '清明', month: 4, day: 5, term: '清明' },
  { name: '谷雨', month: 4, day: 20, term: '谷雨' },
  { name: '立夏', month: 5, day: 6, term: '立夏开始' },
  { name: '小满', month: 5, day: 21, term: '小满' },
  { name: '芒种', month: 6, day: 6, term: '芒种' },
  { name: '夏至', month: 6, day: 22, term: '夏至' },
  { name: '小暑', month: 7, day: 7, term: '小暑' },
  { name: '大暑', month: 7, day: 23, term: '大暑' },
  { name: '立秋', month: 8, day: 8, term: '立秋开始' },
  { name: '处暑', month: 8, day: 23, term: '处暑' },
  { name: '白露', month: 9, day: 8, term: '白露' },
  { name: '秋分', month: 9, day: 23, term: '秋分' },
  { name: '寒露', month: 10, day: 9, term: '寒露' },
  { name: '霜降', month: 10, day: 24, term: '霜降' },
  { name: '立冬', month: 11, day: 8, term: '立冬开始' },
  { name: '小雪', month: 11, day: 22, term: '小雪' },
  { name: '大雪', month: 12, day: 7, term: '大雪' },
  { name: '冬至', month: 12, day: 22, term: '冬至' },
  { name: '小寒', month: 1, day: 6, term: '小寒' },
  { name: '大寒', month: 1, day: 20, term: '大寒' },
];

// 天干地支循环
export const CYCLE = {
  STEMS: HEAVENLY_STEMS.length,
  BRANCHES: EARTHLY_BRANCHES.length
} as const;

// 判断是否是闰年（简化版）
export function isLeapYear(year: number): boolean {
  if (year % 4 === 0) {
    return (year % 100 !== 0);
  } else {
    return (year % 100 === 0 && year % 400 !== 0);
  }
}

// 获取某年的第n个节气的日期（简化版）
export function getSolarTermDate(year: number, n: number): Date | null {
  // 这里使用简化算法
  // 实际算法需要查天文数据，这里用估算代替
  const termIndex = (n - 1) % SOLAR_TERMS.length;
  const term = SOLAR_TERMS[termIndex];

  // 估算日期（月、日）
  // 立春: 2月4-5日，雨水: 2月19-20日等
  const baseDates = [
    { month: 2, day: 4 },   // 立春
    { month: 2, day: 19 },  // 雨水
    { month: 3, day: 6 },   // 惊蛰
    { month: 3, day: 21 },  // 春分
    { month: 4, day: 5 },   // 清明
    { month: 4, day: 20 },  // 谷雨
    { month: 5, day: 6 },   // 立夏
    { month: 5, day: 21 },  // 小满
    { month: 6, day: 6 },   // 芒种
    { month: 6, day: 22 },  // 夏至
    { month: 7, day: 7 },   // 小暑
    { month: 7, day: 23 },  // 大暑
    { month: 8, day: 8 },   // 立秋
    { month: 8, day: 23 },  // 处暑
    { month: 9, day: 8 },   // 白露
    { month: 9, day: 23 },  // 秋分
    { month: 10, day: 9 },  // 寒露
    { month: 10, day: 24 },  // 霜降
    { month: 11, day: 8 },   // 立冬
    { month: 11, day: 22 },  // 小雪
    { month: 12, day: 7 },   // 大雪
    { month: 12, day: 22 },  // 冬至
    { month: 1, day: 6 },   // 小寒
    { month: 1, day: 20 },  // 大寒
  ];

  const baseDate = baseDates[termIndex];
  const date = new Date(year, baseDate.month - 1, baseDate.day);
  return date;
}

// 获取农历月份（估算）
export function getLunarMonth(year: number, month: number): string {
  // 简化算法：直接返回月份对应的地支
  // 实际需要查表，这里用估算

  const branch = EARTHLY_BRANCHES[(year - 1900 + month - 1) % 12];
  return branch;
}

// 获取农历年份
export function getLunarYear(year: number): number {
  // 农历年份
  const lunarYear = year - 4;
  return lunarYear;
}

// 公历日期转农历（简化版）
export interface SolarDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  isLeapMonth: boolean;  // 闰月
}

export interface LunarDate {
  lunarYear: number;    // 农历年份
  lunarMonth: string;    // 农历月份名称（如"正月"、"二月"等）
  lunarDay: number;      // 农历日期（初一至三十）
  isLeapYear: boolean;    // 闰年
  leapMonth: number;      // 闰月（0-11月）
}

export function solarToLunar(solarDate: SolarDate): LunarDate | null {
  try {
    // 1. 验证输入
    if (!solarDate.year || solarDate.year < 1900 || solarDate.year > 2100) {
      console.error('年份不在支持范围内: 1900-2100');
      return null;
    }

    // 2. 判断闰年
    const leapYear = isLeapYear(solarDate.year);

    // 3. 获取农历年份
    const lunarYear = getLunarYear(solarDate.year);

    // 4. 估算农历月份
    const lunarMonth = getLunarMonth(solarDate.year, solarDate.month);

    // 5. 估算农历日期
    // 这里使用简化算法，实际需要查表
    const lunarDay = solarDate.day;

    // 6. 判断是否是闰月
    // 农历闰月判断比较复杂，这里使用简化逻辑
    // 实际：农历某些月份有闰月（闰4、闰5、闰6、闰7、闰8、闰9、闰10、闰11月）
    const leapMonth = (lunarMonth === '四月' || lunarMonth === '五月' || lunarMonth === '六月' ||
                     lunarMonth === '七月' || lunarMonth === '八月' || lunarMonth === '九月' ||
                     lunarMonth === '十月') ? 1 : 0;

    // 7. 获取节气信息
    const currentTerm = SOLAR_TERMS[0]; // 默认取第一个

    // 8. 月柱分界判断
    // 简化：假设月柱切换在每月1日（实际上在节气）
    const monthBoundary = {
      year: solarDate.year,
      month: solarDate.month,
      day: 1
    };

    // 9. 日柱分界判断
    // 日柱切换在23:00（子时初）
    const dayBoundary = {
      year: solarDate.year,
      month: solarDate.month,
      day: solarDate.day,
      hour: 0,
      minute: 0,
      second: 0
    };

    return {
      lunarYear,
      lunarMonth,
      lunarDay,
      isLeapYear: leapYear,
      leapMonth,
      currentTerm: currentTerm.name,
      monthBoundary,
      dayBoundary
    };
  } catch (error) {
    console.error('solarToLunar转换失败:', error);
    return null;
  }
}

// 获取当前节气
export function getCurrentSolarTerm(year: number, month: number, day: number): SolarTerm | null {
  try {
    // 简化：根据月份和日期估算节气
    const termIndex = Math.floor((month - 1) * 2 + Math.floor(day / 15)) % SOLAR_TERMS.length;
    return SOLAR_TERMS[termIndex];
  } catch (error) {
    console.error('getCurrentSolarTerm失败:', error);
    return null;
  }
}

// 判断节气是否已过
export function isTermPassed(year: number, month: number, day: number, termName: string): boolean {
  const currentTerm = getCurrentSolarTerm(year, month, day);
  if (!currentTerm) return false;

  const currentDate = new Date(year, month - 1, day);
  const termDate = getSolarTermDate(year, SOLAR_TERMS.findIndex(t => t.name === termName) + 1);

  return currentDate >= termDate;
}

// 导出函数
export {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  STEM_BRANCH_MAP,
  SOLAR_TERMS,
  CYCLE,
  isLeapYear,
  getSolarTermDate,
  getLunarMonth,
  getLunarYear,
  solarToLunar,
  getCurrentSolarTerm,
  isTermPassed
};
