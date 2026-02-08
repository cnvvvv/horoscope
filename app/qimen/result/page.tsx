// 📊 奇门遁甲结果展示页面
// Qimen Dunjia Result Page

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Link } from 'next/link';
import {
  ArrowLeft, TrendingUp, TrendingDown, AlertTriangle,
  Clock, Compass, Star, RefreshCw, Info
} from 'lucide-react';
import {
  QimenPan, QimenAnalysis, JiuGong, QimenCategory
} from '../../types/qimen';
import { getScoreColor, getScoreDescription } from '../../lib/qimen-score';
import { QIMEN_TERMS } from '../../lib/qimen-core';

export default function QimenResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [pan, setPan] = useState<QimenPan | null>(null);
  const [analysis, setAnalysis] = useState<QimenAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGong, setSelectedGong] = useState<JiuGong | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<{ term: string; description: string } | null>(null);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        setLoading(true);
        
        const year = searchParams.get('year');
        const month = searchParams.get('month');
        const day = searchParams.get('day');
        const hour = searchParams.get('hour');
        const category = searchParams.get('category');
        const question = searchParams.get('question');

        if (!year || !month || !day || !hour || !category) {
          throw new Error('Missing required parameters');
        }

        // 调用分析API
        const response = await fetch(
          `/api/qimen/analyze?year=${year}&month=${month}&day=${day}&hour=${hour}&category=${category}${question ? `&question=${question}` : ''}`
        );

        if (!response.ok) {
          throw new Error('Failed to analyze qimen');
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Unknown error');
        }

        setAnalysis(data.analysis);
        setPan(data.analysis.pan);

        // 存储到本地
        if (typeof window !== 'undefined') {
          localStorage.setItem('qimen_last_analysis', JSON.stringify(data.analysis));
        }
      } catch (err) {
        console.error('Error fetching analysis:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, [searchParams]);

  const handleGongClick = (gong: JiuGong) => {
    setSelectedGong(gong);
    setSelectedTerm(null);
  };

  const handleTermClick = (term: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const description = QIMEN_TERMS[term] || '暂无解释';
    setSelectedTerm({ term, description });
  };

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 mx-auto mb-4 text-purple-600 animate-spin" />
          <p className="text-gray-700">分析奇门命盘中...</p>
        </div>
      </div>
    );
  }

  // 显示错误状态
  if (error || !analysis || !pan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">分析失败</h2>
            <p className="text-gray-700 mt-2">{error || '未知错误'}</p>
          </div>
          <Link
            href="/qimen"
            className="block w-full text-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            ← 返回重新输入
          </Link>
        </div>
      </div>
    );
  }

  const scoreColor = getScoreColor(analysis.scores.total);
  const scoreLevel = analysis.result.level;
  const scoreDescription = getScoreDescription(analysis.scores.total);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-12">
        {/* 头部导航 */}
        <nav className="flex items-center justify-between mb-8">
          <Link
            href="/qimen"
            className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            返回重新输入
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {pan.year}年{pan.month}月{pan.day}日 {pan.hour}时
            </span>
          </div>
        </nav>

        {/* 顶部结论卡片 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                当前运势：{scoreLevel}
              </h2>
              <p className="text-lg text-gray-700">{scoreDescription}</p>
            </div>
            <div className={`text-6xl font-bold ${scoreColor}`}>
              {analysis.scores.total}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              核心建议
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              {analysis.result.advice}
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start">
                <TrendingUp className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-900">策略</p>
                  <p className="text-sm text-purple-800">{analysis.result.strategy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 警告信息 */}
          {analysis.result.warnings && analysis.result.warnings.length > 0 && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900 mb-2">注意事项</p>
                  <ul className="space-y-1 text-sm text-yellow-800">
                    {analysis.result.warnings.map((warning, index) => (
                      <li key={index}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 九宫格展示 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            奇门盘面（九宫八卦）
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {pan.jiuGong.map((gong) => (
              <div
                key={gong.gong}
                onClick={() => handleGongClick(gong.gong)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  gong.isZhiFu || gong.isZhiShi
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-400'
                } ${selectedGong === gong.gong ? 'ring-2 ring-purple-600' : ''}`}
              >
                {/* 宫名 */}
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  {gong.gong}宫
                  {gong.isZhiFu && <span className="ml-1 text-purple-600">值符</span>}
                  {gong.isZhiShi && <span className="ml-1 text-purple-600">值使</span>}
                </div>

                {/* 天盘九星 */}
                <div
                  className="text-sm mb-2 cursor-pointer hover:text-purple-600"
                  onClick={(e) => handleTermClick(gong.tianPan.xing, e)}
                >
                  <span className="font-medium">天：</span>
                  {gong.tianPan.xing}
                  {gong.tianPan.gan && ` (${gong.tianPan.gan})`}
                </div>

                {/* 人盘八门 */}
                <div
                  className="text-sm mb-2 cursor-pointer hover:text-purple-600"
                  onClick={(e) => handleTermClick(gong.renPan.men, e)}
                >
                  <span className="font-medium">门：</span>
                  {gong.renPan.men}
                </div>

                {/* 神盘八神 */}
                <div
                  className="text-sm cursor-pointer hover:text-purple-600"
                  onClick={(e) => handleTermClick(gong.shenPan.shen, e)}
                >
                  <span className="font-medium">神：</span>
                  {gong.shenPan.shen}
                </div>
              </div>
            ))}
          </div>

          {/* 术语提示 */}
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Info className="h-4 w-4 mr-2" />
            <p>点击盘面中的任意术语查看解释</p>
          </div>
        </div>

        {/* 详细解读 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            详细解读
          </h3>
          <div className="space-y-4">
            {/* 时机分析 */}
            <div className="border-l-4 border-purple-600 pl-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                时机分析
              </h4>
              <p className="text-gray-700">{analysis.details.timing}</p>
              <div className="mt-2 text-sm text-purple-600">
                评分：{analysis.scores.timing}分
              </div>
            </div>

            {/* 自身状态 */}
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                自身状态
              </h4>
              <p className="text-gray-700">{analysis.details.self}</p>
              <div className="mt-2 text-sm text-blue-600">
                评分：{analysis.scores.relationship}分
              </div>
            </div>

            {/* 环境分析 */}
            <div className="border-l-4 border-green-600 pl-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                环境分析
              </h4>
              <p className="text-gray-700">{analysis.details.environment}</p>
              <div className="mt-2 text-sm text-green-600">
                评分：{analysis.scores.direction}分
              </div>
            </div>

            {/* 行动指南 */}
            <div className="border-l-4 border-orange-600 pl-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                行动指南
              </h4>
              <p className="text-gray-700">{analysis.details.action}</p>
            </div>
          </div>

          {/* 最佳方位和时辰 */}
          {(analysis.result.bestDirection || analysis.result.bestTime) && (
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Compass className="h-5 w-5 mr-2" />
                最佳行动时机
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.result.bestDirection && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">最佳方位</p>
                    <p className="text-xl font-bold text-purple-900">
                      {analysis.result.bestDirection}
                    </p>
                  </div>
                )}
                {analysis.result.bestTime && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">最佳时辰</p>
                    <p className="text-xl font-bold text-blue-900">
                      {analysis.result.bestTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 术语弹窗 */}
        {selectedTerm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedTerm.term}
                </h3>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">关闭</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-700">{selectedTerm.description}</p>
              <button
                onClick={() => setSelectedTerm(null)}
                className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        )}

        {/* 免责声明 */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-sm text-gray-600">
          <p className="mb-2">
            基于传统周易数理模型，结果仅供娱乐与文化交流参考
          </p>
          <p>
            请勿作为生活决策的唯一依据。科学理性，相信未来。
          </p>
        </div>
      </div>
    </div>
  );
}
