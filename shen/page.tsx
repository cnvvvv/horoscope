// 🌙 Horoscope Shen Display
// 十神分析页面 - 日主十神体系

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Star, Zap, Shield, TrendingUp, RefreshCw } from 'lucide-react';
import { ShenAnalysis, ShenType, ShenSystem } from '@/types/horoscope';

// 十神信息常量
const SHEN_INFO = {
  ZHENG_CAI: { name: '正财', icon: '💰', color: '#22c55e', description: '代表稳定的财运，正财之人理财能力强' },
  PIAN_CAI: { name: '偏财', icon: '🤑', color: '#3b82f6', description: '代表意外之财，偏财之人有横财机会' },
  QI_SHA: { name: '七杀', icon: '⚔️', color: '#ef4444', description: '代表压力和挑战，七杀之人有领导力' },
  ZHENG_GUAN: { name: '正官', icon: '👑', color: '#8b5cf6', description: '代表事业和地位，正官之人有责任感' },
  ZHENG_YIN: { name: '正印', icon: '📚', color: '#f59e0b', description: '代表智慧和贵人，正印之人学习能力强' },
  PIAN_YIN: { name: '偏印', icon: '🧠', color: '#10b981', description: '代表灵感和创意，偏印之人思维独特' },
  SHANG_GUAN: { name: '伤官', icon: '🔥', color: '#ec4899', description: '代表才华和表达，伤官之人有艺术天赋' },
  SHI_SHEN: { name: '食神', icon: '🍽️', color: '#6366f1', description: '代表享受和福气，食神之人生活品质高' },
  BI_JIAN: { name: '比肩', icon: '🤝', color: '#06b6d4', description: '代表竞争和朋友，比肩之人有团队精神' },
  JIE_CAI: { name: '劫财', icon: '⚡', color: '#f97316', description: '代表争夺和消耗，劫财之人需要谨慎理财' },
  WU_CAI: { name: '无财', icon: '💤', color: '#6b7280', description: '日主未发现明显财星，财运平缓' },
  WU_GUAN: { name: '无官', icon: '📝', color: '#6b7280', description: '日主未发现明显官星，事业运平稳' },
  WU_YIN: { name: '无印', icon: '📖', color: '#6b7280', description: '日主未发现明显印星，学习运平稳' }
};

export default function ShenDisplayPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  const [shen, setShen] = useState<ShenAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShen() {
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
        const response = await fetch(`/api/shen?year=${year}&month=${month}&day=${day}&hour=${hour}&gender=${gender}&type=${type}`);
        
        if (!response.ok) {
          throw new Error('Failed to calculate shen');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Unknown error');
        }

        setShen(data.shen);
        
        // 存储到本地
        if (typeof window !== 'undefined') {
          localStorage.setItem('horoscope_last_shen', JSON.stringify(data.shen));
        }
        
      } catch (err) {
        console.error('Error fetching shen:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchShen();
  }, [searchParams]);

  // 十神信息
  const getShenInfo = (type: ShenType): { icon: string, color: string, description: string } => {
    switch (type) {
      case ShenType.ZHENG_CAI:
        return { icon: '💰', color: 'text-yellow-600', description: '偏官之财星，主财源' };
      case ShenType.PIAN_CAI:
        return { icon: '💸', color: 'text-yellow-600', description: '副财星，非主财源' };
      case ShenType.QI_SHA:
        return { icon: '⚔️', color: 'text-red-600', description: '约束日主，影响事业运' };
      case ShenType.ZHENG_GUAN:
        return { icon: '⚖️', color: 'text-purple-600', description: '官运星，主事业和权力' };
      case ShenType.ZHENG_YIN:
        return { icon: '📖', color: 'text-blue-600', description: '正印星，主智慧和学习' };
      case ShenType.PIAN_YIN:
        return { icon: '📙', color: 'text-blue-600', description: '副印星，副学习智慧' };
      case ShenType.SHANG_GUAN:
        return { icon: '⚡', color: 'text-orange-600', description: '挫折和克制' };
      case ShenType.SHI_SHEN:
        return { icon: '💡', color: 'text-orange-600', description: '主智思和学习' };
      case ShenType.BI_JIAN:
        return { icon: '🤝', color: 'text-green-600', description: '同类竞争，善于合作' };
      case ShenType.JIE_CAI:
        return { icon: '💸', color: 'text-red-600', description: '财星被克，破财' };
      default:
        return { icon: '❓', color: 'text-gray-600', description: '未知十神' };
    }
  };

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700">分析十神体系中...</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">计算失败</h2>
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
              <Link href="/wuxing" className="text-gray-700 hover:text-purple-600 transition-colors">
                五行分析
              </Link>
              <Link href="/dayun" className="text-gray-700 hover:text-purple-600 transition-colors">
                大运流年
              </Link>
            </div>
          </nav>

          {/* 十神体系展示 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <Star className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">您的十神体系</h2>
            </div>
            
            {shen?.dayShen && (
              <div className="bg-purple-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                  <User className="h-6 w-6 mr-2" />
                  日主十神
                </h3>
                <div className="flex items-start">
                  <span className="text-4xl mr-4">
                    {getShenInfo(shen.dayShen.type).icon}
                  </span>
                  <div>
                    <p className={`font-bold text-lg ${getShenInfo(shen.dayShen.type).color}`}>
                      {shen.dayShen.name}
                    </p>
                    <p className="text-gray-700 text-sm mt-1">
                      {getShenInfo(shen.dayShen.type).description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 十神分类 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 日主十神 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-6 w-6 text-blue-600 mr-2" />
                日主十神
              </h3>
              <div className="space-y-3">
                {shen?.dayShen ? (
                  <div className={`rounded-lg p-4 ${
                    shen.dayShen.positive ? 'bg-green-50 border-l-4 border-green-500' :
                    shen.dayShen.negative ? 'bg-red-50 border-l-4 border-red-500' :
                    'bg-gray-50 border-l-4 border-gray-500'
                  }`}>
                    <p className="font-semibold text-lg mb-2">{shen.dayShen.name}</p>
                    <p className="text-gray-800 mb-2">{shen.dayShen.description}</p>
                    <div className="flex items-center text-sm">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: SHEN_INFO[shen.dayShen.type as unknown as keyof typeof SHEN_INFO]?.color || '#6b7280' }}></span>
                      <span className="text-gray-600">{shen.dayShen.positive ? '吉神' : shen.dayShen.negative ? '凶神' : '中性'}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">未找到日主十神信息</p>
                )}
              </div>
            </div>
            
            {/* 十神统计 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Star className="h-6 w-6 text-yellow-600 mr-2" />
                十神统计
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">吉神数量</span>
                  <span className="text-green-600 font-bold text-xl">{shen?.shenCount.positive || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">凶神数量</span>
                  <span className="text-red-600 font-bold text-xl">{shen?.shenCount.negative || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">中性十神</span>
                  <span className="text-gray-600 font-bold text-xl">{shen?.shenCount.neutral || 0}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {shen?.shenCount && shen.shenCount.positive > shen.shenCount.negative ? '吉神占优，运势较好' :
                     shen?.shenCount && shen.shenCount.negative > shen.shenCount.positive ? '凶神占优，需要谨慎' :
                     '吉凶平衡，运势平稳'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 十神建议 */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-7 w-7 text-purple-600 mr-2" />
              十神建议
            </h2>
            <div className="space-y-4">
              {shen?.suggestions && shen.suggestions.length > 0 ? (
                shen.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 font-bold mr-2 flex-shrink-0">💡</span>
                    <p className="text-gray-800">{suggestion}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">暂无特别建议</p>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link
              href="/wuxing"
              className="flex-1 items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              查看五行分析
            </Link>
            <Link
              href="/dayun"
              className="flex-1 items-center justify-center px-6 py-4 bg-white text-purple-900 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              查看大运流年
            </Link>
          </div>

          {/* 责任声明 */}
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              ⚠️ 十神分析基于传统命理模型，结果仅供娱乐与文化交流参考
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
