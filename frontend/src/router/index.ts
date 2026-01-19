import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactDetailsView from '../views/ContactDetailsView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contacts/:id',
      name: 'contact-details',
      component: ContactDetailsView,
      props: true
    },
  ]
})
