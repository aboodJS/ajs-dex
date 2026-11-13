<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ statList?: any[] }>();

const stats = computed(() => (Array.isArray(props.statList) ? props.statList : []));

function statWidth(baseStat: number) {
  const value = Math.max(0, Number(baseStat) || 0);
  return `${Math.min((value / 255) * 100, 100)}%`;
}

function statColor(baseStat: number) {
  const value = Number(baseStat) || 0;
  if (value >= 100) return "#22c55e";
  if (value >= 60) return "#eab308";
  return "#dc2626";
}
</script>

<template>
  <section id="stats-sheet" v-if="stats.length">
    <div v-for="stat in stats" :key="stat?.stat?.name ?? String(stat)">
      <p>{{ (stat?.stat?.name || "").split("-").join(" ") }}: {{ stat?.base_stat ?? "N/A" }}</p>
      <div class="bar-track">
        <span
          class="bar-fill"
          :style="{ backgroundColor: statColor(stat?.base_stat), width: statWidth(stat?.base_stat) }"
        ></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
#stats-sheet {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: grid;
  gap: 10px;
  justify-items: stretch;
  min-width: 0;
  box-sizing: border-box;
}

#stats-sheet > div {
  display: grid;
  grid-template-columns: minmax(120px, 11rem) 1fr;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
}

#stats-sheet > div p {
  margin: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.92rem;
  font-weight: 500;
  color: rgba(245, 245, 245, 0.92);
  text-transform: capitalize;
  white-space: nowrap;
}

.bar-track {
  width: 100%;
  min-width: 0;
  height: 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.bar-fill {
  display: block;
  height: 100%;
  max-width: 100%;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  transition: width 0.25s ease;
}

@media (max-width: 720px) {
  #stats-sheet > div {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  #stats-sheet > div p {
    white-space: normal;
  }
}
</style>
