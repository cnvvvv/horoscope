// 🚀 功能介绍页
// 科学算命系统功能特性详解

'use client';

import Link from 'next/link';
import { Calculator, Star, Sparkles, TrendingUp, Shield, Zap, Database } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 导航栏 */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-800">
            科学算命
          </span>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
            首页
          </Link>
          <Link href="/input" className="text-gray-700 hover:text-purple-600 transition-colors">
            开始测算
          </Link>
          <Link href="/features" className="text-purple-600 font-semibold">
            功能介绍
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
            关于我们
          </Link>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              功能特性
            </h1>
            <p className="text-xl text-gray-600">
              现代科技与传统命理的完美融合
            </p>
          </div>

          {/* 核心功能 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              核心功能
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Star className="h-8 w-8" />}
                title="八字排盘"
                description="基于天文历法的严谨八字排盘，支持公历/农历转换，准确计算年柱、月柱、日柱、时柱"
                features={['精确到分钟', '藏干藏支显示', '1900-2100年支持', '农历转换']}
              />
              <FeatureCard
                icon={<Sparkles className="h-8 w-8" />}
                title="奇门遁甲"
                description="专业的奇门遁甲决策系统，帮助您在关键时刻做出正确选择，支持阳遁阴遁算法"
                features={['阳遁阴遁', '九宫格布局', '值符值使', '智能评分']}
              />
              <FeatureCard
                icon={<TrendingUp className="h-8 w-8" />}
                title="五行分析"
                description="深度分析五行平衡状态，提供准确的五行强度评分和调节建议"
                features={['数量统计', '强度评分', '平衡分析', '调节建议']}
              />
              <FeatureCard
                icon={<Database className="h-8 w-8" />}
                title="十神关系"
                description="完整的十神体系分析，揭示命局中各种人物关系和事业发展机遇"
                features={['日主定位', '十神判断', '关系网分析', '运势指引']}
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="大运流年"
                description="精确的大运和流年计算，帮助您把握人生各个阶段的发展机遇"
                features={['十年大运', '年度运势', '吉凶评分', '时机把握']}
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8" />}
                title="隐私保护"
                description="所有计算结果本地存储，不上传个人信息，保护您的隐私安全"
                features={['本地存储', '无服务器传输', '匿名使用', '数据安全']}
              />
            </div>
          </div>

          {/* 技术特点 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              技术特点
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <TechFeature
                title="毫秒级计算"
                description="采用高效算法，实现毫秒级精准计算，无需等待"
                icon={<Zap className="h-6 w-6" />}
              />
              <TechFeature
                title="科学客观"
                description="基于传统数理模型，去除人为推演的不确定性"
                icon={<Shield className="h-6 w-6" />}
              />
              <TechFeature
                title="数据可视化"
                description="直观的图表展示，让复杂的命理数据一目了然"
                icon={<Star className="h-6 w-6" />}
              />
              <TechFeature
                title="响应式设计"
                description="完美适配各种设备，手机、平板、桌面都能使用"
                icon={<TrendingUp className="h-6 w-6" />}
              />
            </div>
          </div>

          {/* 使用流程 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              使用流程
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <StepCard
                step="1"
                title="输入信息"
                description="输入您的出生时间、地点和性别"
              />
              <StepCard
                step="2"
                title="选择测算"
                description="选择您要测算的项目（八字、奇门等）"
              />
              <StepCard
                step="3"
                title="获取结果"
                description="查看详细的测算结果和建议"
              />
              <StepCard
                step="4"
                title="保存记录"
                description="本地保存结果，随时查看"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/input"
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <Calculator className="mr-2 h-6 w-6" />
              立即体验
            </Link>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">
            © 2026 科学算命 | Powered by Next.js 14 + TypeScript
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/terms" className="hover:text-gray-300">
              服务条款
            </Link>
            <Link href="/privacy" className="hover:text-gray-300">
              隐私政策
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              联系我们
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 功能卡片组件
function FeatureCard({ icon, title, description, features }: {
  icon: React.ReactNode,
  title: string,
  description: string,
  features: string[]
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
      <div className="text-purple-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 技术特点组件
function TechFeature({ title, description, icon }: {
  title: string,
  description: string,
  icon: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="text-purple-600 mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
      </div>
      <p className="text-gray-700">
        {description}
      </p>
    </div>
  );
}

// 步骤卡片组件
function StepCard({ step, title, description }: {
  step: string,
  title: string,
  description: string
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4 mx-auto">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}