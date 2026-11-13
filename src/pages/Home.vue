<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import { Icon } from '@iconify/vue';
import { Pokedex } from 'pokeapi-js-wrapper';
import { computed, onMounted, ref, type Ref } from 'vue';

const dex = new Pokedex({cacheImages: true})

const pokemon: Ref<[Object]> = ref([])
const query = ref("")


const filteredSearch = computed(() => {
  return pokemon.value.filter((p) => p.name.includes(query.value))
})

async function getSpecies() {
  await dex.getPokemonSpeciesList().then(d => pokemon.value = d.results)
  console.log(pokemon.value[0].url)
}

onMounted(() => {
  getSpecies()
})
</script>


<template>

  <main>
    <SideBar></SideBar>
    <nav>
      <h1 class="mobile-hidden">ajs-dex</h1>
      <span id="mobile-bar"><h2>ajs-dex</h2> <span :style="{display: 'flex', gap: '12px'}"><a href=""><RouterLink to="/">Home</RouterLink></a><a href="https://github.com/aboodJS/ajs-dex">About</a></span></span>
      <div class="searchBox">
        <Icon icon="mdi:text-search-variant" class="absolute mobile-hidden"></Icon>
        <input type="text" name=""  id="" v-model="query" placeholder="type the name of a pokemon">
      </div>
      </nav>
    <section>
      <div v-for="mon in filteredSearch" >
        <img loading="lazy" :src="`https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/other/showdown/${mon.url.match(/\d+/g)[1]}.gif`" :alt="mon.name">
        <RouterLink :to="{path: `/${mon.name}`}"><p>{{ mon.name }}</p></RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: linear-gradient(180deg, #1f1a1a 0%, #151212 100%);
  color: #f5f5f5;
  padding: 24px 20px 16px;
  gap: 20px;
  overflow-x: hidden;
}

nav {
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 16px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

nav h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: lowercase;
  color: #ffffff;
}

#mobile-bar h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

#mobile-bar a {
  color: #d7dcff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

#mobile-bar a:hover {
  color: #ffffff;
}

.searchBox {
  position: relative;
  width: 100%;
  max-width: 720px;
}

input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 12px 44px 12px 16px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.45);
  text-transform: capitalize;
}

input:focus {
  border-color: #6b7cff;
  box-shadow: 0 0 0 3px rgba(107, 124, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.09);
}

.absolute {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  font-size: 1.35rem;
  color: rgba(255, 255, 255, 0.55);
  pointer-events: none;
}

section {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  height: calc(100vh - 180px);
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  padding: 4px 6px 16px;
  align-content: start;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
}

section::-webkit-scrollbar {
  width: 8px;
}

section::-webkit-scrollbar-track {
  background: transparent;
}

section::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
}

section div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 170px;
  padding: 16px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

section div:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(107, 124, 255, 0.45);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
}

section img {
  height: 72px;
  max-width: 100%;
  object-fit: contain;
  image-rendering: pixelated;
}

section a {
  text-decoration: none;
  color: #f1f3ff;
}

section p {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0.01em;
}

section a:hover p {
  color: #ffffff;
}

#mobile-bar {
  display: none;
}

@media (max-width: 720px) {
  main {
    padding: 16px 12px 12px;
    gap: 14px;
  }

  nav {
    gap: 12px;
  }

  .searchBox {
    max-width: 100%;
  }

  .mobile-hidden {
    display: none;
  }

  #mobile-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 12px;
  }

  section {
    height: calc(100vh - 170px);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 2px 2px 12px;
  }

  section div {
    min-height: 150px;
    padding: 14px 10px;
  }
}
</style>
