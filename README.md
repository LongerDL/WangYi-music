# music_player

## 下载依赖包

```
npm install
```

### 启动服务器

```
npm run serve
```

### 打包

```
npm run build
```

#### 首页内容

![image-20220521190154595](https://s2.loli.net/2022/05/21/2XlVA38r6xiCnFT.png)

#### 歌单内容

![image-20220521190503171](https://s2.loli.net/2022/05/21/FjZ1xzTKlJgqkib.png)



#### 排行榜内容

![image-20220521190255409](https://s2.loli.net/2022/05/21/RVuzUDstyPnpwrZ.png)

#### 歌手内容

![image-20220521190351168](https://s2.loli.net/2022/05/21/w7C8jV4HupP51Xs.png)

#### 歌手详情

![image-20220521190424919](https://s2.loli.net/2022/05/21/rFASOtmTHi5Ry9W.png)

### git上传仓库命令

在github上新建一个仓库

git init	初始化项目

git add .	添加待上传

git commit -m "注释语句"	提交到本地仓库

git remote add origin+新建Repository的地址	关联远程仓库

git push -u origin master	上传到远程仓库

### 5.7号

搭建好工程之后，先开发首页，制作上下两栏的固定布局

```js
//配置热更新
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true,
  },
});
```

input的type为text的输入框不支持伪元素（before和after）

##### 完成头部导航栏

![image-20220508105345230](https://s2.loli.net/2022/05/19/gB6a3LvM9zmxGUl.png)

继续做第二部分的路由导航部分，路由导航分为四栏目（个性推荐、歌单、排行榜、歌手）

动态属性不要写成以下这样

```js
:class="{index == curIndex ? 'select' : ''}"
```

要这样写

```js
:class="index == curIndex ? 'select' : ''"
//或者
:class="select: index == curIndex"
```

### 5.8号

vue是默认事件会冒泡的

嵌套路由，homeView里面嵌套四个路由

![image-20220508161505391](https://s2.loli.net/2022/05/19/2utkfJNEz53x69U.png)

需要现在homeView中写上`<router-view></router-view>`，然后进而配置路由

![image-20220508161550740](https://s2.loli.net/2022/05/19/MphJq1FdctYNl3o.png)

数据是通过跨站请求伪造从网易云的服务器爬取下来的，因为浏览器请求网易云的服务器会发生跨域，但是网易云不可能给我配置cors和jsonp让我请求它的接口，那么可以通过反向代理，大神配置一台服务器去请求网易云服务器暴露的接口是不会发生跨域问题，然后我再去请求大神配置的服务器的接口就不会发生跨域问题了。

把服务器的接口爬取下来之后，

```js
npm i //下载依赖
node app.js	//启动服务器
```

<font color='red'>如果定义的数据是数组，获取数据之后不要直接给数组赋值，而是要调用数组的push方法，将数据解构后push到数组当中，否则数据不会更新的</font>

其中轮播图组件使用到了elementui的走马灯组件。

### 5.9号

发现一个路由问题，就是当在url栏输入其他路由路径的时候，导航栏目的样式不会改变，可以通过vue-router内置的类样式进行解决，但是这个方法的弊端就是会导致页面刷新。

![image-20220509094317315](https://s2.loli.net/2022/05/19/1BxOzUmWe29J54S.png)

object-fit该属性可以防止图片被拉伸，有cover、contain等属性值

其实每一个歌单是可以封装成一个组件的，可是我并没有这么做，导致了代码冗余...



### 5.10号

cookie是基于http协议的，只在http协议下生效。

今天终于解决了登录问题失效的问题了，<font color='red'>主要原因就是axios进行网络请求的时候为了性能优化是不会自动携带cookie的，需要我自己手动携带！！</font>只要在axios中配置一下withCredentials: true就可以了

#### 解决方法一：

![image-20220510205751842](https://s2.loli.net/2022/05/19/thSEPcBaVKGRM5I.png)

![image-20220510205903460](https://s2.loli.net/2022/05/19/Za7zutCxPmUhWFM.png)

配置以下参数是为了解决`WebSocket connection to 'ws://192.168.0.17:3002/ws' failed:`报错问题，也可以解决跨域问题，当在跨域时也可以发送cookie

```js
proxy: {
    "/api": {
        target: "http://localhost:3000 ", //这是服务器地址
    },
},
```

400状态码：客户端请求语法错误，没有权限访问服务器。

### 5.11号

@dblclick="handlexxx"：dblclick指的是鼠标双击事件

关于v-for循环中，多个标签绑定ref需要用到动态属性

![image-20220511151845140](https://s2.loli.net/2022/05/19/dJ5TvEcb7QmXV4K.png)

![image-20220511151850890](https://s2.loli.net/2022/05/19/pJvT71gbmzPrlF6.png)

另外，因为vue语法编译的特点不要直接在插值语法中使用三元表达式，虽然不会编译失败但是会一直报红，最好使用v-text指令或者把特殊字符进行转义。

![image-20220511174726199](https://s2.loli.net/2022/05/19/AWGocfC25p8z1vJ.png)

解决办法如下：

```html
<span v-text="index < 10 ? '0' + index : index"></span>
```

<font color='red'>'0'一定不要写成"0"</font>，不然一直会报错



### 5.12号

使用全局事件总线对兄弟组件间进行组件通信，但是遇到的问题就是dom渲染时没有数据，可是控制台打印的时候是有数据的，这一点我不清楚是为什么

![image-20220512094022403](https://s2.loli.net/2022/05/19/SfocUjFrtiguDJI.png)

不知道为什么在任何生命周期钩子中都拿不到事件总线的所抛出来的数据，这个问题困扰我很久

![image-20220512161412225](https://s2.loli.net/2022/05/19/wcNClB3ZgX7Ftfe.png)

### 5.13号

<font color='red'>使用vuex存储数据的时候一旦页面刷新就丢失了信息</font>，因为js的数据都是保存在浏览器的栈堆内存中的，刷新浏览器页面以前的栈堆内存都被释放了，自然数据就丢失了，可以把vuex的数据缓存在localstorage或者sessionstorage中。

**解决方法**

使用第三方插件`vuex-persistedstate`

```js
//1. npm install vuex-persistedstate -S //安装插件
//2. 在 store/index.js 文件中添加以下代码：
import persistedState from 'vuex-persistedstate'
const store = new Vuex.Store({
 state:{},
 getters:{},
 ...
 plugins: [
    persistedState({ storage: window.sessionStorage })
]
})
```

![image-20220513181609298](https://s2.loli.net/2022/05/19/qRBhAgO32iwoaJG.png)

判断一首歌曲是否有SQ和MV是根据每一首歌中的sq属性和mv属性。如果sq为null则没有SQ标志，反之则为Object；如果mv=0则没有mv视频，反之mv不为0

### 5.14号

完善命名路由的功能，每点击一个歌单跳转到该歌单的详细信息页面下面，并且url栏目拼接上该歌单的id，从推荐歌单页面点击跳转后，路由也会改变并且显示id。

通过`this.$route`可以拿到当前路由的相关信息。

![image-20220514161732039](https://s2.loli.net/2022/05/19/Ev6lNyBWVQXf2hu.png)

params参数比query参数安全一点，query参数会把键值对都暴露在url栏，而params不会暴露键，相对而言更贱安全一点

<font color='red'>还有一个优化需要做，就是当歌曲数量过多的时候，需要先加载前面十几首歌曲，后面的歌曲路由再加载</font>

### 5.15号

使用高斯模糊对图片背景进行模糊处理，关于全局事件总线，必须是要被引入了页面在使用的组件才会生效。

<font color='red'>map（）方法不会改变原数组，但其实这句话并不严谨。当数组中的值为基本数据类型时，不会改变原始数组。当数组中的值为引用数据类型时，会改变原数组。</font>

![image-20220515174242331](https://s2.loli.net/2022/05/19/NzADqeTrsljuifa.png)

今天重点完成了通过点击按钮完成对歌手分类的刷新，其中有一个难点就是当两个按钮联动起来查询的时候逻辑会有点浮渣，我在想给每个button按钮挂载ref属性会不会好使一点。通过ref获取到语言标签和分类标签后将标签放入一个对象或者数组，然后通过该对象或者数据再去进行网络请求进而渲染。ref不仅可以获取标签也可以获取组件。这一块有一丢丢小难度，不过还是顺利解决了

splice会改变原数组实现数组的截断插入新数据，slice不会改变原数组

### 5.16号

路由回退的方法有 `this.$router.back()`和`this.$router.go(-1)`

路由前进的方法有 `this.$router.forward()`和`this.$router.go(1)`

如果直接把异步请求过来的数据载入页面会报数据未定义的错误，建议先把数据存储起来，然后通过存储的数据再载入页面，否则需要使用&&运算判断是否存在然后再渲染

![image-20220516174719551](https://s2.loli.net/2022/05/19/eHouswqiWjFdx2t.png)

<font color='orange'>经验总结：如果样式没有生效，大概率是父子层级写错了</font>

路由的params可选参数其中问号要写在最后面：

![image-20220516191112448](https://s2.loli.net/2022/05/19/iw25cpRXCErbZ3o.png)

### 5.17号

主路由下的第一个子路由如何默认显示高亮，可以在父路由上使用`redirect`重定向到第一个子路由

![image-20220517152155822](https://s2.loli.net/2022/05/19/JQUZSHK9j8MegqV.png)

**white-space: pre-line;**属性可以根据数据中的/n属性进行换行操作

`text-indent: 32.4px;`：属性可以对段落进行空两格处理

![image-20220517162142587](https://s2.loli.net/2022/05/19/qux9B6ZtgO5aovA.png)

文本换行并且空两格逻辑。

今天完成了mv相关部分以及歌手具体信息的子路由部分

![image-20220517173531536](https://s2.loli.net/2022/05/19/vbDgEYQOMXFIer5.png)

点击相似歌手其中一个歌手跳转后，歌手简介栏没有更新，是因为当前组件并没有销毁，所以数据不会更新，可以把需要监听的数据放在watch或者beforeUpdate钩子里面

![image-20220517182517087](https://s2.loli.net/2022/05/19/d694XFGfkaryYEN.png)

### 5.18号

<font color='red'>难点：点击相关mv视频路由的参数变化了，但是页面没有刷新。</font>

解决：路由路径并没有变化只是参数变化了，所以当前组件并没有销毁，可以使用watch监听路由变化，将请求相关数据逻辑放在`init`方法中，在created钩子和watch中调用该方法，实现数据更新。

![image-20220518112911887](https://s2.loli.net/2022/05/19/sjlIwZphtXBoAWa.png)

<font color='red'>v-for循环嵌套v-for循环是个难点</font>

![image-20220519143007145](https://s2.loli.net/2022/05/19/XUaYpMkg3vSDVGL.png)

### 5.19号

<font color='red'>父组件和子组件同时在created钩子中使用async关键字，父组件在created中请求数据并且通过props传递给子组件，子组件在created钩子中进行接收数据，会出现子组件拿不到数据的情况，可以使用watch和vuex解决 。</font>

![image-20220519143305403](https://s2.loli.net/2022/05/19/VYRPODv49A1ba8Z.png)

![image-20220519143355106](https://s2.loli.net/2022/05/19/FusDvKWUplfdPE7.png)

使用`vue-lazyload`第三方插件对图片进行骨架屏占位功能

![image-20220519184756170](https://s2.loli.net/2022/05/19/w4ndLkYPojeUKGh.png)

### 5.20号

使用position：fixed定位固定底部footer时，底部的内容被遮挡住了。

解决方法：1.给footer嵌套一个等高的div

​					2.写一个和footer等高的div把高度给撑开

关于watch监听vuex中的数据变化，需要使用到computed计算属性将待监听的数据返回，然后使用watch监听该计算属性，再进行data赋值操作

![image-20220520115138960](https://s2.loli.net/2022/05/20/rfQUOh32S8xtydY.png)

### 5.21号

完成歌曲播放/暂停逻辑以及上一首下一首播放按钮的功能，这一部分的逻辑稍微有点点复杂

### 5.22号

路由模式最好选择hash模式，因为history模式打包后会出现资源请求不到的错误。

