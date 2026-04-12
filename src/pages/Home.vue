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
        <RouterLink :to="{path: `/pokemon/${mon.name}`}"><p>{{ mon.name }}</p></RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
nav {
  display: grid;
  justify-content: center;
  height: 15vh;
}

nav h1 {
  text-align: center;
}

section {
  margin: auto;
  gap: 12px;
  height: 83vh;
  width: fit-content;
  overflow: scroll;
  justify-content: center;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(5, 180px);
}

section img {
  height: 6rem;
}

section div {
  display: grid;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  height: fit-content;
  align-content: center;
}

section a {
    text-decoration: none;
  color: white;
}


main {
  display: grid;
  gap: 12px;
}

input {
  width: 950px;
  border: 0;
  border-bottom: 2px rgba(97, 97, 97, 0.375) solid;
  outline: none;
  font-size: large;
  background-color: rgb(41, 34, 34);
  color: white;
}

input:focus {
  border-color: rgb(93, 93, 255);
}

input:focus > *  {
  color: rgb(93, 93, 255);
}

.searchBox {
  position: relative;
  font-size: large;
background-color: rgb(41, 34, 34);
  color: white;
  width: fit-content;
}

.absolute {
  position: absolute;
  font-size: x-large;
  right: 0;
}

main {
  background-color: rgb(41, 34, 34);
  color: white;
}

#mobile-bar {
  display: none;
}

@media (max-width: 720px) {
  section {
    grid-template-columns: repeat(2, 220px);
    gap: 0;
  }

  .searchBox {
    width: 400px;
  }

  .mobile-hidden {
    display: none;
  }

  #mobile-bar {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
}


}

</style>
