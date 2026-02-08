// 🏠 Horoscope Homepage
// "科学算命"主頁 - Logo、Slogan、简介和导航

'use client';

import Link from 'next/link';
import { Calculator, Star, Sparkles, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 头部导航 */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-800">
            科学算命
          </span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/input" className="text-gray-700 hover:text-purple-600 transition-colors">
            开始测算
          </Link>
          <Link href="/features" className="text-gray-700 hover:text-purple-600 transition-colors">
            功能介绍
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
            关于我们
          </Link>
        </div>
      </nav>

      {/* 主要内容区 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo和Slogan */}
          <div className="mb-8">
            <Calculator className="h-20 w-20 mx-auto mb-6 text-purple-600" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              知命而行，顺势而为
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              基于现代Web技术的传统八字命理系统
            </p>
          </div>

          {/* 功能特性 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <FeatureCard
              icon={<Star />}
              title="精确计算"
              description="基于天文历法的严谨八字排盘，支持公历/农历"
            />
            <FeatureCard
              icon={<Sparkles />}
              title="深度分析"
              description="完整的五行分析、十神体系、天干地支关系网"
            />
            <FeatureCard
              icon={<TrendingUp />}
              title="运势指引"
              description="大运流年可视化，事业、财运、情感、健康全方位评估"
            />
          </div>

          {/* CTA按钮 */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/input"
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <Calculator className="mr-2 h-6 w-6" />
              立即开始测算
            </Link>
            <Link
              href="/qimen"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg"
            >
              <TrendingUp className="mr-2 h-6 w-6" />
              奇门决策
            </Link>
          </div>

          {/* 奇门遁甲简介 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              🔮 奇门遁甲决策系统
            </h2>
            <p className="text-gray-700 mb-4">
              不同于八字的"一生运势"，奇门遁甲侧重于"特定时间、地点、事件"的吉凶推演，
              帮助您在关键时刻做出正确决策。
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-indigo-900 mb-1">求财</div>
                <div className="text-gray-600">投资、生意、财运决策</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-purple-900 mb-1">事业</div>
                <div className="text-gray-600">求职、升职、工作决策</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-blue-900 mb-1">感情</div>
                <div className="text-gray-600">婚恋、桃花、感情决策</div>
              </div>
            </div>
          </div>

          {/* 附加信息 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              为什么选择我们？
            </h2>
            <ul className="space-y-3 text-gray-700">
              <ListItem
                icon="✓"
                text="毫秒级精准计算，支持1900-2100年"
              />
              <ListItem
                icon="✓"
                text="科学客观化，去除人工推演的不确定性"
              />
              <ListItem
                icon="✓"
                text="数据可视化，直观展示八字命局和运势"
              />
              <ListItem
                icon="✓"
                text="历史记录本地保存，隐私保护无需上传"
              />
            </ul>
          </div>

          {/* 技术说明 */}
          <div className="mt-8 text-sm text-gray-600">
            <p className="mb-2">
              基于传统周易数理模型，结果仅供娱乐与文化交流参考
            </p>
            <p>
              请勿作为生活决策的唯一依据。科学理性，相信未来。
            </p>
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
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
      <div className="flex flex-col items-center text-center h-full">
        <div className="text-purple-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

// 列表项组件
function ListItem({ icon, text }: { icon: string, text: string }) {
  return (
    <li className="flex items-start">
      <span className="text-green-600 font-bold mr-2 flex-shrink-0">
        {icon}
      </span>
      <span className="text-gray-700">
        {text}
      </span>
    </li>
  );
}
