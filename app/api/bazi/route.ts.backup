// 📊 八字排盘API接口
// GET /api/bazi?year=2024&month=1&day=1&hour=0&gender=male&type=solar&name=xxx

import { NextRequest, NextResponse } from 'next/server';
import { calculateBazi } from '../../../lib/bazi';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const day = searchParams.get('day');
    const hour = searchParams.get('hour');
    const gender = searchParams.get('gender') as 'male' | 'female';
    const type = searchParams.get('type') as 'lunar' | 'solar';
    const name = searchParams.get('name');

    // 验证必需参数
    if (!year || !month || !day || !hour || !gender) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters: year, month, day, hour, gender'
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

    // 构建出生日期
    const birthDate = new Date(yearNum, monthNum - 1, dayNum, hourNum, 0, 0);

    // 计算八字
    const bazi = calculateBazi(birthDate, hourNum, gender, type || 'solar');

    if (!bazi) {
      return NextResponse.json({
        success: false,
        error: 'Failed to calculate bazi'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      bazi: {
        year: {
          heavenlyStem: bazi.year.heavenlyStem,
          earthlyBranch: bazi.year.earthlyBranch,
          hiddenHeavenlyStem: bazi.year.hiddenHeavenlyStem,
          hiddenEarthlyBranch: bazi.year.hiddenEarthlyBranch
        },
        month: {
          heavenlyStem: bazi.month.heavenlyStem,
          earthlyBranch: bazi.month.earthlyBranch,
          hiddenHeavenlyStem: bazi.month.hiddenHeavenlyStem,
          hiddenEarthlyBranch: bazi.month.hiddenEarthlyBranch
        },
        day: {
          heavenlyStem: bazi.day.heavenlyStem,
          earthlyBranch: bazi.day.earthlyBranch,
          hiddenHeavenlyStem: bazi.day.hiddenHeavenlyStem,
          hiddenEarthlyBranch: bazi.day.hiddenEarthlyBranch
        },
        hour: {
          heavenlyStem: bazi.hour.heavenlyStem,
          earthlyBranch: bazi.hour.earthlyBranch,
          hiddenHeavenlyStem: bazi.hour.hiddenHeavenlyStem,
          hiddenEarthlyBranch: bazi.hour.hiddenEarthlyBranch
        },
        gender: bazi.gender,
        name: name,
        birthType: bazi.birthType
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Bazi calculation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
