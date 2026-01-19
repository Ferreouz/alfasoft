import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactDetailsView from '../views/ContactDetailsView.vue'
import ContactFormView from '../views/ContactFormView.vue'

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
    {
      path: '/contacts/:id/edit',
      component: ContactFormView
    },
    {
      path: '/contacts/new',
      component: ContactFormView
    },
  ]
})
