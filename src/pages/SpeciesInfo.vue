<script setup lang="ts">
import { onActivated, onBeforeMount, onMounted, ref, useTemplateRef } from 'vue';
import { useRoute } from 'vue-router';
import MoveBox from '@/components/MoveBox.vue';
import StatGraph from '@/components/StatGraph.vue';

const routeParams = useRoute()

const show = ref(false)
const show2 = ref(false)
const show3 = ref(false)

const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${routeParams.params.name}`

const speciesData = ref([])
const description = ref()
const preEvo = ref()
const pokemonData = ref()
const otherFormsData = ref([])
const otherformsStats = ref([])

const levelup_list = useTemplateRef("levelup_list")
const egg_list = useTemplateRef("egg_list")
const machine_list = useTemplateRef("machine_list")

async function GetotherFromsStats() {
    for (let i = 0; i < otherFormsData.value.length; i++) {
     await fetch(otherFormsData.value[i].pokemon.url).then(d => d.json()).then(r => otherformsStats.value.push(r.stats))

    }
}

function GetMovesByCategory(category: String) {
  return pokemonData.value.moves.filter(m => m.version_group_details[0].move_learn_method.name === category)
}

onBeforeMount(async() => {
  speciesData.value =  await fetch(speciesUrl).then(d => d.json())
  pokemonData.value = await fetch(speciesData.value.varieties[0].pokemon.url).then(d => d.json())
  otherFormsData.value = speciesData.value.varieties.filter((d) => d.is_default !== true)
  const flavorText = speciesData.value.flavor_text_entries.filter((text) => text.language.name === 'en' )[0]
  description.value = flavorText
  preEvo.value = speciesData.value.evolves_from_species
})

onMounted(() => {
  GetotherFromsStats()
  console.log(GetMovesByCategory('level-up'))

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

<div>
<h2>forms</h2>
<ul id="forms-list" v-if="speciesData.varieties.length > 1"><li v-for="form, i in speciesData.varieties.filter((f) => f.is_default === false)"> <img :src="`https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/other/showdown/${form.pokemon.url.match(/\d+/g)[1]}.gif`" :alt="form.pokemon.name"><p>{{ form.pokemon.name.split("-").join(" ") }}</p>
  <StatGraph :stat-list="otherformsStats[i]"></StatGraph>
</li></ul>
<p v-else>this pokemon has no other forms</p>
</div>

<div>
  <h2>Moves</h2>
  <div id="move-section">
    <div>
      <h3 @click="show = !show">level up moves</h3>
      <Transition>
        <ul v-show="show"  class="move-list" ref="levelup_list">
          <li v-for="move in GetMovesByCategory('level-up')">
            <MoveBox  :url="move.move.url"></MoveBox>
          </li>
        </ul>

      </Transition>

    </div>

    <div>
      <h3 @click="show2 = !show2">egg moves</h3>
      <Transition>
        <ul v-show="show2"  ref="egg_list" class="move-list"><li v-for="move in GetMovesByCategory('egg')">
          <MoveBox :url="move.move.url"></MoveBox>
        </li></ul>

      </Transition>
    </div>

      <div>
      <h3 @click="show3 = !show3">machine moves</h3>

      <Transition>
        <ul v-show="show3" ref="machine_list" class="move-list"><li v-for="move in GetMovesByCategory('machine')">
          <MoveBox :url="move.move.url"></MoveBox>
        </li></ul>

      </Transition>
    </div>

  </div>
</div>

 </main>
 </template>


<style scoped>
main > * {
  margin-block: 18px;
  margin-inline: auto;
  width: fit-content;
  text-align: center;

}

li {
  list-style: none;
}

li img {
  height: 8rem;
  width: 8rem;
}

main {
  height: 100vh;
  overflow-x:hidden ;
  background-color: rgb(41, 34, 34);
  color: white;
  justify-content: center;
}

#sprite-box {
  margin-block: 0;
  display: grid;
  width: 40vw;
  gap: 7px;
  font-size: 0.9em;
  justify-content: center;
  align-content: center;
}



#sprite-box img {
  column-span: all;
  justify-self: center;

}

#sprite-box h1 {
  height: fit-content;
}

#forms-list {
  display: grid;
  grid-template-columns: repeat(2,55%);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 12px;
}

#move-section {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 25%);
  width: 100vw;
  justify-content: space-evenly;
}

.move-list {
  display: grid;
  justify-content: center;
  text-align: center;
  max-height: fit-content;
  overflow: hidden;
  padding: 0;
  margin: 0;
  gap: 8px;
}



.v-enter-from {
  max-height: 5px ;
}

.v-enter-to {
  max-height: 6000px;
}

.v-leave-from {
  max-height: 6000px;
}


.v-leave-to {
  max-height: 5px ;

}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

@media (max-width: 720px) {
  #forms-list {
    grid-template-columns: 1fr;
  }

  #move-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}

</style>
