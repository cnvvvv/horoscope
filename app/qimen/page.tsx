'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, Compass } from 'lucide-react';

export default function QimenPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: 1,
    day: 1,
    hour: new Date().getHours(),
    question: '',
    questionType: 'career'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 调用奇门遁甲API
      const response = await fetch('/api/qimen/pai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: formData.year,
          month: formData.month,
          day: formData.day,
          hour: formData.hour
        })
      });

      if (!response.ok) throw new Error('API调用失败');

      const result = await response.json();

      // 存储结果
      localStorage.setItem('qimenResult', JSON.stringify({
        ...result,
        question: formData.question,
        questionType: formData.questionType
      }));

      // 跳转到结果页面
      window.location.href = '/qimen-result';
    } catch (error) {
      console.error('奇门遁甲计算错误:', error);
      alert('计算失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* 头部导航 */}
      <nav className="container mx-auto px-6 py-4">
        <a href="/" className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-800">科学算命</span>
        </a>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Compass className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              奇门遁甲决策系统
            </h1>
            <p className="text-lg text-gray-700">
              基于特定时间和问题的吉凶推演，为您的决策提供参考
            </p>
          </div>

          {/* 功能说明 */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🔮 奇门遁甲应用场景
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-semibold text-indigo-900 mb-1">求财</div>
                <div className="text-sm text-gray-600">投资、生意、财运</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">💼</div>
                <div className="font-semibold text-purple-900 mb-1">事业</div>
                <div className="text-sm text-gray-600">求职、升职、工作</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl mb-2">❤️</div>
                <div className="font-semibold text-pink-900 mb-1">感情</div>
                <div className="text-sm text-gray-600">婚恋、桃花、关系</div>
              </div>
            </div>
          </div>

          {/* 输入表单 */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              设定决策时间
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 问题类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  决策类型
                </label>
                <select
                  value={formData.questionType}
                  onChange={(e) => setFormData({ ...formData, questionType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="career">事业发展</option>
                  <option value="wealth">求财投资</option>
                  <option value="relationship">感情婚姻</option>
                  <option value="health">健康养生</option>
                  <option value="study">学业考试</option>
                  <option value="travel">出行搬家</option>
                  <option value="litigation">官司诉讼</option>
                  <option value="other">其他问题</option>
                </select>
              </div>

              {/* 具体问题 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  具体问题（可选）
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="请简要描述您想要决策的问题..."
                />
              </div>

              {/* 日期时间选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  决策时间
                </label>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">年</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">月</label>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}月</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">日</label>
                    <select
                      value={formData.day}
                      onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}日</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">时</label>
                    <select
                      value={formData.hour}
                      onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                        <option key={hour} value={hour}>{hour}时</option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 默认使用当前时间，您也可以选择特定的决策时刻
                </p>
              </div>

              {/* 提交按钮 */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors disabled:from-gray-400 disabled:to-gray-500"
                >
                  {isLoading ? '起盘计算中...' : '开始起盘决策'}
                </button>
                <a
                  href="/"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  返回
                </a>
              </div>
            </form>

            {/* 提示信息 */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                ⚠️ 免责声明：奇门遁甲结果仅供参考和娱乐，不可作为重大决策的唯一依据。
                理性对待，相信科学。
              </p>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📖 使用说明
            </h3>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">1.</span>
                <span>选择您想要决策的问题类型</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">2.</span>
                <span>输入具体问题（可选，帮助更精准的分析）</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">3.</span>
                <span>选择决策时间（默认为当前时间）</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">4.</span>
                <span>点击"开始起盘决策"获取分析结果</span>
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
