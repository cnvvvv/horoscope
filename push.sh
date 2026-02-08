#!/bin/bash

# 🦞 Science Horoscope - 简化推送脚本

echo "🦞" * 30
echo "Science Horoscope - 简化推送脚本"
echo "🦞" * 30
echo ""

# 检查Git仓库
if [ ! -d ".git" ]; then
    echo "🔄 初始化Git仓库..."
    git init
    echo "✅ Git仓库初始化完成"
else
    echo "📁 Git仓库已存在"
    cd /root/clawd/horoscope
fi

# 添加所有文件
echo "📋 添加项目文件..."
git add .
if [ $? -eq 0 ]; then
    echo "✅ 文件添加完成"
else
    echo "❌ 文件添加失败"
    exit 1
fi

# 提交
echo "🔄 创建提交..."
git commit -m "feat: Science Horoscope project - Next.js 14 + TypeScript"
if [ $? -eq 0 ]; then
    echo "✅ 提交完成"
else
    echo "❌ 提交失败"
    exit 1
fi

# 推送到GitHub
echo "📤 推送到GitHub..."
git push -u origin main
PUSH_EXIT_CODE=$?

if [ $PUSH_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo "=" * 60
    echo "📊 仓库地址:"
    echo "   https://github.com/cnvvvv/horoscope.git"
    echo ""
    echo "🚀 Vercel部署信息:"
    echo "   Vercel可能需要几分钟才能检测到GitHub更新"
    echo "   如果5分钟后还没有部署，可以手动触发"
    echo "   Vercel命令: vercel --prod"
    echo ""
    echo "🌐 预览地址:"
    echo "   https://horoscope-cnvvvv.vercel.app/"
    echo ""
    echo "📋 后续命令:"
    echo "   查看部署: vercel ls"
    echo "   查看日志: vercel logs"
    echo "   重新部署: vercel --prod --force"
    echo ""
    echo "🎉 Happy coding! 🚀"
    echo "🦞" * 30
else
    echo ""
    echo "❌ 推送失败（退出码: $PUSH_EXIT_CODE）"
    echo "=" * 60
    echo "📝 错误信息:"
    echo "   可能原因:"
    echo "   1. 网络连接问题"
    echo "   2. GitHub认证问题"
    echo "   3. 仓库权限问题"
    echo ""
    echo "🔧 建议解决方案:"
    echo "   1. 检查网络连接"
    echo "   2. 配置GitHub SSH密钥"
    echo "   3. 确认仓库写入权限"
    echo "   4. 手动在GitHub上检查仓库状态"
    echo ""
fi

echo "=" * 60
