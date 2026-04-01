<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps(["name"])
const url = `https://pokeapi.co/api/v2/pokemon/${props.name}`
const image = ref()

onMounted(async() => {
  // await fetch(url).then(data => data.json()).then(result => image.value = result.sprites.other["official-artwork"].front_default)

})

</script>

<template>
<li>
  <img :src="image" :alt="$props.name">
  <RouterLink :to="{path: `/pokemon/${$props.name}`}">{{ $props.name }}</RouterLink>
</li>

</template>
