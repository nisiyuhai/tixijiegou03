import Vue from 'vue'
import Router from 'vue-router'
import action from '@/components/action'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'action',
      component: action
    }
  ]
})
