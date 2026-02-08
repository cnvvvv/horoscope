# 📚 科学算命系统 - 快速参考指南

## 🚀 快速开始

### 安装和启动
```bash
cd horoscope
npm install --legacy-peer-deps
npm run dev
```

访问：http://localhost:3000

---

## 📋 API接口速查

### 八字算命

| 接口 | 方法 | 参数 | 返回 |
|------|------|------|------|
| 八字排盘 | GET | year, month, day, hour, gender, type | Bazi |
| 五行分析 | GET | year, month, day, hour, gender | WuXingAnalysis |
| 十神分析 | GET | year, month, day, hour, gender | ShenAnalysis |
| 大运计算 | GET | year, month, day, hour, gender, currentAge, currentYear | DaYunCycle |
| 天干地支关系 | GET | year, month, day, hour, gender | RelationshipAnalysis |

### 奇门遁甲

| 接口 | 方法 | 参数 | 返回 |
|------|------|------|------|
| 奇门排盘 | GET | year, month, day, hour | QimenPan |
| 奇门分析 | GET | year, month, day, hour, category, question | QimenAnalysis |

---

## 🎯 功能速查

### 八字算命

#### 事项类型
- 一生运势分析
- 五行平衡分析
- 十神体系分析
- 大运流年推演
- 天干地支关系

#### 核心功能
- 八字排盘（四柱八字）
- 五行分析（金木水火土）
- 十神分析（正财偏财等）
- 大运计算（10年周期）
- 流年运势（逐年分析）

### 奇门遁甲

#### 事项分类
- 求财：生意/投资/财运
- 事业：求职/升职/工作
- 感情：婚恋/桃花/感情
- 寻人寻物：找人/找物/失物
- 出行：旅游/出行/远行
- 健康：疾病/养生/健康
- 官司：诉讼/维权/官司

#### 核心功能
- 奇门排盘（九宫八卦）
- 规则匹配（7大类）
- 评分计算（多维度）
- 文案生成（分析建议）

---

## 🏗️ 项目结构

```
horoscope/
├── app/                           # Next.js应用目录
│   ├── page.tsx                   # 主页
│   ├── input/                     # 八字输入
│   ├── bazi/                      # 八字结果
│   ├── wuxing/                    # 五行分析
│   ├── shen/                      # 十神分析
│   ├── dayun/                     # 大运流年
│   ├── qimen/                     # 奇门遁甲
│   │   ├── page.tsx              # 奇门输入
│   │   └── result/page.tsx       # 奇门结果
│   └── api/                       # API接口
│       ├── bazi/
│       ├── wuxing/
│       ├── shen/
│       ├── dayun/
│       └── qimen/
├── lib/                           # 业务逻辑
│   ├── solar.ts                   # 历法转换
│   ├── bazi.ts                    # 八字算法
│   ├── wuxing.ts                   # 五行分析
│   ├── shen.ts                    # 十神分析
│   ├── dayun.ts                   # 大运计算
│   ├── relationships.ts            # 天干地支关系
│   ├── qimen-core.ts              # 奇门核心
│   ├── qimen-pai.ts               # 奇门排盘
│   ├── qimen-rules-engine.ts     # 规则引擎
│   ├── qimen-score.ts             # 评分算法
│   └── qimen-text-generator.ts   # 文案生成
├── types/                         # 类型定义
│   ├── horoscope.ts               # 八字类型
│   └── qimen.ts                   # 奇门类型
├── components/                    # React组件
├── public/                        # 静态资源
├── DOCUMENTATION.md               # 项目文档
├── PROJECT_SUMMARY.md            # 项目总结
├── TECHNICAL_ARCHITECTURE.md    # 技术架构
├── DEPLOYMENT_GUIDE.md          # 部署指南
└── QUICKSTART.md                 # 快速开始
```

---

## 🔧 常用命令

### 开发
```bash
npm run dev              # 启动开发服务器
npm run build           # 构建生产版本
npm run start           # 启动生产服务器
```

### 部署
```bash
npm install -g vercel   # 安装Vercel CLI
vercel                  # 部署预览环境
vercel --prod          # 部署生产环境
```

### 测试
```bash
node check-qimen.js      # 检查奇门文件
node test-qimen.js       # 测试奇门功能
```

---

## 📝 文档索引

### 项目文档
- `README.md` - 项目说明
- `PROJECT_SUMMARY.md` - 项目总结
- `TECHNICAL_ARCHITECTURE.md` - 技术架构
- `DOCUMENTATION.md` - 开发文档

### 奇门遁甲文档
- `QIMEN_README.md` - 奇门开发文档
- `FINAL_COMPLETION_REPORT.md` - 完成报告
- `DEPLOYMENT_GUIDE.md` - 部署指南
- `QUICKSTART.md` - 快速开始

### 脚本文件
- `push-to-github.sh` - GitHub提交
- `start-dev.sh` - 开发启动
- `test-qimen.js` - 功能测试
- `check-qimen.js` - 文件检查

---

## 🎨 UI组件速查

### 奇门遁甲
- `JiuGongGrid` - 九宫格组件
- `GongDetail` - 宫格详情
- `TermPopup` - 术语弹窗

### 八字算命
- `BaziDisplay` - 八字展示
- `WuXingDisplay` - 五行展示
- `ShenDisplay` - 十神展示
- `DaYunDisplay` - 大运展示

### 通用组件
- `InputForm` - 输入表单
- `ResultCard` - 结果卡片
- `LoadingSpinner` - 加载动画

---

## 🔍 类型速查

### 八字类型
```typescript
Bazi                    # 八字数据
BaziPillar              # 八字柱
WuXingAnalysis          # 五行分析
ShenAnalysis            # 十神分析
DaYunCycle              # 大运周期
RelationshipAnalysis     # 天干地支关系
```

### 奇门类型
```typescript
QimenPan               # 奇门盘面
QimenAnalysis           # 奇门分析
YongShen                # 用神
Rule                    # 规则
Ruleset                 # 规则库
```

---

## ⚙️ 配置文件

### Next.js配置
- `next.config.js` - Next.js配置
- `tailwind.config.js` - Tailwind配置
- `tsconfig.json` - TypeScript配置

### 部署配置
- `vercel.json` - Vercel配置（可选）

---

## 🐛 常见问题

### 依赖安装失败
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### 构建失败
```bash
rm -rf .next
npm run build
```

### 开发服务器启动失败
```bash
npm run dev
# 或使用指定端口
PORT=3001 npm run dev
```

---

## 📞 获取帮助

### 文档
- 查看项目文档目录
- 搜索相关关键词
- 阅读示例代码

### 脚本
- 运行检查脚本诊断问题
- 运行测试脚本验证功能

### GitHub
- 查看Issue列表
- 提交新Issue
- 查看Pull Requests

---

*更新时间：2026-02-08*
