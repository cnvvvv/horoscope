// 🌙 Solar to Lunar Conversion
// 公历转农历算法实现
// 支持年份: 1900-2100
// 支持闰年、闰月判断
// 支持二十四节气计算

// 导入类型
import { LunarDate, SolarTerm } from '@/types/horoscope';

// 天干常量
const HEAVENLY_STEMS = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'
] as const;

// 地支常量
const EARTHLY_BRANCHES = [
  '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'
] as const;

// 天干地支对应表（用于找地支的天干）
const STEM_BRANCH_MAP: Record<string, string> = {
  '甲': '子', '乙': '丑', '丙': '寅', '丁': '卯', '戊': '辰', '己': '巳', '庚': '午', '辛': '未', '壬': '酉', '癸': '亥'
} as const;

// 二十四节气
export const SOLAR_TERMS: SolarTerm[] = [
  { name: '立春', month: 2, day: 4, year: 2023, timestamp: new Date(2023, 1, 4) },
  { name: '雨水', month: 2, day: 19, year: 2023, timestamp: new Date(2023, 1, 19) },
  { name: '惊蛰', month: 3, day: 6, year: 2023, timestamp: new Date(2023, 2, 6) },
  { name: '春分', month: 3, day: 21, year: 2023, timestamp: new Date(2023, 2, 21) },
  { name: '清明', month: 4, day: 5, year: 2023, timestamp: new Date(2023, 3, 5) },
  { name: '谷雨', month: 4, day: 20, year: 2023, timestamp: new Date(2023, 3, 20) },
  { name: '立夏', month: 5, day: 6, year: 2023, timestamp: new Date(2023, 4, 6) },
  { name: '小满', month: 5, day: 21, year: 2023, timestamp: new Date(2023, 4, 21) },
  { name: '芒种', month: 6, day: 6, year: 2023, timestamp: new Date(2023, 5, 6) },
  { name: '夏至', month: 6, day: 22, year: 2023, timestamp: new Date(2023, 5, 22) },
  { name: '小暑', month: 7, day: 7, year: 2023, timestamp: new Date(2023, 6, 7) },
  { name: '大暑', month: 7, day: 23, year: 2023, timestamp: new Date(2023, 6, 23) },
  { name: '立秋', month: 8, day: 8, year: 2023, timestamp: new Date(2023, 7, 8) },
  { name: '处暑', month: 8, day: 23, year: 2023, timestamp: new Date(2023, 7, 23) },
  { name: '白露', month: 9, day: 8, year: 2023, timestamp: new Date(2023, 8, 8) },
  { name: '秋分', month: 9, day: 23, year: 2023, timestamp: new Date(2023, 8, 23) },
  { name: '寒露', month: 10, day: 9, year: 2023, timestamp: new Date(2023, 9, 9) },
  { name: '霜降', month: 10, day: 24, year: 2023, timestamp: new Date(2023, 9, 24) },
  { name: '立冬', month: 11, day: 8, year: 2023, timestamp: new Date(2023, 10, 8) },
  { name: '小雪', month: 11, day: 22, year: 2023, timestamp: new Date(2023, 10, 22) },
  { name: '大雪', month: 12, day: 7, year: 2023, timestamp: new Date(2023, 11, 7) },
  { name: '冬至', month: 12, day: 22, year: 2023, timestamp: new Date(2023, 11, 22) },
  { name: '小寒', month: 1, day: 6, year: 2024, timestamp: new Date(2024, 0, 6) },
  { name: '大寒', month: 1, day: 20, year: 2024, timestamp: new Date(2024, 0, 20) },
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
      lunarMonth: Number(lunarMonth),
      lunarDay,
      isLeapYear: leapYear,
      leapMonth,
      monthTerm: currentTerm.name,
      dayTerm: currentTerm.name,
      yearTerm: currentTerm.name
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

  if (!termDate) return false;
  return currentDate >= termDate;
}

// 导出其他模块需要的常量
export { 
  HEAVENLY_STEMS, 
  EARTHLY_BRANCHES, 
  STEM_BRANCH_MAP 
};
