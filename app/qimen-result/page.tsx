'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Loader2 } from 'lucide-react';

interface QimenResult {
  panJu?: number;
  isYinDun?: boolean;
  zhiFu?: {
    gong?: string;
    xing?: string;
  };
  zhiShi?: {
    gong?: string;
    men?: string;
  };
  jiuGong?: Array<{
    gong?: string;
    diPan?: { gan?: string };
    tianPan?: { xing?: string; gan?: string };
    renPan?: { men?: string };
    shenPan?: { shen?: string };
    isZhiFu?: boolean;
    isZhiShi?: boolean;
  }>;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
}

export default function QimenResultPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<QimenResult | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [questionType, setQuestionType] = useState<string>('');

  useEffect(() => {
    const loadResult = () => {
      try {
        // 从localStorage获取结果
        const resultStr = localStorage.getItem('qimenResult');
        if (!resultStr) {
          router.push('/qimen');
          return;
        }

        const data = JSON.parse(resultStr);
        setResult(data);
        setQuestion(data.question || '');
        setQuestionType(data.questionType || '');
      } catch (err) {
        console.error('加载结果错误:', err);
        router.push('/qimen');
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700">正在加载奇门盘...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* 头部导航 */}
      <nav className="container mx-auto px-6 py-4">
        <a href="/" className="flex items-center space-x-2">
          <Compass className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-800">奇门遁甲</span>
        </a>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 标题 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              奇门遁甲决策盘
            </h1>
            {question && (
              <p className="text-lg text-purple-900">问题：{question}</p>
            )}
            <p className="text-sm text-gray-600 mt-2">
              {result.year}年{result.month}月{result.day}日 {result.hour}时
            </p>
          </div>

          {/* 盘局信息 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">局数</div>
                <div className="text-2xl font-bold text-indigo-900">
                  {result.panJu}局
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">阴遁/阳遁</div>
                <div className="text-2xl font-bold text-purple-900">
                  {result.isYinDun ? '阴遁' : '阳遁'}
                </div>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">决策类型</div>
                <div className="text-2xl font-bold text-pink-900">
                  {getQuestionTypeName(questionType)}
                </div>
              </div>
            </div>
          </div>

          {/* 值符值使 */}
          <div className="grid md:grid-cols-2 gap-6">
            {result.zhiFu && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-indigo-900 mb-3">值符（时干之星）</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">所在宫位：</span>
                    <span className="font-bold">{result.zhiFu.gong}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">对应九星：</span>
                    <span className="font-bold">{result.zhiFu.xing}</span>
                  </div>
                </div>
              </div>
            )}
            {result.zhiShi && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-purple-900 mb-3">值使（时支之门）</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">所在宫位：</span>
                    <span className="font-bold">{result.zhiShi.gong}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">对应八门：</span>
                    <span className="font-bold">{result.zhiShi.men}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 九宫排盘 */}
          {result.jiuGong && result.jiuGong.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">九宫排盘</h2>
              <div className="grid grid-cols-3 gap-3">
                {result.jiuGong.map((gong, index) => (
                  <GongCard key={index} gong={gong} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* 决策建议 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">📊 决策参考</h2>
            <div className="space-y-3 text-gray-700">
              <p>• 值符宫位代表事体的主导因素</p>
              <p>• 值使宫位代表事体的执行方式</p>
              <p>• 吉门（开、休、生）所在宫位为有利方位</p>
              <p>• 凶门（死、惊、伤）所在宫位需谨慎规避</p>
              <p>• 结合问题类型和用神方位进行综合判断</p>
            </div>
          </div>

          {/* 免责声明 */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-sm text-amber-800 text-center">
              ⚠️ 以上结果仅供参考和娱乐，不可作为重大决策的唯一依据。请理性对待，相信科学。
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/qimen')}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              重新起盘
            </button>
            <a
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 text-center"
            >
              返回首页
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

// 宫位卡片组件
function GongCard({ gong, index }: { gong: any; index: number }) {
  const gongColors = [
    'bg-red-50 border-red-200',
    'bg-blue-50 border-blue-200',
    'bg-green-50 border-green-200',
    'bg-yellow-50 border-yellow-200',
    'bg-purple-50 border-purple-200',
    'bg-pink-50 border-pink-200',
    'bg-indigo-50 border-indigo-200',
    'bg-orange-50 border-orange-200',
    'bg-teal-50 border-teal-200'
  ];

  return (
    <div className={`${gongColors[index]} rounded-lg p-3 border ${gong.isZhiFu || gong.isZhiShi ? 'ring-2 ring-purple-500' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="font-bold text-gray-900">{gong.gong}</span>
        {(gong.isZhiFu || gong.isZhiShi) && (
          <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
            {gong.isZhiFu ? '值符' : '值使'}
          </span>
        )}
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">地：</span>
          <span className="font-semibold">{gong.diPan?.gan || '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">天：</span>
          <span className="font-semibold">{gong.tianPan?.xing || '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">门：</span>
          <span className={`font-semibold ${isLuckyMen(gong.renPan?.men) ? 'text-green-700' : 'text-red-700'}`}>
            {gong.renPan?.men || '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">神：</span>
          <span className="font-semibold">{gong.shenPan?.shen || '-'}</span>
        </div>
      </div>
    </div>
  );
}

function getQuestionTypeName(type: string): string {
  const types: Record<string, string> = {
    career: '事业',
    wealth: '求财',
    relationship: '感情',
    health: '健康',
    study: '学业',
    travel: '出行',
    litigation: '官司',
    other: '其他'
  };
  return types[type] || '其他';
}

function isLuckyMen(men?: string): boolean {
  const luckyMen = ['开门', '休门', '生门'];
  return luckyMen.includes(men || '');
}
