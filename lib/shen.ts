// 🌙 Shen Analysis System
// 十神分析算法实现
// 完整的十神体系：正财、偏财、正官、七杀、正印、偏印、伤官、食神、比肩、劫财

import { Bazi, BaziDay, BaziMonth, BaziYear, BaziHour } from './bazi';

// 十神类型定义
enum ShenType {
  ZHENG_CAI = '正财',           // 偏官之财星，主财源
  PIAN_CAI = '偏财',           // 副财星，非主财源
  QI_SHA = '七杀',             // 约束日主，影响事业运
  ZHENG_GUAN = '正官',         // 官运星，主事业和权力
  ZHENG_YIN = '正印',         // 正印星，主学习智慧
  PIAN_YIN = '偏印',           // 副印星，副学习智慧
  SHANG_GUAN = '伤官',         // 挫折和克制
  SHI_SHEN = '食神',           // 主智思和学习
  BI_JIAN = '比肩',           // 同类竞争
  JIE_CAI = '劫财',          // 财星被克，破财
  WU_CAI = '无财',           // 日主没有财星
  WU_GUAN = '无官',           // 日主没有官星
  WU_YIN = '无印'             // 日主没有印星
}

// 十神详细定义
export interface Shen {
  type: ShenType;
  name: string;
  element: 'METAL' | 'WOOD' | 'WATER' | 'FIRE' | 'EARTH';
  positive: boolean;           // 是否为吉神
  negative: boolean;          // 是否为凶神
  description: string;        // 十神作用描述
}

// 十神体系定义 (日主为中心）
export interface ShenSystem {
  // 十神列表
  positiveShen: Shen[];
  negativeShen: Shen[];
  
  // 事业类
  careerShen: Shen[];
  
  // 财运类
  wealthShen: Shen[];
  
  // 学业类
  learningShen: Shen[];
  
  // 感情类
  emotionShen: Shen[];
}

// 天干与五行的对应
const STEMS_TO_ELEMENTS: Record<string, 'METAL' | 'WOOD' | 'WATER' | 'FIRE' | 'EARTH'> = {
  '甲': 'WOOD',
  '乙': 'WOOD',
  '丙': 'FIRE',
  '丁': 'FIRE',
  '戊': 'EARTH',
  '己': 'EARTH',
  '庚': 'METAL',
  '辛': 'METAL',
  '壬': 'WATER',
  '癸': 'WATER'
};

// 天干名称
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 十神关系表
const SHEN_TABLE = {
  // 正财 (与日主同阴阳的财星）
  '甲': { day: '丁', month: '壬', element: 'FIRE' },
  '乙': { day: '丙', month: '壬', element: 'FIRE' },
  '丙': { day: '己', month: '辛', element: 'EARTH' },
  '丁': { day: '己', month: '辛', element: 'EARTH' },
  '戊': { day: '甲', month: '乙', element: 'WOOD' },
  '己': { day: '甲', month: '乙', element: 'WOOD' },
  '庚': { day: '乙', month: '丙', element: 'FIRE' },
  '辛': { day: '丁', month: '丙', element: 'FIRE' },
  '壬': { day: '甲', month: '戊', element: 'WOOD' },
  '癸': { day: '甲', month: '戊', element: 'WOOD' }
};

// 根据日主天干和财星天干判断是否为正财
function isZhengCai(dayStem: string, wealthStem: string): boolean {
  // 检查天干的阴阳关系
  const dayStemIndex = STEMS.indexOf(dayStem);
  const wealthStemIndex = STEMS.indexOf(wealthStem);
  
  // 1-5为阳，6-10为阴
  const dayStemYinYang = dayStemIndex < 5;
  const wealthStemYinYang = wealthStemIndex < 5;
  
  // 同阴阳为正财
  return dayStemYinYang === wealthStemYinYang;
}

// 获取财星天干 (根据日主天干）
function getWealthStem(dayStem: string): string {
  // 简化版：甲己合土，乙庚合金，丙辛合水，丁壬合火，癸合木
  const dayElement = STEMS_TO_ELEMENTS[dayStem];
  
  // 财星：我克者为财
  switch(dayElement) {
    case 'METAL':  return 'WATER';  // 金生水，水为财星
    case 'WOOD':  return 'EARTH';    // 木克土，土为财星
    case 'WATER':  return 'FIRE';     // 水克火，火为财星
    case 'FIRE':  return 'METAL';    // 火克金，金为财星
    case 'EARTH':  return 'WOOD';     // 土克木，木为财星
    default: return '';
  }
}

// 获取财星天干的具体干名
function getWealthStemName(dayStem: string): string {
  const wealthElement = getWealthStem(dayStem);
  
  // 返回该五行的第一个干名
  switch(wealthElement) {
    case 'METAL': return '庚';    // 金的代表
    case 'WOOD': return '甲';     // 木的代表
    case 'WATER': return '壬';    // 水的代表
    case 'FIRE': return '丙';     // 火的代表
    case 'EARTH': return '戊';    // 土的代表
    default: return '';
  }
}

// 获取官星天干 (根据日主天干)
function getGuanStem(dayStem: string): string {
  const dayElement = STEMS_TO_ELEMENTS[dayStem];
  
  // 官星：我克者为官
  switch(dayElement) {
    case 'METAL': return 'WATER';  // 金生水，水为官星
    case 'WOOD':  return 'EARTH';    // 木克土，土为官星
    case 'WATER':  return 'FIRE';     // 水克火，火为官星
    case 'FIRE':  return 'METAL';    // 火克金，金为官星
    case 'EARTH':  return 'WOOD';     // 土克木，木为官星
    default: return '';
  }
}

// 获取官星天干的具体干名
function getGuanStemName(dayStem: string): string {
  const guanElement = getGuanStem(dayStem);
  
  // 返回该五行的第一个干名
  switch(guanElement) {
    case 'METAL': return '庚';
    case 'WOOD': return '甲';
    case 'WATER': return '壬';
    case 'FIRE': return '丙';
    case 'EARTH': return '戊';
    default: return '';
  }
}

// 判断是否为正官
function isZhengGuan(dayStem: string, guanStem: string): boolean {
  // 检查天干的阴阳关系
  const dayStemIndex = STEMS.indexOf(dayStem);
  const guanStemIndex = STEMS.indexOf(guanStem);
  
  // 1-5为阳，6-10为阴
  const dayStemYinYang = dayStemIndex < 5;
  const guanStemYinYang = guanStemIndex < 5;
  
  // 同阴阳为正官
  return dayStemYinYang === guanStemYinYang;
}

// 判断是否为正印
function isZhengYin(dayStem: string, yinStem: string): boolean {
  // 检查天干的阴阳关系
  const dayStemIndex = STEMS.indexOf(dayStem);
  const yinStemIndex = STEMS.indexOf(yinStem);
  
  // 1-5为阳，6-10为阴
  const dayStemYinYang = dayStemIndex < 5;
  const yinStemYinYang = yinStemIndex < 5;
  
  // 同阴阳为正印
  return dayStemYinYang === yinStemYinYang;
}

// 计算日主十神 (基础版本）
function calculateDayShen(bazi: Bazi): Shen {
  try {
    // 日主天干
    const dayStem = bazi.day.heavenlyStem;
    
    // 检查月柱是否为财星
    const monthStem = bazi.month.heavenlyStem;
    const isCaiMonth = (monthStem === getWealthStemName(dayStem));
    
    // 检查月柱是否为官星
    const isGuanMonth = (monthStem === getGuanStemName(dayStem));
    
    // 检查月柱是否为印星 (生我者为印）
    const dayElement = STEMS_TO_ELEMENTS[dayStem];
    const monthElement = STEMS_TO_ELEMENTS[monthStem];
    const isYinMonth = (monthElement === 'METAL' && dayElement === 'WATER') ||
                        (monthElement === 'WOOD' && dayElement === 'FIRE') ||
                        (monthElement === 'WATER' && dayElement === 'EARTH') ||
                        (monthElement === 'FIRE' && dayElement === 'METAL') ||
                        (monthElement === 'EARTH' && dayElement === 'WOOD');
    
    // 简化版：根据月柱和日主的关系判断十神
    let shenType: ShenType = ShenType.WU_CAI;
    let shenName: string = '无财';
    let shenDescription: string = '日主未发现明显财星';
    let isPositive = false;
    let isNegative = false;
    
    // 1. 判断财星
    if (isCaiMonth) {
      shenType = isZhengCai(dayStem, monthStem) ? ShenType.ZHENG_CAI : ShenType.PIAN_CAI;
      shenName = isZhengCai(dayStem, monthStem) ? '正财' : '偏财';
      shenDescription = isZhengCai(dayStem, monthStem) 
        ? '偏官之财星，主财源，财运稳固'
        : '副财星，非主财源，财运波动';
      isPositive = isZhengCai(dayStem, monthStem);
    }
    
    // 2. 判断官星
    if (isGuanMonth) {
      shenType = isZhengGuan(dayStem, monthStem) ? ShenType.ZHENG_GUAN : ShenType.QI_SHA;
      shenName = isZhengGuan(dayStem, monthStem) ? '正官' : '七杀';
      shenDescription = isZhengGuan(dayStem, monthStem)
        ? '官运星，主事业和权力，有领导才能'
        : '约束日主，影响事业运，需要谨慎行事';
      isPositive = isZhengGuan(dayStem, monthStem);
      isNegative = isZhengGuan(dayStem, monthStem);
    }
    
    // 3. 判断印星
    if (isYinMonth) {
      shenType = isZhengYin(dayStem, monthStem) ? ShenType.ZHENG_YIN : ShenType.PIAN_YIN;
      shenName = isZhengYin(dayStem, monthStem) ? '正印' : '偏印';
      shenDescription = isZhengYin(dayStem, monthStem)
        ? '正印星，主智慧和学习，有贵人相助'
        : '副印星，副智慧，主学习但不够稳定';
      isPositive = true;
    }
    
    // 4. 判断食神 (克我者为食神）
    const dayElement2 = STEMS_TO_ELEMENTS[dayStem];
    const monthElement2 = STEMS_TO_ELEMENTS[monthStem];
    
    // 食神条件：月柱生日主
    const isShiShenMonth = (monthElement2 === 'METAL' && dayElement2 === 'WATER') ||
                         (monthElement2 === 'WOOD' && dayElement2 === 'FIRE') ||
                         (monthElement2 === 'WATER' && dayElement2 === 'EARTH') ||
                         (monthElement2 === 'FIRE' && dayElement2 === 'METAL') ||
                         (monthElement2 === 'EARTH' && dayElement2 === 'WOOD');
    
    if (isShiShenMonth) {
      shenType = ShenType.SHI_SHEN;
      shenName = '食神';
      shenDescription = '主智思和学习，思维活跃，善于表达';
      isPositive = true;
    }
    
    // 5. 判断伤官 (我克月柱)
    const isShangGuanMonth = (dayElement2 === 'WATER' && monthElement2 === 'FIRE') ||
                           (dayElement2 === 'FIRE' && monthElement2 === 'METAL') ||
                           (dayElement2 === 'METAL' && monthElement2 === 'WOOD') ||
                           (dayElement2 === 'WOOD' && monthElement2 === 'EARTH') ||
                           (dayElement2 === 'EARTH' && monthElement2 === 'WATER');
    
    if (isShangGuanMonth) {
      shenType = ShenType.SHANG_GUAN;
      shenName = '伤官';
      shenDescription = '挫折和克制，需要控制情绪，避免冲动';
      isPositive = true;
      isNegative = true;
    }
    
    // 6. 判断比肩 (同类)
    const isBiJianMonth = (dayStem === monthStem);
    
    if (isBiJianMonth) {
      shenType = ShenType.BI_JIAN;
      shenName = '比肩';
      shenDescription = '同类竞争，有竞争心，但也善于合作';
      isPositive = true;
    }
    
    // 7. 判断劫财 (财星克我)
    const isJieCaiMonth = (monthElement2 === 'METAL' && dayElement2 === 'WOOD') ||
                           (monthElement2 === 'WOOD' && dayElement2 === 'EARTH') ||
                           (monthElement2 === 'EARTH' && dayElement2 === 'WATER') ||
                           (monthElement2 === 'WATER' && dayElement2 === 'FIRE') ||
                           (monthElement2 === 'FIRE' && dayElement2 === 'METAL');
    
    if (isJieCaiMonth) {
      shenType = ShenType.JIE_CAI;
      shenName = '劫财';
      shenDescription = '财星被克，破财，需要谨慎理财';
      isPositive = false;
      isNegative = true;
    }
    
    // 8. 如果都没匹配，返回无财
    if (shenType === ShenType.WU_CAI) {
      shenName = '无财';
      shenDescription = '日主未发现明显财星，财运平缓';
    }
    
    // 获取五行
    const element = STEMS_TO_ELEMENTS[dayStem];
    
    const shen: Shen = {
      type: shenType,
      name: shenName,
      element: element,
      positive: isPositive,
      negative: isNegative,
      description: shenDescription
    };
    
    return shen;
  } catch (error) {
    console.error('十神计算失败:', error);
    throw error;
  }
}

// 计算完整十神体系
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

// 计算完整的十神体系
function calculateShen(bazi: Bazi): ShenAnalysis {
  try {
    const dayShen = calculateDayShen(bazi);
    
    // 简化版：月柱十神和时柱十神
    // 实际上需要根据年柱和时柱进行更复杂的计算
    
    const monthShen: Shen | null = null; // 简化版暂不计算
    const hourShen: Shen | null = null;   // 简化版暂不计算
    const yearShen: Shen | null = null;   // 简化版暂不计算
    
    // 统计吉神和凶神
    let positiveCount = 0;
    let negativeCount = 0;
    
    const allShens: Shen[] = [dayShen];
    if (monthShen) allShens.push(monthShen);
    if (hourShen) allShens.push(hourShen);
    if (yearShen) allShens.push(yearShen);
    
    allShens.forEach(shen => {
      if (shen.positive) positiveCount++;
      if (shen.negative) negativeCount++;
    });
    
    // 生成建议
    const suggestions: string[] = [];
    
    // 财运建议
    if (dayShen.type === ShenType.ZHENG_CAI) {
      suggestions.push('正财在命，财运稳定，适合保守理财');
    } else if (dayShen.type === ShenType.PIAN_CAI) {
      suggestions.push('偏财在命，财运波动，适合积极投资');
    }
    
    // 事业建议
    if (dayShen.type === ShenType.ZHENG_GUAN) {
      suggestions.push('正官在命，事业运平稳，适合管理层职位');
    } else if (dayShen.type === ShenType.QI_SHA) {
      suggestions.push('七杀在命，事业运有波动，适合自由职业');
    }
    
    // 学业建议
    if (dayShen.type === ShenType.SHI_SHEN) {
      suggestions.push('食神在命，思维活跃，适合学习和创造');
    }
    
    // 性格建议
    if (dayShen.type === ShenType.SHANG_GUAN) {
      suggestions.push('伤官在命，需要控制情绪，避免冲动决策');
    }
    
    // 竞争建议
    if (dayShen.type === ShenType.BI_JIAN) {
      suggestions.push('比肩在命，善于合作但也可能竞争');
    }
    
    // 风险建议
    if (dayShen.type === ShenType.JIE_CAI) {
      suggestions.push('劫财在命，破财风险，需要谨慎理财');
    }
    
    const analysis: ShenAnalysis = {
      dayShen,
      monthShen,
      hourShen,
      yearShen,
      shenCount: {
        positive: positiveCount,
        negative: negativeCount,
        neutral: 0
      },
      suggestions
    };
    
    return analysis;
  } catch (error) {
    console.error('十神分析失败:', error);
    throw error;
  }
}

// 导出类型和函数
export {
  ShenType,
  Shen,
  ShenSystem,
  ShenAnalysis,
  calculateShen
};
