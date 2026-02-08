# 🦞 Science Horoscope - 现代八字命理系统

> 一款精准、极速、现代化的在线八字排盘与分析工具

## ✨ 核心特性

- **🔄 智能八字计算** - 毫秒级精准排盘，支持公历/农历
- **📊 五行深度分析** - 金、木、水、火、土全面解析
- **🎯 天干地支匹配** - 精准的八字命局推演
- **🌙 十神关系展示** - 空间天干与十神的对应关系
- **📈 大运流年可视化** - 10年大运轨迹清晰呈现
- **💰 智能建议生成** - 事业/财运、婚姻、健康全方位指导

## 🛠️ 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Next.js API Routes (Serverless Functions)
- **部署平台**: Vercel
- **历法库**: lunar-javascript (Node.js实现)
- **性能优化**: Vercel Edge Network、ISR、图片压缩

## 🚀 快速开始

```bash
# 在您的本地机器上
git clone https://github.com/cnvvvv/horoscope.git
cd horoscope
npm install
npm run dev
```

## 📁 项目结构

```
horoscope/
├── app/
│   ├── layout.tsx           # 主布局
│   ├── page.tsx            # 各页面组件
│   └── api/              # API客户端
├── components/
│   ├── forms/              # 输入表单
│   ├── charts/             # 图表组件
│   ├── display/             # 显示组件
│   └── utils/              # 工具函数
├── lib/
│   ├── bazi.ts             # 八字计算引擎
│   ├── wuxing.ts          # 五行分析
│   ├── shishen.ts          # 十神分析
│   ├── dayun.ts            # 大运分析
│   ├── lunisolar.ts        # 农历算法
│   ├── utils.ts             # 通用工具
│   └── types.ts            # TypeScript类型定义
├── hooks/
│   ├── useStorage.ts        # localStorage钩子
│   └── useBazi.ts           # 八字计算钩子
├── public/
│   ├── logo.svg             # 应用Logo
│   ├── favicon.ico          # 网站图标
│   └── images/             # 图片资源
├── package.json
├── next.config.js
├── tsconfig.json
├── README.md
└── deploy.sh              # 部署脚本
```

## 🎯 核心功能

### 1. 八字排盘模块
- 输入：姓名、性别、出生日期、出生时辰
- 选项：公历/农历切换、闰月选择
- 输出：八字排盘（年柱、月柱、日柱、时柱）

### 2. 五行分析模块
- 金木水火土五行得分计算
- 金木水火土相生相冲结果
- 五行平衡度分析
- 用神建议

### 3. 十神关系模块
- 日主天干对应的十神
- 月柱天干对应的十神
- 十神对八字命局的影响
- 十神关系解释

### 4. 大运流年可视化
- 大运阶段轴（10年周期）
- 每个大运阶段的流年天干
- 大运吉凶分析
- 事业/财运/婚姻/健康综合评估

---

**开始日期**: 2026-02-07
**开发时间**: 2小时
**预计完成**: 1周内

## 📞 开发团队

**主开发者**: xiaolongxia-davidtsai (AI Assistant)

**核心贡献**:
- Next.js 14 项目架构设计
- TypeScript 类型系统
- 八字命理算法实现
- Tailwind CSS 响应式设计
- Vercel Serverless Functions 部署优化

---

**© 2026 Science Horoscope**
**版本**: V1.0.0
**开发状态**: 进行中

**📞 请访问**: https://horoscope.cnvvvv.vercel.app

**📞 GitHub**: https://github.com/cnvvvv/horoscope
