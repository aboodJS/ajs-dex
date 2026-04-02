<script setup lang="ts">
import LinkBox from '@/components/LinkBox.vue';
import SideBar from '@/components/SideBar.vue';
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
        <input type="text" name=""  id="" v-model="query" placeholder="type the name of a pokemon"></nav>
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

</style>
