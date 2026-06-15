<script setup lang="ts">
import { onActivated, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MoveBox from '@/components/MoveBox.vue';
import StatGraph from '@/components/StatGraph.vue';

const routeParams = useRoute()



const url = `https://pokeapi.co/api/v2/pokemon-species/${routeParams.params.name}`

const data = ref()



onBeforeMount(async() => {
   data.value =  await fetch(url).then(d => d.json())
  console.log(data.value)
})




</script>

<template>
  <main>
    <h1>{{ data.name }}</h1>
 </main>
 </template>
