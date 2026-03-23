<script setup lang="ts">

import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const params = useRoute()



const url = `https://pokeapi.co/api/v2/pokemon/${params.params.name}`
const data = ref()
const sprite = ref()

onMounted(async () => {
  await fetch(url).then(data => data.json()).then(result => data.value = result)
  console.log(data.value)
  sprite.value = data.value.sprites.other["official-artwork"].front_default
})

</script>

<template>
  <main>
    <h1>{{ $route.params.name }}</h1>
    <img class="h-54" :src="sprite" alt="" srcset="">
    <div>
      <span>{{ data.types[0].type.name }}</span>/
      <span>{{ data.types[1].type.name }}</span>
    </div>
    <ul>
      <h1>base stats</h1>
      <li v-for="stat in data.stats">{{ stat.stat.name }}: {{ stat.base_stat }}</li>
    </ul>
  </main>
</template>
