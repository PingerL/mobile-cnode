import Vue from 'vue'
import VueRouter from 'vue-router'
import Topic from '../components/topic.vue'
import TopicIfon from '../components/topicinfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Topic
  },
  {
    path: '/home/topicinfo/:id',
    component: TopicIfon
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
