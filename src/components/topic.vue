// 获取主题首页

<template>
  <div class="topic">
    <div class="tabbar">
      <span class="cell active" @click="changeTab">全部</span>
      <span class="cell" @click="changeTab">精华</span>
      <span class="cell" @click="changeTab">分享</span>
      <span class="cell" @click="changeTab">问答</span>
      <span class="cell" @click="changeTab">招聘</span>
    </div>
    <div class="wrapper" ref="wrapper">
      <ul class="content" ref="content">
        <router-link
          :to="'/home/topicinfo/'+item.id"
          class="libox"
          tag="li"
          v-for="item in topicList"
          :key="item.id"
        >
          <img :src="item.author.avatar_url" alt />
          <div class="visit">
            <span>{{item.reply_count}}/</span>
            <span>{{item.visit_count}}</span>
          </div>
          <span class="title">{{item.title}}</span>
          <span class="last_reply">{{item.last_reply_at | formateDate}}</span>
        </router-link>
      </ul>

      <!-- 用来在数据未到来前展示 loading 图标的，通过设置 flag,使用 v-if 和 v-else 来控制展示-->
      <!-- 但此处取巧了，因为展示的数据较多，loading 图标在最下面，看不到，所以不用 v-if 来控制-->
      <!-- 直接展示在页面上，底部上拉时才能看到，一旦获取到数据，则又被数据挤到最后 -->
      <!-- 此取巧只适合内容较多时，内容较少则不适合 -->
      <div class="loading-wrapper">
        <img src="../assets/loading.gif" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      topicList: [],
      tab: "all",
      page: 1
    };
  },
  created() {
    this.getTopic();
  },
  mounted(){
    this.loadmore()
  },
  methods: {
    getTopic() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: { page: this.page, limit: 20, tab: this.tab }
        })
        .then(res => {
          this.topicList = this.topicList.concat(res.data.data);
          console.dir(res.data.data);
        });
    },

    // ------------------------

    changeStyle(aim) {
      let tabs = document.querySelectorAll(".tabbar .cell");
      tabs.forEach(tab => {
        tab.classList.remove("active");
      });
      aim.classList.add("active");
    },
    changeTab(e) {
      // console.log(e.target.innerText)
      let aim = e.target; // 存储点击的元素，后面用来修改样式
      let temp = e.target.innerText;
      this.topicList = []
      switch (temp) {
        case "全部":
          this.tab = "all";
          this.getTopic();
          this.changeStyle(aim);
          break;
        case "精华":
          this.tab = "good";
          this.getTopic();
          this.changeStyle(aim);
          break;
        case "分享":
          this.tab = "share";
          this.getTopic();
          this.changeStyle(aim);
          break;
        case "问答":
          this.tab = "ask";
          this.getTopic();
          this.changeStyle(aim);
          break;
        case "招聘":
          this.tab = "job";
          this.getTopic();
          this.changeStyle(aim);
          break;
      }
    },
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
    
  }
};
</script>
<style lang="scss" scoped>
.loading-wrapper{
  text-align: center
}
.wrapper {
  height: calc(100vh - 105px);
  overflow: scroll;
}
.topic {
  .tabbar {
    display: flex;
    padding-bottom: 1px;
    padding: 10px;
    .cell {
      flex: 1;
      padding: 10px;
      text-align: center;
    }
    .active {
      color: #0088cc;
      border-bottom: 2px solid #999;
    }
  }
  .libox {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    .visit {
      font-size: 9px;
      line-height: 40px;
      width: 50px;
      span {
        &:first-child {
          font-size: 10px;
          color: #9e78e0;
        }
      }
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
    .last_reply {
      width: 50px;
      font-size: 12px;
      line-height: 40px;
      margin-left: 5px;
    }
    .title {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      line-height: 40px;
    }
  }
}
</style>