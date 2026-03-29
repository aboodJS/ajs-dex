<script setup lang="ts">

import { onUpdated, ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Bar } from 'vue-chartjs';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const routeParams = useRoute()



const url = `https://pokeapi.co/api/v2/pokemon/${routeParams.params.name}`
const data = ref()
const sprite = ref()
const typeOne = ref()
const typeTwo = ref()
const baseStats = ref([])
const cry = ref()
const abilities = ref()
const moves = ref()

const chartLabels = ref([])
const chartVals = ref([])



async function getData() {
  await fetch(url).then(data => data.json()).then(result => data.value = result)
  sprite.value = data.value.sprites.other["official-artwork"].front_default
  typeOne.value = data.value.types[0].type.name
  typeTwo.value = data.value.types.length > 1 ? data.value.types[1].type.name : ""
  baseStats.value = data.value.stats
  cry.value = data.value.cries.latest
  abilities.value = data.value.abilities
  moves.value = data.value.moves
  chartLabels.value = baseStats.value.map((s) => s.stat.name)
  chartVals.value = baseStats.value.map((s) => s["base_stat"])
}

onMounted(() => {
  getData()
})

</script>

<template>
  <main>
    <div class="grid justify-center text-center">
      <h1 class="font-bold text-2xl">{{ $route.params.name }}</h1>
      <img class="h-54" :src="sprite" alt="" srcset="">
    <span class="flex justify-evenly"><p class="text-center">{{ typeOne }}</p> <p class="text-center">{{ typeTwo }}</p></span>

  </div>

  <div>
    <h1 class="font-bold text-2xl">Stats</h1>
    <Bar class="h-30 w-30" :data="{labels: chartLabels, datasets: [{data: chartVals, label: 'stats', barThickness: 30, backgroundColor: ['rgba(56,95,190,0.5)'], borderRadius: 50, base: 0}]}" :options="{responsive: true, aspectRatio: 4,indexAxis: 'y', backgroundColor: 'rgba(0, 0, 0, 0.1)'}"></Bar>
  </div>
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
