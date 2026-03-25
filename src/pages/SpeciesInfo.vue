<script setup lang="ts">

import { onUpdated, ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const routeParams = useRoute()



const url = `https://pokeapi.co/api/v2/pokemon/${routeParams.params.name}`
const data = ref()
const sprite = ref()
const typeOne = ref()
const typeTwo = ref()
const baseStats = ref()

async function getData() {
  await fetch(url).then(data => data.json()).then(result => data.value = result)
  sprite.value = data.value.sprites.other["official-artwork"].front_default
  typeOne.value = data.value.types[0].type.name
  typeTwo.value = data.value.types.length > 1 ? data.value.types[1].type.name : ""
  baseStats.value = data.value.stats
  console.log(baseStats.value)
}

onMounted(() => {
  getData()
})

</script>

<template>
  <main>
    <h1>{{ $route.params.name }}</h1>
    <img class="h-54" :src="sprite" alt="" srcset="">
    <div>
    <span>{{ typeOne }}</span>
    <span>{{ typeTwo }}</span>
  </div>


    <ul>
      <h1>base stats</h1>
      <li v-for="stat in baseStats">{{ stat.stat.name }}: {{ stat.base_stat }}</li>
    </ul>


  </main>
</template>
