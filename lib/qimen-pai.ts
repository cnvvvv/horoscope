// 🎯 奇门遁甲排盘算法
// Qimen Dunjia Board Layout Algorithm

import {
  QimenPan, GongInfo, JiuGong, JiuXing, BaMen, BaShen, TianGan
} from '@/types/qimen';
import {
  cycleIndex, isLucky,
  JIU_GONG_SEQUENCE, JIU_XING_SEQUENCE, BA_MEN_SEQUENCE, BA_SHEN_SEQUENCE
} from './qimen-core';

// 🧮 计算局数（简化版）
export function calculateJuNumber(year: number, month: number, day: number, hour: number): number {
  // 简化计算：根据年月日计算1-9的局数
  // 实际奇门遁甲需要根据节气和时辰精确计算
  const yearCycle = (year - 1900) % 9;
  const monthCycle = (month - 1) % 9;
  const dayCycle = (day - 1) % 9;
  const hourCycle = hour % 9;

  const juNumber = ((yearCycle + monthCycle + dayCycle + hourCycle) % 9) + 1;
  return juNumber;
}

// 🧮 判断阴遁/阳遁
export function isYinDun(year: number, month: number, day: number): boolean {
  // 简化判断：阴遁为夏至到冬至，阳遁为冬至到夏至
  // 实际需要根据节气精确判断
  const monthNumber = month;
  return monthNumber >= 6 && monthNumber <= 12;
}

// 🧮 计算值符（时干之星）
export function calculateZhiFu(hour: number, juNumber: number): { gong: JiuGong; xing: JiuXing } {
  // 简化计算：根据时辰和局数确定值符
  const hourIndex = hour % 9;
  const xingIndex = (juNumber - 1 + hourIndex) % 9;
  const xing = JIU_XING_SEQUENCE[xingIndex];
  const gongIndex = xingIndex;
  const gong = JIU_GONG_SEQUENCE[gongIndex];

  return { gong, xing };
}

// 🧮 计算值使（时支之门）
export function calculateZhiShi(hour: number, juNumber: number): { gong: JiuGong; men: BaMen } {
  // 简化计算：根据时辰和局数确定值使
  const hourIndex = hour % 8;
  const menIndex = (juNumber - 1 + hourIndex) % 8;
  const men = BA_MEN_SEQUENCE[menIndex];
  const gongIndex = menIndex;
  const gong = JIU_GONG_SEQUENCE[gongIndex];

  return { gong, men };
}

// 🎯 排布天盘九星
export function layoutTianPan(juNumber: number, isYin: boolean): Record<JiuGong, JiuXing> {
  const result: Partial<Record<JiuGong, JiuXing>> = {};
  
  // 简化排盘：根据局数和阴遁阳遁排布九星
  for (let i = 0; i < 9; i++) {
    let xingIndex: number;
    if (isYin) {
      // 阴遁：从九到一逆排
      xingIndex = (juNumber - 1 - i + 9) % 9;
    } else {
      // 阳遁：从一到九顺排
      xingIndex = (juNumber - 1 + i) % 9;
    }
    
    const gong = JIU_GONG_SEQUENCE[i];
    const xing = JIU_XING_SEQUENCE[xingIndex];
    result[gong as JiuGong] = xing;
  }

  return result as Record<JiuGong, JiuXing>;
}

// 🎯 排布人盘八门
export function layoutRenPan(juNumber: number, isYin: boolean): Record<JiuGong, BaMen> {
  const result: Partial<Record<JiuGong, BaMen>> = {};
  
  // 简化排盘：根据局数和阴遁阳遁排布八门
  for (let i = 0; i < 9; i++) {
    let menIndex: number;
    if (isYin) {
      // 阴遁：从八到一逆排
      menIndex = ((juNumber - 1) % 8 - i + 8) % 8;
    } else {
      // 阳遁：从一到八顺排
      menIndex = ((juNumber - 1) % 8 + i) % 8;
    }
    
    const gong = JIU_GONG_SEQUENCE[i];
    const men = BA_MEN_SEQUENCE[menIndex];
    result[gong as JiuGong] = men;
  }

  return result as Record<JiuGong, BaMen>;
}

// 🎯 排布神盘八神
export function layoutShenPan(juNumber: number, isYin: boolean): Record<JiuGong, BaShen> {
  const result: Partial<Record<JiuGong, BaShen>> = {};
  
  // 简化排盘：根据局数和阴遁阳遁排布八神
  for (let i = 0; i < 9; i++) {
    let shenIndex: number;
    if (isYin) {
      // 阴遁：从八到一逆排
      shenIndex = ((juNumber - 1) % 8 - i + 8) % 8;
    } else {
      // 阳遁：从一到八顺排
      shenIndex = ((juNumber - 1) % 8 + i) % 8;
    }
    
    const gong = JIU_GONG_SEQUENCE[i];
    const shen = BA_SHEN_SEQUENCE[shenIndex];
    result[gong as JiuGong] = shen;
  }

  return result as Record<JiuGong, BaShen>;
}

// 🎯 起盘（主函数）
export function paiQimenPan(
  year: number,
  month: number,
  day: number,
  hour: number,
  jieQi: string = ''
): QimenPan {
  // 计算局数
  const panJu = calculateJuNumber(year, month, day, hour);
  
  // 判断阴遁/阳遁
  const isYinDunFlag = isYinDun(year, month, day);
  
  // 计算值符值使
  const zhiFu = calculateZhiFu(hour, panJu);
  const zhiShi = calculateZhiShi(hour, panJu);
  
  // 排布天盘、人盘、神盘
  const tianPan = layoutTianPan(panJu, isYinDunFlag);
  const renPan = layoutRenPan(panJu, isYinDunFlag);
  const shenPan = layoutShenPan(panJu, isYinDunFlag);
  
  // 构建九宫信息
  const jiuGong: GongInfo[] = JIU_GONG_SEQUENCE.map((gong: JiuGong) => {
    return {
      gong,
      diPan: {
        // 简化：地盘天干根据宫位确定
        gan: getDiPanGan(gong, panJu)
      },
      tianPan: {
        xing: tianPan[gong as JiuGong],
        gan: getTianPanGan(gong, panJu, hour)
      },
      renPan: {
        men: renPan[gong as JiuGong]
      },
      shenPan: {
        shen: shenPan[gong as JiuGong]
      },
      isZhiFu: gong === zhiFu.gong,
      isZhiShi: gong === zhiShi.gong
    };
  });

  return {
    panJu,
    isYinDun: isYinDunFlag,
    zhiFu,
    zhiShi,
    jiuGong,
    year,
    month,
    day,
    hour,
    jieQi
  };
}

// 🧮 获取地盘天干（简化）
function getDiPanGan(gong: JiuGong, juNumber: number): TianGan | undefined {
  // 简化：根据宫位和局数返回天干
  const tianGanList = [
    TianGan.JIA, TianGan.YI, TianGan.BING, TianGan.DING,
    TianGan.WU, TianGan.JI, TianGan.GENG, TianGan.XIN,
    TianGan.REN, TianGan.GUI
  ];
  const gongIndex = JIU_GONG_SEQUENCE.indexOf(gong);
  const ganIndex = (juNumber - 1 + gongIndex) % 10;
  return tianGanList[ganIndex];
}

// 🧮 获取天盘天干（简化）
function getTianPanGan(gong: JiuGong, juNumber: number, hour: number): TianGan | undefined {
  // 简化：根据宫位、局数和时辰返回天干
  const tianGanList = [
    TianGan.JIA, TianGan.YI, TianGan.BING, TianGan.DING,
    TianGan.WU, TianGan.JI, TianGan.GENG, TianGan.XIN,
    TianGan.REN, TianGan.GUI
  ];
  const gongIndex = JIU_GONG_SEQUENCE.indexOf(gong);
  const ganIndex = (juNumber - 1 + gongIndex + hour) % 10;
  return tianGanList[ganIndex];
}
