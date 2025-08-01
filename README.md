# WebNav Hub

一个现代化、美观且功能丰富的网站导航页面，旨在为用户提供快速访问常用网站的便捷方式。

## 项目特点

- **分类导航**：将网站链接按类别组织，便于快速查找
- **响应式设计**：适配桌面、平板和移动设备
- **现代化UI**：渐变色彩、毛玻璃效果、卡片式布局和流畅动画
- **实时搜索**：通过搜索框快速筛选和查找所需的网站链接
- **单页应用体验**：平滑滚动和URL状态管理
- **模块化架构**：分离HTML、CSS和JavaScript，便于维护和扩展

## 技术栈

- HTML5
- CSS3 (Grid, Flexbox, CSS变量, 渐变, 毛玻璃效果, 动画)
- 原生JavaScript
- Font Awesome 图标库

## 项目结构

```
.
├── index.html       # 主页面文件
├── styles.css       # 样式文件
├── script.js        # 交互逻辑
├── data.js          # 网站链接数据
└── README.md        # 项目说明文档
```

## 功能说明

### 导航分类
- AI搜索
- 社交媒体
- 实用工具
- 科技资讯
- 云存储
- 电子邮箱

### 核心功能
1. **分类导航**：点击顶部导航栏可快速跳转到对应分类
2. **实时搜索**：在顶部搜索框输入关键词，实时筛选匹配的网站
3. **键盘快捷键**：使用 `Ctrl+K` (Windows) 或 `Cmd+K` (Mac) 快速聚焦搜索框
4. **响应式设计**：在不同设备上都能获得良好的浏览体验
5. **平滑动画**：卡片悬停效果和页面滚动动画提升用户体验

## UI设计亮点

- **现代化渐变色彩**：使用橙色渐变作为主色调，视觉冲击力强
- **毛玻璃效果**：导航栏和页脚采用毛玻璃效果，增强层次感
- **精致的搜索框**：圆角设计、聚焦动画和阴影效果
- **卡片悬停效果**：悬停时卡片上浮并带有渐变背景
- **流畅动画**：所有交互都有适当的过渡动画

## 部署方式

支持部署到任何静态网站托管服务：
- GitHub Pages
- Netlify
- Vercel
- EdgeOne Pages
- Cloudflare Pages

## 自定义

要添加新的网站链接，只需编辑 [data.js](file:///C:/Users/bbylw/Desktop/navs/data.js) 文件：
1. 在 `linkData` 对象中找到对应的分类
2. 按照现有格式添加新的链接对象：
```javascript
{ url: '网站地址', icon: 'Font Awesome图标类名', name: '网站名称' }
```

要添加新的分类：
1. 在 `navData` 数组中添加新的分类对象：
```javascript
{ id: '分类ID', name: '分类名称' }
```
2. 在 `linkData` 对象中添加对应的链接数组

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

要求支持 HTML5、CSS3 和 ES6 的现代浏览器。