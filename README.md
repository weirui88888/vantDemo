## 效果图


![](https://user-gold-cdn.xitu.io/2018/12/7/167845e8afaf6f2a?w=384&h=672&f=gif&s=766324)

### 首页

![](https://user-gold-cdn.xitu.io/2018/12/7/167844d1957b960b?w=395&h=678&f=png&s=57159)

### 分类页

![](https://user-gold-cdn.xitu.io/2018/12/7/167844d5dfa8fdc5?w=392&h=687&f=png&s=59976)

### 查询页

![](https://user-gold-cdn.xitu.io/2018/12/7/167844e12eb583c0?w=390&h=684&f=png&s=54291)

### 详情页


![](https://user-gold-cdn.xitu.io/2018/12/7/167844e89aed2d43?w=392&h=678&f=png&s=97819)

## 前言
半年前写过一个pc端的前后端项目[express-mongodb-vue][1]，收到了一些同学的感谢私信。自己写的一些技术博客能够得到别人的认可，帮助他人的同时，也可以提高自己的技术能力和语言表达能力，何乐而不为。

这次正好我们组有个移动端项目，我在网上看了一些移动端的vue组件库，没有什么让我一眼爱上的，后来发现了有赞公司开源的一套vue组件库[vant][2]，顿时让我心跳加速，欢喜的不行。这里我要先感谢**有赞公司**，"大哥"牛逼。

因为我们组开发模式还是没有完全脱离前后端分离，还是在用`springmvc`、`jsp`那一套东西 ，所以想要放开手来干，开发单页应用是不现实的。于是乎，只好老老实实的去配合后台开发，没有使用脚手架搭建模块化工程，而是用了cdn,来回调用他的`controler`...

因为项目层级结构相对来说比较简单，而且是典型的单页应用，于是乎，我想是否可以尝试着自己一个人搞定前后台。因为项目不涉及本公司敏感内容，所以决定撸起袖子加油干。

## 备注
该需求里面涉及的技术点还是相对来说比较丰富的，我会将一些疑难点我会拎出来给大家重点讲下。相比代码的编写，我更加关注整个思路。你可以跟着我的思路，去`github`上加代码`clone`下来，先大概捋一遍，遇到问题，可以私信我。大家一起成长～

我相信，将代码捋几遍后，自己再去实战一遍，你一定会收获颇丰。

> 当你实战的时候，你可能需要建立数据库表，sql语句可以找我要，项目里面的图标我也在iconfont上建立了个项目，如果也要复用的话，也可以联系我，我把你加入项目，你就可以直接使用了。



## 技术栈

`vue` `vant` `vue-router` `axios`  `lodash` `better-scroll` `express` `mongoose` `sessionStorage` `iconFont` `vue-wechat-title`

**上面列出的是本次实践主要用到的一些技术点，下面会简单介绍下，同时给大家贴出链接，想要具体了解的，可自行前往学习**

 - **[vue][3]** 不多介绍了，渐进式框架，也是目前我最喜欢或是用起来最爽的前端框架
 - **[vant][4]**  有赞公司提供的，轻量、可靠的移动端 Vue 组件库，十分好用的开源组件库
 - **[vue-router][5]**  官方的路由管理器，开发单页应用必备神器
 - **[axios][6]**  是一个基于 promise 的 HTTP 库，前后台交互神器，本项目原本是用vue-resource的，后台为了给大家介绍下如何使用，换成了axios
 - **[lodash][7]**  一个一致性、模块化、高性能的 JavaScript 实用工具库。本次项目应用到lodash的不多，只是告诉大家如何利用该工具库
 - **[better-scroll][8]**  一个移动端滚动的解决方案
 - **[express][9]**  基于 Node.js 平台，快速、开放、极简的 Web 开发框架
 - **[mongoose][10]**  是在node.js异步环境下对mongodb进行便捷操作的对象模型工具
 - **[sessionStorage][11]** 本地缓存的一种方式，其他的还有localStorage、cookie
 - **[iconFont][12]** 阿里巴巴图标库
 - **[vue-wechat-title][13]** 单页应用切换页面时，改变页面title的插件库

---

# 正文

整个项目归纳下，可以分为三大模块，我会围绕每个模块为大家细说一些问题

 - 前台
 - 后台
 - 数据库

## 前台

本项目前端是用官方脚手架[vue cli 3][14]，结合移动端框架[vant][15]构建而成的。

### 第一步：新建项目，安装依赖项

通过命令行安装官方脚手架，创建一个项目


    # 安装 Vue Cli
    npm install -g @vue/cli

    # 创建一个项目
    vue create wechat-common-problem
    
    
![](https://user-gold-cdn.xitu.io/2018/12/6/167843d53a4da0e3?w=464&h=132&f=png&s=20993)
    
执行完上面两步后，我们已经创建了一个项目`wechat-common-problem`，其中执行第二步的时候，会让你选择预置，不用管，直接选择默认回车即可。（想要了解详情的可以去看官方vuecli3介绍）

创建完成后，可以通过命令打开图形化界面（不得不说，现在的前端工程化真是越来越牛逼）

    # 打开图形化界面
    vue ui

图形化界面打开后，可以通过项目管理器入口，导入刚才自己创建的项目

![](https://user-gold-cdn.xitu.io/2018/12/6/167843ee656e4102?w=1303&h=606&f=png&s=54488)

然后通过图形化界面安装一些模块依赖（也可以通过命令行安装），安装依赖的时候，记得注意运行依赖和开发依赖的区别，也就是我们以前通过命令行安装时，懵逼的`--save`和`--save-dev`。

其中要注意，该项目引入vant组件是用的官方推荐的按需引用方式，用到的插件`babel-plugin-import`，该插件为开发依赖。其余引入的依赖大部分都是运行依赖。如下午图的`axios` `better-scroll` `express` `mongoose`等

![](https://user-gold-cdn.xitu.io/2018/12/6/167843f41980af34?w=446&h=676&f=png&s=102262)

相关依赖安装好后，我们可以通过图形化界面，启动自己项目，项目启动成功后，可以点击启动启动app，即可看到默认的项目起来了。

![](https://user-gold-cdn.xitu.io/2018/12/7/167843fdd85d123c?w=1440&h=350&f=png&s=81867)

### 第二步：建立路由文件、图标文件、定义工具类函数

因为该项目是单页应用，所以需要建立路由，我们在`src`目录下，建立一个`router`文件夹，`router`文件夹中建立一个`index.js`文件，然后配置我们项目的路由文件。

![](https://user-gold-cdn.xitu.io/2018/12/7/1678441c812d71f7?w=766&h=753&f=png&s=156546)

由于我们项目当中的图标用的是`iconfont`矢量图，所以我们在`iconfont`官网上建立了一个项目，用来存储本次项目用到的一些图标。`iconfont`图标一共支持三种使用方式，我们根据`vant`框架的指引，使用的是`unicode`这种方式，三种方式之间的区别，可以自行前往`iconfont`页面了解。

我们在`src`目录下面，创建一个`icon`文件夹，用于存放下载的图标文件，然后在`iconfont.css`文件中，做一些修改，比如定义默认图标的大小，颜色等，具体的可以参考我的代码。

然后我们在`main.js`中引入`iconfont.css`文件,即可根据`vant`提供的自定义图标方式在页面中引用了。（*这里要提醒一下，如果你们要自己新建一个`iconfont`项目的话，里面的图标前缀，和图标的名字一定要先定义好，否则后期更改的时候，会相当麻烦*）

由于我们项目中会涉及到获取后台数据的交互。刚开始的时候，我是用的`vue-resource`来获取数据的，但是由于现在`vue`官方维护的是`axios`，所以我也替换成了`axios`，不得不说，`axios`还是很好用的，我们可以初始化定制查询`baseUrl`、可以添加请求拦截器、可以为每次请求添加请求头部字段等，可以根据自己的需要自行添加。

因为我们在开发的时候，可能会重复用到一些工具类函数，比如说存缓存、取缓存，获取`url`参数，常用校验格式的正则等等，所以我们可以写一个工具类函数，可以避免代码冗余。

在`common`目录的`js`下文件下，我创建了一个`myTool.js`工具类函数，里面有一些通用的方法。还有一个`request.js`文件，用来创建`axios`实例，在需要的组件中，直接调用实例，发送请求即可。可以实现一次编写，多次利用。

**到这里，前台这一块的架构基本上已经搭建好了，剩下的就是写业务代码了，可以自行参考代码**


## 后台

### 第一步：建立数据模型schema
后台这一块，我是用的基于`node`的web开发框架`express`,里面基本的概念也就是中间件和路由，这里的路由我理解就是`spring mvc`那一套里面的`controler`。

在根目录下面建立个`models`文件夹，里面新建了个`allProblem.js`文件，是用来建立数据模型(`mongodb`这一块我目前还不是很熟悉，有想具体了解的，可以自行前往学习，好像挺有意思的)

### 第二步：建立后台路由

在根目录下面建立个`router`文件夹，里面新建了个`commonProblem.js`路由文件，里面定义了整个项目前台需要用到的一些路由（该路由和`vue-router`不是一个概念，需要区分开），这里的路由说白了，就是前端请求过来了，后台需要执行什么动作，去数据库中操作数据，最终返回给页面一个结果。

因为`mongodb sql`语句这一块我才刚开始学习，所以有很多快捷操作数据库的方法还不会，里面常用的就是`find` `findOne` `findById`基本上能满足我们的一些简单的查询需求。

### 第三步：建立后台启动文件

在根目录创建一个`app.js`文件，连接上该项目用到的本地数据库`problem`，将后台路由和数据库建立关联关系。

    var db = mongoose.connect('mongodb://localhost:27017/problem');
    
### 第四步：解决跨域问题
因为我们的前端项目默认是在`8080`端口，而我们启动后台的端口为`3000`，`vue-cli3`脚手架搭建的项目，已经不再有之前的`build`和`config`文件夹了，之前版本解决跨域问题是修改`config`目录下面的`index.js`文件，里面有个配置项`proxyTable`。

现在，反而更加方便了，我们只需在**根目录**创建一个`vue.config.js`文件即可，在文件中新增一些配置项，比如改变默认端口、解决跨域问题等。

##数据库
该项目实用的后台语言是`node`,所以这里数据库我选择了用`mongodb`,我们只需在本地下载`mongodb`，启动后，可以直接使用图形化工具[Robo 3T][16]进行数据库方便建库建表工作。在该项目中创建的库是`problem`，用到的表为`allProblem`。


![](https://user-gold-cdn.xitu.io/2018/12/7/1678442ec686943f?w=714&h=481&f=png&s=119557)

*如果觉得安装、启动mongodb麻烦的话，推荐大家使用[homebrew][17]一键安装启动*

----------

**好了，到这里我们的准备工作已经完成了。我们回顾下做了哪些准备工作**

 1. 用官方脚手架`vuecli3`创建项目`wechat-common-problem`，并通过图形化`ui`工具安装项目需要的开发依赖和运行依赖；
 2. 建立前端路由文件`index.js`、图标文件、定义工具类函数`myTool.js`  `request.js`；
 3. 建立数据模型`allProblem.js`文件；
 4. 建立后台路由接口`commonProblem.js`文件；
 5. 建立`vue.config.js`文件，解决项目跨域问题；
 6. 使用图形化数据库工具`Robo 3t`建库建表；
 

## 总结

上面的准备工作完成之后，就是编写业务代码，这里我给大家列出一些实际开发过程中遇到的问题。

> 图标库iconfont的使用虽然可以减少http请求图片的次数，方便我们开发。但是我们以后在创建图标库时，图标前缀一定要规范，图标名字也尽量用图标对应的英文。避免后期更改图标，以及在项目中使用对应图标的很多麻烦。
 
> better-scroll组件，解决移动端滚动的问题，里面提供了很多配置项，本项目中就用了基本的配置项。但是我们代码写的时机、结构也很有讲究，否则可能不会达到你预期的结果（不滚动），在我们的实际工作中，列表的数据往往都是异步获取的，因此我们初始化 better-scroll 的时机需要在数据获取后。也会遇到滚动的时候，最下面的数据被挡住的问题，这时不妨加上一个定时器。

> 由于我们项目为单页应用，所以如果我们想要根据不同的页面改变title的话，可以使用vue-wechat-title插件结合vue-router提供的路由导航实现。

> 根据正常用户的操作习惯，我们希望在返回上一步操作时，之前的查询条件依然还在，所以我用了sessionStorage实现，并且根据用户的操作，动态的修改缓存值。
...

## 最后
_由于时间、精力、能力有限，所以文章中出现的一些错误，望大家多海涵。我把整个项目的开发思路写出来，就是方便大家跟着思路，去思考一些问题。同时也方便后期自己回顾。希望大家一起成长，前端的路上，不迷茫。_

_欢迎小伙伴们提出自己的见解，并且指出文中的错误😊_

_If this article has give you some help . why don't give me a star✨！_

**传送门:**

[个人github](https://github.com/weirui88888)

[express+mongodb+vue实现增删改查-全栈之路](https://github.com/weirui88888/express-mongodb-node)

**天青色等烟雨，而我在等你**

**原创不易，且行且珍惜**





 

  [1]: https://github.com/weirui88888/express-mongodb-node
  [2]: https://youzan.github.io/vant/#/zh-CN/intro
  [3]: https://cn.vuejs.org/
  [4]: https://youzan.github.io/vant/#/zh-CN/intro
  [5]: https://router.vuejs.org/zh/
  [6]: https://www.kancloud.cn/yunye/axios/234845
  [7]: https://www.lodashjs.com/
  [8]: http://ustbhuangyi.github.io/better-scroll/doc/api.html
  [9]: http://www.expressjs.com.cn/o/better-scroll/doc/api.html
  [10]: https://mongoosejs.com/ter-scroll/doc/api.html
  [11]: http://www.runoob.com/jsref/prop-win-sessionstorage.html
  [12]: http://www.iconfont.cn/
  [13]: https://www.npmjs.com/package/vue-wechat-title
  [14]: https://cli.vuejs.org/zh/
  [15]: https://cli.vuejs.org/zh/
  [16]: https://robomongo.org/
  [17]: https://brew.sh/index_zh-cn
