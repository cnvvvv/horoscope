// 🎯 奇门遁甲规则引擎
// Qimen Dunjia Rules Engine

import {
  QimenCategory, QimenPan, Rule, Ruleset, RuleCondition, YongShen,
  JiuXing, BaMen, BaShen, JiuGong
} from '../types/qimen';
import { JIU_XING_ATTR, BA_MEN_ATTR, BA_SHEN_ATTR, isLucky } from './qimen-core';

// 📋 求财规则库
export const WEALTH_RULESET: Ruleset = {
  category: QimenCategory.WEALTH,
  yongShen: ['生门', '值符', '戊', '庚'],
  rules: [
    {
      id: 'wealth_001',
      category: QimenCategory.WEALTH,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '生门' }
      ],
      result: '生门落宫为求财用神，当前利于求财',
      score: 80,
      priority: 1
    },
    {
      id: 'wealth_002',
      category: QimenCategory.WEALTH,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '死门' }
      ],
      result: '死门落宫，财气死绝，不宜求财',
      score: -80,
      priority: 1
    },
    {
      id: 'wealth_003',
      category: QimenCategory.WEALTH,
      conditions: [
        { type: 'xing_gong', operator: 'equals', value: '天心' }
      ],
      result: '天心星临宫，利于策划和谋划财运',
      score: 70,
      priority: 2
    },
    {
      id: 'wealth_004',
      category: QimenCategory.WEALTH,
      conditions: [
        { type: 'shen_gong', operator: 'equals', value: '值符' }
      ],
      result: '值符临宫，有贵人相助，财运亨通',
      score: 90,
      priority: 1
    },
    {
      id: 'wealth_005',
      category: QimenCategory.WEALTH,
      conditions: [
        { type: 'shen_gong', operator: 'equals', value: '白虎' }
      ],
      result: '白虎临宫，有破财风险，需谨慎投资',
      score: -70,
      priority: 2
    }
  ]
};

// 📋 事业规则库
export const CAREER_RULESET: Ruleset = {
  category: QimenCategory.CAREER,
  yongShen: ['开门', '值符', '天辅'],
  rules: [
    {
      id: 'career_001',
      category: QimenCategory.CAREER,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '开门' }
      ],
      result: '开门临宫，事业开启，利于求职和升职',
      score: 85,
      priority: 1
    },
    {
      id: 'career_002',
      category: QimenCategory.CAREER,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '杜门' }
      ],
      result: '杜门临宫，事业受阻，宜静待时机',
      score: -60,
      priority: 2
    },
    {
      id: 'career_003',
      category: QimenCategory.CAREER,
      conditions: [
        { type: 'xing_gong', operator: 'equals', value: '天辅' }
      ],
      result: '天辅星临宫，文运昌盛，利于考试和学习',
      score: 75,
      priority: 2
    },
    {
      id: 'career_004',
      category: QimenCategory.CAREER,
      conditions: [
        { type: 'shen_gong', operator: 'equals', value: '值符' }
      ],
      result: '值符临宫，有贵人提携，事业顺利',
      score: 90,
      priority: 1
    }
  ]
};

// 📋 感情规则库
export const LOVE_RULESET: Ruleset = {
  category: QimenCategory.LOVE,
  yongShen: ['六合', '生门', '天辅'],
  rules: [
    {
      id: 'love_001',
      category: QimenCategory.LOVE,
      conditions: [
        { type: 'shen_gong', operator: 'equals', value: '六合' }
      ],
      result: '六合临宫，感情和谐，利于婚恋和桃花',
      score: 85,
      priority: 1
    },
    {
      id: 'love_002',
      category: QimenCategory.LOVE,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '死门' }
      ],
      result: '死门临宫，感情死气，不利婚恋',
      score: -70,
      priority: 2
    },
    {
      id: 'love_003',
      category: QimenCategory.LOVE,
      conditions: [
        { type: 'xing_gong', operator: 'equals', value: '天辅' }
      ],
      result: '天辅星临宫，文采风流，魅力四射',
      score: 70,
      priority: 2
    },
    {
      id: 'love_004',
      category: QimenCategory.LOVE,
      conditions: [
        { type: 'shen_gong', operator: 'equals', value: '太阴' }
      ],
      result: '太阴临宫，感情隐秘，适合暗恋和地下情',
      score: 60,
      priority: 2
    }
  ]
};

// 📋 寻人寻物规则库
export const LOST_RULESET: Ruleset = {
  category: QimenCategory.LOST,
  yongShen: ['生门', '值符', '天心'],
  rules: [
    {
      id: 'lost_001',
      category: QimenCategory.LOST,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '生门' }
      ],
      result: '生门临宫，万物有生机，有望找回',
      score: 70,
      priority: 1
    },
    {
      id: 'lost_002',
      category: QimenCategory.LOST,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '死门' }
      ],
      result: '死门临宫，生机已绝，找回困难',
      score: -80,
      priority: 1
    },
    {
      id: 'lost_003',
      category: QimenCategory.LOST,
      conditions: [
        { type: 'xing_gong', operator: 'equals', value: '天心' }
      ],
      result: '天心星临宫，利于寻物和找人',
      score: 75,
      priority: 2
    }
  ]
};

// 📋 出行规则库
export const TRAVEL_RULESET: Ruleset = {
  category: QimenCategory.TRAVEL,
  yongShen: ['开门', '值符', '天任'],
  rules: [
    {
      id: 'travel_001',
      category: QimenCategory.TRAVEL,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '开门' }
      ],
      result: '开门临宫，出行顺利，一路平安',
      score: 80,
      priority: 1
    },
    {
      id: 'travel_002',
      category: QimenCategory.TRAVEL,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '杜门' }
      ],
      result: '杜门临宫，出行受阻，不宜远行',
      score: -70,
      priority: 1
    },
    {
      id: 'travel_003',
      category: QimenCategory.TRAVEL,
      conditions: [
        { type: 'xing_gong', operator: 'equals', value: '天任' }
      ],
      result: '天任星临宫，出行吉利，利于旅游',
      score: 75,
      priority: 2
    },
    {
      id: 'travel_004',
      category: QimenCategory.TRAVEL,
      conditions: [
        { type: 'shen_gong', operator: 'equals', value: '白虎' }
      ],
      result: '白虎临宫，出行有险，需小心谨慎',
      score: -60,
      priority: 2
    }
  ]
};

// 📋 健康规则库
export const HEALTH_RULESET: Ruleset = {
  category: QimenCategory.HEALTH,
  yongShen: ['天心', '天辅', '生门'],
  rules: [
    {
      id: 'health_001',
      category: QimenCategory.HEALTH,
      conditions: [
        { type: 'xing_gong', operator: 'equals', value: '天心' }
      ],
      result: '天心星临宫，利于医疗和恢复健康',
      score: 85,
      priority: 1
    },
    {
      id: 'health_002',
      category: QimenCategory.HEALTH,
      conditions: [
        { type: 'xing_gong', operator: 'equals', value: '天芮' }
      ],
      result: '天芮星临宫，疾病星现，需注意健康',
      score: -70,
      priority: 1
    },
    {
      id: 'health_003',
      category: QimenCategory.HEALTH,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '生门' }
      ],
      result: '生门临宫，生机勃勃，利于养生',
      score: 75,
      priority: 2
    },
    {
      id: 'health_004',
      category: QimenCategory.HEALTH,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '死门' }
      ],
      result: '死门临宫，健康欠佳，需注意身体',
      score: -60,
      priority: 2
    }
  ]
};

// 📋 官司规则库
export const LAWSUIT_RULESET: Ruleset = {
  category: QimenCategory.LAWSUIT,
  yongShen: ['开门', '值符', '天心'],
  rules: [
    {
      id: 'lawsuit_001',
      category: QimenCategory.LAWSUIT,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '开门' }
      ],
      result: '开门临宫，官司有望胜诉',
      score: 80,
      priority: 1
    },
    {
      id: 'lawsuit_002',
      category: QimenCategory.LAWSUIT,
      conditions: [
        { type: 'men_gong', operator: 'equals', value: '杜门' }
      ],
      result: '杜门临宫，官司受阻，宜和解',
      score: -60,
      priority: 2
    },
    {
      id: 'lawsuit_003',
      category: QimenCategory.LAWSUIT,
      conditions: [
        { type: 'shen_gong', operator: 'equals', value: '白虎' }
      ],
      result: '白虎临宫，官司凶险，需谨慎应对',
      score: -70,
      priority: 1
    },
    {
      id: 'lawsuit_004',
      category: QimenCategory.LAWSUIT,
      conditions: [
        { type: 'xing_gong', operator: 'equals', value: '天心' }
      ],
      result: '天心星临宫，利于官司和维权',
      score: 75,
      priority: 2
    }
  ]
};

// 📊 获取规则库
export function getRuleset(category: QimenCategory): Ruleset {
  switch (category) {
    case QimenCategory.WEALTH:
      return WEALTH_RULESET;
    case QimenCategory.CAREER:
      return CAREER_RULESET;
    case QimenCategory.LOVE:
      return LOVE_RULESET;
    case QimenCategory.LOST:
      return LOST_RULESET;
    case QimenCategory.TRAVEL:
      return TRAVEL_RULESET;
    case QimenCategory.HEALTH:
      return HEALTH_RULESET;
    case QimenCategory.LAWSUIT:
      return LAWSUIT_RULESET;
    default:
      return WEALTH_RULESET;
  }
}

// 🧮 匹配规则条件
export function matchCondition(
  condition: RuleCondition,
  pan: QimenPan
): boolean {
  const gong = pan.zhiFu.gong;
  const gongInfo = pan.jiuGong.find(g => g.gong === gong);
  if (!gongInfo) return false;

  switch (condition.type) {
    case 'men_gong':
      return gongInfo.renPan.men === condition.value;
    case 'xing_gong':
      return gongInfo.tianPan.xing === condition.value;
    case 'shen_gong':
      return gongInfo.shenPan.shen === condition.value;
    case 'gan_xing':
      return gongInfo.tianPan.gan === condition.value;
    case 'gan_men':
      return gongInfo.diPan.gan === condition.value;
    default:
      return false;
  }
}

// 🧮 匹配规则
export function matchRules(pan: QimenPan, category: QimenCategory): Rule[] {
  const ruleset = getRuleset(category);
  const matchedRules: Rule[] = [];

  for (const rule of ruleset.rules) {
    let allMatched = true;
    for (const condition of rule.conditions) {
      if (!matchCondition(condition, pan)) {
        allMatched = false;
        break;
      }
    }
    if (allMatched) {
      matchedRules.push(rule);
    }
  }

  // 按优先级排序
  return matchedRules.sort((a, b) => a.priority - b.priority);
}

// 🎯 计算吉凶评分
export function calculateScore(pan: QimenPan, category: QimenCategory): {
  timing: number;
  direction: number;
  relationship: number;
  total: number;
} {
  const rules = matchRules(pan, category);
  
  // 计算各项评分
  let timingScore = 0;
  let directionScore = 0;
  let relationshipScore = 0;

  for (const rule of rules) {
    // 时机评分（基于九星）
    if (rule.conditions.some(c => c.type === 'xing_gong')) {
      timingScore += rule.score;
    }
    
    // 方位评分（基于八门）
    if (rule.conditions.some(c => c.type === 'men_gong')) {
      directionScore += rule.score;
    }
    
    // 人际评分（基于八神）
    if (rule.conditions.some(c => c.type === 'shen_gong')) {
      relationshipScore += rule.score;
    }
  }

  // 归一化到-100到100之间
  timingScore = Math.max(-100, Math.min(100, timingScore));
  directionScore = Math.max(-100, Math.min(100, directionScore));
  relationshipScore = Math.max(-100, Math.min(100, relationshipScore));

  // 综合评分（加权平均）
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

// 🎯 获取用神
export function getYongShen(pan: QimenPan, category: QimenCategory): YongShen {
  const ruleset = getRuleset(category);
  
  return {
    name: category,
    description: `${category}用神，参考${ruleset.yongShen.join('、')}`,
    category,
    positions: ruleset.yongShen as any[]
  };
}
