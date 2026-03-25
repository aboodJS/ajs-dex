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
const cry = ref()
const abilities = ref()
const moves = ref()

async function getData() {
  await fetch(url).then(data => data.json()).then(result => data.value = result)
  sprite.value = data.value.sprites.other["official-artwork"].front_default
  typeOne.value = data.value.types[0].type.name
  typeTwo.value = data.value.types.length > 1 ? data.value.types[1].type.name : ""
  baseStats.value = data.value.stats
  cry.value = data.value.cries.latest
  abilities.value = data.value.abilities
  moves.value = data.value.moves
  console.log(moves.value)
}

onMounted(() => {
  getData()
})

</script>

<template>
  <main>
    <h1 class="font-bold text-2xl">{{ $route.params.name }}</h1>
    <img class="h-54" :src="sprite" alt="" srcset="">
    <div>
    <span>{{ typeOne }} {{ typeTwo }}</span>

  </div>


    <ul>
      <h1 class="font-bold text-2xl">base stats</h1>
      <li v-for="stat in baseStats">{{ stat.stat.name }}: {{ stat.base_stat }}</li>
    </ul>
    <div>
      <h1 class="font-bold text-2xl">cry</h1>
      <audio :src="cry" controls="true"></audio>
    </div>
    <div>
      <h1>abilities</h1>
      <ul>
        <li v-for="an in abilities">{{ an.ability.name }} {{ an.is_hidden ? "(hidden)" : "" }}</li>
      </ul>
    </div>
    <div>
      <ul>
        <h1 class="font-bold text-2xl">moves </h1>
        <li v-for="move in moves">{{ move.move.name }}</li>
      </ul>
    </div>
  </main>
</template>
