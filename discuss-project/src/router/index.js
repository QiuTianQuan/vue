import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Homepage from '@/pages/homepage'
import Post from '@/pages/post'
import Search from '@/pages/search'
import Myinfo from '@/pages/myinfo'
import Thread from '@/pages/thread'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: Myinfo
    },
    {
      path: '/thread/:aid',
      name: 'thread',
      component: Thread
    }
    
  ]
})
