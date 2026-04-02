import About from '@/pages/About.vue'
import Home from '@/pages/Home.vue'
import SpeciesInfo from '@/pages/SpeciesInfo.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{path: '/', component: Home}, {path: "/pokemon/:name", component: SpeciesInfo}, {path: "/about", component: About}],
})

export default router
