# 西湖窗景诗词小程序

> 一款诗意盎然的微信小程序，根据实时天气、季节和时段，为你呈现匹配的西湖诗词。

## ✨ 功能特色

- **实时天气联动**：自动获取杭州西湖区天气，匹配相应诗词和背景
- **竖排诗词展示**：传统竖排书法风格，一句一列，古韵悠长
- **双模式切换**：
  - 「此刻·西湖」：根据实时天气自动匹配
  - 「我的·西湖」：手动选择季节、时段、天气，自由探索
- **天气特效**：雨、雪、雾动态特效，沉浸式体验
- **西湖白噪音**：水波声背景音，营造宁静氛围
- **防重复机制**：智能记录已展示诗词，避免重复

## 📁 项目结构

```
xihu-poem-miniprogram/
├── app.js              # 小程序入口
├── app.json            # 全局配置
├── app.wxss            # 全局样式
├── sitemap.json        # 搜索配置
├── README.md           # 说明文档
├── pages/
│   └── index/
│       ├── index.js    # 页面逻辑
│       ├── index.json  # 页面配置
│       ├── index.wxml  # 页面结构
│       ├── index.wxss  # 页面样式
│       └── data.js     # 诗词数据
```

## 🚀 使用方法

### 1. 注册小程序账号
- 访问 [微信公众平台](https://mp.weixin.qq.com/)
- 注册小程序账号（个人或企业）
- 获取 AppID

### 2. 下载微信开发者工具
- 下载地址：[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 安装并登录

### 3. 导入项目
1. 打开微信开发者工具
2. 点击「导入项目」
3. 选择 `xihu-poem-miniprogram` 文件夹
4. 输入你的 AppID
5. 点击「导入」

### 4. 预览与发布
- **预览**：点击「预览」，扫描二维码在手机上体验
- **上传**：点击「上传」，填写版本号提交审核
- **发布**：审核通过后即可发布上线

## 📝 配置说明

### app.json 配置
```json
{
  "pages": ["pages/index/index"],
  "window": {
    "navigationBarTitleText": "西湖窗景",
    "navigationBarBackgroundColor": "#0a1628"
  }
}
```

### 数据源
- **天气 API**：Open-Meteo（免费，无需密钥）
- **背景图片**：Unsplash（CDN）
- **白噪音**：Pixabay（CDN）

## 🎨 自定义内容

### 添加自己的诗词
编辑 `pages/index/data.js`：

```javascript
// 名人诗词
const CLASSIC = [
  {id:"c29", s:"spring", p:"day", w:"sunny", 
   text:"你的诗句\n第二句", 
   author:"作者", dynasty:"唐", theme:"主题"},
  // ...
];

// AI 风格诗词
const AI_TPL = {
  "spring-day-sunny": [
    {text:"第一句\n第二句\n第三句\n第四句", theme:"主题"},
  ],
  // ...
};
```

### 添加背景图片
编辑 `pages/index/data.js` 中的 `BG_IMAGES`：

```javascript
const BG_IMAGES = [
  {url:"你的图片URL", tags:["spring","sunny"], desc:"图片描述"},
  // ...
];
```

## 📱 界面预览

| 功能 | 描述 |
|------|------|
| 顶部状态栏 | 实时时钟、天气信息、音频开关 |
| 背景层 | 动态天气背景图 + 特效 |
| 诗词区 | 竖排展示，一句一列 |
| 底部控制 | 模式切换、自定义面板 |

## ⚠️ 注意事项

1. **网络请求**：小程序需要配置域名白名单，开发阶段可勾选「不校验合法域名」
2. **音频播放**：需要用户点击触发，自动播放可能被限制
3. **图片加载**：建议使用 HTTPS 图片地址
4. **存储限制**：使用 wx.setStorageSync 存储浏览历史

## 📄 开源协议

MIT License

## 🙏 致谢

- 天气数据：Open-Meteo
- 图片资源：Unsplash
- 音频资源：Pixabay
