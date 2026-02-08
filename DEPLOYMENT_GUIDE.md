# 🚀 奇门遁甲功能部署指南

## 📋 部署前准备

### 1. 环境要求
- Node.js 18+ 
- npm 或 yarn
- Git

### 2. 依赖安装

```bash
cd horoscope
npm install
```

如果遇到依赖冲突，使用：
```bash
npm install --legacy-peer-deps
```

---

## 🔧 本地开发

### 1. 启动开发服务器

```bash
npm run dev
```

访问：http://localhost:3000

### 2. 测试奇门遁甲功能

1. 访问 http://localhost:3000/qimen
2. 选择事项分类（如：求财）
3. 输入具体问题（可选）
4. 选择起盘时间（默认当前时间）
5. 点击"立即起卦"
6. 查看奇门盘面和分析结果

### 3. 测试API接口

```bash
# 测试排盘接口
curl "http://localhost:3000/api/qimen/pai?year=2024&month=2&day=7&hour=14"

# 测试分析接口
curl "http://localhost:3000/api/qimen/analyze?year=2024&month=2&day=7&hour=14&category=wealth"
```

---

## 🏗️ 生产构建

### 1. 构建项目

```bash
npm run build
```

### 2. 启动生产服务器

```bash
npm run start
```

---

## ☁️ Vercel部署

### 方式1：使用Vercel CLI

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 方式2：通过GitHub自动部署

1. **提交代码到GitHub**

```bash
git init
git add .
git commit -m "feat: Add Qimen Dunjia feature"
git branch -M main
git remote add origin https://github.com/your-username/horoscope.git
git push -u origin main
```

2. **连接Vercel到GitHub**

- 访问 https://vercel.com
- 点击"New Project"
- 选择GitHub仓库
- 配置项目设置：
  - Framework Preset: Next.js
  - Build Command: `npm run build`
  - Output Directory: `.next`
  - Install Command: `npm install` 或 `npm install --legacy-peer-deps`

3. **部署**

Vercel会自动：
- 检测到代码提交
- 构建项目
- 部署到生产环境
- 分配域名（如：horoscope-yourname.vercel.app）

---

## 🔧 常见问题

### 问题1：npm install 失败

**解决方案**：
```bash
# 清除缓存
npm cache clean --force

# 删除node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install --legacy-peer-deps
```

### 问题2：构建失败

**解决方案**：
- 检查Node.js版本（需要18+）
```bash
node --version
```

- 清除Next.js缓存
```bash
rm -rf .next
npm run build
```

### 问题3：TypeScript错误

**解决方案**：
- 检查tsconfig.json配置
- 运行类型检查
```bash
npx tsc --noEmit
```

### 问题4：Tailwind CSS不生效

**解决方案**：
- 确认tailwind.config.js配置正确
- 确认postcss.config.js配置正确
- 清除.next缓存后重新构建

---

## 📊 部署检查清单

部署前检查：

- [ ] 代码已提交到GitHub
- [ ] 所有依赖已安装
- [ ] 本地构建成功
- [ ] API接口测试通过
- [ ] 前端页面测试通过
- [ ] 环境变量配置正确
- [ ] 域名配置正确

部署后验证：

- [ ] 网站可以访问
- [ ] 首页加载正常
- [ ] 奇门遁甲页面可以访问
- [ ] 输入功能正常
- [ ] 排盘功能正常
- [ ] 结果展示正常
- [ ] 移动端适配正常
- [ ] 响应速度 < 2s

---

## 🎯 部署目标

### 性能指标
- 首屏加载时间 < 2s
- API响应时间 < 1s
- Lighthouse评分 > 90

### 兼容性
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- 移动端浏览器

### 可访问性
- 语义化HTML
- ARIA标签
- 键盘导航支持
- 屏幕阅读器支持

---

## 📝 后续优化

1. **性能优化**
   - 代码分割
   - 图片优化
   - CDN加速

2. **功能增强**
   - 历史记录
   - 导出分享
   - OpenAI集成

3. **监控和日志**
   - Vercel Analytics
   - 错误追踪
   - 性能监控

---

## 🙏 支持

如有问题，请查看：
- Next.js文档：https://nextjs.org/docs
- Vercel文档：https://vercel.com/docs
- Tailwind CSS文档：https://tailwindcss.com/docs
