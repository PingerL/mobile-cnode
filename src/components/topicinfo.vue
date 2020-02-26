// 获取主题详情

<template>
  <div class="topicinfo">
    <div class="loading-wrapper" v-if="isShow">
      <img src="../assets/loading.gif" alt />
    </div>
    <div v-else>
      <h1>{{topicInfo.title}}</h1>
      <div class="detail">
        <span>发布于：{{topicInfo.create_at | formateDate}}</span>
        <span>作者：{{topicInfo.author.loginname}}</span>
        <span>{{topicInfo.visit_count}}次浏览</span>
      </div>
      <hr />
      <div v-html="topicInfo.content"></div>
      <div class="comment">
        <p class="comm_head">{{topicInfo.replies.length}}回复</p>
        <hr>
        <ul v-for="(item,i) in topicInfo.replies" :key="item.id">
          <li>
            <div class="img"><img :src="item.author.avatar_url" alt=""></div>
            <div>
              <a href="#">{{item.author.loginname}} </a>
              <span> {{i+1}}楼 </span>
              <span>{{item.create_at | formateDate}}</span>
              <p v-html="item.content"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      topicInfo: [],
      isShow: false
    };
  },
  created() {
    this.isShow = true;
    this.getTopicInfo();
  },
  methods: {
    getTopicInfo() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.id}`)
        .then(res => {
          this.topicInfo = res.data.data;
          this.isShow = false;
          console.dir(res.data.data);
        });
    }
  }
};
</script>
<style lang="scss">
@import url("../assets/markdown-github.css");
a {
  color: #0088cc;
  text-decoration: none;
}
.topicinfo {
  // width: 100vw;
  padding: 0 10px;
  overflow: hidden;
  .loading-wrapper {
    text-align: center;
  }
  .comment {
    font-size: 12px;
    .comm_head {
      font-size: 14px;
      line-height: 20px;
      padding: 10px 0;
      background-color: #f6f6f6;
    }
    li {
      // outline: 1px solid red;
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 5px 0;
      .img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
      
    }
  }
  .detail {
    font-size: 10px;
    padding: 10px 0;
    display: flex;
    span {
      flex: 1;
    }
  }
  .markdown-text {
    margin-top: 10px;
    font-size: 12px;
    line-height: 20px;
    img {
      max-width: 90vw;
      display: block;
    }
    p {
        padding: 10px 0;
      }
  }
}
</style>