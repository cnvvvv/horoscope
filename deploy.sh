#!/bin/bash

# 🦞 Science Horoscope - 部署脚本（最终版）

echo "🦞" * 30
echo "Science Horoscope - 部署脚本（最终版）"
echo "🦞" * 30
echo ""

# 初始化Git仓库
if [ -d ".git" ]; then
    echo "🔄 Git仓库已存在，跳过初始化"
else
    echo "🔄 初始化Git仓库..."
    git init
    echo "✅ Git仓库初始化完成"
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

# 创建初始提交
echo "🔄 创建初始提交..."
git commit -m "feat: Initial commit for Science Horoscope project - Next.js 14 + TypeScript + Vercel deployment"
if [ $? -eq 0 ]; then
    echo "✅ 初始提交完成"
else
    echo "❌ 提交失败"
    exit 1
fi

# 添加远程仓库（如果没有添加）
if ! git remote get-url origin 2>/dev/null; then
    echo "🌐 添加GitHub远程仓库..."
    git remote add origin https://github.com/cnvvvv/horoscope.git
    if [ $? -eq 0 ]; then
        echo "✅ Remote仓库添加完成"
    else
        echo "❌ Remote仓库添加失败"
        exit 1
    fi
else
    echo "📝 Remote仓库已存在"
fi

# 推送到GitHub
echo "📤 推送到GitHub..."
git push -u origin main
PUSH_EXIT_CODE=$?

if [ $PUSH_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo "=" * 60
    echo "📊 项目已推送到GitHub！"
    echo "📁 仓库地址: https://github.com/cnvvvv/horoscope.git"
    echo ""
    echo "🚀 下一步："
    echo "   1. Vercel将自动检测GitHub更新"
    echo "   2. 应用将在几分钟内上线"
    echo "   3. 访问链接："
    echo "      - 预览版: https://horoscope-cnvvvv.vercel.app/"
    echo "      - 生产版: Vercel分配的URL（需要等待）"
    echo ""
    echo "📋 管理链接："
    echo "   - Vercel仪表板: https://vercel.com/dashboard"
    echo "   - GitHub仓库: https://github.com/cnvvvv/horoscope"
    echo ""
    echo "🎯 后续操作："
    echo "   - 查看部署日志: vercel ls"
    echo "   - 分析性能: vercel analytics"
    echo ""
    echo "📝 提示："
    echo "   如果部署失败，请检查："
    echo "   - GitHub仓库地址是否正确"
    echo "   - Vercel CLI是否已安装"
    echo "   - 网络连接是否正常"
    echo ""
elif [ $PUSH_EXIT_CODE -eq 128 ]; then
    echo ""
    echo "❌ 推送失败（网络问题）"
    echo "=" * 60
    echo "📝 可能原因:"
    echo "   1. 网络连接不稳定"
    echo "   2. GitHub服务暂时不可用"
    echo "   3. 推送权限问题"
    echo ""
    echo "🔧 建议解决方案:"
    echo "   1. 检查网络连接"
    echo "   2. 稍后重试推送"
    echo "   3. 手动在GitHub上检查仓库状态"
    echo ""
    echo "📋 稍后执行: bash deploy.sh"
    echo ""
elif [ $PUSH_EXIT_CODE -eq 1 ]; then
    echo ""
    echo "❌ 推送失败（身份验证问题）"
    echo "=" * 60
    echo "📝 可能原因:"
    echo "   1. GitHub token配置不正确"
    echo "   2. SSH密钥未配置"
    echo "   3. 推送权限不足"
    echo ""
    echo "🔧 建议解决方案:"
    echo "   1. 检查GitHub设置"
    echo "   2. 配置SSH密钥"
    echo "   3. 检查仓库权限"
    echo ""
    echo "📋 稍后执行: bash deploy.sh"
    echo ""
else
    echo ""
    echo "❌ 推送失败（未知错误，退出码: $PUSH_EXIT_CODE）"
    echo "=" * 60
    echo "📝 建议检查Git状态: git status"
    echo "📋 稍后执行: bash deploy.sh"
    echo ""
fi

echo "=" * 60
echo "🦞 Happy coding! 🚀"
echo "🦞" * 30
echo ""
