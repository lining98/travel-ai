# 旅游规划助手 - Travel AI

一个基于 **Vue 3 + Node.js + Express + LangChain** 的AI 助手移动端应用，用于智能旅游规划咨询。利用大语言模型能力提供智能旅游推荐和实时流式对话服务。

## ✨ 功能特性

- 🎯 **AI 驱动的智能推荐** - 基于 LangChain 调用大语言模型，根据城市、预算、天数生成个性化行程规划
- 💬 **流式对话体验** - 实时接收 AI 助手的逐字回复，提供流畅的聊天打字机效果
- 🔗 **多模型支持** - 通过 LangChain 灵活对接多种大模型服务商（SiliconFlow、DeepSeek等）
- 📱 **响应式设计** - 专为移动端优化，支持多种屏幕尺寸
- 🎨 **现代化 UI** - 基于 Vant UI 组件库，界面简洁美观

## 🛠️ 技术栈

### 前端

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 8.x
- **UI 组件库**: Vant 4.x
- **路由管理**: Vue Router 4.x
- **HTTP 客户端**: Axios

### 后端

- **Node.js 框架**: Express 4.19.x
- **AI 框架**: LangChain (@langchain/core 1.1.x, @langchain/openai 1.4.x)
- **跨域支持**: CORS
- **环境配置**: dotenv
- **开发工具**: nodemon
- **语言**: JavaScript (ES6+, ES Modules)

### AI 能力

- **大模型对接**: 支持 SiliconFlow、DeepSeek 等多种模型服务
- **流式输出**: Server-Sent Events (SSE) 实时响应
- **结构化输出**: 通过提示词工程引导 LLM 返回规范 JSON 格式

## 📁 项目结构

```
├── travel-h5/           # 前端项目
│   ├── src/
│   │   ├── components/ # 公共组件
│   │   │   ├── BudgetTable.vue   # 预算表格组件
│   │   │   ├── ChatBubble.vue    # 聊天气泡组件
│   │   │   └── SpotItem.vue      # 景点列表项组件
│   │   ├── views/      # 页面视图
│   │   │   ├── Home.vue     # 首页 - 城市选择与推荐入口
│   │   │   ├── Chat.vue     # 聊天页 - AI 对话（流式响应）
│   │   │   ├── Detail.vue   # 详情页 - 行程规划展示
│   │   │   └── Profile.vue  # 个人中心页
│   │   ├── utils/      # 工具函数
│   │   │   └── request.js   # HTTP 请求封装（含流式请求）
│   │   └── router/     # 路由配置
│   └── ...
│
└── travel-server/      # 后端项目
    └── src/
        ├── routes/     # 路由定义
        │   └── travel.js    # 旅游相关接口
        ├── services/   # 业务逻辑
        │   └── travelService.js  # LangChain 服务封装
        ├── utils/      # 工具函数
        │   └── streamUtils.js    # SSE 流式工具
        └── index.js    # 服务入口
```
