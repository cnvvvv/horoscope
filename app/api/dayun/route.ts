'use dynamic';
// 📊 大运计算API接口
// GET /api/dayun?year=2024&month=1&day=1&hour=0&gender=male&type=solar&currentAge=30&currentYear=2024

import { NextRequest, NextResponse } from 'next/server';
import { calculateBazi } from '../../../lib/bazi';
import { calculateDaYun } from '../../../lib/dayun';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const day = searchParams.get('day');
    const hour = searchParams.get('hour');
    const gender = searchParams.get('gender') as 'male' | 'female';
    const type = searchParams.get('type') as 'lunar' | 'solar';
    const currentAge = searchParams.get('currentAge');
    const currentYear = searchParams.get('currentYear');

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

    // 计算当前年龄和年份（如果未提供）
    const age = currentAge ? parseInt(currentAge) : new Date().getFullYear() - parseInt(year);
    const cYear = currentYear ? parseInt(currentYear) : new Date().getFullYear();

    // 计算大运
    const dayunCycle = calculateDaYun(bazi, age, cYear);

    if (!dayunCycle) {
      return NextResponse.json({
        success: false,
        error: 'Failed to calculate dayun'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      dayun: dayunCycle,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dayun calculation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
