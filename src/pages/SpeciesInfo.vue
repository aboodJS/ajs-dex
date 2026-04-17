<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import MoveBox from '@/components/MoveBox.vue';
import StatGraph from '@/components/StatGraph.vue';

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
const altSprites = ref([])
const altStats = ref([])
const altAbilites = ref([])



// moves.value[0]["version_group_details"][0]["move_learn_method"].name

async function getAltFormData() {
  return await fetch(data.value.species.url).then(d => d.json()).then(f => f.varieties.filter((i) => i['is_default'] === false))
}

const altForms = ref()

async function getData() {
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
}

onBeforeMount(async () => {
  await getData()
 altForms.value = await getAltFormData()
 altForms.value.forEach(async e => {
  await fetch(e.pokemon.url).then(i => i.json()).then(j => altSprites.value.push(j.sprites.other['official-artwork']['front_default']))
 });

 altForms.value.forEach(async e => {
  await fetch(e.pokemon.url).then(i => i.json()).then(j => altStats.value.push(j.stats))
 });

 altForms.value.forEach(async e => {
  await fetch(e.pokemon.url).then(i => i.json()).then(j => altAbilites.value.push(j.abilities))
  console.log(altAbilites.value)

 });
})

</script>

<template>
  <main>
    <dialog></dialog>
    <div id="pokemon_summery">
      <img  :src="sprite" alt="" srcset="">
      <span>
      <h1>{{ $route.params.name }}</h1>

      <p>{{ typeOne }}</p> <p>{{ typeTwo }}</p></span>

  </div>

  <h1 class="">Stats</h1>

     <StatGraph :stat-list="baseStats"></StatGraph>
    <table>
      <tbody>

          <th>

            <h4>Abilities</h4>
          </th>

        <tr><td v-for="ability in abilities">{{ ability.ability.name }}</td></tr>
      </tbody>
    </table>
    <div>
      <ul>
        <h1>moves </h1>
        <hr>
        <h2>level up moves</h2>
        <ul style="display: grid; gap: 7px;"><MoveBox :url="move.move.url" v-for="move in levelupMoveList">
      </MoveBox></ul>

        <hr>
        <h2>machine moves</h2>
        <ul style="display: grid; gap: 7px;"><MoveBox :url="move.move.url" v-for="move in machineMoveList"></MoveBox></ul>
        <hr>
        <h2>egg moves</h2>
        <ul style="display: grid; gap: 7px;"><MoveBox :url="move.move.url" v-for="move in eggMoveList"></MoveBox></ul>
      </ul>
      <hr>
    </div>
    <div>
      <h1>Forms</h1>
      <section v-if="altForms.length === 0">
        <p>this pokemon has no other forms</p>
      </section>
      <section id="form-section" v-else>
        <div v-for="form, i in altForms" >
          <img :src="altSprites[i]" alt="">
          <p>{{ form.pokemon.name }}</p>
          <div style="border: 1px solid white; text-align: center; display: grid; justify-content: center;">
            <p>abilities</p>
            <hr style="height: 1px; background-color: white; width: 60px; justify-self: center;">
            <div style="text-align: center;" v-for="ability,j in altAbilites[i]"><p>{{ ability.ability.name.split("-").join(" ") }}</p></div>

          </div>
        <StatGraph :stat-list="altStats[i]"></StatGraph>
        </div>
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

table {
  text-align: center;
  border: 1px white solid;
}

td {
  border: 1px white solid;

}



th h4 {
  text-align: center;
  margin: 0;
}


#form-section img {
  width: 220px;
  object-position: center;
  object-fit: cover;
}

#form-section > div {
  display: grid;
  justify-content: center;
  text-align: center;
  gap: 5px;
}

#form-section {
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(auto-fill, 360px);
  justify-content: center;
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
}

</style>
