'use dynamic';
// 📊 天干地支关系分析API接口
// GET /api/relationships?year=2024&month=1&day=1&hour=0&gender=male&type=solar

import { NextRequest, NextResponse } from 'next/server';
import { calculateBazi } from '../../../lib/bazi';
import { analyzeRelationships } from '../../../lib/relationships';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const day = searchParams.get('day');
    const hour = searchParams.get('hour');
    const gender = searchParams.get('gender') as 'male' | 'female';
    const type = searchParams.get('type') as 'lunar' | 'solar';

    // 验证必需参数
    if (!year || !month || !day || !hour || !gender) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters'
      }, { status: 400 });
    }

    // 构建出生日期
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), 0, 0);

    // 计算八字
    const bazi = calculateBazi(birthDate, parseInt(hour), gender, type || 'solar');

    if (!bazi) {
      return NextResponse.json({
        success: false,
        error: 'Failed to calculate bazi'
      }, { status: 500 });
    }

    // 分析天干地支关系
    const relationshipAnalysis = analyzeRelationships(bazi);

    if (!relationshipAnalysis) {
      return NextResponse.json({
        success: false,
        error: 'Failed to analyze relationships'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      relationships: relationshipAnalysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Relationship analysis error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
