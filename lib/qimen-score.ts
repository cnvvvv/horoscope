// 🧮 奇门遁甲评分算法
// Qimen Dunjia Scoring Algorithm

import {
  QimenPan, QimenCategory, FortuneScore
} from '../types/qimen';
import {
  JIU_XING_ATTR, BA_MEN_ATTR, BA_SHEN_ATTR, isLucky
} from './qimen-core';

// 🎯 评分等级
export function getScoreLevel(score: number): '大吉' | '吉' | '平' | '凶' | '大凶' {
  if (score >= 80) return '大吉';
  if (score >= 60) return '吉';
  if (score >= 40) return '平';
  if (score >= 20) return '凶';
  return '大凶';
}

// 🎨 评分颜色
export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-green-500';
  if (score >= 40) return 'text-yellow-600';
  if (score >= 20) return 'text-orange-600';
  return 'text-red-600';
}

// 📝 评分描述
export function getScoreDescription(score: number): string {
  if (score >= 80) return '运势极佳，天时地利人和，把握良机！';
  if (score >= 60) return '运势良好，条件基本具备，可以行动！';
  if (score >= 40) return '运势平平，吉凶参半，需谨慎决策！';
  if (score >= 20) return '运势不佳，条件不足，宜静待时机！';
  return '运势极差，凶多吉少，务必慎重！';
}

// 🎯 构建评分对象
export function buildFortuneScore(score: number): FortuneScore {
  return {
    score,
    level: getScoreLevel(score),
    color: getScoreColor(score),
    description: getScoreDescription(score)
  };
}

// 🧮 九星评分
export function scoreXing(xing: string): number {
  const attr = Object.values(JIU_XING_ATTR).find(a => a.description.includes(xing.substring(0, 2)));
  if (!attr) return 0;
  
  switch (attr.nature) {
    case '吉星':
      return 80;
    case '凶星':
      return -60;
    default:
      return 0;
  }
}

// 🧮 八门评分
export function scoreMen(men: string): number {
  const attr = Object.values(BA_MEN_ATTR).find(a => a.description.includes(men.substring(0, 2)));
  if (!attr) return 0;
  
  switch (attr.nature) {
    case '吉门':
      return 85;
    case '凶门':
      return -70;
    default:
      return 0;
  }
}

// 🧮 八神评分
export function scoreShen(shen: string): number {
  const attr = Object.values(BA_SHEN_ATTR).find(a => a.description.includes(shen.substring(0, 2)));
  if (!attr) return 0;
  
  switch (attr.nature) {
    case '吉神':
      return 75;
    case '凶神':
      return -65;
    default:
      return 0;
  }
}

// 🧮 宫格评分
export function scoreGong(pan: QimenPan, category: QimenCategory): {
  timing: number;
  direction: number;
  relationship: number;
  total: number;
} {
  const zhiFuGong = pan.jiuGong.find(g => g.gong === pan.zhiFu.gong);
  if (!zhiFuGong) {
    return { timing: 0, direction: 0, relationship: 0, total: 0 };
  }

  // 时机评分（九星）
  const timingScore = scoreXing(zhiFuGong.tianPan.xing);

  // 方位评分（八门）
  const directionScore = scoreMen(zhiFuGong.renPan.men);

  // 人际评分（八神）
  const relationshipScore = scoreShen(zhiFuGong.shenPan.shen);

  // 综合评分
  const totalScore = Math.round(
    (timingScore * 0.4 + directionScore * 0.3 + relationshipScore * 0.3)
  );

  return {
    timing: timingScore,
    direction: directionScore,
    relationship: relationshipScore,
    total: totalScore
  };
}

// 🧮 最佳方位推荐
export function getBestDirection(pan: QimenPan): string | undefined {
  // 找出评分最高的宫格
  let bestGong = null;
  let bestScore = -Infinity;

  for (const gong of pan.jiuGong) {
    const score = scoreMen(gong.renPan.men) + scoreShen(gong.shenPan.shen);
    if (score > bestScore) {
      bestScore = score;
      bestGong = gong;
    }
  }

  if (!bestGong) return undefined;

  // 返回方位（从宫位推导）
  const gongToDirection: Record<string, string> = {
    '乾': '西北',
    '坎': '北方',
    '艮': '东北',
    '震': '东方',
    '中': '中央',
    '巽': '东南',
    '离': '南方',
    '坤': '西南',
    '兑': '西方'
  };

  return gongToDirection[bestGong.gong];
}

// 🧮 最佳时辰推荐
export function getBestTime(pan: QimenPan): string | undefined {
  // 简化：根据值符星推荐时辰
  const zhiFuXing = pan.zhiFu.xing;
  const xingToTime: Record<string, string> = {
    '天蓬': '子时（23:00-01:00）',
    '天心': '卯时（05:00-07:00）',
    '天柱': '酉时（17:00-19:00）',
    '天任': '辰时（07:00-09:00）',
    '天英': '午时（11:00-13:00）',
    '天辅': '巳时（09:00-11:00）',
    '天冲': '寅时（03:00-05:00）',
    '天禽': '未时（13:00-15:00）',
    '天芮': '申时（15:00-17:00）'
  };

  return xingToTime[zhiFuXing] || undefined;
}
