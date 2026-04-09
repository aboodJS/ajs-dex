<script setup lang="ts">

import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const routeParams = useRoute()



const url = `https://pokeapi.co/api/v2/pokemon/${routeParams.params.name}`
const data = ref()
const sprite = ref()
const typeOne = ref()
const typeTwo = ref()
const baseStats = ref([])
const abilities = ref()
const fullMovesList = ref()
const eggMoveList = ref()
const levelupMoveList = ref()
const machineMoveList = ref()
const speciesData = ref()
const forms = ref([])
const formSprites = ref([])

// moves.value[0]["version_group_details"][0]["move_learn_method"].name


async function getGeneralData() {
  await fetch(url).then(data => data.json()).then(result => data.value = result)
  sprite.value = data.value.sprites.other["showdown"].front_default
  typeOne.value = data.value.types[0].type.name
  typeTwo.value = data.value.types.length > 1 ? data.value.types[1].type.name : ""
  baseStats.value = data.value.stats
  abilities.value = data.value.abilities
  fullMovesList.value = data.value.moves
  eggMoveList.value = fullMovesList.value.filter((m) => m["version_group_details"][0]["move_learn_method"].name === 'egg' )
  levelupMoveList.value = fullMovesList.value.filter((m) => m["version_group_details"][0]["move_learn_method"].name === 'level-up' )
  machineMoveList.value = fullMovesList.value.filter((m) => m["version_group_details"][0]["move_learn_method"].name === 'machine' )
  await fetch(data.value.species.url).then(data => data.json()).then(result => speciesData.value = result)
}

async function getSpeciesData() {
  await fetch(data.value.species.url).then(data => data.json()).then(result => speciesData.value = result)
  forms.value = speciesData.value.varieties
  for (let i = 0; i < forms.value.length; i++) {
    console.log(forms.value[i].pokemon.url)
    await fetch(forms.value[i].pokemon.url).then(data => data.json()).then(result => formSprites.value.push(result.sprites.other["official-artwork"]))

  }
}

onMounted(async () => {
  await getGeneralData()
   await getSpeciesData()
   console.log(formSprites.value)
})

</script>

<template>
  <main>
    <div id="pokemon_summery">
      <img  :src="sprite" alt="" srcset="">
      <span>
      <h1>{{ $route.params.name }}</h1>

      <p>{{ typeOne }}</p> <p>{{ typeTwo }}</p></span>

  </div>

  <h1 class="">Stats</h1>
  <section id="stats-sheet">
    <div v-for="stat, i in baseStats"><p>{{ stat.stat.name.split("-").join(" ") }}: {{ stat["base_stat"] }}</p> <span :style="{backgroundColor: `${stat['base_stat'] >= 100 ? 'green' : stat['base_stat'] >= 60 ? 'yellow' : stat['base_stat'] <= 60 ? 'crimson' : 'orange'  }`, height: '22px', width: `calc(${stat['base_stat']}px + 40px)`, borderRadius: '12px'}"></span></div>
  </section>
    <table>
      <tbody>

        <tr>
              <th>

              abilities
            </th>
            </tr>

        <tr><td v-for="ability in abilities">{{ ability.ability.name.split("-").join(" ") }}</td></tr>
      </tbody>
    </table>
    <div>
      <ul id="move_list">
        <h1>moves</h1>
        <hr>
        <h2>level up moves</h2>
        <ul><li v-for="move in levelupMoveList">{{ move.move.name.split("-").join(" ") }}</li></ul>

        <hr>
        <h2>machine moves</h2>
        <ul><li v-for="move in machineMoveList">{{ move.move.name.split("-").join(" ")  }}</li></ul>
        <hr>
        <h2>egg moves</h2>
        <ul><li v-for="move in eggMoveList">{{ move.move.name.split("-").join(" ")  }}</li></ul>
      </ul>
    </div>
    <h1 v-if="forms.length > 1">forms</h1>
    <div  id="form-section" v-if="forms.length > 1">
      <section style="display: grid; justify-content: center; text-align: center;" v-for="form, i in forms">{{ form.pokemon.name.split("-").join(" ") }}
        <img style="height: 220px;" :src="formSprites[i].front_default" alt="">
      </section>
    </div>
  </main>
</template>

<style scoped>

main {
  display: grid;
   background-color: rgb(41, 34, 34);
  color: white;
}

#pokemon_summery {
  height: fit-content;
  width: 30vw;
  justify-self: center;
  justify-content: space-evenly;
  align-content: center;
 display: grid;
 grid-template-columns: 30% 70%;
 grid-template-rows: 1fr;
 gap: 64px;
}

#pokemon_summery > img {
  height: 150px;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 2;
}

#pokemon_summery > h1 {
    grid-column-start: 2;
  grid-column-end: 2;
}

#pokemon_summery > span {
   grid-column-start: 2;
  grid-column-end: 2;
}

table, td, th {
  border: 1px solid white;
}

td {
  text-align: center;
}


th {
  text-align: center;
}

#stats-sheet > div {
 display: flex;
  align-items: center;
}

#stats-sheet > div p {
  display: flex;
  justify-content: space-between;
  width: 9rem;
}

#move_list {
  margin: 0;
  padding: 0;
}

#form-section {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr)
}

@media (max-width: 720px) {
  #pokemon_summery > img {
    height: 100px;
    align-self: center;
  }

  #pokemon_summery {
    gap: 60px;
    width: 50vw;
  }

  #form-section {
    grid-template-columns: repeat(2, 1fr);
  }

  #form-section img {
    width:  190px;
  }
}

</style>
