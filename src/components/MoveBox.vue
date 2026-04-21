<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';

const props = defineProps(["url"])
const box = useTemplateRef("box")

const moveDetails = ref({})

async function  getMoveData () {
  await fetch(props.url).then(json => json.json()).then((r) => {

    moveDetails.value.moveName = r.name.split("-").join(" ")
    moveDetails.value.typing = r.type.name
    moveDetails.value.basePower = r.power
    moveDetails.value.accuracy = r.accuracy
    moveDetails.value.powerPoints = r.pp
    moveDetails.value.desc = r['flavor_text_entries'].filter(e => e.language.name == 'en')[0]["flavor_text"]

  })
}

onMounted(() => {
  getMoveData()
})

</script>


<template>
  <li class="hide" @click="() => box?.classList.toggle('hide')" ref="box">
    <p class="move-name"> {{ moveDetails.moveName }} </p>
    <p>type: {{ moveDetails.typing }}</p>
    <p class="move-power">power: {{ moveDetails.basePower || "N/A" }}</p>
    <p class="move-accr">accuracy: {{ moveDetails.accuracy || "N/A" }}</p>
    <p class="move-pp">pp: {{ moveDetails.powerPoints }}</p>
    <p style="font-size: 0.9rem; text-align: center;">{{ moveDetails.desc }}</p>
  </li>
</template>

<style scoped>
p {
  height: 65px;
  overflow: visible;
}

li {
  border-radius: 4px;
  width: 340px;
  max-height: stretch;
  overflow: hidden;
  cursor: pointer;
  background-color: rgb(57, 64, 71);
  transition: max-height 200ms ease-in-out;
}

.hide {
  max-height: 35px;

}
</style>

