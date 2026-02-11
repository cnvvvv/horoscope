// 📊 Horoscope Wu Xing Display
// 五行分析页面 - 五行环形图和详细分析

'use client';

import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, TrendingUp, TrendingDown, Circle, RefreshCw } from 'lucide-react';

// 导入类型
import { Bazi, WuXingAnalysis, WuXingScore, WU_XING_COLORS, WU_XING_GRADIENTS } from '../../types/horoscope';

export default function WuXingDisplayPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  const [wuxing, setWuxing] = useState<WuXingAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<WuXing | null>(null);

  useEffect(() => {
    async function fetchWuXing() {
      try {
        setLoading(true);
        
        // 从URL获取参数
        const year = searchParams.get('year');
        const month = searchParams.get('month');
        const day = searchParams.get('day');
        const hour = searchParams.get('hour');
        const gender = searchParams.get('gender') as 'male' | 'female' | null;
        const type = searchParams.get('type') as 'lunar' | 'solar' | null;

        if (!year || !month || !day || !hour || !gender) {
          throw new Error('Missing required parameters');
        }

        // 调用后端API
        const response = await fetch(`/api/wuxing?year=${year}&month=${month}&day=${day}&hour=${hour}&gender=${gender}&type=${type}`);
        
        if (!response.ok) {
          throw new Error('Failed to calculate wuxing');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Unknown error');
        }

        setWuxing(data.wuxing);
        
        // 自动选择主导五行
        if (data.wuxing?.dominantElement) {
          setSelectedElement(data.wuxing.dominantElement);
        }
        
        // 存储到本地
        if (typeof window !== 'undefined') {
          localStorage.setItem('horoscope_last_wuxing', JSON.stringify(data.wuxing));
        }
        
      } catch (err) {
        console.error('Error fetching wuxing:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchWuXing();
  }, [searchParams]);

  // 五行名称和图标
  const WU_XING_INFO = {
    METAL: { name: '金', icon: '⚪', color: WU_XING_COLORS.metal, description: '代表财富、坚毅、正义' },
    WOOD: { name: '木', icon: '🌳', color: WU_XING_COLORS.wood, description: '代表生长、仁慈、创造力' },
    WATER: { name: '水', icon: '🌊', color: WU_XING_COLORS.water, description: '代表智慧、流动、适应' },
    FIRE: { name: '火', icon: '🔥', color: WU_XING_COLORS.fire, description: '代表热情、动力、变革' },
    EARTH: { name: '土', icon: '🌍', color: WU_XING_COLORS.earth, description: '代表稳定、耐心、包容' }
  };

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 mx-auto mb-4 text-purple-600 animate-spin" />
          <p className="text-gray-700">分析五行平衡中...</p>
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
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">分析失败</h2>
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

  // 显示五行分析结果
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 导航 */}
          <nav className="flex items-center justify-between mb-8">
            <Link href="/bazi" className="flex items-center text-gray-700 hover:text-purple-600 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回八字排盘
            </Link>
            <div className="flex space-x-4">
              <Link href="/shen" className="text-gray-700 hover:text-purple-600 transition-colors">
                十神分析
              </Link>
              <Link href="/dayun" className="text-gray-700 hover:text-purple-600 transition-colors">
                大运流年
              </Link>
            </div>
          </nav>

          {/* 五行环形图 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              五行平衡分析
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* 五行分布图 */}
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64">
                  {/* 模拟环形图 */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                    
                    {/* 金 */}
                    <circle cx="50" cy="25" r="23" fill={WU_XING_INFO.METAL.color} />
                    
                    {/* 木 */}
                    <circle cx="75" cy="50" r="23" fill={WU_XING_INFO.WOOD.color} />
                    
                    {/* 水 */}
                    <circle cx="50" cy="75" r="23" fill={WU_XING_INFO.WATER.color} />
                    
                    {/* 火 */}
                    <circle cx="25" cy="50" r="23" fill={WU_XING_INFO.FIRE.color} />
                    
                    {/* 土 */}
                    <circle cx="75" cy="75" r="23" fill={WU_XING_INFO.EARTH.color} />
                  </svg>
                </div>
                
                {/* 图例 */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
                  {Object.entries(WU_XING_INFO).map(([key, info]) => {
                    const count = wuxing?.scores[key]?.count || 0;
                    const percentage = count ? Math.round(count / 4 * 100) : 0;
                    
                    return (
                      <div key={key} className={`bg-white rounded-lg p-2 shadow-md border-2 ${info.color.replace('rgb', '').replace('#', 'border-')}`}>
                        <div className="font-bold text-gray-900 mb-1">{info.name}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">{count}个</span>
                          <span className="text-gray-600">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 五行强度分析 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">五行强度分析</h3>
                <div className="space-y-4">
                  {Object.entries(WU_XING_INFO).map(([key, info]) => {
                    const score = wuxing?.scores[key]?.strength || 0;
                    const balance = wuxing?.scores[key]?.balance || 'weak';
                    
                    return (
                      <div key={key} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{info.icon}</span>
                          <span className="font-semibold text-gray-900">{info.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <span className={`text-lg font-bold ${
                              balance === 'strong' ? 'text-green-600' :
                              balance === 'balanced' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {score}/10
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {balance === 'strong' ? '强' :
                             balance === 'balanced' ? '平衡' : '弱'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 平衡度评估 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">整体平衡度评估</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">平衡等级</p>
                <p className={`text-3xl font-bold ${
                  wuxing?.balanceLevel === 'balanced' ? 'text-green-600' :
                  wuxing?.balanceLevel === 'weak' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {wuxing?.balanceLevel === 'balanced' ? '和谐' :
                   wuxing?.balanceLevel === 'weak' ? '失衡' : '严重失衡'}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">主导五行</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-purple-900">{wuxing?.dominantElement || '无'}</span>
                  {wuxing?.dominantElement && (
                    <span className="ml-2 text-2xl">{WU_XING_INFO[wuxing?.dominantElement]?.icon}</span>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">综合评分</p>
                <p className="text-3xl font-bold text-gray-900">{wuxing?.overallScore || 50}</p>
                <p className="text-sm text-gray-600">/100</p>
              </div>
            </div>
          </div>

          {/* 缺失五行 */}
          {wuxing?.missingElements && wuxing.missingElements.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <span className="text-yellow-600 text-2xl mr-3">⚠️</span>
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">缺失五行</h3>
                  <div className="flex flex-wrap gap-2">
                    {wuxing.missingElements.map(element => {
                      const info = WU_XING_INFO[element];
                      return (
                        <span key={element} className={`inline-flex items-center px-3 py-1 rounded-full ${info.color}`}>
                          <span className="text-xl mr-1">{info.icon}</span>
                          <span className="font-semibold">{info.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 五行关系网 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">五行关系网</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">相生关系</h3>
                <div className="space-y-2">
                  {wuxing?.interactions.generated.map((rel, index) => (
                    <div key={index} className="flex items-start bg-green-50 rounded-lg p-3">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">{rel}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">相克关系</h3>
                <div className="space-y-2">
                  {wuxing?.interactions.克制.map((rel, index) => (
                    <div key={index} className="flex items-start bg-red-50 rounded-lg p-3">
                      <TrendingDown className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">{rel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 五行建议 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">智慧建议</h2>
            
            <div className="space-y-4">
              {wuxing?.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start bg-purple-50 rounded-lg p-4">
                  <Circle className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-semibold text-purple-900 mb-1">建议 #{index + 1}</p>
                    <p className="text-gray-800 text-sm">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link
              href="/bazi"
              className="flex-1 items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              重新计算
            </Link>
            <Link
              href="/shen"
              className="flex-1 items-center justify-center px-6 py-3 bg-white text-purple-900 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              查看十神分析
            </Link>
          </div>

          {/* 免责声明 */}
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              ⚠️ 五行分析基于传统命理模型，结果仅供娱乐与文化交流参考
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
