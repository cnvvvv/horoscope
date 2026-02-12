// 📅 Horoscope Da Yun Display
// 大运流年页面 - 10年大运周期和流年分析

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Star, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

// 导入类型
import { DaYunCycle, DaYunPhase, LiuNian } from '@/types/horoscope';

export default function DaYunDisplayPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  const [dayun, setDaYun] = useState<DaYunCycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDaYun() {
      try {
        setLoading(true);
        
        // 从URL获取参数
        const year = searchParams.get('year');
        const month = searchParams.get('month');
        const day = searchParams.get('day');
        const hour = searchParams.get('hour');
        const gender = searchParams.get('gender') as 'male' | 'female' | null;
        const type = searchParams.get('type') as 'lunar' | 'solar' | null;
        const currentAge = searchParams.get('currentAge');
        const currentYear = searchParams.get('currentYear');

        if (!year || !month || !day || !hour || !gender || !currentAge || !currentYear) {
          throw new Error('Missing required parameters');
        }

        // 调用后端API
        const response = await fetch(`/api/dayun?year=${year}&month=${month}&day=${day}&hour=${hour}&gender=${gender}&type=${type}&currentAge=${currentAge}&currentYear=${currentYear}`);
        
        if (!response.ok) {
          throw new Error('Failed to calculate dayun');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Unknown error');
        }

        setDaYun(data.dayun);
        setSelectedYear(parseInt(currentYear));
        
        // 存储到本地
        if (typeof window !== 'undefined') {
          localStorage.setItem('horoscope_last_dayun', JSON.stringify(data.dayun));
        }
        
      } catch (err) {
        console.error('Error fetching dayun:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchDaYun();
  }, [searchParams]);

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700">分析大运流年中...</p>
        </div>
      </div>
    );
  }

  // 显示错误状态
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900">计算失败</h2>
            <p className="text-gray-700 mt-2">{error}</p>
          </div>
          <Link
              href="/input"
              className="block w-full text-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            返回重新输入
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* 导航 */}
          <nav className="flex items-center justify-between mb-8">
            <Link href="/bazi" className="flex items-center text-gray-700 hover:text-purple-600 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回八字排盘
            </Link>
            <div className="flex space-x-4">
              <Link href="/wuxing" className="text-gray-700 hover:text-purple-600 transition-colors">
                五行分析
              </Link>
              <Link href="/shen" className="text-gray-700 hover:text-purple-600 transition-colors">
                十神分析
              </Link>
            </div>
          </nav>

          {/* 大运周期时间轴 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">10年大运周期</h2>
              <Link
                  href="/input"
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                重新计算
              </Link>
            </div>
            
            {/* 时间轴 */}
            <div className="relative overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {dayun?.phases && dayun.phases.length > 0 ? (
                  dayun.phases.map((phase, index) => (
                    <div 
                        key={index}
                        onClick={() => setSelectedYear(phase.year)}
                        className={`flex-shrink-0 w-48 p-4 rounded-xl cursor-pointer transition-all ${
                          selectedYear === phase.year
                            ? 'bg-purple-600 text-white shadow-2xl scale-105'
                            : phase.age <= new Date().getFullYear() && phase.ageEnd >= new Date().getFullYear()
                              ? 'bg-blue-100 border-2 border-blue-300'
                              : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                      <div className="text-center">
                        <p className="text-sm font-semibold mb-2">第 {phase.phaseNumber} 阶段</p>
                        <p className="text-2xl font-bold mb-1">
                          {phase.heavenlyStem}{phase.earthlyBranch}
                        </p>
                        <p className="text-xs mb-3">
                          {phase.age}-{phase.ageEnd} 岁
                        </p>
                        <div className={`flex items-center justify-center space-x-1 ${
                          phase.score >= 70 ? 'text-green-700' :
                          phase.score >= 50 ? 'text-yellow-700' :
                          phase.score >= 30 ? 'text-orange-700' :
                          'text-red-700'
                        }`}>
                          <p className="text-xs">
                            {phase.score >= 70 ? '吉' :
                             phase.score >= 50 ? '中' :
                             phase.score >= 30 ? '小' : '凶'}
                          </p>
                          <span className="font-bold">{phase.score}分</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">暂无大运数据</p>
                )}
              </div>
            </div>
          </div>

          {/* 当前大运详情 */}
          {dayun?.currentPhase && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="h-8 w-8 mr-3 text-purple-600" />
                当前大运
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">年龄范围</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dayun.currentPhase.age} - {dayun.currentPhase.ageEnd} 岁
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">起止年份</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dayun.currentPhase.year} - {dayun.currentPhase.year + 9} 年
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-purple-900 mb-3">大运干支</p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-white rounded-lg p-4 text-center shadow-md">
                    <p className="text-4xl font-bold text-gray-900">{dayun.currentPhase.heavenlyStem}</p>
                    <p className="text-sm text-gray-600">天干</p>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-4 text-center shadow-md">
                    <p className="text-4xl font-bold text-gray-900">{dayun.currentPhase.earthlyBranch}</p>
                    <p className="text-sm text-gray-600">地支</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <p className="text-sm text-yellow-900 mb-3">大运分析</p>
                <p className="text-gray-900 text-lg leading-relaxed">
                  {dayun.currentPhase.analysis}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">评分</p>
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-purple-600">{dayun.currentPhase.score}</span>
                    <span className="text-sm text-gray-600 ml-2">/ 100</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">吉凶判断</p>
                  <div className={`text-xl font-bold ${
                    dayun.currentPhase.score >= 70 ? 'text-green-700' :
                    dayun.currentPhase.score >= 50 ? 'text-yellow-700' :
                    dayun.currentPhase.score >= 30 ? 'text-orange-700' :
                    'text-red-700'
                  }`}>
                    {dayun.currentPhase.score >= 70 ? '大吉' :
                     dayun.currentPhase.score >= 50 ? '中吉' :
                     dayun.currentPhase.score >= 30 ? '偏吉' : '偏凶'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 流年详情 */}
          {selectedYear && dayun?.currentYear && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Calendar className="h-8 w-8 mr-3 text-purple-600" />
                  {selectedYear}年流年详情
                </h2>
                {dayun.currentYear && (
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-600">评分:</p>
                    <span className={`text-2xl font-bold ${
                      dayun.currentYear.score >= 70 ? 'text-green-700' :
                      dayun.currentYear.score >= 50 ? 'text-yellow-700' :
                      dayun.currentYear.score >= 30 ? 'text-orange-700' :
                      'text-red-700'
                    }`}>
                      {dayun.currentYear.score}分
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-blue-900 mb-3">流年干支</p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-white rounded-lg p-4 text-center shadow-md">
                    <p className="text-3xl font-bold text-gray-900">{dayun.currentYear.heavenlyStem}</p>
                    <p className="text-sm text-gray-600">天干</p>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-4 text-center shadow-md">
                    <p className="text-3xl font-bold text-gray-900">{dayun.currentYear.earthlyBranch}</p>
                    <p className="text-sm text-gray-600">地支</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <p className="text-sm text-purple-900 mb-3">流年分析</p>
                <p className="text-gray-900 text-lg leading-relaxed">
                  {dayun.currentYear.analysis}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-start">
                  <TrendingUp className="h-6 w-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-green-900 mb-2">运势上升</p>
                    <p className="text-green-800 text-sm">
                      该年总体运势偏向积极，适合积极进取
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 总体评分 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">大运周期综合评分</h2>
              <div className="text-right">
                <span className="text-sm text-gray-600 mr-2">总评分</span>
                <span className={`text-4xl font-bold ${
                  dayun && dayun.score >= 70 ? 'text-green-700' :
                  dayun && dayun.score >= 50 ? 'text-yellow-700' :
                  dayun && dayun.score >= 30 ? 'text-orange-700' :
                  'text-red-700'
                }`}>
                  {(dayun && dayun.score) || 50}分
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-center font-bold text-green-900 mb-2">上升</p>
                <p className="text-3xl font-bold text-green-700">
                  {dayun?.phases.filter(p => p.score >= 70).length}
                </p>
                <p className="text-xs text-green-600">个大运阶段</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-center font-bold text-gray-900 mb-2">平稳</p>
                <p className="text-3xl font-bold text-gray-700">
                  {dayun?.phases.filter(p => p.score >= 50 && p.score < 70).length}
                </p>
                <p className="text-xs text-gray-600">个大运阶段</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-center font-bold text-red-900 mb-2">下降</p>
                <p className="text-3xl font-bold text-red-700">
                  {dayun?.phases.filter(p => p.score < 50).length}
                </p>
                <p className="text-xs text-red-600">个大运阶段</p>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link
                href="/year-fortune"
                className="flex-1 items-center justify-center px-6 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <Star className="mr-2 h-5 w-5" />
              今年运势
            </Link>
            <Link
                href="/input"
                className="flex-1 items-center justify-center px-6 py-4 bg-white text-purple-900 border-2 border-purple-600 text-lg font-semibold rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              重新计算
            </Link>
          </div>

          {/* 免责声明 */}
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              ⚠️ 大运流年分析基于传统命理模型，结果仅供娱乐与文化交流参考
            </p>
            <p>
              请勿作为生活决策的唯一依据。科学理性，相信未来。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
