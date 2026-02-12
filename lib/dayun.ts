// 📅 Da Yun Calculation
// 大运计算算法实现
// 10年大运周期，每个阶段的干支、吉凶分析

import { Bazi, BaziYear, BaziMonth, BaziDay, BaziHour } from './bazi';

// 大运阶段接口
export interface DaYunPhase {
  year: number;              // 大运开始年份
  age: number;              // 起始年龄
  ageEnd: number;            // 结束年龄
  heavenlyStem: string;     // 大运天干
  earthlyBranch: string;     // 大运地支
  hiddenHeavenlyStem: string | null;
  hiddenEarthlyBranch: string | null;
  analysis: string;           // 运势分析
  score: number;             // 运势评分（0-100）
  phaseNumber: number;        // 阶段序号（1-10）
}

// 流年接口
export interface LiuNian {
  year: number;              // 流年年份
  heavenlyStem: string;     // 流年天干
  earthlyBranch: string;     // 流年地支
  analysis: string;           // 流年分析
  score: number;             // 流年评分（0-100）
}

// 大运周期
export interface DaYunCycle {
  phases: DaYunPhase[];
  currentPhase: DaYunPhase | null;
  currentYear: LiuNian | null;
  score: number;
  analysis: string;
  suggestions: string[];
}

// 天干地支循环（从bazi.ts重新导出）
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;

// 天干地支相生相冲表（简化版）
const STEM_BRANCH_INTERACTIONS = {
  '相生': [
    '甲生乙', '乙生丙', '丙生丁', '丁生戊', '戊生己', '己生庚', '庚生辛', '辛生壬', '壬生癸', '癸生甲'
  ],
  '相克': [
    '甲克戊', '乙克己', '丙克庚', '丁克辛', '戊克壬', '己克癸', '庚克甲', '辛克乙', '壬克丙', '癸克丁'
  ]
};

// 天干地支对应关系（用于找地支的天干）
const STEM_TO_BRANCH_MAP = {
  '甲': '子', '乙': '丑', '丙': '寅', '丁': '卯', '戊': '辰', '己': '巳', '庚': '午', '辛': '未', '壬': '申', '癸': '亥'
};

// 天干相冲
const STEM_CONFLICTS: Record<string, string> = {
  '甲': '庚',
  '乙': '辛',
  '丙': '壬',
  '丁': '癸',
  '戊': '甲',
  '己': '乙',
  '庚': '丙',
  '辛': '丁',
  '壬': '戊',
  '癸': '己'
};

// 地支相冲
const BRANCH_CONFLICTS: Record<string, string> = {
  '子': '午',
  '丑': '未',
  '寅': '申',
  '卯': '酉',
  '辰': '戌',
  '巳': '亥',
  '午': '子',
  '未': '丑',
  '申': '寅',
  '酉': '卯',
  '戌': '辰',
  '亥': '巳'
};

// 🧪 计算大运阶段（10年周期）
function calculateDaYun(bazi: Bazi, startAge: number = 1, currentYear: number): DaYunCycle {
  try {
    const phases: DaYunPhase[] = [];
    
    // 1. 计算起始天干和地支
    const startStemIndex = (HEAVENLY_STEMS as unknown as string[]).indexOf(bazi.year.heavenlyStem);
    const startBranchIndex = (EARTHLY_BRANCHES as unknown as string[]).indexOf(bazi.year.earthlyBranch);
    
    // 2. 计算每个大运阶段（10个）
    for (let i = 0; i < 10; i++) {
      const age = startAge + i * 10;
      const ageEnd = age + 9;
      const year = currentYear - age;
      
      // 3. 计算大运天干（每10年顺时针推1位）
      const stemIndex = (startStemIndex + i) % 10;
      const heavenlyStem = HEAVENLY_STEMS[stemIndex];
      
      // 4. 计算大运地支（每10年顺时针推1位）
      const branchIndex = (startBranchIndex + i) % 12;
      const earthlyBranch = EARTHLY_BRANCHES[branchIndex];
      
      // 5. 获取藏干和藏支
      const hiddenHeavenlyStem = bazi.day.heavenlyStem;
      const hiddenEarthlyBranch = bazi.day.earthlyBranch;
      
      // 6. 分析大运吉凶
      const analysis = analyzeDaYunPhase(heavenlyStem, earthlyBranch, bazi);
      
      // 7. 计算大运评分（简化版）
      let score = 50; // 基础分
      const isGood = analysis.includes('吉') || analysis.includes('利') || analysis.includes('旺');
      const isBad = analysis.includes('凶') || analysis.includes('冲') || analysis.includes('克');
      
      if (isGood) score += 30;
      if (isBad) score -= 20;
      
      // 8. 确保评分范围
      score = Math.max(0, Math.min(100, score));
      
      phases.push({
        year,
        age,
        ageEnd,
        heavenlyStem,
        earthlyBranch,
        hiddenHeavenlyStem,
        hiddenEarthlyBranch,
        analysis,
        score,
        phaseNumber: i + 1
      });
    }
    
    // 9. 找出当前大运阶段
    const currentAge = currentYear - parseInt(bazi.year.heavenlyStem.replace(/\D/g, '').replace(/[^\d]/g, ''));
    const currentPhase = phases.find(phase => currentAge >= phase.age && currentAge <= phase.ageEnd) || null;
    
    // 10. 计算当前流年
    let currentYearAnalysis: LiuNian | null = null;
    if (currentPhase) {
      currentYearAnalysis = calculateLiuNian(bazi, currentYear, currentPhase);
    }
    
    // 11. 生成总体分析
    const overallAnalysis = generateDaYunAnalysis(phases, currentPhase, bazi);
    
    // 12. 生成建议
    const suggestions = generateDaYunSuggestions(phases, currentPhase, bazi);
    
    // 13. 计算总体评分
    const overallScore = calculateDaYunOverallScore(phases, currentPhase);
    
    return {
      phases,
      currentPhase,
      currentYear: currentYearAnalysis,
      score: overallScore,
      analysis: overallAnalysis,
      suggestions
    };
  } catch (error) {
    console.error('大运计算失败:', error);
    throw error;
  }
}

// 📅 计算流年
function calculateLiuNian(bazi: Bazi, year: number, daYunPhase: DaYunPhase): LiuNian {
  try {
    // 1. 计算流年天干（根据大运天干推算）
    const stemIndex = (HEAVENLY_STEMS.indexOf(daYunPhase.heavenlyStem as any) + (year - daYunPhase.year)) % 10;
    const heavenlyStem = HEAVENLY_STEMS[stemIndex];
    
    // 确保索引有效
    const validHeavenlyStem = HEAVENLY_STEMS[stemIndex] || HEAVENLY_STEMS[0];
    
    // 2. 计算流年地支
    const branchIndex = (EARTHLY_BRANCHES.indexOf(daYunPhase.earthlyBranch as any) + (year - daYunPhase.year)) % 12;
    const earthlyBranch = EARTHLY_BRANCHES[branchIndex];
    
    // 确保索引有效
    const validEarthlyBranch = EARTHLY_BRANCHES[branchIndex] || EARTHLY_BRANCHES[0];
    
    // 3. 分析流年
    const analysis = analyzeLiuNianYear(heavenlyStem, earthlyBranch, bazi);
    
    // 4. 计算流年评分
    let score = 50; // 基础分
    const isGood = analysis.includes('吉') || analysis.includes('利') || analysis.includes('顺');
    const isBad = analysis.includes('凶') || analysis.includes('冲') || analysis.includes('克');
    
    if (isGood) score += 30;
    if (isBad) score -= 20;
    score = Math.max(0, Math.min(100, score));
    
    return {
      year,
      heavenlyStem,
      earthlyBranch,
      analysis,
      score
    };
  } catch (error) {
    console.error('流年计算失败:', error);
    throw error;
  }
}

// 🔍 分析大运阶段
function analyzeDaYunPhase(heavenlyStem: string, earthlyBranch: string, bazi: Bazi): string {
  const analysis: string[] = [];
  
  // 1. 相生判断
  if (STEM_BRANCH_INTERACTIONS.相生.some(s => s.includes(heavenlyStem) && s.includes(earthlyBranch))) {
    analysis.push('天干地支相生，事业运上升');
  }
  
  // 2. 相克判断
  if (STEM_BRANCH_INTERACTIONS.相克.some(s => s.includes(heavenlyStem) && s.includes(earthlyBranch))) {
    analysis.push('天干地支相克，需要注意');
  }
  
  // 3. 天干相冲
  if (STEM_CONFLICTS[heavenlyStem] === heavenlyStem) {
    analysis.push('天干自刑，压力增大');
  }
  
  // 4. 地支相冲
  if (BRANCH_CONFLICTS[earthlyBranch] === earthlyBranch) {
    analysis.push('地支相冲，需要谨慎');
  }
  
  // 5. 判断是否为五行喜用
  // 简化版：金生水，木生火，水生木，火生土，土生金
  if (heavenlyStem === '甲' && earthlyBranch === '亥') {
    analysis.push('甲亥相合，贵人相助');
  }
  if (heavenlyStem === '己' && earthlyBranch === '子') {
    analysis.push('己子相合，贵人相助');
  }
  
  // 6. 根据日主分析
  const dayStem = bazi.day.heavenlyStem;
  
  // 简化版：同干为比肩，生我者为印，我克者为财，克我者为官
  if (dayStem === heavenlyStem) {
    analysis.push('同干比肩，竞争心强');
  }
  
  // 返回分析（取前3个）
  return analysis.slice(0, 3).join('；');
}

// 🔍 分析流年
function analyzeLiuNianYear(heavenlyStem: string, earthlyBranch: string, bazi: Bazi): string {
  const analysis: string[] = [];
  
  // 1. 岁运并临判断
  const dayStem = bazi.day.heavenlyStem;
  const monthStem = bazi.month.heavenlyStem;
  
  if (heavenlyStem === dayStem) {
    analysis.push('岁运并临，贵人相助');
  }
  
  if (earthlyBranch === bazi.day.earthlyBranch) {
    analysis.push('岁运并临，贵人相助');
  }
  
  // 2. 岁运相冲
  if (STEM_CONFLICTS[heavenlyStem] === dayStem) {
    analysis.push('岁运相冲，需要低调');
  }
  
  if (BRANCH_CONFLICTS[earthlyBranch] === bazi.day.earthlyBranch) {
    analysis.push('岁运相冲，需要低调');
  }
  
  // 3. 天干相合
  if (heavenlyStem === monthStem) {
    analysis.push('天干相合，人际关系和谐');
  }
  
  // 4. 地支相合
  if (earthlyBranch === bazi.month.earthlyBranch) {
    analysis.push('地支相合，婚姻运和谐');
  }
  
  return analysis.slice(0, 3).join('；');
}

// 📊 生成大运总体分析
function generateDaYunAnalysis(phases: DaYunPhase[], currentPhase: DaYunPhase | null, bazi: Bazi): string {
  if (!currentPhase) {
    return '无法计算当前大运阶段';
  }
  
  const analysis: string[] = [];
  
  // 1. 分析当前大运
  const age = new Date().getFullYear() - parseInt(bazi.year.heavenlyStem.replace(/\D/g, '').replace(/[^\d]/g, ''));
  const isCurrent = age >= currentPhase.age && age <= currentPhase.ageEnd;
  
  if (isCurrent) {
    if (currentPhase.score >= 70) {
      analysis.push('当前大运运势旺盛，事业财运双丰收');
    } else if (currentPhase.score >= 50) {
      analysis.push('当前大运运势平稳，稳步前进');
    } else if (currentPhase.score >= 30) {
      analysis.push('当前大运运势一般，需要谨慎');
    } else {
      analysis.push('当前大运运势不佳，建议保守');
    }
  }
  
  // 2. 分析大运趋势
  const recentPhases = phases.slice(0, 5); // 最近5个大运阶段
  const averageScore = recentPhases.reduce((sum, phase) => sum + phase.score, 0) / recentPhases.length;
  
  if (averageScore >= 70) {
    analysis.push('近期大运趋势向上，整体运势良好');
  } else if (averageScore >= 50) {
    analysis.push('近期大运趋势平稳');
  } else if (averageScore >= 30) {
    analysis.push('近期大运趋势下降');
  } else {
    analysis.push('近期大运趋势较弱');
  }
  
  // 3. 根据日主分析
  const dayStem = bazi.day.heavenlyStem;
  
  if (dayStem === '甲' || dayStem === '己') {
    analysis.push('日主为木，需要积极进取');
  } else if (dayStem === '乙' || dayStem === '庚') {
    analysis.push('日主为金，需要保持专业');
  } else if (dayStem === '丙' || dayStem === '丁') {
    analysis.push('日主为火，需要保持热情');
  } else if (dayStem === '壬' || dayStem === '癸') {
    analysis.push('日主为水，需要灵活应变');
  } else if (dayStem === '戊' || dayStem === '己') {
    analysis.push('日主为土，需要脚踏实地');
  }
  
  return analysis.slice(0, 5).join('；');
}

// 💡 生成大运建议
function generateDaYunSuggestions(phases: DaYunPhase[], currentPhase: DaYunPhase | null, bazi: Bazi): string[] {
  const suggestions: string[] = [];
  
  // 1. 通用建议
  suggestions.push('大运每10年变化一次，建议提前规划人生');
  suggestions.push('在大运转换年份，重要决策要谨慎');
  
  // 2. 根据当前大运建议
  if (currentPhase) {
    if (currentPhase.score >= 70) {
      suggestions.push('当前大运运势旺盛，适合创业投资');
      suggestions.push('可以抓住机会，扩大事业规模');
    } else if (currentPhase.score >= 50) {
      suggestions.push('当前大运运势平稳，适合稳步发展');
      suggestions.push('建议提升技能，为下个大运做准备');
    } else if (currentPhase.score >= 30) {
      suggestions.push('当前大运运势一般，建议保守行事');
      suggestions.push('避免冲动决策，多听取他人建议');
    } else {
      suggestions.push('当前大运运势不佳，建议保持低调');
      suggestions.push('重要决策请咨询贵人，避免冒险');
    }
  }
  
  // 3. 根据日主建议
  const dayStem = bazi.day.heavenlyStem;
  
  if (dayStem === '甲' || dayStem === '己') {
    suggestions.push('日主为木：建议从事木材、教育、文化相关行业');
  } else if (dayStem === '乙' || dayStem === '庚') {
    suggestions.push('日主为金：建议从事金融、管理、科技相关行业');
  } else if (dayStem === '丙' || dayStem === '丁') {
    suggestions.push('日主为火：建议从事传媒、营销、娱乐相关行业');
  } else if (dayStem === '壬' || dayStem === '癸') {
    suggestions.push('日主为水：建议从事航运、贸易、物流相关行业');
  } else if (dayStem === '戊' || dayStem === '己') {
    suggestions.push('日主为土：建议从事房地产、建筑、农业相关行业');
  }
  
  return suggestions;
}

// 📊 计算大运总体评分
function calculateDaYunOverallScore(phases: DaYunPhase[], currentPhase: DaYunPhase | null): number {
  if (!currentPhase) {
    return 50; // 默认中等
  }
  
  // 1. 计算当前大运评分权重
  const currentWeight = 0.6;
  
  // 2. 计算近期大运评分权重
  const recentPhases = phases.slice(0, 5);
  const recentWeight = 0.2;
  
  // 3. 计算远期大运评分权重
  const futurePhases = phases.slice(5);
  const futureWeight = 0.2;
  
  const currentScore = currentPhase.score * currentWeight;
  const recentScore = recentPhases.reduce((sum, phase) => sum + phase.score, 0) / recentPhases.length * recentWeight;
  const futureScore = futurePhases.length > 0 ? futurePhases.reduce((sum, phase) => sum + phase.score, 0) / futurePhases.length * futureWeight : 0;
  
  const overallScore = Math.round(currentScore + recentScore + futureScore);
  
  return Math.max(0, Math.min(100, overallScore));
}

// 导出类型和函数
export {
  calculateDaYun,
  calculateLiuNian,
  analyzeDaYunPhase,
  analyzeLiuNianYear,
  generateDaYunAnalysis,
  generateDaYunSuggestions,
  calculateDaYunOverallScore
};
