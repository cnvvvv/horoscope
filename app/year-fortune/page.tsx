// 📅 年份运势页
// 详细年份运势分析

'use client';

import Link from 'next/link';
import { Calculator, Calendar, TrendingUp, Star, Heart, Briefcase, Home, Users } from 'lucide-react';

export default function YearFortunePage() {
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
          <Link href="/bazi" className="text-gray-700 hover:text-purple-600 transition-colors">
            八字命理
          </Link>
          <Link href="/dayun" className="text-gray-700 hover:text-purple-600 transition-colors">
            大运流年
          </Link>
          <Link href="/year-fortune" className="text-purple-600 font-semibold">
            年份运势
          </Link>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              年份运势详解
            </h1>
            <p className="text-xl text-gray-600">
              深入了解每个年份的机遇与挑战
            </p>
          </div>

          {/* 年份运势内容 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-purple-600" />
                选择年份
              </h2>
              <div className="grid md:grid-cols-5 gap-4">
                {[2021, 2022, 2023, 2024, 2025].map(year => (
                  <button
                    key={year}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {year}年
                  </button>
                ))}
              </div>
            </div>

            {/* 运势概览 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-purple-600" />
                2024年运势概览
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">综合运势</span>
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-yellow-600">8</span>
                    <span className="text-gray-600">/10</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  2024年对于您来说是一个充满机遇的一年。事业方面有较大的发展空间，
                  财运稳步上升，感情生活和谐，健康状况良好。整体运势较为顺畅，
                  但需要注意把握时机，避免冲动决策。
                </p>
              </div>
            </div>

            {/* 各方面运势 */}
            <div className="space-y-6 mb-8">
              <FortuneSection
                icon={<Briefcase className="h-6 w-6" />}
                title="事业运势"
                level="优秀"
                score={9}
                color="text-green-600"
                description="事业上会有较大的突破，有望获得晋升或新的发展机会。"
                suggestions={['把握机会，主动争取', '保持学习和进步', '拓展人脉资源']}
              />

              <FortuneSection
                icon={<TrendingUp className="h-6 w-6" />}
                title="财运"
                level="良好"
                score={8}
                color="text-blue-600"
                description="财运稳步上升，有不错的收入增长。投资方面需要谨慎。"
                suggestions={['合理规划支出', '避免高风险投资', '寻找额外收入来源']}
              />

              <FortuneSection
                icon={<Heart className="h-6 w-6" />}
                title="感情运势"
                level="稳定"
                score={7}
                color="text-pink-600"
                description="感情生活和谐，单身者有望遇到心仪对象。"
                suggestions={['保持真诚', '扩大社交圈', '多关注家庭']}
              />

              <FortuneSection
                icon={<Home className="h-6 w-6" />}
                title="家庭运势"
                level="和谐"
                score={9}
                color="text-purple-600"
                description="家庭和睦，长辈安康，有利于家庭发展。"
                suggestions={['多陪伴家人', '关注长辈健康', '家庭规划']}
              />

              <FortuneSection
                icon={<Users className="h-6 w-6" />}
                title="人际关系"
                level="顺畅"
                score={8}
                color="text-indigo-600"
                description="人际关系和谐，贵人运不错。"
                suggestions={['真诚待人', '珍惜友谊', '团队合作']}
              />

              <FortuneSection
                icon={<Star className="h-6 w-6" />}
                title="健康运势"
                level="良好"
                score={8}
                color="text-green-600"
                description="健康状况良好，注意劳逸结合。"
                suggestions={['规律作息', '适当运动', '保持心情愉快']}
              />
            </div>

            {/* 关键提醒 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                ⚠️ 重要提醒
              </h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• 3-5月是事业发展的重要时期，建议把握机会</li>
                <li>• 7-8月需要注意财务风险，避免冲动消费</li>
                <li>• 9-10月感情方面会有新的发展</li>
                <li>• 年底要注意身体健康，避免过度劳累</li>
              </ul>
            </div>

            {/* 吉祥方位 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                吉祥方位
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">有利方位</h4>
                  <p className="text-green-700">东南方、北方</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">不利方位</h4>
                  <p className="text-red-700">西南方、东北方</p>
                </div>
              </div>
            </div>

            {/* 幸运元素 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                幸运元素
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-2xl">🔵</span>
                                          </div>
                  <p className="text-sm text-gray-700">幸运色</p>
                  <p className="text-sm font-semibold">蓝色</p>
                                        </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-2xl">🟢</span>
                                          </div>
                  <p className="text-sm text-gray-700">幸运数字</p>
                  <p className="text-sm font-semibold">3, 7</p>
                                        </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-2xl">👤</span>
                                          </div>
                  <p className="text-sm text-gray-700">贵人星座</p>
                  <p className="text-sm font-semibold">处女座</p>
                                        </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-2xl">⭐</span>
                                          </div>
                  <p className="text-sm text-gray-700">吉祥动物</p>
                  <p className="text-sm font-semibold">龙</p>
                                        </div>
              </div>
            </div>

            {/* 行动建议 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                年度行动建议
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">制定明确的目标和计划，按步骤实施</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">保持积极的心态，相信自己能够成功</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">注重身体健康，保持良好的生活习惯</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">珍惜身边的人际关系，多与家人朋友相处</span>
                </div>
              </div>
            </div>

            {/* 返回按钮 */}
            <div className="text-center">
              <Link
                href="/dayun"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Calculator className="mr-2 h-6 w-6" />
                返回大运流年
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

// 运势板块组件
function FortuneSection({ icon, title, level, score, color, description, suggestions }: {
  icon: React.ReactNode,
  title: string,
  level: string,
  score: number,
  color: string,
  description: string,
  suggestions: string[]
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className={`${color} mr-3`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <div className="flex items-center mt-1">
            <span className={`text-sm font-medium ${color} mr-2`}>
              {level}
            </span>
            <div className="flex items-center">
              {[...Array(10)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < score ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-4">
        {description}
      </p>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          建议：
        </h4>
        <ul className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <span className="text-green-500 mr-2 mt-0.5">•</span>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}