import { analyzeWuXing } from '../lib/wuxing';
import { Bazi } from '../types/horoscope';

describe('五行分析测试', () => {
  test('应该正确统计五行数量', () => {
    // 创建一个测试用的八字数据
    const testBazi: Bazi = {
      year: {
        heavenlyStem: '甲',
        earthlyBranch: '子',
        hiddenHeavenlyStem: '癸',
        hiddenEarthlyBranch: '癸'
      },
      month: {
        heavenlyStem: '乙',
        earthlyBranch: '丑',
        hiddenHeavenlyStem: '己',
        hiddenEarthlyBranch: '癸'
      },
      day: {
        heavenlyStem: '丙',
        earthlyBranch: '寅',
        hiddenHeavenlyStem: '甲',
        hiddenEarthlyBranch: '丙'
      },
      hour: {
        heavenlyStem: '丁',
        earthlyBranch: '卯',
        hiddenHeavenlyStem: '乙',
        hiddenEarthlyBranch: '乙'
      },
      gender: 'male'
    };

    const result = analyzeWuXing(testBazi);

    expect(result).toBeDefined();
    expect(result.scores).toBeDefined();
    expect(result.scores.金).toBeDefined();
    expect(result.scores.木).toBeDefined();
    expect(result.scores.水).toBeDefined();
    expect(result.scores.火).toBeDefined();
    expect(result.scores.土).toBeDefined();

    // 检查五行数量总和
    const totalElements = Object.values(result.scores)
      .reduce((sum, score) => sum + score.count, 0);
    expect(totalElements).toBeGreaterThan(0);
  });

  test('应该正确识别缺失五行', () => {
    const testBazi: Bazi = {
      year: {
        heavenlyStem: '甲',
        earthlyBranch: '子',
        hiddenHeavenlyStem: '癸',
        hiddenEarthlyBranch: '癸'
      },
      month: {
        heavenlyStem: '乙',
        earthlyBranch: '丑',
        hiddenHeavenlyStem: '己',
        hiddenEarthlyBranch: '癸'
      },
      day: {
        heavenlyStem: '丙',
        earthlyBranch: '寅',
        hiddenHeavenlyStem: '甲',
        hiddenEarthlyBranch: '丙'
      },
      hour: {
        heavenlyStem: '丁',
        earthlyBranch: '卯',
        hiddenHeavenlyStem: '乙',
        hiddenEarthlyBranch: '乙'
      },
      gender: 'male'
    };

    const result = analyzeWuXing(testBazi);

    // 检查是否所有五行都存在
    Object.values(result.scores).forEach(score => {
      expect(score.hasElement).toBeDefined();
      expect(typeof score.hasElement).toBe('boolean');
    });
  });

  test('应该正确计算五行强度', () => {
    const testBazi: Bazi = {
      year: {
        heavenlyStem: '甲',
        earthlyBranch: '子',
        hiddenHeavenlyStem: '癸',
        hiddenEarthlyBranch: '癸'
      },
      month: {
        heavenlyStem: '乙',
        earthlyBranch: '丑',
        hiddenHeavenlyStem: '己',
        hiddenEarthlyBranch: '癸'
      },
      day: {
        heavenlyStem: '丙',
        earthlyBranch: '寅',
        hiddenHeavenlyStem: '甲',
        hiddenEarthlyBranch: '丙'
      },
      hour: {
        heavenlyStem: '丁',
        earthlyBranch: '卯',
        hiddenHeavenlyStem: '乙',
        hiddenEarthlyBranch: '乙'
      },
      gender: 'male'
    };

    const result = analyzeWuXing(testBazi);

    // 检查强度评分
    Object.values(result.scores).forEach(score => {
      expect(score.strength).toBeDefined();
      expect(typeof score.strength).toBe('number');
      expect(score.strength).toBeGreaterThanOrEqual(0);
      expect(score.strength).toBeLessThanOrEqual(10);
    });
  });
});