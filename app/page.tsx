'use client';

import { useState } from 'react';
import { Calculator, Sparkles, Sparkle, TrendingUp, Calendar, Clock, User, Compass, Loader2, Moon, Sun } from 'lucide-react';

type TabType = 'bazi' | 'qimen' | 'bazi-result' | 'qimen-result';

interface BaziInput {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: 'male' | 'female';
  calendarType: 'solar' | 'lunar';
}

interface QimenInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  question: string;
  questionType: string;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('bazi');
  const [isLoading, setIsLoading] = useState(false);

  // 八字数据
  const [baziInput, setBaziInput] = useState<BaziInput>({
    name: '',
    year: new Date().getFullYear(),
    month: 1,
    day: 1,
    hour: 0,
    gender: 'male',
    calendarType: 'solar'
  });
  const [baziResult, setBaziResult] = useState<any>(null);

  // 奇门数据
  const [qimenInput, setQimenInput] = useState<QimenInput>({
    year: new Date().getFullYear(),
    month: 1,
    day: 1,
    hour: new Date().getHours(),
    question: '',
    questionType: 'career'
  });
  const [qimenResult, setQimenResult] = useState<any>(null);

  // 处理八字计算
  const handleBaziSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const birthDate = new Date(baziInput.year, baziInput.month - 1, baziInput.day, baziInput.hour);
      const response = await fetch('/api/bazi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDate: birthDate.toISOString(),
          gender: baziInput.gender,
          calendarType: baziInput.calendarType
        })
      });
      if (!response.ok) throw new Error('八字计算失败');
      const data = await response.json();
      setBaziResult(data);
      setActiveTab('bazi-result');
    } catch (error) {
      console.error('计算错误:', error);
      alert('计算失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 处理奇门计算
  const handleQimenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/qimen/pai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: qimenInput.year,
          month: qimenInput.month,
          day: qimenInput.day,
          hour: qimenInput.hour
        })
      });
      if (!response.ok) throw new Error('奇门遁甲计算失败');
      const data = await response.json();
      setQimenResult(data);
      setActiveTab('qimen-result');
    } catch (error) {
      console.error('计算错误:', error);
      alert('计算失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* 头部 */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-2xl shadow-purple-500/50">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              科学算命
            </h1>
            <p className="text-sm text-gray-400 mt-1">知命而行 · 顺势而为</p>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* 标签页切换 */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/50 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-slate-700/50">
              <button
                onClick={() => setActiveTab('bazi')}
                className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'bazi' || activeTab === 'bazi-result'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Moon className="inline h-5 w-5 mr-2" />
                八字测算
              </button>
              <button
                onClick={() => setActiveTab('qimen')}
                className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'qimen' || activeTab === 'qimen-result'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Compass className="inline h-5 w-5 mr-2" />
                奇门决策
              </button>
            </div>
          </div>

          {/* 加载状态 */}
          {isLoading && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center border border-slate-700/50">
              <Loader2 className="h-16 w-16 text-purple-500 animate-spin mx-auto mb-6" />
              <p className="text-xl text-gray-300">正在计算中...</p>
              <p className="text-sm text-gray-500 mt-2">请稍候</p>
            </div>
          )}

          {/* 八字输入表单 */}
          {!isLoading && activeTab === 'bazi' && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                八字测算信息录入
              </h2>
              <form onSubmit={handleBaziSubmit} className="space-y-8">
                {/* 姓名 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    姓名（可选）
                  </label>
                  <input
                    type="text"
                    value={baziInput.name}
                    onChange={(e) => setBaziInput({ ...baziInput, name: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="请输入姓名"
                  />
                </div>

                {/* 历法类型 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    历法类型
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center px-6 py-4 rounded-xl cursor-pointer transition-all ${
                      baziInput.calendarType === 'solar'
                        ? 'bg-purple-600/20 border-2 border-purple-500'
                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                    }`}>
                      <input
                        type="radio"
                        value="solar"
                        checked={baziInput.calendarType === 'solar'}
                        onChange={(e) => setBaziInput({ ...baziInput, calendarType: e.target.value as any })}
                        className="sr-only"
                      />
                      <Sun className="h-5 w-5 mr-3 text-yellow-400" />
                      <span className="font-medium">公历（阳历）</span>
                    </label>
                    <label className={`flex items-center justify-center px-6 py-4 rounded-xl cursor-pointer transition-all ${
                      baziInput.calendarType === 'lunar'
                        ? 'bg-purple-600/20 border-2 border-purple-500'
                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                    }`}>
                      <input
                        type="radio"
                        value="lunar"
                        checked={baziInput.calendarType === 'lunar'}
                        onChange={(e) => setBaziInput({ ...baziInput, calendarType: e.target.value as any })}
                        className="sr-only"
                      />
                      <Moon className="h-5 w-5 mr-3 text-blue-300" />
                      <span className="font-medium">农历（阴历）</span>
                    </label>
                  </div>
                </div>

                {/* 出生时间 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    出生时间
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-2">年</label>
                      <select
                        value={baziInput.year}
                        onChange={(e) => setBaziInput({ ...baziInput, year: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500"
                      >
                        {Array.from({ length: 211 }, (_, i) => 1900 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2">月</label>
                      <select
                        value={baziInput.month}
                        onChange={(e) => setBaziInput({ ...baziInput, month: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month}>{month}月</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2">日</label>
                      <select
                        value={baziInput.day}
                        onChange={(e) => setBaziInput({ ...baziInput, day: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500"
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>{day}日</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2">时</label>
                      <select
                        value={baziInput.hour}
                        onChange={(e) => setBaziInput({ ...baziInput, hour: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500"
                      >
                        {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                          <option key={hour} value={hour}>{hour}时</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 性别 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    性别
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center px-6 py-4 rounded-xl cursor-pointer transition-all ${
                      baziInput.gender === 'male'
                        ? 'bg-blue-600/20 border-2 border-blue-500'
                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                    }`}>
                      <input
                        type="radio"
                        value="male"
                        checked={baziInput.gender === 'male'}
                        onChange={(e) => setBaziInput({ ...baziInput, gender: e.target.value as any })}
                        className="sr-only"
                      />
                      <span className="text-2xl mr-2">👨</span>
                      <span className="font-medium">男</span>
                    </label>
                    <label className={`flex items-center justify-center px-6 py-4 rounded-xl cursor-pointer transition-all ${
                      baziInput.gender === 'female'
                        ? 'bg-pink-600/20 border-2 border-pink-500'
                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                    }`}>
                      <input
                        type="radio"
                        value="female"
                        checked={baziInput.gender === 'female'}
                        onChange={(e) => setBaziInput({ ...baziInput, gender: e.target.value as any })}
                        className="sr-only"
                      />
                      <span className="text-2xl mr-2">👩</span>
                      <span className="font-medium">女</span>
                    </label>
                  </div>
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
                >
                  <Sparkles className="inline h-5 w-5 mr-2" />
                  开始测算
                </button>
              </form>
            </div>
          )}

          {/* 八字结果 */}
          {!isLoading && activeTab === 'bazi-result' && baziResult && (
            <div className="space-y-6">
              <BaziResultDisplay result={baziResult} onReset={() => { setBaziResult(null); setActiveTab('bazi'); }} />
            </div>
          )}

          {/* 奇门输入表单 */}
          {!isLoading && activeTab === 'qimen' && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                奇门遁甲决策系统
              </h2>
              <form onSubmit={handleQimenSubmit} className="space-y-8">
                {/* 问题类型 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">决策类型</label>
                  <select
                    value={qimenInput.questionType}
                    onChange={(e) => setQimenInput({ ...qimenInput, questionType: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="career">🏢 事业发展</option>
                    <option value="wealth">💰 求财投资</option>
                    <option value="relationship">❤️ 感情婚姻</option>
                    <option value="health">🏥 健康养生</option>
                    <option value="study">📚 学业考试</option>
                    <option value="travel">✈️ 出行搬家</option>
                    <option value="litigation">⚖️ 官司诉讼</option>
                    <option value="other">🤔 其他问题</option>
                  </select>
                </div>

                {/* 具体问题 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">具体问题（可选）</label>
                  <textarea
                    value={qimenInput.question}
                    onChange={(e) => setQimenInput({ ...qimenInput, question: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                    rows={4}
                    placeholder="请简要描述您想要决策的问题..."
                  />
                </div>

                {/* 决策时间 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    决策时间
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-2">年</label>
                      <select
                        value={qimenInput.year}
                        onChange={(e) => setQimenInput({ ...qimenInput, year: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2">月</label>
                      <select
                        value={qimenInput.month}
                        onChange={(e) => setQimenInput({ ...qimenInput, month: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month}>{month}月</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2">日</label>
                      <select
                        value={qimenInput.day}
                        onChange={(e) => setQimenInput({ ...qimenInput, day: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>{day}日</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2">时</label>
                      <select
                        value={qimenInput.hour}
                        onChange={(e) => setQimenInput({ ...qimenInput, hour: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                          <option key={hour} value={hour}>{hour}时</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-5 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105"
                >
                  <Sparkle className="inline h-5 w-5 mr-2" />
                  开始起盘决策
                </button>
              </form>
            </div>
          )}

          {/* 奇门结果 */}
          {!isLoading && activeTab === 'qimen-result' && qimenResult && (
            <div className="space-y-6">
              <QimenResultDisplay result={qimenResult} onReset={() => { setQimenResult(null); setActiveTab('qimen'); }} />
            </div>
          )}

          {/* 功能特性 */}
          {!baziResult && !qimenResult && (
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <FeatureCard
                icon={<TrendingUp />}
                title="精确计算"
                description="基于天文历法的严谨八字排盘，支持公历/农历"
              />
              <FeatureCard
                icon={<Sparkles />}
                title="深度分析"
                description="完整的五行分析、十神体系、天干地支关系网"
              />
              <FeatureCard
                icon={<Calculator />}
                title="运势指引"
                description="大运流年可视化，事业、财运、情感、健康全方位评估"
              />
            </div>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 bg-slate-900/50 backdrop-blur-xl border-t border-slate-800 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 mb-2">© 2026 科学算命 | 基于传统周易数理模型</p>
          <p className="text-sm text-gray-500">结果仅供娱乐与文化交流参考，请勿作为生活决策的唯一依据</p>
        </div>
      </footer>

      {/* 自定义动画 */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

// 八字结果展示组件
function BaziResultDisplay({ result, onReset }: { result: any; onReset: () => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          八字命理分析报告
        </h2>

        {/* 四柱八字 */}
        {result.siZhu && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-300 mb-4">四柱八字</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PillarCard title="年柱" gan={result.siZhu.year?.gan} zhi={result.siZhu.year?.zhi} />
              <PillarCard title="月柱" gan={result.siZhu.month?.gan} zhi={result.siZhu.month?.zhi} />
              <PillarCard title="日柱" gan={result.siZhu.day?.gan} zhi={result.siZhu.day?.zhi} />
              <PillarCard title="时柱" gan={result.siZhu.hour?.gan} zhi={result.siZhu.hour?.zhi} />
            </div>
          </div>
        )}

        {/* 五行分析 */}
        {result.wuXing && (
          <div>
            <h3 className="text-xl font-bold text-gray-300 mb-4">五行分析</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <WuXingCard name="木" value={result.wuXing.wood || 0} color="bg-green-500" emoji="🌲" />
              <WuXingCard name="火" value={result.wuXing.fire || 0} color="bg-red-500" emoji="🔥" />
              <WuXingCard name="土" value={result.wuXing.earth || 0} color="bg-yellow-600" emoji="🏔" />
              <WuXingCard name="金" value={result.wuXing.metal || 0} color="bg-gray-400" emoji="⚪" />
              <WuXingCard name="水" value={result.wuXing.water || 0} color="bg-blue-500" emoji="💧" />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:scale-105"
      >
        重新测算
      </button>
    </div>
  );
}

// 奇门结果展示组件
function QimenResultDisplay({ result, onReset }: { result: any; onReset: () => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          奇门遁甲决策盘
        </h2>

        {/* 局数信息 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-500/20 rounded-2xl p-6 text-center border border-blue-500/30">
            <div className="text-sm text-gray-400 mb-2">局数</div>
            <div className="text-3xl font-bold text-blue-400">{result.panJu}局</div>
          </div>
          <div className="bg-cyan-500/20 rounded-2xl p-6 text-center border border-cyan-500/30">
            <div className="text-sm text-gray-400 mb-2">阴遁/阳遁</div>
            <div className="text-3xl font-bold text-cyan-400">{result.isYinDun ? '阴遁' : '阳遁'}</div>
          </div>
          <div className="bg-purple-500/20 rounded-2xl p-6 text-center border border-purple-500/30">
            <div className="text-sm text-gray-400 mb-2">值符</div>
            <div className="text-2xl font-bold text-purple-400">{result.zhiFu?.xing}</div>
            <div className="text-sm text-gray-400 mt-1">{result.zhiFu?.gong}</div>
          </div>
        </div>

        {/* 值使信息 */}
        {result.zhiShi && (
          <div className="bg-pink-500/20 rounded-2xl p-6 text-center border border-pink-500/30 mb-8">
            <div className="text-sm text-gray-400 mb-2">值使</div>
            <div className="text-2xl font-bold text-pink-400">{result.zhiShi?.men}</div>
            <div className="text-sm text-gray-400 mt-1">{result.zhiShi?.gong}</div>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-5 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:scale-105"
      >
        重新起盘
      </button>
    </div>
  );
}

// 柱显示卡片
function PillarCard({ title, gan, zhi }: { title: string; gan?: string; zhi?: string }) {
  return (
    <div className="text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
      <div className="text-sm text-gray-400 mb-3">{title}</div>
      <div className="bg-slate-900/50 rounded-xl p-4 mb-3 border border-slate-700">
        <div className="text-3xl font-bold text-purple-400">{gan || '-'}</div>
        <div className="text-3xl font-bold text-pink-400">{zhi || '-'}</div>
      </div>
    </div>
  );
}

// 五行卡片
function WuXingCard({ name, value, color, emoji }: { name: string; value: number; color: string; emoji: string }) {
  const percentage = Math.min(value * 10, 100);
  return (
    <div className="text-center bg-slate-900/50 rounded-2xl p-6 border border-slate-700">
      <div className="text-4xl mb-3">{emoji}</div>
      <div className="text-lg font-bold text-gray-300 mb-3">{name}</div>
      <div className="bg-slate-800 rounded-full h-3 overflow-hidden mb-3">
        <div className={`${color} h-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="text-sm text-gray-400">{value}</div>
    </div>
  );
}

// 功能卡片组件
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105 group">
      <div className="flex flex-col items-center text-center h-full">
        <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-200 mb-3">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
