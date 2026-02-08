# 🚀 奇门遁甲功能 - 快速开始

## ⚡ 5分钟快速体验

### 步骤1：安装依赖（1-2分钟）

```bash
cd horoscope
npm install --legacy-peer-deps
```

### 步骤2：启动开发服务器（30秒）

```bash
npm run dev
```

### 步骤3：测试功能（2分钟）

1. 访问：http://localhost:3000/qimen
2. 选择：求财
3. 输入：我想投资股票
4. 时间：保持默认
5. 点击：立即起卦

---

## 📖 使用说明

### 1. 输入页面

- **事项分类**：选择您要问的问题类型
  - 求财：投资、生意、财运
  - 事业：求职、升职、工作
  - 感情：婚恋、桃花、感情
  - 寻人寻物：找人、找物、失物
  - 出行：旅游、出行、远行
  - 健康：疾病、养生、健康
  - 官司：诉讼、维权、官司

- **具体问题**：输入您的问题（可选）
  - 例如：我想投资股票，现在合适吗？

- **起盘时间**：
  - 默认当前时间（正时起盘）
  - 支持手动调整年、月、日、时

### 2. 结果页面

- **顶部结论**：
  - 综合评分（-100到100分）
  - 运势等级（大吉/吉/平/凶/大凶）
  - 核心建议
  - 策略推荐

- **九宫格展示**：
  - 3x3九宫格布局
  - 四层信息叠加（地盘、天盘、人盘、神盘）
  - 值符值使高亮
  - 点击术语查看解释

- **详细解读**：
  - 时机分析
  - 自身状态
  - 环境分析
  - 行动指南

- **最佳行动时机**：
  - 最佳方位
  - 最佳时辰

---

## 🔧 常见问题

### Q1：安装依赖失败怎么办？

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Q2：启动服务器失败？

```bash
rm -rf .next
npm run dev
```

### Q3：如何测试API接口？

```bash
# 测试排盘接口
curl "http://localhost:3000/api/qimen/pai?year=2024&month=2&day=7&hour=14"

# 测试分析接口
curl "http://localhost:3000/api/qimen/analyze?year=2024&month=2&day=7&hour=14&category=wealth"
```

---

## 📚 相关文档

- `DEPLOYMENT_GUIDE.md` - 完整部署指南
- `FINAL_COMPLETION_REPORT.md` - 完成报告
- `QIMEN_README.md` - 开发文档

---

## 🎯 快速部署

### 方式1：Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

### 方式2：GitHub自动部署

```bash
./push-to-github.sh
```

然后连接Vercel到GitHub仓库。

---

## 🦞 开始使用

现在就体验奇门遁甲决策系统吧！

```bash
cd horoscope
npm run dev
```

访问：http://localhost:3000/qimen
