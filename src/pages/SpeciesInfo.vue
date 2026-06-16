<script setup lang="ts">
import { onActivated, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MoveBox from '@/components/MoveBox.vue';
import StatGraph from '@/components/StatGraph.vue';

const routeParams = useRoute()



const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${routeParams.params.name}`

const speciesData = ref([])
const description = ref()
const preEvo = ref()
const pokemonData = ref()





onBeforeMount(async() => {
  speciesData.value =  await fetch(speciesUrl).then(d => d.json())
  pokemonData.value = await fetch(speciesData.value.varieties[0].pokemon.url).then(d => d.json())
  const flavorText = speciesData.value.flavor_text_entries.filter((text) => text.language.name === 'en' )[0]
  description.value = flavorText
  preEvo.value = speciesData.value.evolves_from_species

})

onMounted(() => {
  console.log(pokemonData.value)
})


</script>

<template>
  <main>
    <div id="sprite-box">
      <img :src="`https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/other/showdown/${speciesData.id}.gif`" :alt="speciesData.name">
      <h1>{{ speciesData.name }}</h1>
      <p>{{ description["flavor_text"] }}</p>
      <p v-if="preEvo">this pokemon evolves from {{ preEvo.name }}</p>

    </div>
    <div id="ability-list">
      <h2>abilities</h2>
      <ul>
        <li v-for="ability in pokemonData.abilities">{{ ability.ability.name.split("-").join(" ") }}</li>
      </ul>
    </div>
<StatGraph :stat-list="pokemonData.stats"></StatGraph>
 </main>
 </template>


<style scoped>
main > * {
  margin-block: 18px;
}

main {
  height: 100vh;
  overflow-x:hidden ;
  background-color: rgb(41, 34, 34);
  color: white;
  justify-content: center;
}

#sprite-box {
  display: grid;
  margin-inline: auto;
  width: 40vw;
  justify-content: center;
  align-content: center;
  text-align: center;
}

#ability-list {
  width: fit-content;
  margin-inline: auto;
}

#sprite-box img {
  column-span: all;
  justify-self: center;

}

#sprite-box h1 {
  height: fit-content;
}



</style>
