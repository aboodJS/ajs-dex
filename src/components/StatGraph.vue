<script setup lang="ts">
defineProps(["statList"])

</script>

<template>
  <section id="stats-sheet">
    <div v-for="stat in statList"><p>{{ stat.stat.name.split("-").join(" ") }}: {{ stat["base_stat"] }}</p> <span :style="{backgroundColor: `${stat['base_stat'] >= 100 ? 'green' : stat['base_stat'] >= 60 ? 'yellow' : stat['base_stat'] <= 60 ? 'crimson' : 'orange'  }`, height: '22px', width: `calc(${stat['base_stat']}px + 40px)`, borderRadius: '12px'}"></span></div>

  </section>
</template>

<style scoped>
#stats-sheet {
  display: grid;
  gap: 4px;
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
</style>
