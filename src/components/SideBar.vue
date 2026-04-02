<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
const isSideOpen =  ref(true)

function switchState() {
  isSideOpen.value = !isSideOpen.value
  console.log(isSideOpen.value)
}


</script>


<template>
  <aside :class="isSideOpen === true ? 'hide' : ''">
    <section>
      <div @click="switchState" :style="{position: 'absolute', fontSize: '25px', left: '115%', top: '4%'}" >
        <Icon  icon="mdi:menu" />

      </div>
      <h1>ajs-dex</h1>
        <a href="">
      <RouterLink to="/">Home</RouterLink>
    </a>
    <a href="https://github.com/aboodJS/ajs-dex" target="_blank">
      About
    </a>
    </section>

  </aside>
</template>

<style scoped>
aside {
  display: grid;
  height: 100vh;
  position:absolute;
  transition: margin 200ms;
}

section {
  position: relative;
  padding-left: 1rem;
  display: grid;
  align-content: flex-start;
  gap: 12px;
}

a {
  text-decoration: none;
  font-size: large;
  color: black;
  font-weight: bold;
}

.hide {
  margin-left: -9%;

}

</style>
