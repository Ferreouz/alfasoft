import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactDetailsView from '../views/ContactDetailsView.vue'
import ContactFormView from '../views/ContactFormView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/app'
    },
    {
      path: '/app',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Contacts',
        showBack: false
      }
    },
    {
      path: '/app/contacts/:id',
      name: 'contact-details',
      component: ContactDetailsView,
      props: true,
      meta: {
        title: 'Contact Details',
      }
    },
    {
      path: '/app/contacts/:id/edit',
      component: ContactFormView,
      meta: {
        title: 'Edit Contact',
      },
      props: true
    },
    {
      path: '/app/contacts/new',
      component: ContactFormView,
      meta: {
        title: 'New Contact',
        showNewContact: false
      },
      props: { id: null }
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})
