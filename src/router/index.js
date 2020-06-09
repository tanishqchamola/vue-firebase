import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewUser from '@/components/NewUser'
import ViewUser from '@/components/ViewUser'
import EditUser from '@/components/EditUser'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/new',
    name: 'new-user',
    component: NewUser
  },
  {
    path: '/edit/:username',
    name: 'edit-user',
    component: EditUser
  },
  {
    path: '/:username',
    name: 'view-user',
    component: ViewUser
  }
]

const router = new VueRouter({
  routes
})

export default router