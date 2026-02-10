# Vercel部署指南（推荐方法）

## 🎯 最简单的方法：通过Vercel网页直接部署

### 步骤1：访问Vercel

1. 打开浏览器，访问：https://vercel.com
2. 点击 "Sign Up" 或 "Log In"
3. 选择 "Continue with GitHub"

### 步骤2：导入项目

1. 点击 "Add New" → "Project"
2. 在Import Git Repository列表中找到 `cnvvvv/horoscope`
3. 如果没看到，点击 "Import Git Repository" → GitHub
4. 授权Vercel访问您的GitHub仓库

### 步骤3：配置项目

**Framework Preset**: Next.js
**Root Directory**: 留空或输入 `.`
**Build Command**: `npm install --legacy-peer-deps && npm run build`
**Output Directory**: `.next`
**Install Command**: `npm install --legacy-peer-deps`

### 步骤4：部署

点击 "Deploy" 按钮，等待2-3分钟

### 步骤5：获取域名

部署成功后，Vercel会分配一个域名，例如：
`https://horoscope-cnvvvv.vercel.app`

---

## 🔧 GitHub Actions部署（需要配置）

### 为什么之前失败？

GitHub Actions需要配置Vercel Secrets才能工作。

### 配置步骤

**1. 获取Vercel Token**
- 访问：https://vercel.com/account/tokens
- 点击 "Create Token"
- Token名称：`Horoscope GitHub Actions`
- Scope：Full Account
- 点击 "Create" 并复制Token（格式：`vercel_xxx...`）

**2. 获取Org ID和Project ID**

**方法A：通过Vercel CLI**（需要先登录）
```bash
vercel link  # 在项目目录下运行
vercel project ls
vercel orgs ls
```

**方法B：通过Vercel网页**
- 访问Vercel项目页面
- 进入 Settings → General
- 复制 Project ID 和 Organization ID

**3. 添加到GitHub Secrets**

访问：https://github.com/cnvvvv/horoscope/settings/secrets/actions

点击 "New repository secret"，添加以下3个：

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | vercel_xxx... (从步骤1) |
| `VERCEL_ORG_ID` | xxx... (从步骤2) |
| `VERCEL_PROJECT_ID` | xxx... (从步骤2) |

**4. 自动部署**

配置完成后，每次推送代码到main分支会自动部署。

---

## 🚀 快速部署（已配置Vercel CLI）

如果您已经通过 `vercel login` 登录过：

```bash
cd /root/myclaude/horoscope

# 1. 链接项目（首次）
vercel link

# 2. 部署到生产环境
vercel --prod
```

---

## 📊 当前状态

### GitHub仓库
- ✅ 代码已推送：https://github.com/cnvvvv/horoscope
- ✅ 配置已修复（next.config.js）
- ✅ 工作流已优化

### 部署选项

**选项1：Vercel网页（推荐）** ⭐
- 最简单，无需配置Secrets
- 一次设置，自动部署
- 适合快速上线

**选项2：Vercel CLI**
- 需要登录
- 快速手动部署
- 适合测试

**选项3：GitHub Actions**
- 需要配置3个Secrets
- 完全自动化
- 适合CI/CD流程

---

## ❓ 常见问题

**Q: GitHub Actions一直失败怎么办？**
A: 使用选项1（Vercel网页），更简单可靠。

**Q: 如何查看GitHub Actions错误日志？**
A: 访问 https://github.com/cnvvvv/horoscope/actions

**Q: Vercel需要付费吗？**
A: 不需要，免费额度足够个人项目使用。

**Q: 可以自定义域名吗？**
A: 可以，在Vercel项目设置中添加自定义域名。

---

**推荐：现在使用选项1（Vercel网页）进行首次部署！**

5分钟内即可完成 ✅
