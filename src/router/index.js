import Vue from 'vue'
import Router from 'vue-router'
import Register from "@/components/register.vue"
import Admin from "@/components/admin.vue"
import VueResource from 'vue-resource'
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register,
    },
    {
      path:'/admin',
      name:"Admin",
      component: Admin,
    }
  ]
})
