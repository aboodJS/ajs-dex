<script setup lang="ts">
import { Pokedex } from 'pokeapi-js-wrapper';
import { onMounted, ref } from 'vue';

const dex = new Pokedex({cacheImages: true})

const pokemon = ref([])




async function getSpecies() {
  await dex.getPokemonSpeciesList().then(d => pokemon.value = d.results)

}

onMounted(() => {
  getSpecies()
})
</script>


<template>
  <h1>ajs-dex</h1>
  <ul>
    <li v-for="mon in pokemon"><RouterLink :to="{path: `/pokemon/${mon.name}`}">{{ mon.name }}</RouterLink></li>

  </ul>
</template>
