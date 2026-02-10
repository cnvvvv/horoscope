# 自动部署到Vercel - 配置说明

## 已完成 ✅

1. ✅ 创建GitHub Actions工作流文件
2. ✅ 配置自动部署触发器（push到main分支时自动部署）
3. ✅ 代码已推送到GitHub

## 需要配置 🔧

### 步骤1：获取Vercel Token

1. 访问 https://vercel.com/account/tokens
2. 点击 "Create Token"
3. 输入Token名称（如：Horoscope GitHub Actions）
4. 选择作用域（Scope）：Full Account
5. 点击 "Create"
6. **复制生成的Token**（格式：`vercel_xxx...`）

### 步骤2：获取Vercel Project ID和Org ID

**方法1：使用Vercel CLI**

```bash
# 登录Vercel
vercel login

# 进入项目目录
cd /root/myclaude/horoscope

# 拉取项目信息
vercel link

# 查看项目ID
vercel project ls

# 查看组织ID
vercel orgs ls
```

**方法2：通过Vercel网页**

1. 访问 https://vercel.com
2. 找到horoscope项目
3. 进入项目 → Settings → General
4. 复制 **Project ID**
5. 复制 **Organization ID**

### 步骤3：配置GitHub Secrets

1. 访问您的GitHub仓库：https://github.com/cnvvvv/horoscope
2. 点击 **Settings** 标签
3. 左侧菜单选择 **Secrets and variables** → **Actions**
4. 点击 **New repository secret**

**需要添加的Secrets：**

| Secret Name | Value | 说明 |
|------------|-------|------|
| `VERCEL_TOKEN` | `vercel_xxx...` | 步骤1中获取的Vercel Token |
| `VERCEL_ORG_ID` | `xxx...` | 步骤2中获取的Organization ID |
| `VERCEL_PROJECT_ID` | `xxx...` | 步骤2中获取的Project ID |

5. 点击 **Add secret**
6. 重复以上步骤，添加所有3个secrets

## 工作原理 📋

配置完成后，每当您推送代码到 `main` 分支时：

1. GitHub Actions会自动触发
2. 拉取最新代码
3. 安装依赖（`npm install --legacy-peer-deps`）
4. 构建项目（`npm run build`）
5. 部署到Vercel生产环境
6. 输出部署URL

## 手动触发部署 🚀

如果您想在不推送代码的情况下触发部署：

1. 访问 https://github.com/cnvvvv/horoscope/actions
2. 点击 "Deploy to Vercel" workflow
3. 点击 "Run workflow" 按钮
4. 选择分支（main）
5. 点击 "Run workflow"

## 验证部署 ✅

部署完成后：

1. 访问GitHub Actions页面查看部署状态
2. 部署成功后，会显示部署URL
3. 访问部署URL验证应用是否正常运行

## 快速命令参考 ⚡

```bash
# 查看部署状态
git log --oneline -5

# 查看GitHub Actions
# 访问：https://github.com/cnvvvv/horoscope/actions

# 手动触发部署（推送一个空提交）
git commit --allow-empty -m "Trigger deployment"
git push
```

## 故障排查 🔍

### 问题1：部署失败 - "VERCEL_TOKEN not found"

**原因**：GitHub Secrets未正确配置

**解决方案**：
1. 检查Secret名称是否正确（区分大小写）
2. 确认Token是否有效
3. 重新添加Secret

### 问题2：部署失败 - "Build failed"

**原因**：项目构建失败

**解决方案**：
1. 本地运行 `npm run build` 测试
2. 检查依赖是否安装正确
3. 查看GitHub Actions日志详情

### 问题3：部署成功但网站无法访问

**原因**：域名配置问题或应用运行时错误

**解决方案**：
1. 检查Vercel控制台的项目状态
2. 查看Vercel日志
3. 确认环境变量配置正确

## 下一步 📝

配置完成后，您只需要：

```bash
git add .
git commit -m "your changes"
git push
```

部署会自动进行，无需手动干预！

---

**需要帮助？** 请查看：
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
