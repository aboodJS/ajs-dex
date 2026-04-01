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
    <div>
      <h1>{{ $route.params.name }}</h1>
      <img  :src="sprite" alt="" srcset="">
    <span><p>{{ typeOne }}</p> <p>{{ typeTwo }}</p></span>

  </div>

  <div>
    <h1 class="">Stats</h1>
    <Bar class="" :data="{labels: chartLabels, datasets: [{data: chartVals, label: 'stats', barThickness: 30, backgroundColor: ['rgba(56,95,190,0.5)'], borderRadius: 50, base: 0}]}" :options="{responsive: true, aspectRatio: 4,indexAxis: 'y', backgroundColor: 'rgba(0, 0, 0, 0.1)'}"></Bar>
  </div>
    <div>
      <h1>cry</h1>
      <audio :src="cry" controls="true"></audio>
    </div>
    <div>
      <table>
        <thead ><tr ><th >abilites</th></tr></thead>
        <tbody>
          <tr><td v-for="a in abilities">{{ a.ability.name }}</td></tr>

        </tbody>
      </table>
    </div>
    <div>
      <ul>
        <h1>moves </h1>
        <li v-for="move in moves">{{ move.move.name }}</li>
      </ul>
    </div>
  </main>
</template>
