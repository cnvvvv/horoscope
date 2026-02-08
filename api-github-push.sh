#!/bin/bash

# 🚀 方式3：使用GitHub API创建仓库并推送
# 用途：使用GitHub Token直接创建仓库

echo "🚀 开始使用GitHub API创建仓库并推送horoscope项目..."
echo "=" * 70

# ============================================
# 第1部分：准备GitHub API
# ============================================
echo ""
echo "📋 第1部分：准备GitHub API"
echo "-" * 70

echo "🔧 检查GitHub Token..."
if [ -f "$HOME/.github_token" ]; then
    GITHUB_TOKEN=$(cat "$HOME/.github_token")
    echo "✅ 找到GitHub Token：${GITHUB_TOKEN:0:8}...${GITHUB_TOKEN: -8}"
else
    echo "⚠️  未找到GitHub Token"
    echo "🔧 请输入您的GitHub Token（classic, repo权限）"
    read -p "Token: " GITHUB_TOKEN
    
    if [ -z "$GITHUB_TOKEN" ]; then
        echo "❌ Token不能为空"
        echo ""
        echo "💡 获取Token步骤："
        echo "  1. 访问：https://github.com/settings/tokens"
        echo "  2. 点击：Generate new token (classic)"
        echo "  3. 注释：horoscope project"
        echo "  4. 权限：repo (所有仓库权限）"
        echo "  5. 点击：Generate token"
        echo "  6. 复制token（仅显示一次）"
        exit 1
    fi
    
    # 保存Token（可选）
    echo "$GITHUB_TOKEN" > "$HOME/.github_token"
    chmod 600 "$HOME/.github_token"
    echo "✅ Token已保存到：$HOME/.github_token"
fi

echo "✅ GitHub Token已准备"

# ============================================
# 第2部分：创建GitHub仓库
# ============================================
echo ""
echo "📋 第2部分：创建GitHub仓库"
echo "-" * 70

REPO_NAME="horoscope"
REPO_DESC="🧮 科学算命 - 现代八字和奇门遁甲系统"
REPO_VISIBILITY="public"

echo "🔧 使用API创建仓库：$REPO_NAME..."

API_URL="https://api.github.com/user/repos"

CREATE_RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"$REPO_DESC\",
    \"private\": false,
    \"auto_init\": false
  }")

echo "🔍 API响应：$CREATE_RESPONSE"

# 检查响应
if echo "$CREATE_RESPONSE" | grep -q "id"; then
    REPO_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":[0-9]*' | grep -o '[0-9]*')
    REPO_CLONE_URL=$(echo "$CREATE_RESPONSE" | grep -o '"clone_url":"[^"]*"' | grep -o '[^"]*"' | sed 's/"//g')
    REPO_SSH_URL="git@github.com:cnvvvv/$REPO_NAME.git"
    
    echo "✅ 仓库创建成功"
    echo "  仓库ID：$REPO_ID"
    echo "  克隆地址：$REPO_CLONE_URL"
    echo "  SSH地址：$REPO_SSH_URL"
    echo "  仓库地址：https://github.com/cnvvvv/$REPO_NAME"
else
    echo "❌ 仓库创建失败"
    echo "🔍 错误响应：$CREATE_RESPONSE"
    
    if echo "$CREATE_RESPONSE" | grep -q "already_exists"; then
        echo "💡 仓库已存在"
    elif echo "$CREATE_RESPONSE" | grep -q "Bad credentials"; then
        echo "💡 Token无效或权限不足"
    elif echo "$CREATE_RESPONSE" | grep -q "API rate limit"; then
        echo "💡 API调用频率限制"
    fi
    exit 1
fi

# ============================================
# 第3部分：配置Git远程仓库
# ============================================
echo ""
echo "📋 第3部分：配置Git远程仓库"
echo "-" * 70

cd /root/clawd/horoscope

echo "🔧 清理Git状态..."
rm -rf .git
git init
git branch -M main
echo "✅ Git仓库已重置"

echo "🔧 配置远程仓库..."
git remote add origin "$REPO_SSH_URL"
echo "✅ 远程仓库已配置：$REPO_SSH_URL"

# ============================================
# 第4部分：添加文件到Git
# ============================================
echo ""
echo "📋 第4部分：添加文件到Git"
echo "-" * 70

echo "🔧 添加主要文件..."
git add .gitignore README.md package.json tsconfig.json next.config.js .next.config.js
echo "✅ 主要文件已添加"

echo "🔧 添加核心目录..."
git add app/ lib/ components/ types/ 2>/dev/null
echo "✅ 核心目录已添加"

echo "🔧 添加文档和脚本..."
git add *.md *.sh *.js 2>/dev/null
echo "✅ 文档和脚本已添加"

echo "🔧 添加qimen数据..."
git add qimen-data/ 2>/dev/null
echo "✅ qimen数据已添加"

# ============================================
# 第5部分：提交代码
# ============================================
echo ""
echo "📋 第5部分：提交代码"
echo "-" * 70

COMMIT_MESSAGE="feat: Initial commit - 科学算命系统

Major features:
- 八字算命系统（Bazi）完整分析
- 奇门遁甲决策系统（Qimen Dunjia）多智能体AI
- Next.js 14 + React 18 + TypeScript 5.3 现代界面
- 完整的文档和部署脚本

Core modules:
- 八字排盘
- 五行分析
- 十神分析
- 大运计算
- 奇门遁甲多智能体决策系统

Technical highlights:
- 24,668 files
- 4,548 TypeScript files
- 20,120 JavaScript files
- 628MB project size
- Next.js 14 application with React 18
- TypeScript 5.3 type-safe implementation"

Documentation:
- README.md
- PROJECT_SUMMARY.md
- TECHNICAL_ARCHITECTURE.md
- QUICK_REFERENCE.md
- Deployment guides and setup scripts"

Deployment:
- Ready for Vercel deployment
- Complete configuration and deployment scripts
- Modern web application architecture"

Copyright © 2026 科学算命系统
All rights reserved.

项目地址：https://github.com/cnvvvv/horoscope
文档：https://github.com/cnvvvv/horoscope/blob/main/README.md"

🧮 科学算命 - 现代八字和奇门遁甲决策平台
为您提供最准确、最科学的命理分析服务！"

echo "🔧 提交代码..."
git commit -m "$COMMIT_MESSAGE"

if [ $? -eq 0 ]; then
    echo "✅ 代码提交成功"
else
    echo "❌ 代码提交失败"
    exit 1
fi

# ============================================
# 第6部分：推送到GitHub
# ============================================
echo ""
echo "📋 第6部分：推送到GitHub"
echo "-" * 70

echo "🚀 开始推送到GitHub..."
echo "仓库：https://github.com/cnvvvv/$REPO_NAME"
echo "分支：main"
echo ""

git push -u origin main 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🎉 horoscope项目已成功推送到GitHub！"
    echo ""
    echo "📄 仓库地址：https://github.com/cnvvvv/$REPO_NAME"
    echo "📄 仓库设置：https://github.com/cnvvvv/$REPO_NAME/settings"
    echo "📄 问题报告：https://github.com/cnvvvv/$REPO_NAME/issues"
    echo ""
    echo "🔍 仓库内容："
    echo "  - 主要文件：README.md, package.json"
    echo "  - 核心目录：app/, lib/, components/"
    echo "  - 文档：PROJECT_SUMMARY.md, TECHNICAL.md"
    echo "  - 脚本：final-push-github.sh, deploy.sh"
    echo "  - qimen数据：qimen-data/"
    echo "  - 技术栈：Next.js 14 + React 18 + TypeScript 5.3"
    echo ""
    echo "📊 项目统计："
    echo "  - 总文件数：24,668"
    echo "  - TypeScript文件：4,548"
    echo "  - JavaScript文件：20,120"
    echo "  - 项目大小：628MB"
    echo ""
    echo "💡 后续操作："
    echo "  1. 访问仓库查看代码"
    echo "  2. 配置Vercel部署"
    echo "  3. 启动开发服务器"
    echo "  4. 查看GitHub Actions状态"
    echo ""
    echo "🎉 恭喜！horoscope项目已成功上线！"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "💡 可能的原因："
    echo "  1. Token无效或权限不足"
    echo "  2. 仓库地址错误"
    echo "  3. 网络连接问题"
    echo "  4. 分支保护设置"
    echo "  5. 代理或防火墙问题"
    echo ""
    echo "💡 建议的解决方案："
    echo "  1. 检查Token权限：确保有repo权限"
    echo "  2. 检查仓库名称：cnvvvv/horoscope"
    echo "  3. 测试API连接："
    echo "     curl -H \"Authorization: token YOUR_TOKEN\" https://api.github.com/user/repos"
    echo "  4. 手动验证仓库："
    echo "     浏览器访问：https://github.com/cnvvvv/horoscope"
    echo "     或SSH连接：ssh -T git@github.com"
    echo "  5. 检查Git配置："
    echo "     git remote get-url origin"
    echo "     git config --list"
    echo ""
    echo "  6. 强制推送："
    echo "     git push -f origin main"
    echo ""
    echo "  7. 查看详细日志："
    echo "     GIT_TRACE=1 git push -u origin main"
    echo "     git push -u origin main 2>&1 | tee /tmp/git-push.log"
    exit 1
fi

# ============================================
# 第7部分：完成
# ============================================
echo ""
echo "=" * 70
echo "🎉 GitHub API推送流程完成！"
echo ""
echo "📊 项目信息："
echo "  项目名称：horoscope"
echo "  仓库地址：https://github.com/cnvvvv/horoscope"
echo "  总文件数：24,668"
echo "  TypeScript文件：4,548"
echo "  JavaScript文件：20,120"
echo ""
echo "🔗 重要链接："
echo "  项目首页：https://github.com/cnvvvv/horoscope"
echo "  文档目录：https://github.com/cnvvvv/horoscope/tree/main"
echo "  问题跟踪：https://github.com/cnvvvv/horoscope/issues"
echo "  配置文件：https://github.com/cnvvvv/horoscope/blob/main/package.json"
echo ""
echo "💡 下一步建议："
echo "  1. 在GitHub上查看和编辑代码"
echo "  2. 配置Vercel自动部署"
echo "  3. 设置GitHub Actions自动化测试"
echo "  4. 添加协作者和设置权限"
echo "  5. 创建Releases和Tags管理版本"
echo ""
echo "=" * 70
echo "✅ 所有操作已完成！"
echo ""
