'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, Calendar, Clock, User } from 'lucide-react';

export default function InputPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    gender: 'male',
    calendarType: 'solar'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 验证日期
      const birthDate = new Date(formData.year, formData.month - 1, formData.day, formData.hour, formData.minute);

      // 存储到localStorage
      localStorage.setItem('baziInput', JSON.stringify({
        ...formData,
        birthDate: birthDate.toISOString()
      }));

      // 跳转到结果页面
      router.push('/result');
    } catch (error) {
      console.error('提交错误:', error);
      alert('提交失败，请检查输入');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 头部导航 */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-800">科学算命</span>
        </Link>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              八字测算信息录入
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 姓名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  姓名（可选）
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="请输入姓名"
                />
              </div>

              {/* 历法类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  历法类型
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="solar"
                      checked={formData.calendarType === 'solar'}
                      onChange={(e) => setFormData({ ...formData, calendarType: e.target.value })}
                      className="mr-2"
                    />
                    公历（阳历）
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="lunar"
                      checked={formData.calendarType === 'lunar'}
                      onChange={(e) => setFormData({ ...formData, calendarType: e.target.value })}
                      className="mr-2"
                    />
                    农历（阴历）
                  </label>
                </div>
              </div>

              {/* 日期选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  出生日期
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">年</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {Array.from({ length: 211 }, (_, i) => 1900 + i).map(year => (
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
                </div>
              </div>

              {/* 时间选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  出生时辰
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">时（0-23）</label>
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
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">分（0-59）</label>
                    <select
                      value={formData.minute}
                      onChange={(e) => setFormData({ ...formData, minute: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {Array.from({ length: 60 }, (_, i) => i * 5).map(minute => (
                        <option key={minute} value={minute}>{minute}分</option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  * 如不知道具体时间，可选择大概时间
                </p>
              </div>

              {/* 性别 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  性别
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="mr-2"
                    />
                    男
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="mr-2"
                    />
                    女
                  </label>
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                >
                  {isLoading ? '计算中...' : '开始测算'}
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  返回
                </Link>
              </div>
            </form>

            {/* 提示信息 */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 提示：请确保输入准确的出生时间，时辰的准确性会影响八字排盘的精确度。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 简单的Link组件，因为这里不能使用next/link
function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
