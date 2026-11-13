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
li {
  list-style: none;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  overflow: hidden;
  max-height: 420px;
  transition: max-height 220ms ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

li:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(107, 124, 255, 0.35);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
}

.hide {
  max-height: 44px;
}

p {
  margin: 0;
  padding: 6px 0;
  line-height: 1.45;
  color: rgba(245, 245, 245, 0.9);
  text-transform: capitalize;
}

.move-name {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.01em;
}

li p:last-child {
  margin-top: 4px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.9rem;
  text-align: center;
  text-transform: none;
  color: rgba(245, 245, 245, 0.8);
}
</style>

