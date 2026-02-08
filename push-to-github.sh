#!/bin/bash

echo "🚀 推送horoscope到GitHub..."
echo "=" * 70

# 配置远程仓库
echo ""
echo "🔧 配置远程仓库..."
git remote add origin git@github.com:cnvvvv/horoscope.git
git branch -M main
echo "✅ 远程仓库已配置"

# 添加所有文件
echo ""
echo "🔧 添加所有文件..."
git add .
echo "✅ 文件已添加"

# 提交
echo ""
echo "🔧 提交代码..."
git commit -m "feat: Initial commit - Science Horoscope System with Bazi and Qimen

Features:
- Bazi (八字算命）system with complete analysis
- Qimen Dunjia (奇门遁甲）decision system with multi-agent AI
- Modern Next.js 14 + React 18 interface
- TypeScript type-safe implementation
- Tailwind CSS styling
- Comprehensive documentation

Core modules:
- Bazi Paipan (八字排盘）
- Wu Xing (五行分析）
- Shen (十神分析）
- Da Yun (大运计算）
- Qimen Decision System with 4 agents (Team Lead, Backend Dev, Frontend Dev, Reviewer)
- Reminder and notification system"

if [ $? -eq 0 ]; then
    echo "✅ 代码提交成功"
else
    echo "❌ 代码提交失败，跳过提交步骤"
    echo "🔧 继续推送已存在的提交..."
fi

# 推送到GitHub
echo ""
echo "🚀 推送到GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ 代码推送成功"
    echo ""
    echo "🎉 horoscope已成功推送到GitHub！"
    echo "📄 仓库地址：https://github.com/cnvvvv/horoscope"
else
    echo "❌ 代码推送失败"
    echo ""
    echo "💡 可能的原因："
    echo "  1. 远程仓库不存在（请先在GitHub创建仓库）"
    echo "  2. SSH密钥未正确配置"
    echo "  3. 权限不足"
    echo "  4. 网络连接问题"
    echo ""
    echo "💡 建议的解决方案："
    echo "  1. 访问 https://github.com/cnvvvv/horoscope 创建仓库"
    echo "  2. 测试SSH连接：ssh -T git@github.com"
    echo "  3. 查看详细错误：GIT_TRACE=1 git push -u origin main"
fi

echo ""
echo "=" * 70
echo "🎉 推送完成！"
echo ""
