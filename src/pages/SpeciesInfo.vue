<script setup lang="ts">
import { onBeforeMount, ref, useTemplateRef } from "vue";
import { useRoute } from "vue-router";
import MoveBox from "@/components/MoveBox.vue";
import StatGraph from "@/components/StatGraph.vue";

const routeParams = useRoute();

const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${routeParams.params.name}`;

const speciesData = ref<any>(null);
const description = ref<any>(null);
const preEvo = ref<any>(null);
const pokemonData = ref<any>(null);
const otherForms = ref<any[]>([]);

const levelup_list = useTemplateRef("levelup_list");
const egg_list = useTemplateRef("egg_list");
const machine_list = useTemplateRef("machine_list");

async function loadOtherForms(varieties: any[]) {
  const forms = varieties.filter((d) => d.is_default !== true);
  otherForms.value = await Promise.all(
    forms.map(async (form) => {
      const data = await fetch(form.pokemon.url).then((d) => d.json());
      return { ...form, stats: data.stats };
    }),
  );
}

function GetMovesByCategory(category: string) {
  return (pokemonData.value?.moves || []).filter(
    (m: any) => m.version_group_details?.[0]?.move_learn_method?.name === category,
  );
}

onBeforeMount(async () => {
  const species = await fetch(speciesUrl).then((d) => d.json());
  speciesData.value = species;

  const defaultPokemon = await fetch(species.varieties[0].pokemon.url).then((d) => d.json());
  pokemonData.value = defaultPokemon;

  const flavorText = (species.flavor_text_entries || []).find(
    (text: any) => text.language.name === "en",
  );
  description.value = flavorText || null;
  preEvo.value = species.evolves_from_species || null;

  await loadOtherForms(species.varieties || []);
});
</script>

<template>
  <main v-if="speciesData && pokemonData">
    <div id="sprite-box">
      <img
        :src="`https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/other/showdown/${speciesData.id}.gif`"
        :alt="speciesData.name"
      />
      <h1>{{ speciesData.name }}</h1>
      <p v-if="description?.flavor_text">{{ description.flavor_text }}</p>
      <p v-if="preEvo">this pokemon evolves from {{ preEvo.name }}</p>
    </div>
    <div id="ability-list">
      <h2>abilities</h2>
      <ul>
        <li v-for="ability in pokemonData.abilities" :key="ability.ability?.name">
          {{ ability.ability.name.split("-").join(" ") }}
        </li>
      </ul>
    </div>
    <StatGraph :stat-list="pokemonData.stats"></StatGraph>

    <div>
      <h2>forms</h2>
      <ul id="forms-list" v-if="otherForms.length">
        <li v-for="form in otherForms" :key="form.pokemon?.name">
          <img
            :src="`https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/other/showdown/${form.pokemon.url.match(/\d+/g)[1]}.gif`"
            :alt="form.pokemon.name"
          />
          <p>{{ form.pokemon.name.split("-").join(" ") }}</p>
          <StatGraph :stat-list="form.stats"></StatGraph>
        </li>
      </ul>
      <p v-else>this pokemon has no other forms</p>
    </div>

    <div>
      <h2>Moves</h2>
      <p>click on a the list titles to view and hide lists, click on a move for more details</p>
      <div id="move-section">
        <div>
          <h3 @click="levelup_list?.classList.toggle('closed')">level up moves</h3>
          <ul class="move-list closed" ref="levelup_list">
            <li v-for="move in GetMovesByCategory('level-up')" :key="`level-${move.move?.name}`">
              <MoveBox :url="move.move.url"></MoveBox>
            </li>
          </ul>
        </div>

        <div>
          <h3 @click="egg_list?.classList.toggle('closed')">egg moves</h3>

          <ul ref="egg_list" class="move-list closed">
            <li v-for="move in GetMovesByCategory('egg')" :key="`egg-${move.move?.name}`">
              <MoveBox :url="move.move.url"></MoveBox>
            </li>
          </ul>
        </div>

        <div>
          <h3 @click="machine_list?.classList.toggle('closed')">machine moves</h3>

          <ul ref="machine_list" class="move-list closed">
            <li v-for="move in GetMovesByCategory('machine')" :key="`machine-${move.move?.name}`">
              <MoveBox :url="move.move.url"></MoveBox>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  height: auto;
  overflow-x: hidden;
  background: linear-gradient(180deg, #1f1a1a 0%, #151212 100%);
  color: #f5f5f5;
  padding: 28px 20px 40px;
  box-sizing: border-box;
}

main > * {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 20px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

#sprite-box {
  display: grid;
  justify-items: center;
  gap: 12px;
  width: 100%;
  max-width: 720px;
  margin: 0 auto 24px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.06);
}

#sprite-box img {
  height: 120px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.35));
}

#sprite-box h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.03em;
  color: #ffffff;
}

#sprite-box p {
  margin: 0;
  max-width: 60ch;
  line-height: 1.6;
  color: rgba(245, 245, 245, 0.9);
}

h2 {
  margin: 0 0 14px;
  font-size: 1.35rem;
  font-weight: 700;
  text-transform: capitalize;
  color: #ffffff;
}

h3 {
  margin: 0 0 10px;
  font-size: 1.05rem;
  font-weight: 600;
  text-transform: capitalize;
  color: #dfe4ff;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

h3:hover {
  background: rgba(107, 124, 255, 0.12);
  border-color: rgba(107, 124, 255, 0.35);
  color: #ffffff;
}

#ability-list ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

#ability-list li {
  list-style: none;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(107, 124, 255, 0.14);
  border: 1px solid rgba(107, 124, 255, 0.28);
  color: #eef1ff;
  font-weight: 500;
  text-transform: capitalize;
}

#forms-list {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  align-items: start;
}

#forms-list li {
  list-style: none;
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  min-width: 0;
  overflow: hidden;
}

#forms-list li img {
  height: 96px;
  width: 96px;
  object-fit: contain;
  image-rendering: pixelated;
}

#forms-list li p {
  margin: 0;
  font-weight: 600;
  text-transform: capitalize;
  color: #f1f3ff;
}

#move-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  align-items: start;
  text-align: left;
}

#move-section > div {
  min-width: 0;
}

#move-section p {
  margin: 0 0 14px;
  color: rgba(245, 245, 245, 0.75);
  font-size: 0.95rem;
  text-align: center;
}

.move-list {
  display: grid;
  max-height: 6000px;
  padding: 0;
  margin: 0;
  gap: 8px;
  transition: max-height 300ms ease;
}

.move-list li {
  list-style: none;
}

.closed {
  overflow: hidden;
  max-height: 0;
  transition: max-height 300ms ease;
}

main > div > p {
  margin: 0;
  color: rgba(245, 245, 245, 0.8);
  line-height: 1.6;
}

@media (max-width: 720px) {
  main {
    padding: 16px 12px 24px;
  }

  main > * {
    padding: 16px 14px;
    margin-bottom: 14px;
  }

  #sprite-box h1 {
    font-size: 1.65rem;
  }

  #sprite-box img {
    height: 96px;
  }

  #forms-list {
    grid-template-columns: 1fr;
  }

  #move-section {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
