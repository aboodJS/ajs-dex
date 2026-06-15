<script setup lang="ts">
import { onActivated, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MoveBox from '@/components/MoveBox.vue';
import StatGraph from '@/components/StatGraph.vue';

const routeParams = useRoute()



const url = `https://pokeapi.co/api/v2/pokemon-species/${routeParams.params.name}`

const data = ref([])
const description = ref()



onBeforeMount(async() => {
  data.value =  await fetch(url).then(d => d.json())
  const flavorText = data.value.flavor_text_entries.filter((text) => text.language.name === 'en' )[0]
  description.value = flavorText
  console.log(flavorText)
  console.log(data.value)
})




</script>

<template>
  <main>
      <img :src="`https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/other/showdown/${data.id}.gif`" :alt="data.name">

    <h1>{{ data.name }}</h1>
    <p>{{ description["flavor_text"] }}</p>
 </main>
 </template>
