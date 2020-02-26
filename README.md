## 一：主要技术
1. vue
2. vue-router
3. jquery
4. axios
5. HTML5
6. CSS3
## 二：上拉加载更多
1. 使用`jquery`操作`dom`元素，通过对比盒子与其内容的高度，来判断是否到达底部,也可使用原生JS来操作
2. 内容的高度，一开始没有渲染，所以要在页面渲染后才能拿到内容的高度，所以在哪里写才能获取内容的高度？
3. 主要代码:
```
isToBottom($viewport,$content){
  // 使用 jquery
  return $viewport.height() + $viewport.scrollTop() + 30 > $content.height()
  // 使用 原生 js
  // return $content.clientHeight + 30 > $viewport.scrollHeight - $viewport.scrollTop
},
loadmore(){      
  /* 法一：使用原生 JS 来实现下拉加载
  let dom = document.querySelector('.wrapper')
  let clock
  dom.addEventListener('scroll',()=>{
    let content = document.querySelector('.content')
    if(clock){
      clearTimeout(clock)
    }
    clock = setTimeout(() => {
      if(this.isToBottom(dom,content)){
          console.log('ok')
          this.page++
          this.getTopic()
      }
    }, 500);
  })
  */
  
  // 法二: 使用 jquery 来实现下拉 加载
  let $dom = $('.wrapper')
  let clock
  $dom.on('scroll',()=>{
  let $content = $('.content')
    if(clock){
      clearTimeout(clock)
    }
    clock = setTimeout(() => {
      if(this.isToBottom($dom,$content)){
          console.log('ok')
          this.page++
          this.getTopic()
      }
    }, 500);
  })

}
```
## 三：数据未渲染到页面上，loading 加载
1. `topic.vue`中
用来在数据未到来前展示 `loading` 图标的，通过设置 `flag`,使用 `v-if` 和 `v-else` 来控制展示，但此处取巧了，因为展示的数据较多，`loading` 图标在最下面，看不到，所以不用 `v-if` 来控制，直接展示在页面上，底部上拉时才能看到，一旦获取到数据，则又被数据挤到最后。此取巧只适合内容较多时，内容较少则不适合
2. `topic.vue`中,使用 `v-if`和`v-else`，通过`isShow`来控制 `loading`是否展示
```
<div class="loading-wrapper" v-if="isShow">
  <img src="../assets/loading.gif" alt />
</div>
<div v-else>
  .....
</div>
```