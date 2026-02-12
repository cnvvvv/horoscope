import { calculateBazi } from '../lib/bazi';

describe('八字分析测试', () => {
  test('应该正确分析八字数据', () => {
    // 测试数据：2024年1月1日0点，男性
    const birthDate = new Date(2024, 0, 1, 0, 0, 0); // 月份是0-11
    const bazi = calculateBazi(birthDate, 0, 'male');

    expect(bazi).toBeDefined();
    expect(bazi).not.toBeNull();
    expect(bazi.year).toBeDefined();
    expect(bazi.month).toBeDefined();
    expect(bazi.day).toBeDefined();
    expect(bazi.hour).toBeDefined();

    // 检查年柱
    expect(bazi.year.heavenlyStem).toBeDefined();
    expect(bazi.year.earthlyBranch).toBeDefined();

    // 检查月柱
    expect(bazi.month.heavenlyStem).toBeDefined();
    expect(bazi.month.earthlyBranch).toBeDefined();

    // 检查日柱
    expect(bazi.day.heavenlyStem).toBeDefined();
    expect(bazi.day.earthlyBranch).toBeDefined();

    // 检查时柱
    expect(bazi.hour.heavenlyStem).toBeDefined();
    expect(bazi.hour.earthlyBranch).toBeDefined();
  });

  test('应该正确处理无效输入', () => {
    // 测试无效年份
    const invalidDate = new Date(1899, 0, 1, 0, 0, 0);
    const result = calculateBazi(invalidDate, 0, 'male');
    expect(result).toBeNull();
  });

  test('应该正确识别性别', () => {
    const birthDate = new Date(2024, 0, 1, 0, 0, 0);

    const maleBazi = calculateBazi(birthDate, 0, 'male');
    const femaleBazi = calculateBazi(birthDate, 0, 'female');

    expect(maleBazi).toBeDefined();
    expect(maleBazi).not.toBeNull();
    expect(maleBazi.gender).toBe('male');

    expect(femaleBazi).toBeDefined();
    expect(femaleBazi).not.toBeNull();
    expect(femaleBazi.gender).toBe('female');
  });

  test('应该返回正确的八字结构', () => {
    const birthDate = new Date(2024, 0, 1, 0, 0, 0);
    const bazi = calculateBazi(birthDate, 0, 'male');

    expect(bazi).toHaveProperty('year');
    expect(bazi).toHaveProperty('month');
    expect(bazi).toHaveProperty('day');
    expect(bazi).toHaveProperty('hour');
    expect(bazi).toHaveProperty('gender');
    expect(bazi).toHaveProperty('birthType');

    // 检查每个柱的结构
    ['year', 'month', 'day', 'hour'].forEach(pillar => {
      expect(bazi[pillar as keyof typeof bazi]).toHaveProperty('heavenlyStem');
      expect(bazi[pillar as keyof typeof bazi]).toHaveProperty('earthlyBranch');
      expect(bazi[pillar as keyof typeof bazi]).toHaveProperty('hiddenHeavenlyStem');
      expect(bazi[pillar as keyof typeof bazi]).toHaveProperty('hiddenEarthlyBranch');
    });
  });
});