// 🔒 隐私政策页
// 科学算命平台隐私保护政策

'use client';

import Link from 'next/link';
import { Calculator, Shield, Lock, Eye, Database, Heart } from 'lucide-react';

export default function PrivacyPage() {
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
          <Link href="/privacy" className="text-purple-600 font-semibold">
            隐私政策
          </Link>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              隐私政策
            </h1>
            <p className="text-xl text-gray-600">
              保护您的隐私是我们的首要责任
            </p>
          </div>

          {/* 隐私政策内容 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-purple-600" />
                  概述
                </h2>
                <p className="text-gray-700 mb-4">
                  科学算命平台（以下简称"本平台"）非常重视用户的隐私保护。
                  我们承诺保护您的个人信息，确保您的使用安全。本隐私政策说明了我们如何收集、使用、存储和保护您的信息。
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>重要提示：</strong>本平台的所有计算结果均保存在您的本地设备中，
                  不会上传到任何服务器，真正做到了隐私零泄露。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="mr-2 h-6 w-6 text-purple-600" />
                  信息收集
                </h2>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. 基本使用信息</h3>
                <p className="text-gray-700 mb-4">
                  当您使用本平台时，我们可能收集以下信息：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>浏览器类型和版本</li>
                  <li>设备信息（操作系统、屏幕分辨率等）</li>
                  <li>访问时间和页面浏览记录</li>
                  <li>IP地址（仅用于技术诊断）</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. 个人信息</h3>
                <p className="text-gray-700 mb-4">
                  为了提供测算服务，您需要提供以下信息：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>出生年月日时</li>
                  <li>性别</li>
                  <li>出生地点（可选）</li>
                </ul>
                <p className="text-gray-700">
                  <strong>重要承诺：</strong>这些信息仅用于计算，不会存储、分享或用于其他任何目的。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="mr-2 h-6 w-6 text-purple-600" />
                  信息使用
                </h2>
                <p className="text-gray-700 mb-4">
                  我们收集的信息将用于以下目的：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>提供和改善本平台的服务</li>
                  <li>进行技术维护和优化</li>
                  <li>分析平台使用情况以改进用户体验</li>
                  <li>保护平台免受滥用和攻击</li>
                </ul>
                <p className="text-gray-700">
                  我们不会将您的个人信息用于商业目的或出售给第三方。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="mr-2 h-6 w-6 text-purple-600" />
                  数据存储和安全
                </h2>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. 存储位置</h3>
                <p className="text-gray-700 mb-4">
                  <strong>本地存储：</strong>所有计算结果和您选择保存的历史记录都存储在您的浏览器本地，
                  不会发送到任何服务器。
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>无服务器传输：</strong>我们的API调用完全在浏览器端完成，
                  不会将您的个人信息传输到远程服务器。
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. 安全措施</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>使用HTTPS加密传输（API调用）</li>
                  <li>定期进行安全审计和漏洞扫描</li>
                  <li>采用最新的Web安全标准</li>
                  <li>不收集和存储敏感个人信息</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Cookie使用
                </h2>
                <p className="text-gray-700 mb-4">
                  我们使用Cookie来改善您的使用体验：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>保存您的偏好设置</li>
                  <li>记住您的登录状态（如果需要）</li>
                  <li>分析网站使用情况</li>
                  <li>提供个性化内容</li>
                </ul>
                <p className="text-gray-700">
                  您可以通过浏览器设置来管理Cookie的接受和拒绝。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  第三方服务
                </h2>
                <p className="text-gray-700 mb-4">
                  本平台可能使用以下第三方服务：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>图标库：使用Lucide React提供图标</li>
                  <li>样式框架：使用Tailwind CSS提供样式</li>
                  <li>字体渲染：使用系统默认字体</li>
                </ul>
                <p className="text-gray-700">
                  这些第三方服务都有各自的隐私政策，请您注意查看。
                  我们不会向这些服务传输您的个人信息。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  用户权利
                </h2>
                <p className="text-gray-700 mb-4">
                  作为用户，您拥有以下权利：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>访问和更正您的个人信息</li>
                  <li>删除您的历史记录</li>
                  <li>导出您的数据</li>
                  <li>撤回您的同意</li>
                  <li>对数据处理提出异议</li>
                </ul>
                <p className="text-gray-700">
                  您可以通过清除浏览器数据来删除所有相关信息。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  儿童隐私保护
                </h2>
                <p className="text-gray-700 mb-4">
                  本平台不针对18岁以下的儿童提供服务。我们不会故意收集儿童的个人信息。
                  如果您是家长或监护人，并发现您的孩子向我们提供了信息，
                  请立即联系我们，我们将尽快删除这些信息。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  政策更新
                </h2>
                <p className="text-gray-700 mb-4">
                  我们可能会不时更新本隐私政策。更新后的政策将在本页面上公布，
                  并在生效日期后适用。重大变更将通过电子邮件或其他方式通知您。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="mr-2 h-6 w-6 text-purple-600" />
                  联系我们
                </h2>
                <p className="text-gray-700 mb-4">
                  如果您对本隐私政策有任何疑问、建议或投诉，
                  请通过以下方式联系我们：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>电子邮件：privacy@science-horoscope.com</li>
                  <li>访问 <Link href="/contact" className="text-purple-600 hover:underline">联系我们</Link> 页面</li>
                </ul>
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
            <Link href="/terms" className="hover:text-gray-300">
              服务条款
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