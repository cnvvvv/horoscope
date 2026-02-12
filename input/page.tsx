// 📝 Horoscope Input Form
// "科学算命"的输入表单组件

'use client';

import { useState, FormEvent } from 'react';
import { Calculator, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { InputFormData, BaziFormData } from '@/types/horoscope';

export default function InputFormPage() {
  const [formData, setFormData] = useState<Partial<InputFormData>>({
    name: '',
    gender: 'male',
    birthType: 'solar',
    birthDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: 1,
      hour: 0
    }
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof InputFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InputFormData, string>> = {};

    // 验证姓名（可选）
    if (formData.name && formData.name.length > 20) {
      newErrors.name = '姓名不能超过20个字符';
    }

    // 验证性别
    if (!formData.gender) {
      newErrors.gender = '请选择性别';
    }

    // 验证出生日期
    if (!formData.birthDate) {
      newErrors.birthDate = '请选择出生日期';
    }

    const { year, month, day } = formData.birthDate;

    if (year < 1900 || year > 2100) {
      newErrors.birthDate = '年份必须在1900-2100之间';
    }

    if (month < 1 || month > 12) {
      newErrors.birthDate = '月份必须在1-12之间';
    }

    if (day < 1 || day > 31) {
      newErrors.birthDate = '日期必须在1-31之间';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { birthDate, ...rest } = formData;
      
      const baziData: BaziFormData = {
        name: formData.name || '',
        gender: formData.gender!,
        birthType: formData.birthType!,
        ...birthDate
      };

      // 存储到本地存储
      if (typeof window !== 'undefined') {
        localStorage.setItem('horoscope_last_name', baziData.name);
        localStorage.setItem('horoscope_last_gender', baziData.gender);
        localStorage.setItem('horoscope_last_birthType', baziData.birthType);
        localStorage.setItem('horoscope_last_birth', JSON.stringify(baziData));
      }

      // 模拟API调用（实际应该调用API）
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 跳转到结果页
      window.location.href = `/bazi?year=${baziData.year}&month=${baziData.month}&day=${baziData.day}&hour=${baziData.hour}&gender=${baziData.gender}&type=${baziData.birthType}&name=${encodeURIComponent(baziData.name)}`;
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleGenderChange = (gender: 'male' | 'female') => {
    setFormData({ ...formData, gender });
    setErrors({ ...errors, gender: undefined });
  };

  const handleBirthTypeChange = (type: 'lunar' | 'solar') => {
    setFormData({ ...formData, birthType: type });
    setErrors({ ...errors, birthType: undefined });
  };

  const handleDateChange = (field: keyof InputFormData['birthDate'], value: number) => {
    setFormData({
      ...formData,
      birthDate: {
        ...formData.birthDate,
        [field]: value
      }
    });
    setErrors({ ...errors, birthDate: undefined });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              请输入您的出生信息
            </h1>
            <p className="text-xl text-gray-700">
              我们将为您生成详细的八字排盘和运势分析
            </p>
          </div>

          {/* 输入表单 */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {/* 姓名输入 */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline-block w-4 h-4 mr-2" />
                姓名 (可选)
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="请输入您的姓名"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* 性别选择 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                性别
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleGenderChange('male')}
                  className={`flex items-center justify-center px-6 py-4 rounded-lg border-2 transition-all ${
                    formData.gender === 'male'
                      ? 'border-purple-600 bg-purple-50 text-purple-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                  }`}
                >
                  <span className="text-2xl font-bold mr-2">♂</span>
                  <span className="font-semibold">男</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange('female')}
                  className={`flex items-center justify-center px-6 py-4 rounded-lg border-2 transition-all ${
                    formData.gender === 'female'
                      ? 'border-purple-600 bg-purple-50 text-purple-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                  }`}
                >
                  <span className="text-2xl font-bold mr-2">♀</span>
                  <span className="font-semibold">女</span>
                </button>
              </div>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.gender}</p>
              )}
            </div>

            {/* 历法选择 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                历法类型
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleBirthTypeChange('solar')}
                  className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${
                    formData.birthType === 'solar'
                      ? 'border-purple-600 bg-purple-50 text-purple-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                  }`}
                >
                  公历
                </button>
                <button
                  type="button"
                  onClick={() => handleBirthTypeChange('lunar')}
                  className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${
                    formData.birthType === 'lunar'
                      ? 'border-purple-600 bg-purple-50 text-purple-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                  }`}
                >
                  农历
                </button>
              </div>
              {errors.birthType && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.birthType}</p>
              )}
            </div>

            {/* 出生日期选择 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                出生日期
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="year" className="block text-xs text-gray-600 mb-1">
                    年份
                  </label>
                  <input
                    type="number"
                    id="year"
                    min="1900"
                    max="2100"
                    value={formData.birthDate?.year}
                    onChange={(e) => handleDateChange('year', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                      errors.birthDate?.includes('年份') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="month" className="block text-xs text-gray-600 mb-1">
                    月份
                  </label>
                  <input
                    type="number"
                    id="month"
                    min="1"
                    max="12"
                    value={formData.birthDate?.month}
                    onChange={(e) => handleDateChange('month', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                      errors.birthDate?.includes('月份') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="day" className="block text-xs text-gray-600 mb-1">
                    日期
                  </label>
                  <input
                    type="number"
                    id="day"
                    min="1"
                    max="31"
                    value={formData.birthDate?.day}
                    onChange={(e) => handleDateChange('day', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                      errors.birthDate?.includes('日期') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>
              {errors.birthDate && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.birthDate}</p>
              )}
            </div>

            {/* 出生时辰选择 */}
            <div className="mb-8">
              <label htmlFor="hour" className="block text-sm font-semibold text-gray-700 mb-4">
                <Clock className="inline-block w-4 h-4 mr-2" />
                出生时辰
              </label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  id="hour"
                  value={formData.birthDate?.hour || 0}
                  onChange={(e) => handleDateChange('hour', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.birthDate?.includes('时辰') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="0">子时 (23:00-00:59)</option>
                  <option value="1">丑时 (01:00-02:59)</option>
                  <option value="2">寅时 (03:00-04:59)</option>
                  <option value="3">卯时 (05:00-06:59)</option>
                  <option value="4">辰时 (07:00-08:59)</option>
                  <option value="5">巳时 (09:00-10:59)</option>
                  <option value="6">午时 (11:00-12:59)</option>
                  <option value="7">未时 (13:00-14:59)</option>
                  <option value="8">申时 (15:00-16:59)</option>
                  <option value="9">酉时 (17:00-18:59)</option>
                  <option value="10">戌时 (19:00-20:59)</option>
                  <option value="11">亥时 (21:00-22:59)</option>
                </select>
                <div className="flex items-center">
                  <Calculator className="text-purple-600 ml-2" />
                </div>
              </div>
              {errors.birthDate && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.birthDate}</p>
              )}
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-12 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span>计算中...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    <span>开始分析</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* 温馨提示 */}
          <div className="mt-6 bg-purple-50 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-purple-600 font-bold mr-2">💡</span>
              <p className="text-sm text-purple-900">
                您的生辰八字将被用于计算八字排盘、五行分析、十神体系、大运流年等详细内容。
              </p>
            </div>
            <div className="mt-2 text-sm text-purple-900">
              所有数据将本地保存在您的浏览器中，不会上传到任何第三方服务。
            </div>
          </div>

          {/* 返回首页 */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              ← 返回首页
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
