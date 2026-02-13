'use server';

import { NextRequest, NextResponse } from 'next/server';
import { calculateBazi } from '../../../lib/bazi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { birthDate, gender, calendarType } = body;

    // 验证必需参数
    if (!birthDate || !gender) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters: birthDate, gender'
      }, { status: 400 });
    }

    // 解析出生日期
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
      return NextResponse.json({
        success: false,
        error: 'Invalid birth date format'
      }, { status: 400 });
    }

    const birthHour = date.getHours();
    const type = calendarType || 'solar';

    // 计算八字
    const bazi = calculateBazi(date, birthHour, gender, type);

    if (!bazi) {
      return NextResponse.json({
        success: false,
        error: 'Failed to calculate bazi'
      }, { status: 500 });
    }

    // 添加五行分析
    const wuXing = calculateWuXing(bazi);

    // 添加命理分析
    const analysis = generateAnalysis(bazi, wuXing);

    return NextResponse.json({
      success: true,
      data: {
        ...bazi,
        wuXing,
        analysis
      }
    });
  } catch (error) {
    console.error('八字计算错误:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 计算五行
function calculateWuXing(bazi: any): any {
  const stems = [
    bazi.year.heavenlyStem,
    bazi.month.heavenlyStem,
    bazi.day.heavenlyStem,
    bazi.hour.heavenlyStem
  ];

  const elements = ['木', '火', '土', '金', '水'];
  const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };

  const stemToElement: Record<string, string> = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火',
    '戊': '土', '己': '土', '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
  };

  stems.forEach(stem => {
    if (stem) {
      const element = stemToElement[stem];
      if (element && counts[element as keyof typeof counts] !== undefined) {
        counts[element as keyof typeof counts]++;
      }
    }
  });

  // 计算五行强弱
  const total = stems.length;
  const percentages: any = {};
  elements.forEach(element => {
    percentages[element] = Math.round((counts[element] || 0) / total * 10) / 10;
  });

  return {
    ...counts,
    ...percentages
  };
}

// 生成命理分析
function generateAnalysis(bazi: any, wuXing: any): any {
  const elements = Object.keys(wuXing).filter(key =>
    ['木', '火', '土', '金', '水'].includes(key) && wuXing[key] > 0
  );

  const personality = generatePersonality(bazi, elements);
  const career = generateCareer(bazi, elements, wuXing);
  const wealth = generateWealth(bazi, elements, wuXing);

  return {
    personality,
    career,
    wealth
  };
}

function generatePersonality(bazi: any, elements: string[]): string {
  const dominantElement = elements[0] || '木';

  const personalities: Record<string, string> = {
    木: '你具有木的特质，性格温和善良，富有同情心。你做事踏实，有始有终，能够与他人和谐相处。',
    火: '你具有火的特质，性格热情开朗，充满活力。你积极主动，善于表达，但有时可能过于急躁。',
    土: '你具有土的特质，性格稳重可靠，注重实际。你做事谨慎，有责任心，能够承压。',
    金: '你具有金的特质，性格果断坚毅，有正义感。你做事认真，追求完美，有时可能显得固执。',
    水: '你具有水的特质，性格聪明灵活，善于思考。你适应力强，富有洞察力，但有时过于敏感。'
  };

  return personalities[dominantElement] || '你的性格特点需要结合整体八字来分析。';
}

function generateCareer(bazi: any, elements: string[], wuXing: any): string {
  const dayMaster = bazi.day.heavenlyStem;
  const favorableElements = elements.filter(e => e !== '木');

  const careerAdvice: Record<string, string> = {
    甲: '作为领导者，适合创业、管理、金融等需要决策力的工作。注意培养耐心和倾听他人意见。',
    乙: '擅长沟通协调，适合教育、咨询、人力资源等需要人际交往的工作。注意提升决断力。',
    丙: '热情洋溢，适合表演、娱乐、营销等需要展现自我的工作。注意保持专注和持续。',
    丁: '心思缜密，适合研究、分析、技术等需要细致思考的工作。注意培养大局观。',
    戊: '忠诚可靠，适合服务、保障、行政等需要责任心的工作。注意增强变通能力。',
    己: '善于策划，适合设计、策略、财务等需要规划的工作。注意提升执行力。',
    庚: '严谨认真，适合审计、质检、监督等需要标准的工作。注意保持灵活。',
    辛: '善于表达，适合媒体、公关、销售等需要口才的工作。注意加强深入思考。',
    壬: '富有智慧，适合咨询、策划、分析等需要洞察的工作。注意提升行动力。',
    癸: '适应力强，适合服务、协调、物流等需要变通的工作。注意增强专精。'
  };

  return careerAdvice[dayMaster] || '建议根据自身五行特点选择职业方向，扬长避短。';
}

function generateWealth(bazi: any, elements: string[], wuXing: any): string {
  const wealthElements = ['金', '水', '木'];
  const favorableCount = elements.filter(e => wealthElements.includes(e)).length;

  if (favorableCount >= 3) {
    return '你的八字显示财运较旺，善于理财和积累财富。建议稳健投资，避免过度冒险。';
  } else if (favorableCount >= 2) {
    return '你的八字显示财运中等，需要努力和智慧来积累财富。建议学习理财知识，量入为出。';
  } else {
    return '你的八字显示财运需要提升，可以通过五行调理来改善。建议勤奋工作，开源节流，积累财富。';
  }
}
