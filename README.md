# vue-cnode
## 基本介绍
使用 Vue.js 编写的 CNode 社区前端界面，基于 CNode 社区 API。

## 架构说明

```
+ src
  + api
    - index.js  // 管理前端所有 API
  + router
    - index.js  // 路由配置文件
  + store
    - index.js   // vuex 核心状态管理
    - storage.js // 负责持久化储存
  + page
    - Home.vue  // 主页
    - Login.vue // 登录页面
    - Topic.vue // 具体的话题页面
    - User.vue  // 用户详情页面
  + components
    + QrScanner
      + qrcode    // 二维码扫描库
      - index.vue // 扫描组件，负责调用媒体查询接口，显示信息等
    + TopicList
      - TopicListItem.vue // 列表项组件
      - index.vue         // 首页显示的话题列表组件
    - Navigator.vue   // 主页的导航栏
    - ReplyEditor.vue // 话题页的添加评论所使用的富文本编辑组件
    - TopicReply.vue  // 话题页显示回复的组件
  - App.vue // 根组件
  - main.js // 入口文件
```
## 应用界面
### 首页
![](http://opky3bzmc.bkt.clouddn.com/2017-05-07_19-43-48.gif)
