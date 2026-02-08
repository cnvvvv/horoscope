# 🦞 Science Horoscope - 技术文档

> 科学算命系统的技术实现文档、算法说明和开发指南

## 📋 目录

- [项目概述](#项目概述)
- [技术架构](#技术架构)
- [算法实现](#算法实现)
- [API设计](#api设计)
- [数据结构](#数据结构)
- [开发指南](#开发指南)
- [部署说明](#部署说明)
- [常见问题](#常见问题)

---

## 项目概述

### 🎯 项目名称
**科学算命** (Science Horoscope)

### 📖 项目类型
- **类型**: Web应用
- **技术栈**: Next.js 14 + TypeScript + Tailwind CSS + Vercel
- **状态**: 开发中（框架已完成，核心算法待实现）

### 🎯 核心目标
1. **八字排盘** - 支持公历/农历，精确计算年柱、月柱、日柱、时柱
2. **五行分析** - 金、木、水、火、土的强弱分析和平衡度计算
3. **天干地支** - 完整的天干地支关系网（三合、六冲、三会、三害、六合等）
4. **十神体系** - 根据日柱和时柱自动匹配十神
5. **大运计算** - 10年大运周期，每个大运阶段的干支、吉凶分析
6. **运势分析** - 事业、财运、婚姻、健康、学业等多维度评估

---

## 技术架构

### 🏗️ 架构层次

```
┌─────────────────────────────┐
│   用户层 (Next.js前端)    │
├─────────────────────────────┤
│   API层 (Next.js Routes)     │
├─────────────────────────────┤
│   业务逻辑层 (TypeScript)   │
├─────────────────────────────┤
│   数据层 (JSON/LocalStorage) │
└─────────────────────────────┘
```

### 📦 技术栈详解

#### 前端
- **框架**: Next.js 14 (App Router模式)
- **UI组件**: React 18 (Server Components)
- **样式**: Tailwind CSS 3.4.1
- **类型**: TypeScript 5.3
- **渲染**: React 18 Server Components (RSC)
- **状态管理**: React Hooks + Zustand

#### 后端
- **API**: Next.js API Routes
- **计算**: 客户端JavaScript计算（避免服务器计算限制）
- **数据**: 浏览器LocalStorage（零成本）

#### 部署
- **平台**: Vercel (Serverless Functions)
- **CDN**: Vercel Edge Network
- **域名**: horoscope.yourdomain.com

---

## 算法实现

### 📅 历法算法

#### 核心算法

**1. 公历转农历**
```typescript
// 支持年份: 1900-2100
// 支持闰年判断
// 二十四节气计算

interface SolarTerm {
  year: number
  month: number
  day: number
  name: string
  timestamp: Date
}

// 二十四节气常量
const SOLAR_TERMS: SolarTerm[] = [
  { name: '立春', month: 2, day: 3-5 },
  { name: '雨水', month: 2, day: 18-20 },
  { name: '惊蛰', month: 3, day: 5-7 },
  // ... 更多节气
];

function getSolarTerm(year: number, month: number, day: number): SolarTerm | null {
  // 根据公历日期计算节气
  // 返回节气信息或null
}
```

**2. 农历日期转换**
```typescript
// 公历日期 → 农历日期
// 支持月份: 1-12
// 支持年份: 1900-2100

interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  monthTerm: string;  月柱（如子、丑、寅...）
  lunarYear: number;  农历年份
}

function solarToLunar(date: Date): LunarDate | null {
  // 转换逻辑
  // 返回农历日期信息
}
```

#### 八字排盘算法

**八字结构定义**
```typescript
interface Bazi {
  year: BaziYear;      // 年柱
  month: BaziMonth;    // 月柱
  day: BaziDay;       // 日柱
  hour: BaziHour;      // 时柱
  gender: 'male' | 'female';
  name?: string;       // 姓名（可选）
}

interface BaziYear {
  heavenlyStem: string;  // 天干（甲、乙、丙、丁、戊、己、庚、辛、壬、癸）
  earthlyBranch: string; // 地支（子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥）
  hiddenHeavenlyStem: string | null;  // 藏干
  hiddenEarthlyBranch: string | null; // 藏支
}

interface BaziMonth {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenHeavenlyStem: string | null;
  hiddenEarthlyBranch: string | null;
}

interface BaziDay {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenHeavenlyStem: string | null;
  hiddenEarthlyBranch: string | null;
}

interface BaziHour {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenHeavenlyStem: string | null;
  hiddenEarthlyBranch: string | null;
}

// 天干（10个）
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支（12个）
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天干地支对应表
const STEM_BRANCH_MAP = {
  '甲': '子', '乙': '丑', '丙': '寅', '丁': '卯', '戊': '辰', '己': '巳', '庚': '午', '辛': '未', '壬': '酉', '癸': '亥'
};
```

**月柱计算**
```typescript
// 根据年柱和月份计算月柱
// 节气判断: 月柱切换以"立春"为分界
// 农历月份: 农历一月、二月...十二月

function calculateMonthPillar(year: number, month: number): BaziMonth {
  // 1. 确定农历月份
  // 2. 计算年柱天干
  // 3. 计算年柱地支
  // 4. 查找藏干和藏支
  // 5. 组装月柱
}
```

#### 五行分析

**五行基础**
```typescript
enum WuXing {
  METAL = '金',
  WOOD = '木',
  WATER = '水',
  FIRE = '火',
  EARTH = '土'
}

// 五行相生相冲
const WU_XING_INTERACTIONS = {
  '金生水': true,
  '金生木': true,
  '金生土': true,
  '金克水': false,
  '金克木': false,
  // ... 更多组合
};

function analyzeWuXing(
  year: BaziYear,
  month: BaziMonth,
  day: BaziDay,
  hour: BaziHour
): WuXingAnalysis {
  // 1. 计算各五行数量
  // 2. 分析强弱关系（相生、相克）
  // 3. 判断平衡度（是否有缺、是否有旺）
  // 4. 生成分析报告
}
```

#### 十神分析

**十神体系**
```typescript
interface Shen {
  name: string;              // 十神名称
  element: WuXing;        // 对应五行
  description: string;       // 十神作用描述
}

// 常见十神
const COMMON_SHEN: [
  { name: '正财', element: 'METAL', description: '偏官之财星，主财源' },
  { name: '偏财', element: 'METAL', description: '副财星，非主财源' },
  { name: '七杀', element: 'WATER', description: '制约日主，影响事业运' },
  { name: '正官', element: 'EARTH', description: '官运星，主事业和权力' },
  { name: '食神', element: 'WATER', description: '主智思和学习' },
  { name: '伤官', element: 'WATER', description: '挫折和克制' },
  // ... 更多十神
];

function calculateShen(
  day: BaziDay,
  month: BaziMonth
  year: BaziYear
): Shen | null {
  // 1. 根据日柱天干和时柱天干匹配十神
  // 2. 根据年柱天干匹配十神
  // 3. 返回十神信息
}
```

#### 大运计算

**大运周期**
```typescript
interface DaYun {
  year: number;
  age: number;        // 起始年龄
  ageEnd: number;     // 结束年龄
  heavenlyStem: string; // 大运天干
  earthlyBranch: string; // 大运地支
  hiddenHeavenlyStem: string | null;
  hiddenEarthlyBranch: string | null;
  analysis: string;      // 运势分析
  score: number;       // 运势评分（0-100）
}

function calculateDaYun(
  bazi: Bazi,
  currentYear: number,
  currentAge: number
  startAge: number = 1
): DaYun[] {
  // 1. 从起始年龄（通常1岁）开始计算
  // 2. 每10年为一个阶段，共10个阶段
  // 3. 计算每个阶段的干支
  // 4. 分析每个阶段的吉凶
  // 5. 返回大运周期数组
}
```

---

## API设计

### 📡 API Routes 结构

```typescript
// app/api/bazi/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 历法转换
export async function GET(req: NextRequest) {
  const { year, month, day } = req.query;
  const result = solarToLunar(new Date(year, month, day));
  return NextResponse.json(result);
}

// 八字排盘
export async function POST(req: NextRequest) {
  const { name, gender, birthDate, birthHour, type } = await req.json();
  const bazi = calculateBazi(birthDate, birthHour, gender, type);
  return NextResponse.json(bazi);
}

// 五行分析
export async function GET(req: NextRequest) {
  const { year, month, day, hour } = req.query;
  const result = analyzeWuXing(year, month, day, hour);
  return NextResponse.json(result);
}

// 十神分析
export async function GET(req: NextRequest) {
  const { year, month, day, hour } = req.query;
  const result = calculateShen(year, month, day, hour);
  return NextResponse.json(result);
}

// 大运计算
export async function GET(req: NextRequest) {
  const { year, currentAge } = req.query;
  const result = calculateDaYun(year, currentAge);
  return NextResponse.json(result);
}
```

### 📡 请求/响应格式

**请求格式** (JSON)
```json
{
  "name": "张三",
  "gender": "male",
  "birthDate": "1985-03-15 08:30",
  "birthHour": "9",
  "type": "lunar"
}
```

**响应格式** (JSON)
```json
{
  "success": true,
  "bazi": {
    "year": { "heavenlyStem": "甲", "earthlyBranch": "子" },
    "month": { "heavenlyStem": "丙", "earthlyBranch": "寅" },
    "day": { "heavenlyStem": "癸", "earthlyBranch": "酉" },
    "hour": { "heavenlyStem": "辛", "earthlyBranch": "未" }
  },
  "wuxing": {
    "metal": { "count": 2, "strong": true },
    "wood": { "count": 1, "weak": false },
    "water": { "count": 2, "strong": true },
    "fire": { "count": 0, "weak": false },
    "earth": { "count": 0, "weak": false },
    "balance": "balanced"
  },
  "shen": {
    "positive": ['正财', '正官'],
    "negative": ['七杀', '伤官']
  },
  "dayun": {
    "current": {
      "age": 25,
      "year": "2024",
      "heavenlyStem": "丙",
      "earthlyBranch": "子",
      "analysis": "事业运平稳上升"
    },
    "phases": [/* 10个大运阶段 */]
  }
}
```

---

## 数据结构

### 📊 前端数据结构

```typescript
// types/bazi.ts

export interface Bazi {
  year: BaziYear;
  month: BaziMonth;
  day: BaziDay;
  hour: BaziHour;
  gender: 'male' | 'female';
  name?: string;
}

export interface WuXing {
  metal: number;
  wood: number;
  water: number;
  fire: number;
  earth: number;
  balance: 'balanced' | 'weak' | 'strong';
  analysis: string;
}

export interface Shen {
  positive: string[];
  negative: string[];
}

export interface DaYun {
  current: DaYunPhase;
  phases: DaYunPhase[];
  score: number;
  analysis: string;
}
```

### 📱 数据存储

**浏览器LocalStorage结构**
```typescript
// hooks/useStorage.ts

interface StorageData {
  baziHistory: Bazi[];         // 历史记录
  currentBazi: Bazi | null;    // 当前八字命局
  settings: {                     // 用户设置
    calendarType: 'lunar';      // 历法类型（公历/农历）
    showShen: true;            // 是否显示十神
    showDayun: true;           // 是否显示大运
  };
}

// 存储键
const STORAGE_KEYS = {
  BAZI_HISTORY: 'bazi_history',
  CURRENT_BAZI: 'current_bazi',
  USER_SETTINGS: 'user_settings'
};
```

---

## 开发指南

### 🚀 快速开始

#### 1. 项目初始化
```bash
cd /root/clawd/horoscope
npm install
```

#### 2. 开发模式
```bash
npm run dev        # 开发模式（热更新）
npm run build      # 生产构建
```

#### 3. 代码结构
```
horoscope/
├── app/
│   ├── layout.tsx          # 主布局
│   ├── page.tsx            # 页面组件
│   ├── bazi/               # 八字相关组件
│   ├── dayun/              # 大运相关组件
│   └── wuxing/             # 五行相关组件
├── components/              # 可复用组件
│   ├── forms/              # 输入表单
│   ├── display/             # 显示组件
│   ├── charts/              # 图表组件
│   └── utils/              # 工具函数
├── lib/                    # 核心算法
│   ├── solar.ts            # 历法算法
│   ├── lunar.ts            # 农历转换
│   ├── bazi.ts             # 八字排盘
│   ├── wuxing.ts           # 五行分析
│   ├── shen.ts             # 十神分析
│   ├── dayun.ts            # 大运计算
│   └── utils.ts            # 工具函数
├── hooks/                  # React Hooks
│   ├── useStorage.ts        # localStorage钩子
│   └── useBazi.ts          # 八字计算钩子
├── types/                  # TypeScript类型定义
└── public/                  # 静态资源
```

#### 4. 环境配置
```env
NEXT_PUBLIC_APP_NAME=科学算命
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_VERCEL_ENV=production
```

---

## 部署说明

### 🌐 Vercel部署

#### 1. 构建项目
```bash
cd horoscope
npm run build
```

#### 2. 部署到Vercel
```bash
vercel login
vercel link
vercel --prod
```

#### 3. 环境变量配置
```bash
# 在Vercel Dashboard中配置
NEXT_PUBLIC_APP_NAME=科学算命
```

#### 4. 访问应用
- **生产环境**: https://horoscope.yourdomain.com/
- **预览环境**: https://horoscope-preview.vercel.app/

---

## 常见问题

### ❓ 技术问题

#### Q1: 如何添加新的历法算法？
A1: 在`lib/solar.ts`中添加新的计算函数
A2: 更新`types/solar.ts`类型定义
A3: 重新构建项目

#### Q2: 八字排盘不准确？
A2: 检查历法算法的边界条件（世纪年份、闰年处理）
A2: 调试`calculateBazi()`函数，添加日志输出

#### Q3: 五行分析不平衡？
A3: 检查五行数量统计逻辑
A3: 增加平衡度计算因子（得力/失力的权重）

#### Q4: 大运计算错误？
A4: 检查年龄计算逻辑（虚岁算法）
A4: 验证大运周期计算（每10年一个阶段）

---

### 📞 功能实现清单

### 第一阶段：基础功能 ✅
- [ ] 历法转换（公历→农历）
- [ ] 八字排盘（四柱八字）
- [ ] 五行基础分析
- [ ] 十神基础分析
- [ ] 数据存储（localStorage）

### 第二阶段：高级功能 🚧
- [ ] 天干地支完整关系网
- [ ] 大运计算（10年周期）
- [ ] 五行深度分析
- [ ] 十神完整体系
- [ ] 运势分析（事业/财运/婚姻/健康）
- [ ] 数据可视化（图表）

### 第三阶段：界面开发 🎨
- [ ] 首页（Logo、Slogan）
- [ ] 输入表单（姓名、性别、出生日期、出生时辰）
- [ ] 八字排盘结果页
- [ ] 五行分析页
- [ ] 十神关系页
- [ ] 大运流年页
- [ ] 今年运势页
- [ ] 历史记录页
- [ ] 分享导出页

---

## 📞 联系方式

### 开发支持
- 技术问题 → 查看本文档
- 代码审查 → GitHub Pull Request
- Bug报告 → GitHub Issues

### 📧 项目维护
- 文档更新 → 同步`README.md`
- 版本发布 → Semantic Versioning
- 依赖更新 → `npm update`

---

## 🎯 开发建议

### 代码质量
1. **TypeScript严格模式** - 启用`strict: true`
2. **ESLint配置** - 使用推荐的规则
3. **代码格式化** - 使用Prettier自动格式化
4. **类型安全** - 避免`any`，使用具体类型
5. **错误处理** - 统一的错误处理策略

### 性能优化
1. **代码分割** - Next.js自动代码分割
2. **图片优化** - 使用WebP格式，压缩资源
3. **缓存策略** - 使用SWR或浏览器缓存
4. **懒加载** - 组件和路由的懒加载

### 安全考虑
1. **数据验证** - 严格的输入验证
2. **XSS防护** - 使用Next.js内置的XSS防护
3. **CSRF防护** - API请求使用CSRF Token
4. **隐私保护** - 不收集敏感个人信息，仅保存八字数据到localStorage

---

## 📊 项目时间线

### 已完成 ✅
- [x] 项目初始化（Next.js 14）
- [x] TypeScript配置（tsconfig.json）
- [x] Tailwind CSS配置
- [x] Vercel部署配置
- [x] 技术文档编写

### 进行中 🚧
- [ ] 历法算法实现（公历转农历）
- [ ] 八字排盘算法实现
- [ ] 五行分析算法实现
- [ ] 十神分析算法实现
- [ ] 大运计算算法实现
- [ ] API Routes开发
- [ ] React组件开发

### 待开始 ⏳
- [ ] 前端页面开发
- [ ] 图表组件集成
- [ ] 响应式设计优化
- [ ] 测试和Bug修复
- [ ] Vercel部署
- [ ] 用户验收

---

## 🎉 结语

"科学算命"项目是一个基于现代Web技术栈的传统命理工具。通过使用Next.js 14、TypeScript和Tailwind CSS，我们能够构建一个高性能、可扩展的八字排盘和运势分析系统。

本技术文档将指导整个开发过程，确保代码质量、性能和安全性。

**开始日期**: 2026-02-07
**最后更新**: 2026-02-07
**文档版本**: v1.0.0

---

**© 2026 Science Horoscope**
**技术文档版本**: v1.0.0
