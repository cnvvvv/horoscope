// 🔗 Tian Gan Di Zhi Relationship
// 天干地支完整关系网实现
// 包含：三合、六冲、三会、三害、六合

import { HEAVENLY_STEMS, EARTHLY_BRANCHES, STEM_BRANCH_MAP } from './solar';
import { Bazi } from '@/types/horoscope';

// 关系类型定义
export enum RelationType {
  SAN_HE = '三合',           // 三合：亥卯未、寅午戌、巳酉丑、辰子
  LIU_CHONG = '六冲',         // 六冲：子午、丑未、寅申、卯酉、辰戌、巳亥
  SAN_HUI = '三会',           // 三会：申子辰、亥卯未、寅午戌、巳酉丑
  SAN_HAI = '三害',           // 三害：子未、丑午、寅巳、卯辰、申亥、酉戌
  LIU_HE = '六合',           // 六合：子丑、寅亥、卯戌、辰酉、巳申、午未
}

// 天干地支关系表
export interface StemBranchRelation {
  type: RelationType;
  description: string;
  isGood: boolean;           // 是否为吉神
  isBad: boolean;            // 是否为凶神
  effect: string;             // 影响描述
}

// 关系分析结果
export interface RelationshipAnalysis {
  stemsRelations: {
    sanHe: string[];          // 三合（天干）
    liuChong: string[];        // 六冲（天干）
    sanHui: string[];          // 三会（天干）
  };
  branchesRelations: {
    sanHe: string[];          // 三合（地支）
    liuChong: string[];        // 六冲（地支）
    sanHui: string[];          // 三会（地支）
    sanHai: string[];          // 三害（地支）
    liuHe: string[];           // 六合（地支）
  };
  interactions: StemBranchRelation[];
  overall: {
    goodRelations: number;     // 吉神关系数量
    badRelations: number;      // 凶神关系数量
    harmonyLevel: string;     // 和谐度（和谐/一般/冲突）
  };
  suggestions: string[];
}

// 🧪 三合（地支）
const SAN_HE_BRANCHES: Record<string, string[]> = {
  '子': ['丑'],              // 子丑合
  '丑': ['子', '午', '亥'],
  '寅': ['亥'],              // 寅亥合
  '卯': ['未'],              // 卯未合
  '辰': ['子', '申'],
  '巳': ['酉', '丑'],
  '午': ['未', '丑'],
  '未': ['卯', '午', '戌'],
  '申': ['子', '辰'],
  '酉': ['巳'],
  '戌': ['未'],
  '亥': ['寅']
};

// 🧪 三合（天干）
const SAN_HE_STEMS: Record<string, string[]> = {
  '甲': ['己'],              // 甲己合
  '乙': ['庚'],              // 乙庚合
  '丙': ['辛'],              // 丙辛合
  '丁': ['壬'],              // 丁壬合
  '戊': ['癸'],              // 戊癸合
  '己': ['甲', '庚'],          // 己甲庚合
  '庚': ['乙', '丙'],          // 庚乙丙合
  '辛': ['丁', '戊'],          // 辛丁戊合
  '壬': ['丁', '庚', '丙'],    // 壬丁庚丙合
  '癸': ['戊', '己']           // 癸戊己合
};

// 🧪 六冲（地支）
const LIU_CHONG_BRANCHES: Record<string, string> = {
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

// 🧪 六冲（天干）
const LIU_CHONG_STEMS: Record<string, string> = {
  '甲': '庚',              // 甲庚冲
  '乙': '辛',              // 乙辛冲
  '丙': '壬',              // 丙壬冲
  '丁': '癸',              // 丁癸冲
  '戊': '辛',              // 戊辛冲
  '己': '乙',              // 己乙冲
  '庚': '甲',              // 庚甲冲
  '辛': '乙',              // 辛乙冲
  '壬': '丙',              // 壬丙冲
  '癸': '丁'               // 癸丁冲
};

// 🧪 三会（地支）
const SAN_HUI_BRANCHES: Record<string, string[]> = {
  '子': ['申', '辰'],
  '丑': ['巳', '酉'],
  '寅': ['午', '戌'],
  '卯': ['亥', '未'],
  '辰': ['子', '申'],
  '巳': ['丑', '酉'],
  '午': ['寅', '戌'],
  '未': ['卯', '亥'],
  '申': ['子', '辰'],
  '酉': ['丑', '巳'],
  '戌': ['寅', '午'],
  '亥': ['卯', '未']
};

// 🧪 三害（地支）
const SAN_HAI_BRANCHES: Record<string, string[]> = {
  '子': ['未'],
  '丑': ['午'],
  '寅': ['巳'],
  '卯': ['辰'],
  '辰': ['卯'],
  '巳': ['寅'],
  '午': ['丑'],
  '未': ['子'],
  '申': ['亥'],
  '酉': ['戌'],
  '戌': ['酉'],
  '亥': ['申']
};

// 🧪 六合（地支）
const LIU_HE_BRANCHES: Record<string, string> = {
  '子': '丑',
  '丑': '子',
  '寅': '亥',
  '卯': '戌',
  '辰': '酉',
  '巳': '申',
  '午': '未',
  '未': '午',
  '申': '巳',
  '酉': '辰',
  '戌': '卯',
  '亥': '寅'
};

// 🔍 检查三合（地支）
function checkSanHeBranch(branch1: string, branch2: string): boolean {
  for (const [branch, mates] of Object.entries(SAN_HE_BRANCHES)) {
    if (branch === branch1 && mates.includes(branch2)) return true;
    if (branch === branch2 && mates.includes(branch1)) return true;
  }
  return false;
}

// 🔍 检查三合（天干）
function checkSanHeStem(stem1: string, stem2: string): boolean {
  const mates = SAN_HE_STEMS[stem1] || [];
  return mates.includes(stem2);
}

// 🔍 检查六冲（地支）
function checkLiuChongBranch(branch1: string, branch2: string): boolean {
  if (LIU_CHONG_BRANCHES[branch1] === branch2) {
    return true;
  }
  if (LIU_CHONG_BRANCHES[branch2] === branch1) {
    return true;
  }
  return false;
}

// 🔍 检查六冲（天干）
function checkLiuChongStem(stem1: string, stem2: string): boolean {
  if (LIU_CHONG_STEMS[stem1] === stem2) {
    return true;
  }
  if (LIU_CHONG_STEMS[stem2] === stem1) {
    return true;
  }
  return false;
}

// 🔍 检查三会（地支）
function checkSanHuiBranch(branch1: string, branch2: string): boolean {
  const mates = SAN_HUI_BRANCHES[branch1] || [];
  return mates.includes(branch2);
}

// 🔍 检查三害（地支）
function checkSanHaiBranch(branch1: string, branch2: string): boolean {
  const enemies = SAN_HAI_BRANCHES[branch1] || [];
  return enemies.includes(branch2);
}

// 🔍 检查六合（地支）
function checkLiuHeBranch(branch1: string, branch2: string): boolean {
  if (LIU_HE_BRANCHES[branch1] === branch2) {
    return true;
  }
  if (LIU_HE_BRANCHES[branch2] === branch1) {
    return true;
  }
  return false;
}

// 🔍 分析地支关系
function analyzeBranchRelations(branch1: string, branch2: string): StemBranchRelation | null {
  try {
    // 1. 三合判断
    if (checkSanHeBranch(branch1, branch2)) {
      return {
        type: RelationType.SAN_HE,
        description: '三合，人际和谐，婚姻美满',
        isGood: true,
        isBad: false,
        effect: '三合为吉神，主人际关系和谐，婚姻运势良好'
      };
    }

    // 2. 六冲判断
    if (checkLiuChongBranch(branch1, branch2)) {
      return {
        type: RelationType.LIU_CHONG,
        description: '六冲，冲突激烈，需要谨慎',
        isGood: false,
        isBad: true,
        effect: '六冲为凶神，主冲突激烈，事业财运受阻，需要低调行事'
      };
    }

    // 3. 三会判断
    if (checkSanHuiBranch(branch1, branch2)) {
      return {
        type: RelationType.SAN_HUI,
        description: '三会，智慧汇聚',
        isGood: true,
        isBad: false,
        effect: '三会为吉神，主思维活跃，有贵人相助'
      };
    }

    // 4. 三害判断
    if (checkSanHaiBranch(branch1, branch2)) {
      return {
        type: RelationType.SAN_HAI,
        description: '三害，小人暗算',
        isGood: false,
        isBad: true,
        effect: '三害为凶神，主有小人暗算，需要小心谨慎'
      };
    }

    // 5. 六合判断
    if (checkLiuHeBranch(branch1, branch2)) {
      return {
        type: RelationType.LIU_HE,
        description: '六合，婚姻和谐',
        isGood: true,
        isBad: false,
        effect: '六合为吉神，主婚姻美满，家庭和谐'
      };
    }

    // 6. 普通关系（无特殊关系）
    return {
      type: RelationType.SAN_HE,
      description: '普通关系，无明显影响',
      isGood: false,
      isBad: false,
      effect: '没有特殊的天干地支关系'
    };
  } catch (error) {
    console.error('分析地支关系失败:', error);
    return null;
  }
}

// 🔍 分析天干关系
function analyzeStemRelations(stem1: string, stem2: string): StemBranchRelation | null {
  try {
    // 1. 三合判断
    if (checkSanHeStem(stem1, stem2)) {
      return {
        type: RelationType.SAN_HE,
        description: '三合，合作共赢',
        isGood: true,
        isBad: false,
        effect: '天干三合为吉神，主合作能力强，适合团队工作'
      };
    }

    // 2. 六冲判断
    if (checkLiuChongStem(stem1, stem2)) {
      return {
        type: RelationType.LIU_CHONG,
        description: '六冲，竞争激烈',
        isGood: false,
        isBad: true,
        effect: '天干六冲为凶神，主竞争激烈，需要提升自身实力'
      };
    }

    // 3. 普通关系（天干没有特殊关系）
    return {
      type: RelationType.SAN_HE,
      description: '普通关系，无明显影响',
      isGood: false,
      isBad: false,
      effect: '天干没有特殊关系，性格和能力影响'
    };
  } catch (error) {
    console.error('分析天干关系失败:', error);
    return null;
  }
}

// 📊 完整分析四柱八字的关系
function analyzeRelationships(bazi: Bazi): RelationshipAnalysis | null {
  try {
    const pillars = [bazi.year, bazi.month, bazi.day, bazi.hour];
    const interactions: StemBranchRelation[] = [];

    // 1. 分析柱间关系
    for (let i = 0; i < pillars.length; i++) {
      for (let j = i + 1; j < pillars.length; j++) {
        const pillar1 = pillars[i];
        const pillar2 = pillars[j];

        // 分析地支关系
        const branchRelation = analyzeBranchRelations(
          pillar1.earthlyBranch,
          pillar2.earthlyBranch
        );

        if (branchRelation) {
          interactions.push({
            ...branchRelation
          });
        }
      }
    }

    // 2. 统计天干关系
    const stemsRelations = {
      sanHe: [] as string[],
      liuChong: [] as string[],
      sanHui: [] as string[]
    };

    for (let i = 0; i < pillars.length; i++) {
      for (let j = i + 1; j < pillars.length; j++) {
        const stem1 = pillars[i].heavenlyStem;
        const stem2 = pillars[j].heavenlyStem;

        // 天干三合判断
        if (checkSanHeStem(stem1, stem2)) {
          if (!stemsRelations.sanHe.includes(`${stem1} ${stem2}`)) {
            stemsRelations.sanHe.push(`${stem1} ${stem2}`);
          }
        }

        // 天干六冲判断
        if (checkLiuChongStem(stem1, stem2)) {
          if (!stemsRelations.liuChong.includes(`${stem1} ${stem2}`)) {
            stemsRelations.liuChong.push(`${stem1} ${stem2}`);
          }
        }
      }
    }

    // 3. 统计地支关系
    const branchesRelations = {
      sanHe: [] as string[],
      liuChong: [] as string[],
      sanHui: [] as string[],
      sanHai: [] as string[],
      liuHe: [] as string[]
    };

    for (let i = 0; i < pillars.length; i++) {
      for (let j = i + 1; j < pillars.length; j++) {
        const branch1 = pillars[i].earthlyBranch;
        const branch2 = pillars[j].earthlyBranch;

        // 地支三合判断
        if (checkSanHeBranch(branch1, branch2)) {
          if (!branchesRelations.sanHe.includes(`${branch1} ${branch2}`)) {
            branchesRelations.sanHe.push(`${branch1} ${branch2}`);
          }
        }

        // 地支六冲判断
        if (checkLiuChongBranch(branch1, branch2)) {
          if (!branchesRelations.liuChong.includes(`${branch1} ${branch2}`)) {
            branchesRelations.liuChong.push(`${branch1} ${branch2}`);
          }
        }

        // 地支三会判断
        if (checkSanHuiBranch(branch1, branch2)) {
          if (!branchesRelations.sanHui.includes(`${branch1} ${branch2}`)) {
            branchesRelations.sanHui.push(`${branch1} ${branch2}`);
          }
        }

        // 地支三害判断
        if (checkSanHaiBranch(branch1, branch2)) {
          if (!branchesRelations.sanHai.includes(`${branch1} ${branch2}`)) {
            branchesRelations.sanHai.push(`${branch1} ${branch2}`);
          }
        }

        // 地支六合判断
        if (checkLiuHeBranch(branch1, branch2)) {
          if (!branchesRelations.liuHe.includes(`${branch1} ${branch2}`)) {
            branchesRelations.liuHe.push(`${branch1} ${branch2}`);
          }
        }
      }
    }

    // 4. 统计吉神和凶神数量
    let goodRelations = 0;
    let badRelations = 0;

    interactions.forEach(interaction => {
      if (interaction.isGood) goodRelations++;
      if (interaction.isBad) badRelations++;
    });

    // 5. 判断和谐度
    let harmonyLevel = '一般';
    if (goodRelations >= badRelations * 2) {
      harmonyLevel = '和谐';
    } else if (badRelations >= goodRelations * 2) {
      harmonyLevel = '冲突';
    }

    // 6. 生成建议
    const suggestions: string[] = [];

    if (badRelations > goodRelations) {
      suggestions.push('天干地支关系偏向冲突，建议低调行事，避免争论');
    } else if (goodRelations > badRelations) {
      suggestions.push('天干地支关系偏向和谐，建议积极合作，扩大人脉');
    }

    if (branchesRelations.sanHe.length > 0) {
      suggestions.push('地支有多个三合，贵人相助，事业运势上升');
    }

    if (branchesRelations.liuChong.length > 0) {
      suggestions.push('地支有多个六冲，冲突较多，需要化解');
    }

    const overall = {
      goodRelations,
      badRelations,
      harmonyLevel
    };

    return {
      stemsRelations,
      branchesRelations,
      interactions,
      overall,
      suggestions
    };
  } catch (error) {
    console.error('分析天干地支关系失败:', error);
    return null;
  }
}

// 导出类型和函数
export {
  SAN_HE_BRANCHES,
  SAN_HE_STEMS,
  LIU_CHONG_BRANCHES,
  LIU_CHONG_STEMS,
  SAN_HUI_BRANCHES,
  SAN_HAI_BRANCHES,
  LIU_HE_BRANCHES,
  checkSanHeBranch,
  checkSanHeStem,
  checkLiuChongBranch,
  checkLiuChongStem,
  checkSanHuiBranch,
  checkSanHaiBranch,
  checkLiuHeBranch,
  analyzeBranchRelations,
  analyzeStemRelations,
  analyzeRelationships
};
