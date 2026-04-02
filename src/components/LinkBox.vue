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
<div>

  <RouterLink :to="{path: `/pokemon/${$props.name}`}">

    <img :src="image" :alt="$props.name">
    <p>

      {{ $props.name }}
    </p>
    </RouterLink>
</div>

</template>

<style scoped>
div {
  height: 5rem;
  display: grid;
  justify-content: center;
  text-align: center;
   width: fit-content;
}
</style>
