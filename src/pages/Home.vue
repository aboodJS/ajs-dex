<script setup lang="ts">
import LinkBox from '@/components/LinkBox.vue';
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
  console.log(pokemon.value)
}

onMounted(() => {
  getSpecies()
})
</script>


<template>

  <main>
    <SideBar></SideBar>
    <nav>
      <h1>ajs-dex</h1>
      <div class="searchBox">
        <Icon icon="mdi:text-search-variant" class="absolute"></Icon>
        <input type="text" name=""  id="" v-model="query" placeholder="type the name of a pokemon">
      </div>
      </nav>
    <section>
      <LinkBox v-for="mon in filteredSearch" :name="mon.name"></LinkBox>
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
}

.absolute {
  position: absolute;
  font-size: x-large;
  right: 0;
}

</style>
