import Home from '@/components/pages/Home'
import NotFound from '@/components/pages/NotFound'
import TaskOne from '@/components/pages/TaskOne'
import TaskTwo from '@/components/pages/TaskTwo'

import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
  },
  { 
    path: '/task1', 
    name: 'TaskOne', 
    component: TaskOne 
  },
  { 
    path: '/task2', 
    name: 'TaskTwo', 
    component: TaskTwo 
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})