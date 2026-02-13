'use client';

import { useState } from 'react';
import { Calculator, Sparkles, Sparkle, TrendingUp, Calendar, Clock, User, Compass, Loader2, Moon, Sun, Zap, Cpu, Activity } from 'lucide-react';

type TabType = 'bazi' | 'qimen';
type ResultTab = 'input' | 'result';

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
  const [baziResultTab, setBaziResultTab] = useState<ResultTab>('input');
  const [qimenResultTab, setQimenResultTab] = useState<ResultTab>('input');

  const [isLoading, setIsLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

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
    setProcessingStep(1);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProcessingStep(2);

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

      setProcessingStep(3);
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!response.ok) throw new Error('八字计算失败');
      const data = await response.json();
      setBaziResult(data);
      setBaziResultTab('result');
      setProcessingStep(4);
    } catch (error) {
      console.error('计算错误:', error);
      alert('计算失败：' + (error as Error).message);
    } finally {
      setIsLoading(false);
      setProcessingStep(0);
    }
  };

  // 处理奇门计算
  const handleQimenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProcessingStep(1);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProcessingStep(2);

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

      setProcessingStep(3);
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!response.ok) throw new Error('奇门遁甲计算失败');
      const data = await response.json();
      setQimenResult(data);
      setQimenResultTab('result');
      setProcessingStep(4);
    } catch (error) {
      console.error('计算错误:', error);
      alert('计算失败：' + (error as Error).message);
    } finally {
      setIsLoading(false);
      setProcessingStep(0);
    }
  };

  const processingSteps = [
    '初始化计算引擎...',
    '加载天文历法数据...',
    '执行核心算法运算...',
    '生成分析报告...'
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* 技术背景网格 */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] bg-[size:20px_20px] animate-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--cyan-glow)_0%,transparent_70%)] opacity-30" />
      </div>

      {/* 顶部装饰线 */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffffcc] to-transparent opacity-30" />

      {/* 头部 */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00ffffcc] blur-md rounded-full"></div>
                <Calculator className="relative h-8 w-8 text-[#00ffffcc]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wider">
                  <span className="text-white">SCI-</span>
                  <span className="text-[#00ffffcc]">FORTUNE</span>
                </h1>
                <p className="text-[#00ff00ff] text-xs tracking-widest mt-1">量子八字命理系统</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-xs">
              <span className="text-gray-500 flex items-center">
                <Activity className="h-3 w-3 mr-1" />
                系统在线
              </span>
              <span className="text-[#00ffffcc]">v2.0.4</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Logo区域 */}
          {!isLoading && baziResultTab === 'input' && qimenResultTab === 'input' && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-black/40 border border-[#00ffffcc]/30 rounded-lg">
                <Zap className="h-5 w-5 text-[#00ffffcc]" />
                <Cpu className="h-5 w-5 text-[#00ff00ff]" />
                <div className="h-px w-px bg-[#00ffffcc]"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
                <span className="text-[#00ffffcc]">命</span>
                <span className="text-[#00ff00ff]">理</span>
                <span className="text-white">计算</span>
                <span className="text-[#00ffffcc]">系</span>
                <span className="text-[#00ff00ff]">统</span>
              </h1>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                基于传统周易与现代计算技术的融合
              </p>
            </div>
          )}

          {/* 标签切换 */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-black/60 backdrop-blur-xl rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setActiveTab('bazi')}
                className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  activeTab === 'bazi'
                    ? 'bg-[#00ffffcc] text-black shadow-[0_0_30px_rgba(0,255,255,204,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Moon className="inline h-4 w-4 mr-2" />
                八字模块
              </button>
              <button
                onClick={() => setActiveTab('qimen')}
                className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  activeTab === 'qimen'
                    ? 'bg-[#00ffffcc] text-black shadow-[0_0_30px_rgba(0,255,255,204,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Compass className="inline h-4 w-4 mr-2" />
                奇门遁甲
              </button>
            </div>
          </div>

          {/* 加载动画 */}
          {isLoading && (
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#00ffffcc]/30 p-12">
              <div className="max-w-md mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-12 w-12 text-[#00ffffcc] animate-spin" />
                      <div className="absolute inset-0 rounded-full bg-[#00ffffcc] opacity-20"></div>
                    </div>
                  </div>
                </div>
                <p className="text-white text-center mb-2">{processingSteps[processingStep - 1]}</p>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-[#00ffffcc] transition-all duration-1000" style={{ width: `${(processingStep / 4) * 100}%` }}></div>
                </div>
                <p className="text-gray-500 text-sm text-center mt-2">正在执行复杂运算...</p>
              </div>
            </div>
          )}

          {/* 八字输入表单 */}
          {!isLoading && activeTab === 'bazi' && baziResultTab === 'input' && (
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <Sparkles className="h-6 w-6 mr-3 text-[#00ffffcc]" />
                  八字信息录入
                </h2>
                <p className="text-gray-500 text-sm mb-6">请输入出生信息以启动八字计算引擎</p>
              </div>

              <form onSubmit={handleBaziSubmit} className="space-y-5">
                {/* 姓名 */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    姓名（可选）
                  </label>
                  <input
                    type="text"
                    value={baziInput.name}
                    onChange={(e) => setBaziInput({ ...baziInput, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 transition-all"
                    placeholder="请输入姓名"
                  />
                </div>

                {/* 历法类型 */}
                <div>
                  <label className="text-gray-400 text-sm mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    历法类型
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center px-6 py-4 rounded-lg cursor-pointer transition-all border-2 ${
                      baziInput.calendarType === 'solar'
                        ? 'border-[#00ffffcc] bg-[#00ffffcc]/10'
                        : 'border-white/20 text-gray-400 hover:border-[#00ffffcc]'
                    }`}>
                      <input
                        type="radio"
                        value="solar"
                        checked={baziInput.calendarType === 'solar'}
                        onChange={(e) => setBaziInput({ ...baziInput, calendarType: e.target.value as any })}
                        className="sr-only"
                      />
                      <Sun className="h-5 w-5 mr-2" />
                      <span>公历（阳历）</span>
                    </label>
                    <label className={`flex items-center justify-center px-6 py-4 rounded-lg cursor-pointer transition-all border-2 ${
                      baziInput.calendarType === 'lunar'
                        ? 'border-[#00ffffcc] bg-[#00ffffcc]/10'
                        : 'border-white/20 text-gray-400 hover:border-[#00ffffcc]'
                    }`}>
                      <input
                        type="radio"
                        value="lunar"
                        checked={baziInput.calendarType === 'lunar'}
                        onChange={(e) => setBaziInput({ ...baziInput, calendarType: e.target.value as any })}
                        className="sr-only"
                      />
                      <Moon className="h-5 w-5 mr-2" />
                      <span>农历（阴历）</span>
                    </label>
                  </div>
                </div>

                {/* 出生日期时间 */}
                <div>
                  <label className="text-gray-400 text-sm mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    出生日期时间
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-2">年</label>
                      <select
                        value={baziInput.year}
                        onChange={(e) => setBaziInput({ ...baziInput, year: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
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
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
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
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
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
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
                      >
                        {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                          <option key={hour} value={hour}>{hour}时</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 性别 */}
                <div>
                  <label className="text-gray-400 text-sm mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    性别
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center px-6 py-4 rounded-lg cursor-pointer transition-all border-2 ${
                      baziInput.gender === 'male'
                        ? 'border-[#00ffffcc] bg-[#00ffffcc]/10'
                        : 'border-white/20 text-gray-400 hover:border-[#00ffffcc]'
                    }`}>
                      <input
                        type="radio"
                        value="male"
                        checked={baziInput.gender === 'male'}
                        onChange={(e) => setBaziInput({ ...baziInput, gender: e.target.value as any })}
                        className="sr-only"
                      />
                      <span className="text-2xl mr-2">👨</span>
                      <span>男</span>
                    </label>
                    <label className={`flex items-center justify-center px-6 py-4 rounded-lg cursor-pointer transition-all border-2 ${
                      baziInput.gender === 'female'
                        ? 'border-[#00ffffcc] bg-[#00ffffcc]/10'
                        : 'border-white/20 text-gray-400 hover:border-[#00ffffcc]'
                    }`}>
                      <input
                        type="radio"
                        value="female"
                        checked={baziInput.gender === 'female'}
                        onChange={(e) => setBaziInput({ ...baziInput, gender: e.target.value as any })}
                        className="sr-only"
                      />
                      <span className="text-2xl mr-2">👩</span>
                      <span>女</span>
                    </label>
                  </div>
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#00ffffcc] to-[#00ff00ff] text-black py-4 rounded-lg text-lg font-semibold hover:from-[#00ffffdd] hover:to-[#00ff00ff] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,255,255,204,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,204,0.5)]"
                >
                  <Sparkle className="inline h-5 w-5 mr-2" />
                  {isLoading ? '计算中...' : '启动八字计算引擎'}
                </button>
              </form>
            </div>
          )}

          {/* 八字结果展示 */}
          {!isLoading && activeTab === 'bazi' && baziResultTab === 'result' && baziResult && (
            <div className="space-y-6">
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 mr-3 text-[#00ffffcc]" />
                  八字命理分析报告
                </h2>

                {/* 四柱八字 */}
                {baziResult.year && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#00ffffcc] mb-4">四柱八字</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { title: '年柱', gan: baziResult.year.heavenlyStem, zhi: baziResult.year.earthlyBranch },
                        { title: '月柱', gan: baziResult.month.heavenlyStem, zhi: baziResult.month.earthlyBranch },
                        { title: '日柱', gan: baziResult.day.heavenlyStem, zhi: baziResult.day.earthlyBranch },
                        { title: '时柱', gan: baziResult.hour.heavenlyStem, zhi: baziResult.hour.earthlyBranch }
                      ].map((pillar, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                          <div className="text-xs text-gray-500 mb-2">{pillar.title}</div>
                          <div className="bg-black/60 rounded-lg p-3 mb-3 border border-[#00ffffcc]/30">
                            <div className="text-3xl font-bold text-[#00ffffcc]">{pillar.gan || '-'}</div>
                            <div className="text-3xl font-bold text-white">{pillar.zhi || '-'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => { setBaziResult(null); setBaziResultTab('input'); }}
                className="w-full bg-gradient-to-r from-[#00ffffcc] to-[#00ff00ff] text-black py-4 rounded-lg text-lg font-semibold hover:from-[#00ffffdd] hover:to-[#00ff00ff] transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,204,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,204,0.5)]"
              >
                返回重新计算
              </button>
            </div>
          )}

          {/* 奇门输入表单 */}
          {!isLoading && activeTab === 'qimen' && qimenResultTab === 'input' && (
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <Compass className="h-6 w-6 mr-3 text-[#00ffffcc]" />
                  奇门遁甲决策系统
                </h2>
                <p className="text-gray-500 text-sm mb-6">选择决策类型和时间以生成奇门遁甲盘</p>
              </div>

              <form onSubmit={handleQimenSubmit} className="space-y-5">
                {/* 决策类型 */}
                <div>
                  <label className="text-gray-400 text-sm mb-3">决策类型</label>
                  <select
                    value={qimenInput.questionType}
                    onChange={(e) => setQimenInput({ ...qimenInput, questionType: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
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
                <div>
                  <label className="text-gray-400 text-sm mb-3">具体问题（可选）</label>
                  <textarea
                    value={qimenInput.question}
                    onChange={(e) => setQimenInput({ ...qimenInput, question: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 transition-all"
                    rows={4}
                    placeholder="请简要描述您想要决策的问题..."
                  />
                </div>

                {/* 决策时间 */}
                <div>
                  <label className="text-gray-400 text-sm mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    决策时间
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-2">年</label>
                      <select
                        value={qimenInput.year}
                        onChange={(e) => setQimenInput({ ...qimenInput, year: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
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
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
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
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
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
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-[#00ffffcc] focus:ring-2 focus:ring-[#00ffffcc]/20 appearance-none cursor-pointer"
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
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#00ffffcc] to-[#00ff00ff] text-black py-4 rounded-lg text-lg font-semibold hover:from-[#00ffffdd] hover:to-[#00ff00ff] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,255,255,204,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,204,0.5)]"
                >
                  <Sparkle className="inline h-5 w-5 mr-2" />
                  {isLoading ? '计算中...' : '启动奇门遁甲决策引擎'}
                </button>
              </form>
            </div>
          )}

          {/* 奇门结果展示 */}
          {!isLoading && activeTab === 'qimen' && qimenResultTab === 'result' && qimenResult && (
            <div className="space-y-6">
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Compass className="h-6 w-6 mr-3 text-[#00ffffcc]" />
                  奇门遁甲决策盘
                </h2>

                {/* 盘局信息 */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/40 border border-[#00ffffcc]/30 rounded-xl p-6 text-center">
                    <div className="text-xs text-gray-500 mb-2">局数</div>
                    <div className="text-4xl font-bold text-[#00ffffcc]">{qimenResult.panJu}局</div>
                  </div>
                  <div className="bg-black/40 border border-[#00ffffcc]/30 rounded-xl p-6 text-center">
                    <div className="text-xs text-gray-500 mb-2">阴遁/阳遁</div>
                    <div className="text-4xl font-bold text-white">{qimenResult.isYinDun ? '阴遁' : '阳遁'}</div>
                  </div>
                  <div className="bg-black/40 border border-[#00ffffcc]/30 rounded-xl p-6 text-center">
                    <div className="text-xs text-gray-500 mb-2">值符星</div>
                    <div className="text-4xl font-bold text-[#00ffffcc]">{qimenResult.zhiFu?.xing || '-'}</div>
                  </div>
                </div>

                {/* 值使信息 */}
                {qimenResult.zhiShi && (
                  <div className="bg-black/40 border border-[#00ffffcc]/30 rounded-xl p-6 text-center">
                    <div className="text-xs text-gray-500 mb-2">值使门</div>
                    <div className="text-4xl font-bold text-white">{qimenResult.zhiShi.men || '-'}</div>
                    <div className="text-sm text-gray-500 mt-1">{qimenResult.zhiShi.gong}宫</div>
                  </div>
                )}
              </div>

              <button
                onClick={() => { setQimenResult(null); setQimenResultTab('input'); }}
                className="w-full bg-gradient-to-r from-[#00ffffcc] to-[#00ff00ff] text-black py-4 rounded-lg text-lg font-semibold hover:from-[#00ffffdd] hover:to-[#00ff00ff] transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,204,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,204,0.5)]"
              >
                返回重新决策
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40">
        <div className="container mx-auto px-6 py-6">
          <div className="grid md:grid-cols-3 gap-6 text-center text-sm text-gray-500">
            <p>© 2026 SCIFORTUNE | 量子八字命理系统</p>
            <p>基于传统周易数理与现代计算技术</p>
            <p>结果仅供娱乐与文化交流参考</p>
          </div>
        </div>
      </footer>

      {/* 自定义动画 */}
      <style jsx global>{`
        @keyframes grid {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .animate-grid {
          animation: grid 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
