import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'
import Mailbox from '@/views/Mailbox.vue'
import DeliveryResults from '@/views/DeliveryResults.vue'
import Page404 from '@/views/Page404.vue'
import Activity from '@/views/Activity.vue'
import Contact from '@/views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/connexion',
    name: 'Login',
    component: Login
  },
  {
    path: '/inscription',
    name: 'Register',
    component: Register
  },
  {
    path: '/profil',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/messages',
    name: 'Mailbox',
    component: Mailbox
  },
  {
    path: '/recherche',
    name: 'DeliveryResults',
    component: DeliveryResults
  },

  {
    path: '/activite',
    name: 'Activity',
    component: Activity
  },

  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router