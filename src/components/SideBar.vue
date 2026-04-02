<template>
  <aside>
    <section>
      <h1>ajs-dex</h1>
        <a href="">
      <RouterLink to="/">Home</RouterLink>
    </a>
    <a href="">
      <RouterLink to="/about">About</RouterLink>
    </a>
    </section>

  </aside>
</template>

<style scoped>
aside {
  display: grid;
  height: 100vh;
  position:absolute;
}

section {
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

</style>
