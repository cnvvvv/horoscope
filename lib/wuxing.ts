// 📊 Wu Xing Analysis
// 五行分析算法实现
// 金、木、水、火、土的强弱分析和平衡度计算

import { Bazi, BaziYear, BaziMonth, BaziDay, BaziHour } from './bazi';

// 五行类型定义
export enum WuXing {
  METAL = '金',
  WOOD = '木',
  WATER = '水',
  FIRE = '火',
  EARTH = '土'
}

// 五行相生相冲关系
export const WU_XING_INTERACTIONS = {
  '金生水': true,
  '水生木': true,
  '木生火': true,
  '火生土': true,
  '土生金': true,
  '水克火': true,
  '火克金': true,
  '金克木': true,
  '木克土': true,
  '土克水': true
};

// 五行生克相冲表
const WU_XING_TABLE = {
  '金': {
    '生': ['水'],
    '克': ['木'],
    '被生': ['土'],
    '被克': ['火']
  },
  '木': {
    '生': ['火'],
    '克': ['土'],
    '被生': ['水'],
    '被克': ['金']
  },
  '水': {
    '生': ['木'],
    '克': ['火'],
    '被生': ['金'],
    '被克': ['土']
  },
  '火': {
    '生': ['土'],
    '克': ['金'],
    '被生': ['木'],
    '被克': ['水']
  },
  '土': {
    '生': ['金'],
    '克': ['水'],
    '被生': ['火'],
    '被克': ['木']
  }
};

// 五行强弱评分
interface WuXingScore {
  element: WuXing;
  count: number;           // 数量
  strength: number;        // 强度评分（0-10）
  balance: string;         // 平衡度（强/中/弱）
  hasElement: boolean;     // 是否有此五行
}

// 五行分析结果
export interface WuXingAnalysis {
  scores: {
    metal: WuXingScore;
    wood: WuXingScore;
    water: WuXingScore;
    fire: WuXingScore;
    earth: WuXingScore;
  };
  strongElements: string[];     // 强势五行
  weakElements: string[];      // 弱势五行
  missingElements: string[];   // 缺失五行
  dominantElement: string;     // 主导五行
  balanceLevel: string;       // 整体平衡度（失衡/平衡/和谐）
  interactions: {
    generated: string[];       // 相生
    克制: string[];          // 相克
    冲克: string[];          // 冲克
    三会: string[];          // 三会
    三害: string[];          // 三害
    六合: string[];          // 六合
  };
  suggestions: string[];        // 建议
  overallScore: number;       // 总体评分（0-100）
}

// 🧪 五行数量统计
function countWuXing(bazi: Bazi): Map<WuXing, number> {
  const counts = new Map<WuXing, number>();

  // 初始化计数
  counts.set(WuXing.METAL, 0);
  counts.set(WuXing.WOOD, 0);
  counts.set(WuXing.WATER, 0);
  counts.set(WuXing.FIRE, 0);
  counts.set(WuXing.EARTH, 0);

  // 统计天干
  [bazi.year, bazi.month, bazi.day, bazi.hour].forEach(pillar => {
    counts.set(pillar.heavenlyStem as WuXing, (counts.get(pillar.heavenlyStem as WuXing) || 0) + 1);
  });

  // 统计地支
  [bazi.year, bazi.month, bazi.day, bazi.hour].forEach(pillar => {
    counts.set(pillar.earthlyBranch as WuXing, (counts.get(pillar.earthlyBranch as WuXing) || 0) + 1);
  });

  // 统计藏干
  [bazi.year.hiddenHeavenlyStem, bazi.month.hiddenHeavenlyStem, 
   bazi.day.hiddenHeavenlyStem, bazi.hour.hiddenHeavenlyStem].forEach(stem => {
    if (stem) {
      counts.set(stem as WuXing, (counts.get(stem as WuXing) || 0) + 1);
    }
  });

  return counts;
}

// 📊 计算五行强度
function calculateStrength(count: number): number {
  // 简化评分：1个元素 = 2分
  // 0个元素 = 0分，1个 = 2分，2个 = 4分，3个 = 6分，4个 = 8分，5个 = 10分
  
  const baseScore = count * 2;
  
  // 调整评分（考虑得力/失力）
  // 实际算法中，天干的权重和地支的权重不同
  // 这里使用简化版：得力+1，失力-1
  
  return Math.min(baseScore, 10);
}

// 📊 判断平衡度
function getBalanceLevel(strength: number): string {
  if (strength >= 8) return 'strong';       // 强
  if (strength >= 5) return 'balanced';     // 平衡
  return 'weak';                               // 弱
}

// 📊 分析五行关系
function analyzeInteractions(bazi: Bazi): {
  generated: string[];
  克制: string[];
  冲克: string[];
  三会: string[];
  三害: string[];
  六合: string[]
} {
  const pillars = [bazi.year, bazi.month, bazi.day, bazi.hour];

  return {
    generated: [] as string[],
    克制: [] as string[],
    冲克: [] as string[],
    三会: [] as string[],
    三害: [] as string[],
    六合: [] as string[]
  };

  // 检查所有柱之间的关系
  for (let i = 0; i < pillars.length; i++) {
    for (let j = i + 1; j < pillars.length; j++) {
      const pillar1 = pillars[i];
      const pillar2 = pillars[j];

      // 相生关系
      if (WU_XING_TABLE[pillar1.heavenlyStem]?.生.includes(pillar2.heavenlyStem)) {
        interactions.generated.push(`年柱(${pillar1.heavenlyStem})生月柱(${pillar2.heavenlyStem})`);
      }
      
      if (WU_XING_TABLE[pillar1.earthlyBranch]?.生.includes(pillar2.earthlyBranch)) {
        interactions.generated.push(`年支(${pillar1.earthlyBranch})生月支(${pillar2.earthlyBranch})`);
      }

      // 相克关系
      if (WU_XING_TABLE[pillar1.heavenlyStem]?.克.includes(pillar2.heavenlyStem)) {
        interactions.克制.push(`年干(${pillar1.heavenlyStem})克月干(${pillar2.heavenlyStem})`);
      }
      
      if (WU_XING_TABLE[pillar1.earthlyBranch]?.克.includes(pillar2.earthlyBranch)) {
        interactions.克制.push(`年支(${pillar1.earthlyBranch})克月支(${pillar2.earthlyBranch})`);
      }

      // 冲克关系（简化版）
      if ((['子', '午']).includes(pillar1.earthlyBranch) && 
          (['子', '午']).includes(pillar2.earthlyBranch)) {
        interactions.冲克.push(`年支(${pillar1.earthlyBranch})冲月支(${pillar2.earthlyBranch})`);
      }
      
      if ((['丑', '未']).includes(pillar1.earthlyBranch) && 
          (['丑', '未']).includes(pillar2.earthlyBranch)) {
        interactions.冲克.push(`年支(${pillar1.earthlyBranch})冲月支(${pillar2.earthlyBranch})`);
      }
      
      if ((['寅', '申']).includes(pillar1.earthlyBranch) && 
          (['寅', '申']).includes(pillar2.earthlyBranch)) {
        interactions.冲克.push(`年支(${pillar1.earthlyBranch})冲月支(${pillar2.earthlyBranch})`);
      }
      
      if ((['卯', '酉']).includes(pillar1.earthlyBranch) && 
          (['卯', '酉']).includes(pillar2.earthlyBranch)) {
        interactions.冲克.push(`年支(${pillar1.earthlyBranch})冲月支(${pillar2.earthlyBranch})`);
      }
      
      if ((['辰', '戌']).includes(pillar1.earthlyBranch) && 
          (['辰', '戌']).includes(pillar2.earthlyBranch)) {
        interactions.冲克.push(`年支(${pillar1.earthlyBranch})冲月支(${pillar2.earthlyBranch})`);
      }

      if ((['巳', '亥']).includes(pillar1.earthlyBranch) && 
          (['巳', '亥']).includes(pillar2.earthlyBranch)) {
        interactions.冲克.push(`年支(${pillar1.earthlyBranch})冲月支(${pillar2.earthlyBranch})`);
      }
    }
  }

  return interactions;
}

// 📊 生成建议
function generateSuggestions(analysis: WuXingAnalysis): string[] {
  const suggestions: string[] = [];

  // 检查缺失五行
  if (analysis.scores.metal.count === 0) {
    suggestions.push('五行缺金：建议佩戴金属饰品或穿白色衣服补金');
  }
  if (analysis.scores.wood.count === 0) {
    suggestions.push('五行缺木：建议养植绿色植物或穿青色衣服补木');
  }
  if (analysis.scores.water.count === 0) {
    suggestions.push('五行缺水：建议多喝水或穿黑色衣服补水');
  }
  if (analysis.scores.fire.count === 0) {
    suggestions.push('五行缺火：建议吃辣食或穿红色衣服补火');
  }
  if (analysis.scores.earth.count === 0) {
    suggestions.push('五行缺土：建议接触大地或穿黄色衣服补土');
  }

  // 检查平衡度
  if (analysis.balanceLevel === 'weak') {
    suggestions.push('五行较弱：建议多参加社交活动增强运势');
  } else if (analysis.balanceLevel === 'strong') {
    suggestions.push('五行过旺：建议保持谦虚，避免冲动');
  }

  // 检查主导五行
  if (analysis.dominantElement) {
    suggestions.push(`主导五行为${analysis.dominantElement}：建议从事与该五行相关的职业`);
  }

  // 检查相克关系
  if (analysis.interactions.克制.length > 2) {
    suggestions.push('相克较多：建议低调行事，避免冲突');
  }

  return suggestions;
}

// 📊 完整五行分析
export function analyzeWuXing(bazi: Bazi): WuXingAnalysis {
  try {
    // 1. 统计五行数量
    const counts = countWuXing(bazi);

    // 2. 计算每个五行的强度
    const scores: Record<string, WuXingScore> = {};
    const elementList: WuXing[] = [WuXing.METAL, WuXing.WOOD, WuXing.WATER, WuXing.FIRE, WuXing.EARTH];

    elementList.forEach(element => {
      const count = counts.get(element) || 0;
      const strength = calculateStrength(count);
      const balance = getBalanceLevel(strength);
      const hasElement = count > 0;

      scores[element] = {
        element,
        count,
        strength,
        balance,
        hasElement
      };
    });

    // 3. 找出强势五行和弱势五行
    const strongElements: string[] = [];
    const weakElements: string[] = [];
    const missingElements: string[] = [];

    elementList.forEach(element => {
      const score = scores[element];
      if (score.strength >= 6) {
        strongElements.push(element);
      } else if (score.strength <= 3) {
        weakElements.push(element);
      }
      if (!score.hasElement) {
        missingElements.push(element);
      }
    });

    // 4. 确定主导五行
    let dominantElement: string = '';
    if (strongElements.length > 0) {
      dominantElement = strongElements[0]; // 简化：取第一个强势五行
    }

    // 5. 分析五行关系
    const interactions = analyzeInteractions(bazi);

    // 6. 生成建议
    const suggestions = generateSuggestions({
      scores: scores as any,
      strongElements,
      weakElements,
      missingElements,
      dominantElement,
      balanceLevel: '',
      interactions,
      suggestions: []
    } as WuXingAnalysis);

    // 7. 计算总体评分
    const elementCount = elementList.filter(el => 
      scores[el].hasElement
    ).length;

    const balanceScore = (5 - Math.abs(elementCount - 2.5)) * 20; // 2-5个五行，平衡度为100-0
    const strengthScore = scores[dominantElement || '金'].strength * 8; // 强度评分

    const overallScore = Math.min(Math.round(balanceScore + strengthScore), 100);

    return {
      scores: scores as any,
      strongElements,
      weakElements,
      missingElements,
      dominantElement,
      balanceLevel: overallScore >= 70 ? 'balanced' : (overallScore >= 40 ? 'weak' : 'unbalanced'),
      interactions,
      suggestions,
      overallScore
    };
  } catch (error) {
    console.error('五行分析失败:', error);
    throw error;
  }
}

// 导出类型和函数
export type {
  WuXing,
  WuXingAnalysis,
  WuXingScore,
  WU_XING_INTERACTIONS
};

export {
  WuXing,
  WuXingAnalysis,
  WuXingScore,
  WU_XING_INTERACTIONS,
  analyzeWuXing
};
