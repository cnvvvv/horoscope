// 📡 奇门遁甲分析API接口
// GET /api/qimen/analyze?year=2024&month=1&day=1&hour=0&category=wealth&question=xxx

import { NextRequest, NextResponse } from 'next/server';
import { paiQimenPan } from '../../lib/qimen-pai';
import { QimenCategory, QimenRequest, QimenAnalysis } from '../../types/qimen';
import { matchRules, getYongShen } from '../../lib/qimen-rules-engine';
import { scoreGong, getBestDirection, getBestTime } from '../../lib/qimen-score';
import { generateFullAnalysis, generateSimpleAnalysis } from '../../lib/qimen-text-generator';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const day = searchParams.get('day');
    const hour = searchParams.get('hour');
    const category = searchParams.get('category') as QimenCategory | null;
    const question = searchParams.get('question');

    // 验证必需参数
    if (!year || !month || !day || !hour || !category) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters: year, month, day, hour, category'
      }, { status: 400 });
    }

    // 验证参数范围
    const yearNum = parseInt(year);
    if (yearNum < 1900 || yearNum > 2100) {
      return NextResponse.json({
        success: false,
        error: 'Year must be between 1900 and 2100'
      }, { status: 400 });
    }

    const monthNum = parseInt(month);
    if (monthNum < 1 || monthNum > 12) {
      return NextResponse.json({
        success: false,
        error: 'Month must be between 1 and 12'
      }, { status: 400 });
    }

    const dayNum = parseInt(day);
    if (dayNum < 1 || dayNum > 31) {
      return NextResponse.json({
        success: false,
        error: 'Day must be between 1 and 31'
      }, { status: 400 });
    }

    const hourNum = parseInt(hour);
    if (hourNum < 0 || hourNum > 23) {
      return NextResponse.json({
        success: false,
        error: 'Hour must be between 0 and 23'
      }, { status: 400 });
    }

    // 验证category
    const validCategories = Object.values(QimenCategory);
    if (!validCategories.includes(category)) {
      return NextResponse.json({
        success: false,
        error: `Invalid category. Must be one of: ${validCategories.join(', ')}`
      }, { status: 400 });
    }

    // 构建请求对象
    const request: QimenRequest = {
      year: yearNum,
      month: monthNum,
      day: dayNum,
      hour: hourNum,
      category,
      question: question || undefined
    };

    // 排盘
    const pan = paiQimenPan(yearNum, monthNum, dayNum, hourNum);

    // 匹配规则
    const rules = matchRules(pan, category);

    // 计算评分
    const scores = scoreGong(pan, category);

    // 获取用神
    const yongShen = getYongShen(pan, category);

    // 生成分析
    const fullAnalysis = generateFullAnalysis(pan, category, scores);
    const simpleAnalysis = generateSimpleAnalysis(pan, category, scores);

    // 构建完整分析结果
    const analysis: QimenAnalysis = {
      request,
      pan,
      yongShen,
      scores,
      result: {
        level: simpleAnalysis.level,
        advice: simpleAnalysis.advice,
        strategy: simpleAnalysis.strategy,
        bestDirection: getBestDirection(pan),
        bestTime: getBestTime(pan),
        warnings: fullAnalysis.result?.warnings || []
      },
      details: {
        timing: fullAnalysis.details?.timing || '',
        self: fullAnalysis.details?.self || '',
        environment: fullAnalysis.details?.environment || '',
        action: fullAnalysis.details?.action || ''
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Qimen analyze error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
