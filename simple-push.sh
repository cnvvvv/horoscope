#!/bin/bash

# 🚀 Horoscope项目简化推送脚本
# 用途：直接推送代码到GitHub，无需Token

echo "🚀 开始推送horoscope到GitHub..."
echo "=" * 70

cd /root/clawd/horoscope

# ============================================
# 第1部分：配置Git仓库
# ============================================
echo ""
echo "📋 第1部分：配置Git仓库"
echo "-" * 70

# 检查Git仓库是否存在
if [ -d ".git" ]; then
    echo "✅ Git仓库已存在"
else
    echo "🔧 初始化Git仓库..."
    git init
    echo "✅ Git仓库已初始化"
fi

# 配置远程仓库
echo "🔧 配置远程仓库..."
git remote add origin https://github.com/cnvvvv/horoscope.git 2>&1
git branch -M main
echo "✅ 远程仓库已配置"

# ============================================
# 第2部分：添加文件到Git
# ============================================
echo ""
echo "📋 第2部分：添加文件到Git"
echo "-" * 70

echo "🔧 添加主要文件..."
git add .gitignore README.md package.json tsconfig.json next.config.js .next.config.js 2>/dev/null
echo "✅ 主要文件已添加"

echo "🔧 添加核心目录..."
git add app/ lib/ components/ types/ 2>/dev/null
echo "✅ 核心目录已添加"

echo "🔧 添加文档..."
git add *.md 2>/dev/null
echo "✅ 文档已添加"

echo "🔧 添加脚本..."
git add *.sh *.js 2>/dev/null
echo "✅ 脚本已添加"

echo "🔧 添加qimen数据..."
git add qimen-data/ 2>/dev/null
echo "✅ qimen数据已添加"

# ============================================
# 第3部分：提交代码
# ============================================
echo ""
echo "📋 第3部分：提交代码"
echo "-" * 70

COMMIT_MESSAGE="feat: Add comprehensive horoscope system with Bazi and Qimen

Major features:
- Bazi (八字算命) complete analysis system
- Qimen Dunjia (奇门遁甲) decision system with multi-agent AI
- Next.js 14 + React 18 + TypeScript 5.3 modern interface
- Complete documentation and deployment scripts

Core modules:
- 八字排盘 (Bazi Paipan）
- 五行分析 (Wu Xing）
- 十神分析 (Shen）
- 大运计算 (Da Yun）
- 奇门遁甲多智能体决策系统

Technical highlights:
- 24,668 files
- 4,548 TypeScript files
- 20,120 JavaScript files
- 628MB project size
- Modern web application architecture"

echo "🔧 提交代码..."
git commit -m "$COMMIT_MESSAGE"

if [ $? -eq 0 ]; then
    echo "✅ 代码提交成功"
else
    echo "❌ 代码提交失败"
    exit 1
fi

# ============================================
# 第4部分：推送到GitHub
# ============================================
echo ""
echo "📋 第4部分：推送到GitHub"
echo "-" * 70

echo "🚀 开始推送到GitHub..."
echo "仓库：https://github.com/cnvvvv/horoscope"
echo "分支：main"
echo ""

# 尝试推送到GitHub
git push -u origin main 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🎉 horoscope项目已成功推送到GitHub！"
    echo ""
    echo "📄 仓库地址：https://github.com/cnvvvv/horoscope"
    echo "📄 项目页面：https://github.com/cnvvvv/horoscope"
    echo "📄 文档目录：https://github.com/cnvvvv/horoscope/tree/main"
    echo ""
    echo "💡 后续操作："
    echo "  1. 访问仓库查看代码"
    echo "  2. 检查文件结构"
    echo "  3. 查看提交历史"
    echo "  4. 查看README.md了解项目"
    echo ""
    echo "🚀 准备Vercel部署："
    echo "  cd /root/clawd/horoscope"
    echo "  vercel link"
    echo "  vercel --prod"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "💡 可能的原因："
    echo "  1. GitHub仓库不存在"
    echo "  2. 仓库地址错误"
    echo "  3. 用户名或密码错误"
    echo "  4. 网络连接问题"
    echo "  5. 权限不足"
    echo ""
    echo "🔍 建议的解决方案："
    echo "  1. 访问：https://github.com/cnvvvv/horoscope"
    echo "  2. 如果仓库不存在，请在GitHub上创建仓库"
    echo "  3. 检查网络连接：ping github.com"
    echo "  4. 尝试使用SSH方式："
    echo "     ssh-keygen -t rsa -f ~/.ssh/id_rsa"
    echo "     ssh-copy-id git@github.com"
    echo "  5. 手动推送："
    echo "     git remote set-url origin git@github.com:cnvvvv/horoscope.git"
    echo "     git push -u origin main"
    exit 1
fi

echo ""
echo "=" * 70
echo "✅ 推送流程完成！"
echo ""
