// 📝 奇门遁甲文案生成
// Qimen Dunjia Text Generation

import {
  QimenCategory, QimenPan, QimenAnalysis
} from '../types/qimen';
import {
  getScoreLevel, getBestDirection, getBestTime
} from './qimen-score';
import { matchRules, getYongShen } from './qimen-rules-engine';

// 📋 文案模板
const TEXT_TEMPLATES: Record<QimenCategory, any> = {
  [QimenCategory.WEALTH]: {
    title: '求财运势分析',
    timing: '时机分析：{timing_score}分，{timing_desc}',
    self: '自身状态：{self_score}分，{self_desc}',
    environment: '环境分析：{env_score}分，{env_desc}',
    action: '行动指南：{action_desc}',
    advice: {
      大吉: '财运极佳，天时地利人和，把握良机，大胆投资！',
      吉: '财运良好，条件基本具备，可以适当投资！',
      平: '财运平平，吉凶参半，需谨慎决策，小额尝试！',
      凶: '财运不佳，条件不足，宜静待时机，不宜投资！',
      大凶: '财运极差，凶多吉少，务必慎重，远离风险！'
    }
  },
  [QimenCategory.CAREER]: {
    title: '事业运势分析',
    timing: '时机分析：{timing_score}分，{timing_desc}',
    self: '自身状态：{self_score}分，{self_desc}',
    environment: '环境分析：{env_score}分，{env_desc}',
    action: '行动指南：{action_desc}',
    advice: {
      大吉: '事业极佳，贵人相助，把握机会，勇往直前！',
      吉: '事业良好，条件具备，可以积极行动！',
      平: '事业平平，吉凶参半，需谨慎决策，稳扎稳打！',
      凶: '事业不佳，条件不足，宜静待时机，不宜冒险！',
      大凶: '事业极差，凶多吉少，务必慎重，等待转机！'
    }
  },
  [QimenCategory.LOVE]: {
    title: '感情运势分析',
    timing: '时机分析：{timing_score}分，{timing_desc}',
    self: '自身状态：{self_score}分，{self_desc}',
    environment: '环境分析：{env_score}分，{env_desc}',
    action: '行动指南：{action_desc}',
    advice: {
      大吉: '感情极佳，桃花旺盛，把握良机，勇敢表白！',
      吉: '感情良好，条件具备，可以积极追求！',
      平: '感情平平，吉凶参半，需谨慎交往，慢慢培养！',
      凶: '感情不佳，条件不足，宜静待时机，不宜强求！',
      大凶: '感情极差，凶多吉少，务必慎重，保持距离！'
    }
  },
  [QimenCategory.LOST]: {
    title: '寻人寻物分析',
    timing: '时机分析：{timing_score}分，{timing_desc}',
    self: '自身状态：{self_score}分，{self_desc}',
    environment: '环境分析：{env_score}分，{env_desc}',
    action: '行动指南：{action_desc}',
    advice: {
      大吉: '有望找回，生机勃勃，立即行动，多方寻找！',
      吉: '有希望找回，条件具备，积极寻找，不要放弃！',
      平: '能否找回不确定，需耐心寻找，扩大范围！',
      凶: '找回困难，条件不足，宜做好心理准备！',
      大凶: '找回希望渺茫，宜做好最坏打算！'
    }
  },
  [QimenCategory.TRAVEL]: {
    title: '出行运势分析',
    timing: '时机分析：{timing_score}分，{timing_desc}',
    self: '自身状态：{self_score}分，{self_desc}',
    environment: '环境分析：{env_score}分，{env_desc}',
    action: '行动指南：{action_desc}',
    advice: {
      大吉: '出行大吉，一路平安，把握良机，尽情享受！',
      吉: '出行良好，条件具备，可以放心出行！',
      平: '出行平平，需谨慎小心，做好安全措施！',
      凶: '出行不利，条件不足，宜推迟行程！',
      大凶: '出行极差，凶多吉少，务必慎重，取消行程！'
    }
  },
  [QimenCategory.HEALTH]: {
    title: '健康运势分析',
    timing: '时机分析：{timing_score}分，{timing_desc}',
    self: '自身状态：{self_score}分，{self_desc}',
    environment: '环境分析：{env_score}分，{env_desc}',
    action: '行动指南：{action_desc}',
    advice: {
      大吉: '健康极佳，精神饱满，保持良好生活习惯！',
      吉: '健康良好，注意保养，适度锻炼！',
      平: '健康一般，需注意饮食和作息，定期体检！',
      凶: '健康欠佳，需注意身体，及时就医！',
      大凶: '健康极差，务必重视，尽快就医，好好休养！'
    }
  },
  [QimenCategory.LAWSUIT]: {
    title: '官司运势分析',
    timing: '时机分析：{timing_score}分，{timing_desc}',
    self: '自身状态：{self_score}分，{self_desc}',
    environment: '环境分析：{env_score}分，{env_desc}',
    action: '行动指南：{action_desc}',
    advice: {
      大吉: '官司大吉，胜诉在望，把握良机，坚定立场！',
      吉: '官司良好，条件具备，可以积极应诉！',
      平: '官司一般，吉凶参半，需谨慎应对，准备充分！',
      凶: '官司不利，条件不足，宜考虑和解！',
      大凶: '官司极差，凶多吉少，务必慎重，寻求专业帮助！'
    }
  }
};

// 🧮 生成时机分析
export function generateTimingAnalysis(scores: any, pan: QimenPan): string {
  const { timing } = scores;
  const zhiFuGong = pan.jiuGong.find(g => g.gong === pan.zhiFu.gong);
  if (!zhiFuGong) return '时机分析：数据不完整';

  const xing = zhiFuGong.tianPan.xing;
  const xingDesc = xing.includes('吉') ? '吉星临宫，时机有利' : '凶星临宫，时机不利';

  return `时机分析：${timing}分，天盘${xing}${xingDesc}`;
}

// 🧮 生成自身状态分析
export function generateSelfAnalysis(scores: any, pan: QimenPan): string {
  const { relationship } = scores;
  const zhiFuGong = pan.jiuGong.find(g => g.gong === pan.zhiFu.gong);
  if (!zhiFuGong) return '自身状态：数据不完整';

  const shen = zhiFuGong.shenPan.shen;
  const shenDesc = shen.includes('吉') ? '吉神临宫，自身状态良好' : '凶神临宫，自身状态欠佳';

  return `自身状态：${relationship}分，神盘${shen}${shenDesc}`;
}

// 🧮 生成环境分析
export function generateEnvironmentAnalysis(scores: any, pan: QimenPan): string {
  const { direction } = scores;
  const zhiFuGong = pan.jiuGong.find(g => g.gong === pan.zhiFu.gong);
  if (!zhiFuGong) return '环境分析：数据不完整';

  const men = zhiFuGong.renPan.men;
  const menDesc = men.includes('吉') ? '吉门临宫，环境有利' : '凶门临宫，环境不利';

  return `环境分析：${direction}分，人盘${men}${menDesc}`;
}

// 🧮 生成行动指南
export function generateActionGuide(pan: QimenPan, category: QimenCategory): string {
  const bestDirection = getBestDirection(pan);
  const bestTime = getBestTime(pan);

  let guide = '';

  if (bestDirection) {
    guide += `最佳方位：${bestDirection}方向大吉。`;
  }

  if (bestTime) {
    guide += `最佳时辰：${bestTime}行动最为有利。`;
  }

  if (!bestDirection && !bestTime) {
    guide = '暂时没有特别推荐的方位和时辰，建议根据盘面综合判断。';
  }

  return guide;
}

// 🧮 生成警告信息
export function generateWarnings(pan: QimenPan, category: QimenCategory): string[] {
  const warnings: string[] = [];
  const zhiFuGong = pan.jiuGong.find(g => g.gong === pan.zhiFu.gong);
  if (!zhiFuGong) return warnings;

  const xing = zhiFuGong.tianPan.xing;
  const men = zhiFuGong.renPan.men;
  const shen = zhiFuGong.shenPan.shen;

  // 九星警告
  if (xing.includes('凶')) {
    warnings.push(`天盘${xing}临宫，需注意相关风险`);
  }

  // 八门警告
  if (men.includes('凶') || men === '死门' || men === '伤门') {
    warnings.push(`人盘${men}临宫，行动需谨慎`);
  }

  // 八神警告
  if (shen === '白虎' || shen === '玄武') {
    warnings.push(`神盘${shen}临宫，需小心谨慎`);
  }

  // 特殊警告
  if (category === QimenCategory.WEALTH && men === '死门') {
    warnings.push('死门临宫，财气死绝，不宜投资');
  }

  if (category === QimenCategory.CAREER && men === '杜门') {
    warnings.push('杜门临宫，事业受阻，宜静待时机');
  }

  if (category === QimenCategory.LOVE && men === '死门') {
    warnings.push('死门临宫，感情死气，不利婚恋');
  }

  return warnings;
}

// 🧮 生成完整分析
export function generateFullAnalysis(
  pan: QimenPan,
  category: QimenCategory,
  scores: any
): Partial<QimenAnalysis> {
  const level = getScoreLevel(scores.total);
  const template = TEXT_TEMPLATES[category];

  return {
    result: {
      level,
      advice: template.advice[level],
      strategy: generateActionGuide(pan, category),
      bestDirection: getBestDirection(pan),
      bestTime: getBestTime(pan),
      warnings: generateWarnings(pan, category)
    },
    details: {
      timing: generateTimingAnalysis(scores, pan),
      self: generateSelfAnalysis(scores, pan),
      environment: generateEnvironmentAnalysis(scores, pan),
      action: generateActionGuide(pan, category)
    }
  };
}

// 🧮 简化分析（用于快速响应）
export function generateSimpleAnalysis(
  pan: QimenPan,
  category: QimenCategory,
  scores: any
): {
  level: string;
  advice: string;
  strategy: string;
} {
  const level = getScoreLevel(scores.total);
  const template = TEXT_TEMPLATES[category];

  return {
    level,
    advice: template.advice[level],
    strategy: generateActionGuide(pan, category)
  };
}
