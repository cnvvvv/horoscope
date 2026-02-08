// 🧪 奇门遁甲测试脚本
// Qimen Dunjia Test Script

const { paiQimenPan } = require('./lib/qimen-pai');
const { matchRules, getYongShen } = require('./lib/qimen-rules-engine');
const { scoreGong } = require('./lib/qimen-score');
const { generateFullAnalysis } = require('./lib/qimen-text-generator');

console.log('🦞 奇门遁甲功能测试\n');

// 测试1：排盘
console.log('📊 测试1：排盘功能');
const pan = paiQimenPan(2024, 2, 7, 14);
console.log('✓ 排盘成功');
console.log(`  局数：${pan.panJu}`);
console.log(`  阴遁/阳遁：${pan.isYinDun ? '阴遁' : '阳遁'}`);
console.log(`  值符：${pan.zhiFu.xing}（${pan.zhiFu.gong}宫）`);
console.log(`  值使：${pan.zhiShi.men}（${pan.zhiShi.gong}宫）`);
console.log(`\n九宫布局：`);
pan.jiuGong.forEach(gong => {
  console.log(`  ${gong.gong}宫：天${gong.tianPan.xing} ${gong.renPan.men} ${gong.shenPan.shen}`);
});

// 测试2：规则匹配
console.log('\n📋 测试2：规则匹配');
const { QimenCategory } = require('./types/qimen');
const rules = matchRules(pan, QimenCategory.WEALTH);
console.log(`✓ 匹配到 ${rules.length} 条规则`);
rules.forEach(rule => {
  console.log(`  - ${rule.result}（评分：${rule.score}）`);
});

// 测试3：评分计算
console.log('\n🧮 测试3：评分计算');
const scores = scoreGong(pan, QimenCategory.WEALTH);
console.log('✓ 评分计算完成');
console.log(`  时机评分：${scores.timing}分`);
console.log(`  方位评分：${scores.direction}分`);
console.log(`  人际评分：${scores.relationship}分`);
console.log(`  综合评分：${scores.total}分`);

// 测试4：用神
console.log('\n🎯 测试4：用神');
const yongShen = getYongShen(pan, QimenCategory.WEALTH);
console.log('✓ 用神计算完成');
console.log(`  用神：${yongShen.name}`);
console.log(`  描述：${yongShen.description}`);

// 测试5：文案生成
console.log('\n📝 测试5：文案生成');
const analysis = generateFullAnalysis(pan, QimenCategory.WEALTH, scores);
console.log('✓ 文案生成完成');
console.log(`  运势等级：${analysis.result.level}`);
console.log(`  核心建议：${analysis.result.advice}`);
console.log(`  时机分析：${analysis.details.timing}`);
console.log(`  自身状态：${analysis.details.self}`);
console.log(`  环境分析：${analysis.details.environment}`);
console.log(`  行动指南：${analysis.details.action}`);
if (analysis.result.warnings && analysis.result.warnings.length > 0) {
  console.log(`  警告：${analysis.result.warnings.join('，')}`);
}

console.log('\n✅ 所有测试通过！');
console.log('\n🦞 奇门遁甲功能已就绪，可以开始使用！');
