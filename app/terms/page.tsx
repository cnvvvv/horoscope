// 📋 服务条款页
// 科学算命平台服务条款

'use client';

import Link from 'next/link';
import { Calculator, FileText, Scale, Shield, Clock, Heart } from 'lucide-react';

export default function TermsPage() {
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
          <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
            关于我们
          </Link>
          <Link href="/terms" className="text-purple-600 font-semibold">
            服务条款
          </Link>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              服务条款
            </h1>
            <p className="text-xl text-gray-600">
              欢迎使用科学算命平台
            </p>
          </div>

          {/* 服务条款内容 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-purple-600" />
                  协议的接受
                </h2>
                <p className="text-gray-700 mb-4">
                  欢迎使用科学算命平台（以下简称"本平台"）。在使用本平台服务之前，
                  请您仔细阅读并充分理解本服务条款的所有内容。一旦您使用本平台服务，
                  即表示您已同意接受本服务条款的全部内容。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="mr-2 h-6 w-6 text-purple-600" />
                  免责声明
                </h2>
                <p className="text-gray-700 mb-4">
                  本平台提供的服务仅供娱乐和文化交流参考。测算结果基于传统命理理论，
                  不应作为您生活决策的唯一依据。您应自行对您的决策负责。
                </p>
                <p className="text-gray-700 mb-4">
                  本平台不对因使用本服务而产生的任何直接或间接损失承担责任，
                  包括但不限于经济损失、精神损害等。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-purple-600" />
                  隐私保护
                </h2>
                <p className="text-gray-700 mb-4">
                  1. **数据安全**：所有计算结果均保存在您的本地设备中，不会上传到服务器。
                </p>
                <p className="text-gray-700 mb-4">
                  2. **个人信息保护**：我们不会收集、存储或分享您的个人信息。
                </p>
                <p className="text-gray-700 mb-4">
                  3. **Cookie使用**：本平台可能使用Cookie来改善用户体验。
                </p>
                <p className="text-gray-700">
                  4. **第三方服务**：本平台可能链接到第三方服务，请您注意查看其隐私政策。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2 h-6 w-6 text-purple-600" />
                  服务内容
                </h2>
                <p className="text-gray-700 mb-4">
                  本平台提供以下服务：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>八字排盘和命理分析</li>
                  <li>奇门遁甲决策建议</li>
                  <li>五行平衡分析</li>
                  <li>十神关系解读</li>
                  <li>大运流年运势预测</li>
                  <li>历史记录保存功能</li>
                </ul>
                <p className="text-gray-700">
                  保留随时修改或终止服务的权利，无需另行通知。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="mr-2 h-6 w-6 text-purple-600" />
                  用户行为规范
                </h2>
                <p className="text-gray-700 mb-4">
                  1. 您不得利用本平台进行任何违法活动。
                </p>
                <p className="text-gray-700 mb-4">
                  2. 不得使用本平台进行欺诈、误导或其他不当行为。
                </p>
                <p className="text-gray-700 mb-4">
                  3. 不得尝试攻击或破坏本平台的正常运行。
                </p>
                <p className="text-gray-700">
                  4. 尊重他人隐私，不得分享他人的个人信息。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  知识产权
                </h2>
                <p className="text-gray-700 mb-4">
                  本平台的商标、设计、内容、技术等均受相关法律保护。
                </p>
                <p className="text-gray-700">
                  未经授权，任何人不得复制、修改、分发或用于商业目的。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  适用法律
                </h2>
                <p className="text-gray-700 mb-4">
                  本服务条款的订立、执行和解释均适用中华人民共和国法律。
                </p>
                <p className="text-gray-700">
                  如发生争议，双方应友好协商解决；协商不成的，向有管辖权的人民法院提起诉讼。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  条款修改
                </h2>
                <p className="text-gray-700">
                  我们有权随时修改服务条款，修改后的条款将在本平台上公布。
                  继续使用本平台服务即表示您接受修改后的条款。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  联系我们
                </h2>
                <p className="text-gray-700">
                  如对本服务条款有任何疑问，请通过 <Link href="/contact" className="text-purple-600 hover:underline">联系我们</Link> 页面与我们联系。
                </p>
              </section>
            </div>
          </div>

          {/* 返回按钮 */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              返回首页
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