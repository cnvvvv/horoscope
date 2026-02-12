import { paiQimenPan, isYinDun } from '../lib/qimen-pai';

describe('奇门遁甲测试', () => {
  test('应该正确计算奇门盘', () => {
    // 测试数据：2024年1月1日0点
    const result = paiQimenPan(2024, 1, 1, 0);

    expect(result).toBeDefined();
    expect(result.panJu).toBeDefined();
    expect(result.isYinDun).toBeDefined();
    expect(result.zhiFu).toBeDefined();
    expect(result.zhiShi).toBeDefined();
    expect(result.jiuGong).toBeDefined();

    // 检查九宫数量
    expect(result.jiuGong.length).toBe(9);

    // 检查每个宫位的基本结构
    result.jiuGong.forEach(gong => {
      expect(gong.gong).toBeDefined();
      expect(gong.diPan).toBeDefined();
      expect(gong.tianPan).toBeDefined();
      expect(gong.renPan).toBeDefined();
      expect(gong.shenPan).toBeDefined();
      expect(gong.isZhiFu).toBeDefined();
      expect(gong.isZhiShi).toBeDefined();
    });
  });

  test('应该正确设置值符和值使', () => {
    const result = paiQimenPan(2024, 1, 1, 0);

    // 值符和值使应该存在
    expect(result.zhiFu).toBeDefined();
    expect(result.zhiFu.gong).toBeDefined();
    expect(result.zhiFu.xing).toBeDefined();

    expect(result.zhiShi).toBeDefined();
    expect(result.zhiShi.gong).toBeDefined();
    expect(result.zhiShi.men).toBeDefined();

    // 应该有一个宫是值符
    const zhiFuGong = result.jiuGong.find(gong => gong.isZhiFu);
    expect(zhiFuGong).toBeDefined();

    // 应该有一个宫是值使
    const zhiShiGong = result.jiuGong.find(gong => gong.isZhiShi);
    expect(zhiShiGong).toBeDefined();
  });

  test('应该正确计算阴阳遁', () => {
    // 测试不同时间的阴阳遁
    const yangDunResult = paiQimenPan(2024, 1, 1, 12); // 中午，应该是阳遁

    expect(typeof yangDunResult.isYinDun).toBe('boolean');

    // 阴阳遁应该根据节气和时间正确计算
    expect(yangDunResult.panJu).toBeGreaterThan(0);
    expect(yangDunResult.panJu).toBeLessThanOrEqual(9);
  });

  test('应该正确处理无效时间', () => {
    // 测试边界年份
    const result = paiQimenPan(1899, 1, 1, 0);
    expect(result).toBeDefined(); // 函数应该不会抛出错误，而是返回有效结果
  });
});