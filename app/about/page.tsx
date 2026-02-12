// ℹ️ 关于我们页
// 科学算命团队介绍

'use client';

import Link from 'next/link';
import { Calculator, Users, Code, Heart, Globe, Award } from 'lucide-react';

export default function AboutPage() {
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
          <Link href="/features" className="text-gray-700 hover:text-purple-600 transition-colors">
            功能介绍
          </Link>
          <Link href="/about" className="text-purple-600 font-semibold">
            关于我们
          </Link>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              关于我们
            </h1>
            <p className="text-xl text-gray-600">
              传统文化的现代传承者
            </p>
          </div>

          {/* 使命愿景 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              我们的使命
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              科学算命致力于将中华传统命理文化与现代科技相结合，通过严谨的算法和直观的界面，
              让更多人能够了解和体验传统文化的魅力。我们相信，传统文化不应该被束之高阁，
              而应该以现代的方式走进每个人的生活。
            </p>
            <p className="text-gray-700 leading-relaxed">
              我们的目标是创建一个准确、易用、美观的命理测算平台，让用户能够轻松获得专业的命理分析，
              同时保护用户的隐私安全。
            </p>
          </div>

          {/* 核心团队 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              核心团队
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <TeamCard
                name="技术团队"
                icon={<Code className="h-8 w-8" />}
                description="负责核心算法开发和系统架构，拥有丰富的Web开发经验"
                skills={['TypeScript', 'Next.js', '算法优化', '系统设计']}
              />
              <TeamCard
                name="研究团队"
                icon={<Users className="h-8 w-8" />}
                description="深入研究传统命理理论，确保算法的准确性和专业性"
                skills={['周易研究', '八字命理', '奇门遁甲', '五行理论']}
              />
              <TeamCard
                name="设计团队"
                icon={<Heart className="h-8 w-8" />}
                description="负责用户体验和界面设计，打造美观易用的产品"
                skills={['UI/UX设计', '响应式布局', '交互设计', '品牌设计']}
              />
            </div>
          </div>

          {/* 技术栈 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              技术栈
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <TechSection
                title="前端技术"
                icon={<Code className="h-6 w-6" />}
                technologies={[
                  { name: 'Next.js 14', desc: 'React全栈框架，支持SSR' },
                  { name: 'TypeScript', desc: '类型安全的JavaScript' },
                  { name: 'Tailwind CSS', desc: '实用优先的CSS框架' },
                  { name: 'Lucide React', desc: '现代化的图标库' }
                ]}
              />
              <TechSection
                title="后端技术"
                icon={<Globe className="h-6 w-6" />}
                technologies={[
                  { name: 'Node.js', desc: '高性能JavaScript运行时' },
                  { name: 'API路由', desc: 'RESTful API设计' },
                  { name: '农历算法', desc: '传统历法计算' },
                  { name: '缓存优化', desc: '提升响应速度' }
                ]}
              />
            </div>
          </div>

          {/* 发展历程 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              发展历程
            </h2>
            <div className="space-y-6">
              <TimelineItem
                year="2024"
                title="项目启动"
                description="开始研发科学算命系统，整合传统算法与现代技术"
              />
              <TimelineItem
                year="2024年中"
                title="核心功能完成"
                description="完成八字排盘、奇门遁甲等核心算法开发"
              />
              <TimelineItem
                year="2024年底"
                title="Beta版本发布"
                description="推出公测版本，收集用户反馈，持续优化"
              />
              <TimelineItem
                year="2025"
                title="正式版上线"
                description="完成所有功能开发，正式向用户开放"
              />
            </div>
          </div>

          {/* 联系方式 */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              联系我们
            </h2>
            <p className="text-gray-700 text-center mb-6">
              如果您有任何问题或建议，欢迎随时与我们联系
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Users className="mr-2 h-5 w-5" />
                联系我们
              </Link>
              <Link href="/feedback" className="inline-flex items-center px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                <Heart className="mr-2 h-5 w-5" />
                反馈建议
              </Link>
            </div>
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

// 团队卡片组件
function TeamCard({ name, icon, description, skills }: {
  name: string,
  icon: React.ReactNode,
  description: string,
  skills: string[]
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-purple-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {name}
      </h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// 技术栈组件
function TechSection({ title, icon, technologies }: {
  title: string,
  icon: React.ReactNode,
  technologies: { name: string, desc: string }[]
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <div className="text-purple-600 mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {technologies.map((tech, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-medium text-gray-900">{tech.name}</span>
            <span className="text-sm text-gray-600">{tech.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 时间线组件
function TimelineItem({ year, title, description }: {
  year: string,
  title: string,
  description: string
}) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-20 text-lg font-bold text-purple-600">
        {year}
      </div>
      <div className="flex-grow ml-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}