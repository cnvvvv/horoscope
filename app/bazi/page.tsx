// 📊 Horoscope Bazi Display
// 八字排盘结果页面 - 四柱八字展示

'use client';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Star, Calculator } from 'lucide-react';

// 导入类型
import { Bazi, BaziPillar, WuxingAnalysis, ShenAnalysis, DaYunCycle } from '../../types/horoscope';

export default function BaziDisplayPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  const [bazi, setBazi] = useState<Bazi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBazi() {
      try {
        setLoading(true);
        
        // 从URL获取参数
        const year = searchParams.get('year');
        const month = searchParams.get('month');
        const day = searchParams.get('day');
        const hour = searchParams.get('hour');
        const gender = searchParams.get('gender') as 'male' | 'female' | null;
        const type = searchParams.get('type') as 'lunar' | 'solar' | null;
        const name = searchParams.get('name');

        if (!year || !month || !day || !hour || !gender) {
          throw new Error('Missing required parameters');
        }

        // 调用后端API
        const response = await fetch(`/api/bazi?year=${year}&month=${month}&day=${day}&hour=${hour}&gender=${gender}&type=${type}${name ? `&name=${name}` : ''}`);
        
        if (!response.ok) {
          throw new Error('Failed to calculate bazi');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Unknown error');
        }

        setBazi(data.bazi);
        
        // 存储到本地
        if (typeof window !== 'undefined') {
          localStorage.setItem('horoscope_current_bazi', JSON.stringify(data.bazi));
          localStorage.setItem('horoscope_last_name', name || '');
        }
        
      } catch (err) {
        console.error('Error fetching bazi:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchBazi();
  }, [searchParams]);

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700">计算八字命局中...</p>
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
            <Calculator className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">计算失败</h2>
            <p className="text-gray-700 mt-2">{error}</p>
          </div>
          <Link
              href="/input"
              className="block w-full text-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            ← 返回重新输入
          </Link>
        </div>
      </div>
    );
  }

  // 显示八字结果
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 导航 */}
          <nav className="flex items-center justify-between mb-8">
            <Link href="/input" className="flex items-center text-gray-700 hover:text-purple-600 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回
            </Link>
            <div className="flex space-x-4">
              <Link href="/wuxing" className="text-gray-700 hover:text-purple-600 transition-colors">
                五行分析
              </Link>
              <Link href="/shen" className="text-gray-700 hover:text-purple-600 transition-colors">
                十神分析
              </Link>
              <Link href="/dayun" className="text-gray-700 hover:text-purple-600 transition-colors">
                大运流年
              </Link>
            </div>
          </nav>

          {/* 八字排盘展示 */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* 用户信息 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">您的八字命局</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">出生信息</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {bazi.birthType === 'solar' ? '公历' : '农历'} {bazi.birthDate ? bazi.birthDate.toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">出生时辰</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {bazi.birthType === 'solar' ? '公历' : '农历'} {bazi.birthDate ? bazi.birthDate.toLocaleTimeString() : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 四柱八字 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">四柱八字</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {/* 年柱 */}
                <PillarDisplay
                  pillar={bazi.year}
                  label="年柱"
                  color="bg-blue-50 border-blue-200"
                />
                
                {/* 月柱 */}
                <PillarDisplay
                  pillar={bazi.month}
                  label="月柱"
                  color="bg-green-50 border-green-200"
                />
                
                {/* 日柱 */}
                <PillarDisplay
                  pillar={bazi.day}
                  label="日柱"
                  color="bg-purple-50 border-purple-200"
                />
                
                {/* 时柱 */}
                <PillarDisplay
                  pillar={bazi.hour}
                  label="时柱"
                  color="bg-orange-50 border-orange-200"
                />
              </div>
            </div>
          </div>

          {/* 天干地支说明 */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">天干地支说明</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ExplanationCard
                title="天干"
                description="天干代表天，有10个：甲、乙、丙、丁、戊、己、庚、辛、壬、癸"
                color="text-blue-600"
              />
              
              <ExplanationCard
                title="地支"
                description="地支代表地，有12个：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥"
                color="text-green-600"
              />
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link
              href="/wuxing"
              className="flex-1 items-center justify-center px-6 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <Star className="mr-2 h-6 w-6" />
              查看五行分析
            </Link>
            <Link
              href="/shen"
              className="flex-1 items-center justify-center px-6 py-4 bg-white text-purple-900 border-2 border-purple-600 text-lg font-semibold rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              查看十神分析
            </Link>
          </div>

          {/* 温馨提示 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start">
              <span className="text-yellow-600 text-2xl mr-3">💡</span>
              <div>
                <p className="text-yellow-900 font-semibold mb-2">查看完整分析</p>
                <p className="text-yellow-800 text-sm">
                  点击上方按钮可以查看详细的五行分析、十神体系、大运流年等内容。
                </p>
              </div>
            </div>
          </div>

          {/* 免责声明 */}
          <div className="text-center text-sm text-gray-600 mt-8">
            <p className="mb-2">
              ⚠️ 本工具基于传统算法模型进行逻辑推演，结果仅供娱乐与文化交流参考
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

// 柱展示组件
function PillarDisplay({ pillar, label, color }: { pillar: BaziPillar, label: string, color: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${color} rounded-lg p-4 ${expanded ? 'col-span-2' : ''}`}>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">{label}</p>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="text-4xl font-bold text-gray-900">
            {pillar.heavenlyStem}
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {pillar.earthlyBranch}
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-purple-600 text-sm hover:text-purple-800 transition-colors"
        >
          {expanded ? '收起' : '展开查看藏干藏支'}
        </button>
      </div>
      
      {/* 藏干藏支 */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {pillar.hiddenHeavenlyStem && (
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-gray-700">藏干</p>
                <p className="text-gray-600">{pillar.hiddenHeavenlyStem}</p>
              </div>
            )}
            {pillar.hiddenEarthlyBranch && (
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-gray-700">藏支</p>
                <p className="text-gray-600">{pillar.hiddenEarthlyBranch}</p>
              </div>
            )}
            {pillar.hiddenHeavenlyStem2 && (
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-gray-700">中气藏干</p>
                <p className="text-gray-600">{pillar.hiddenHeavenlyStem2}</p>
              </div>
            )}
            {pillar.hiddenEarthlyBranch2 && (
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-gray-700">中气藏支</p>
                <p className="text-gray-600">{pillar.hiddenEarthlyBranch2}</p>
              </div>
            )}
            {pillar.hiddenHeavenlyStem3 && (
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-gray-700">余气藏干</p>
                <p className="text-gray-600">{pillar.hiddenHeavenlyStem3}</p>
              </div>
            )}
            {pillar.hiddenEarthlyBranch3 && (
              <div className="bg-white rounded p-2">
                <p className="font-semibold text-gray-700">余气藏支</p>
                <p className="text-gray-600">{pillar.hiddenEarthlyBranch3}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 说明卡片组件
function ExplanationCard({ title, description, color }: { title: string, description: string, color: string }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className={`font-bold ${color} mb-2`}>{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
}
