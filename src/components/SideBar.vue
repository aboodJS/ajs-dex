<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
const isSideOpen = ref(true);

function switchState() {
  isSideOpen.value = !isSideOpen.value;
  console.log(isSideOpen.value);
}
</script>

<template>
  <aside :class="isSideOpen === true ? 'hide' : ''">
    <section>
      <div @click="switchState" class="menu-btn">
        <Icon icon="mdi:menu" />
      </div>
      <h1>ajs-dex</h1>
      <a href="">
        <RouterLink to="/">Home</RouterLink>
      </a>
      <a href="https://github.com/aboodJS/ajs-dex" target="_blank"> About </a>
    </section>
  </aside>
</template>

<style scoped>
aside {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  height: 100vh;
  width: 220px;
  box-sizing: border-box;
  padding: 20px 16px;
  background: rgba(21, 18, 18, 0.92);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 8px 0 24px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  transition: transform 220ms ease;
}

section {
  position: relative;
  display: grid;
  align-content: start;
  gap: 14px;
  height: 100%;
}

h1 {
  margin: 0 0 6px;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: lowercase;
  color: #ffffff;
}

.menu-btn {
  position: absolute;
  top: 0;
  right: -56px;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  color: #f5f5f5;
  background: rgba(21, 18, 18, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.menu-btn:hover {
  background: rgba(107, 124, 255, 0.14);
  border-color: rgba(107, 124, 255, 0.35);
  color: #ffffff;
}

a {
  display: block;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.98rem;
  color: #e9ecff;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

a:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(107, 124, 255, 0.3);
  color: #ffffff;
}

.hide {
  transform: translateX(calc(-100% - 8px));
}

@media (max-width: 720px) {
  aside {
    display: none;
  }
}
</style>
