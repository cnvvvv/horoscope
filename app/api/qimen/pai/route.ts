'use dynamic';
// 📡 奇门遁甲排盘API接口
// GET /api/qimen/pai?year=2024&month=1&day=1&hour=0

import { NextRequest, NextResponse } from 'next/server';
import { paiQimenPan } from '@/lib/qimen-pai';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const day = searchParams.get('day');
    const hour = searchParams.get('hour');

    // 验证必需参数
    if (!year || !month || !day || !hour) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters: year, month, day, hour'
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

    // 排盘
    const pan = paiQimenPan(yearNum, monthNum, dayNum, hourNum);

    return NextResponse.json({
      success: true,
      pan,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Qimen pai error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
