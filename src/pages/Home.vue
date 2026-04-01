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
  <h1>ajs-dex</h1>
  <nav><input type="text" name=""  id="" v-model="query" placeholder="type the name of a pokemon"></nav>
  <ul >
    <LinkBox v-for="mon in filteredSearch" :name="mon.name"></LinkBox>

  </ul>
</template>
