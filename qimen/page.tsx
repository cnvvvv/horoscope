// 🎯 奇门遁甲主页 - 输入页面
// Qimen Dunjia Input Page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { QimenCategory } from '@/types/qimen';

export default function QimenInputPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: QimenCategory.WEALTH,
    question: '',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours()
  });
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    { value: QimenCategory.WEALTH, label: '求财', icon: '💰', description: '生意/投资/财运' },
    { value: QimenCategory.CAREER, label: '事业', icon: '💼', description: '求职/升职/工作' },
    { value: QimenCategory.LOVE, label: '感情', icon: '❤️', description: '婚恋/桃花/感情' },
    { value: QimenCategory.LOST, label: '寻人寻物', icon: '🔍', description: '找人/找物/失物' },
    { value: QimenCategory.TRAVEL, label: '出行', icon: '✈️', description: '旅游/出行/远行' },
    { value: QimenCategory.HEALTH, label: '健康', icon: '🏥', description: '疾病/养生/健康' },
    { value: QimenCategory.LAWSUIT, label: '官司', icon: '⚖️', description: '诉讼/维权/官司' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 构建查询参数
      const params = new URLSearchParams({
        year: formData.year.toString(),
        month: formData.month.toString(),
        day: formData.day.toString(),
        hour: formData.hour.toString(),
        category: formData.category
      });

      if (formData.question) {
        params.append('question', formData.question);
      }

      // 跳转到结果页
      router.push(`/qimen/result?${params.toString()}`);
    } catch (error) {
      console.error('Submit error:', error);
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* 头部导航 */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-800">
            奇门决策
          </span>
        </div>
      </nav>

      {/* 主要内容区 */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              知命而行，顺势而为
            </h1>
            <p className="text-lg text-gray-700">
              奇门遁甲决策系统 - 特定时间、地点、事件的吉凶推演
            </p>
          </div>

          {/* 输入表单 */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            {/* 事项分类选择 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                请选择您想问的事
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: option.value })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.category === option.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 具体问题输入 */}
            <div className="mb-6">
              <label htmlFor="question" className="block text-lg font-semibold text-gray-900 mb-2">
                具体描述（可选）
              </label>
              <input
                type="text"
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="例如：我想投资股票，现在合适吗？"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* 起盘时间选择 */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                <Clock className="inline h-5 w-5 mr-2" />
                起盘时间
              </label>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-700 mb-3">
                  默认当前时间（正时起盘，适用于"我现在想做什么"）
                </p>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      年
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {Array.from({ length: 130 }, (_, i) => (
                        <option key={i} value={1990 + i}>
                          {1990 + i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      月
                    </label>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}月
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      日
                    </label>
                    <select
                      value={formData.day}
                      onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}日
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      时
                    </label>
                    <select
                      value={formData.hour}
                      onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {i}时
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white text-lg font-semibold py-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  起盘中...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-5 w-5" />
                  立即起卦
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* 提示信息 */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              💡 使用提示
            </h3>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• 奇门遁甲侧重于"特定时间、地点、事件"的吉凶推演</li>
              <li>• 请选择准确的事项分类，以便系统匹配正确的"用神"逻辑</li>
              <li>• 默认使用当前时间起盘（正时起盘），适合"我现在想做什么"</li>
              <li>• 如需问未来或过去的事，可手动调整时间</li>
              <li>• 结果仅供参考，请理性看待，切勿迷信</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
