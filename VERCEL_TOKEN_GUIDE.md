# Vercel自动部署流程

## 🎯 目标

在服务器上配置Vercel CLI，实现推送代码后自动部署。

## 步骤1：获取Vercel Token（您在本地操作）

**在浏览器中操作：**

1. 访问：https://vercel.com/account/tokens
2. 点击 "Create Token"
3. 填写：
   - Token Name: `Horoscope Server`（任意名称）
   - Scope: `Full Account`
   - Expiration: `90 days` 或 `No Expiration`
4. 点击 "Create"
5. **复制生成的Token**（格式：`vercel_xxxxxxxxxxxxxx`）

**⚠️ Token只会显示一次，请妥善保存！**

---

## 步骤2：提供Token给小龙虾

**把Token发给我，格式：**
```
token: vercel_xxxxxxxxxxxxxx
```

---

## 步骤3：小龙虾在服务器上配置（我来操作）

我会执行：

```bash
# 1. 使用Token登录
vercel login --token <YOUR_TOKEN>

# 2. 链接项目
cd /root/myclaude/horoscope
vercel link

# 3. 部署到生产环境
vercel --prod
```

---

## 步骤4：配置GitHub自动触发（一次性）

成功部署后，Vercel会自动：
- 检测GitHub仓库的推送
- 自动触发部署
- 每次推送代码都会自动部署

---

## 📋 您现在需要做的

**只需要1步：**

访问 https://vercel.com/account/tokens
→ 创建Token
→ 把Token发给我

**其他的我来完成！** ✅

---

## 🚀 部署完成后

**之后您只需要：**

```bash
# 在任何地方修改代码
git add .
git commit -m "your changes"
git push

# Vercel自动部署，无需任何操作！
```

---

## ❓ 常见问题

**Q: Token安全吗？**
A: 是的，Token存储在服务器本地，只有您和我可见。

**Q: 可以修改Token吗？**
A: 可以，随时可以在Vercel中撤销旧Token，创建新Token。

**Q: Token有效期？**
A: 建议设置90天或无过期时间。

**Q: 部署需要多久？**
A: 首次约3-5分钟，之后每次1-2分钟。

---

**现在去创建Token吧，发给我！** 🎯
