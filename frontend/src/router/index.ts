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
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Contacts',
        showBack: false
      }
    },
    {
      path: '/contacts/:id',
      name: 'contact-details',
      component: ContactDetailsView,
      props: true,
      meta: {
        title: 'Contact Details',
      }
    },
    {
      path: '/contacts/:id/edit',
      component: ContactFormView,
      meta: {
        title: 'Edit Contact',
      }
    },
    {
      path: '/contacts/new',
      component: ContactFormView,
      meta: {
        title: 'New Contact',
        showNewContact: false
      }
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
