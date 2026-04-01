<script setup lang="ts">
import LinkBox from '@/components/LinkBox.vue';
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

  <nav>
      <h1>ajs-dex</h1>

      <input type="text" name=""  id="" v-model="query" placeholder="type the name of a pokemon"></nav>

  <main>
    <LinkBox v-for="mon in filteredSearch" :name="mon.name"></LinkBox>

  </main>
</template>

<style scoped>
nav {
  display: grid;
  justify-content: center;
}

nav h1 {
  text-align: center;
}

main {
  margin: auto;
  gap: 12px;
  height: 100vh;
  width: fit-content;
  overflow-y: scroll;
  justify-content: center;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(5, 180px);
}
</style>
