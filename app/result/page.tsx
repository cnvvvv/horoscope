'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, Loader2 } from 'lucide-react';

interface BaziResult {
  siZhu?: {
    year?: { gan?: string; zhi?: string; element?: string };
    month?: { gan?: string; zhi?: string; element?: string };
    day?: { gan?: string; zhi?: string; element?: string };
    hour?: { gan?: string; zhi?: string; element?: string };
  };
  wuXing?: {
    wood?: number;
    fire?: number;
    earth?: number;
    metal?: number;
    water?: number;
  };
  shiShen?: Array<{ name?: string; strength?: string; description?: string }>;
  dayun?: Array<{
    age?: number;
    year?: number;
    gan?: string;
    zhi?: string;
    element?: string;
    fortune?: string;
  }>;
  analysis?: {
   personality?: string;
   career?: string;
   wealth?: string;
   relationship?: string;
   health?: string;
  };
}

export default function ResultPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<BaziResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateBazi = async () => {
      try {
        // 从localStorage获取输入数据
        const inputStr = localStorage.getItem('baziInput');
        if (!inputStr) {
          router.push('/input');
          return;
        }

        const input = JSON.parse(inputStr);
        const birthDate = new Date(input.birthDate);

        // 调用八字API
        const response = await fetch('/api/bazi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate: birthDate.toISOString(),
            gender: input.gender,
            calendarType: input.calendarType
          })
        });

        if (!response.ok) {
          throw new Error('八字计算失败');
        }

        const data = await response.json();
        setResult(data);

        // 获取大运
        const dayunResponse = await fetch('/api/dayun', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate: birthDate.toISOString(),
            gender: input.gender
          })
        });

        if (dayunResponse.ok) {
          const dayunData = await dayunResponse.json();
          setResult(prev => ({ ...prev, dayun: dayunData }));
        }

      } catch (err) {
        console.error('计算错误:', err);
        setError('计算失败，请返回重试');
      } finally {
        setIsLoading(false);
      }
    };

    calculateBazi();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700">正在计算八字命局...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '计算失败'}</p>
          <button
            onClick={() => router.push('/input')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            返回重新输入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 头部导航 */}
      <nav className="container mx-auto px-6 py-4">
        <a href="/" className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-800">科学算命</span>
        </a>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 标题 */}
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            八字命理分析报告
          </h1>

          {/* 四柱八字 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">四柱八字</h2>
            <div className="grid grid-cols-4 gap-4">
              {result.siZhu && (
                <>
                  <Pillar title="年柱" gan={result.siZhu.year?.gan} zhi={result.siZhu.year?.zhi} element={result.siZhu.year?.element} />
                  <Pillar title="月柱" gan={result.siZhu.month?.gan} zhi={result.siZhu.month?.zhi} element={result.siZhu.month?.element} />
                  <Pillar title="日柱" gan={result.siZhu.day?.gan} zhi={result.siZhu.day?.zhi} element={result.siZhu.day?.element} />
                  <Pillar title="时柱" gan={result.siZhu.hour?.gan} zhi={result.siZhu.hour?.zhi} element={result.siZhu.hour?.element} />
                </>
              )}
            </div>
          </div>

          {/* 五行分析 */}
          {result.wuXing && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">五行分析</h2>
              <div className="grid grid-cols-5 gap-4">
                <ElementBar name="木" value={result.wuXing.wood || 0} color="bg-green-500" />
                <ElementBar name="火" value={result.wuXing.fire || 0} color="bg-red-500" />
                <ElementBar name="土" value={result.wuXing.earth || 0} color="bg-yellow-500" />
                <ElementBar name="金" value={result.wuXing.metal || 0} color="bg-gray-400" />
                <ElementBar name="水" value={result.wuXing.water || 0} color="bg-blue-500" />
              </div>
            </div>
          )}

          {/* 十神分析 */}
          {result.shiShen && result.shiShen.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">十神分析</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.shiShen.map((shi, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="font-semibold text-purple-900">{shi.name}</div>
                    <div className="text-sm text-gray-600">{shi.strength}</div>
                    <div className="text-sm text-gray-700 mt-1">{shi.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 命理分析 */}
          {result.analysis && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">命理分析</h2>
              <div className="space-y-4">
                {result.analysis.personality && (
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">性格特征</h3>
                    <p className="text-gray-700">{result.analysis.personality}</p>
                  </div>
                )}
                {result.analysis.career && (
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">事业发展</h3>
                    <p className="text-gray-700">{result.analysis.career}</p>
                  </div>
                )}
                {result.analysis.wealth && (
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">财运分析</h3>
                    <p className="text-gray-700">{result.analysis.wealth}</p>
                  </div>
                )}
                {result.analysis.relationship && (
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">感情婚姻</h3>
                    <p className="text-gray-700">{result.analysis.relationship}</p>
                  </div>
                )}
                {result.analysis.health && (
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">健康建议</h3>
                    <p className="text-gray-700">{result.analysis.health}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/input')}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              重新测算
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

// 柱显示组件
function Pillar({ title, gan, zhi, element }: { title: string; gan?: string; zhi?: string; element?: string }) {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-500 mb-2">{title}</div>
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
        <div className="text-2xl font-bold text-purple-900 mb-1">{gan}</div>
        <div className="text-2xl font-bold text-blue-900">{zhi}</div>
        <div className="text-xs text-gray-500 mt-2">{element}</div>
      </div>
    </div>
  );
}

// 五行条形图组件
function ElementBar({ name, value, color }: { name: string; value: number; color: string }) {
  const percentage = Math.min(value * 10, 100);
  return (
    <div className="text-center">
      <div className="text-lg font-bold text-gray-900 mb-2">{name}</div>
      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
        <div className={`${color} h-full transition-all`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="text-sm text-gray-600 mt-1">{value}</div>
    </div>
  );
}
