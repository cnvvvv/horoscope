#!/bin/bash

# 🧪 奇门遁甲功能 - 本地测试脚本

echo "🦞 奇门遁甲功能测试"
echo "═════════════════════════════════════════"
echo ""

# 检查依赖
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules不存在，正在安装依赖..."
    npm install --legacy-peer-deps
else
    echo "✅ 依赖已安装"
fi

# 启动开发服务器
echo ""
echo "🚀 启动开发服务器..."
echo "═════════════════════════════════════════"
echo ""
echo "开发服务器启动后，请访问："
echo "   - 主页：http://localhost:3000"
echo "   - 奇门输入：http://localhost:3000/qimen"
echo ""
echo "测试步骤："
echo "   1. 访问 http://localhost:3000/qimen"
echo "   2. 选择事项分类（如：求财）"
echo "   3. 输入具体问题（可选）"
echo "   4. 选择起盘时间（默认当前时间）"
echo "   5. 点击"立即起卦""
echo "   6. 查看奇门盘面和分析结果"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""
echo "═════════════════════════════════════════"
echo ""

npm run dev
