import Home from '@/pages/Home.vue'
import SpeciesInfo from '@/pages/SpeciesInfo.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{path: '/', name: "pokedex", component: Home}, {path: "/:name",name: "pokemon", component: SpeciesInfo}],
})

export default router
