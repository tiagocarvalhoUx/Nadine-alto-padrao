import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PropertiesView from '../views/PropertiesView.vue'
import PropertyDetailView from '../views/PropertyDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/propriedades',
      name: 'properties',
      component: PropertiesView
    },
    {
      path: '/propriedade/:id',
      name: 'property-detail',
      component: PropertyDetailView
    }
  ]
})

export default router
