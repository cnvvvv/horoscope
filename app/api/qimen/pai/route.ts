'use server';

import { NextRequest, NextResponse } from 'next/server';
import { paiQimenPan } from '@/lib/qimen-pai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { year, month, day, hour } = body;

    // 验证必需参数
    if (!year || !month || !day || hour === undefined) {
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

    // 计算奇门盘
    const qimen = paiQimenPan(yearNum, monthNum, dayNum, hourNum);

    if (!qimen) {
      return NextResponse.json({
        success: false,
        error: 'Failed to calculate qimen'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: qimen,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('奇门遁甲计算错误:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
