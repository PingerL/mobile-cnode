import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.filter('formateDate',function(str){
  if(!str) return
  let data = new Date(str)
  let time = new Date().getTime() - data.getTime()
  if(time < 0){
    return ''
  }else if(time /1000<30){
    return '刚刚'
  }else if(time /1000<60){
    return parseInt(time/1000) + '秒前'
  }else if(time /60000<60){
    return parseInt(time/60000) + '分钟前'
  }else if(time /3600000<24){
    return parseInt(time/3600000) + '小时前'
  }else if(time /86400000<31){
    return parseInt(time/86400000) + '天前'
  }else if(time /2592000000<12){
    return parseInt(time/2592000000) + '月前'
  }
})
