// 📞 联系我们页
// 科学算命平台联系方式

'use client';

import Link from 'next/link';
import { Calculator, Mail, Phone, MapPin, MessageSquare, Clock, Users } from 'lucide-react';

export default function ContactPage() {
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
          <Link href="/contact" className="text-purple-600 font-semibold">
            联系我们
          </Link>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              联系我们
            </h1>
            <p className="text-xl text-gray-600">
              我们随时准备为您服务
            </p>
          </div>

          {/* 联系信息 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 联系方式卡片 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                联系方式
              </h2>
              <div className="space-y-6">
                <ContactItem
                  icon={<Mail className="h-6 w-6" />}
                  title="邮箱"
                  content="support@science-horoscope.com"
                  description="工作日24小时内回复"
                />
                <ContactItem
                  icon={<Phone className="h-6 w-6" />}
                  title="电话"
                  content="400-123-4567"
                  description="工作日 9:00-18:00"
                />
                <ContactItem
                  icon={<MapPin className="h-6 w-6" />}
                  title="地址"
                  content="北京市朝阳区科技园区创新大厦"
                  description="预约参观"
                />
                <ContactItem
                  icon={<Clock className="h-6 w-6" />}
                  title="工作时间"
                  content="周一至周五 9:00-18:00"
                  description="节假日休息"
                />
              </div>
            </div>

            {/* 快速反馈 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                快速反馈
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="请输入您的邮箱"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    主题
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">请选择主题</option>
                    <option value="bug">问题反馈</option>
                    <option value="feature">功能建议</option>
                    <option value="cooperation">商务合作</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    留言内容
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="请输入您的内容"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  发送反馈
                </button>
              </form>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              常见问题
            </h2>
            <div className="space-y-4">
              <FAQItem
                question="我的个人信息会被保存吗？"
                answer="不会，所有计算结果都保存在您的本地设备中，不会上传到任何服务器。"
              />
              <FAQItem
                question="测算结果有多准确？"
                answer="结果基于传统命理理论和现代算法，仅供娱乐参考，不应作为决策的唯一依据。"
              />
              <FAQItem
                question="如何删除我的历史记录？"
                answer="您可以通过浏览器的清除数据功能删除所有历史记录，或使用浏览器的隐私模式。"
              />
              <FAQItem
                question="支持哪些地区的时区？"
                answer="本平台支持全球所有时区，请在输入时选择正确的时区。"
              />
            </div>
          </div>

          {/* 社交媒体 */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              关注我们
            </h2>
            <div className="flex justify-center space-x-6">
              <a href="#" className="bg-purple-600 text-white p-4 rounded-full hover:bg-purple-700 transition-colors">
                <MessageSquare className="h-6 w-6" />
              </a>
              <a href="#" className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors">
                <Users className="h-6 w-6" />
              </a>
              <a href="#" className="bg-green-600 text-white p-4 rounded-full hover:bg-green-700 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* 返回按钮 */}
          <div className="text-center">
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
            <Link href="/privacy" className="hover:text-gray-300">
              隐私政策
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 联系方式项组件
function ContactItem({ icon, title, content, description }: {
  icon: React.ReactNode,
  title: string,
  content: string,
  description: string
}) {
  return (
    <div className="flex items-start">
      <div className="text-purple-600 mr-4 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-gray-900 mb-1">
          {content}
        </p>
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}

// FAQ项组件
function FAQItem({ question, answer }: {
  question: string,
  answer: string
}) {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-b-0">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {question}
      </h3>
      <p className="text-gray-700">
        {answer}
      </p>
    </div>
  );
}