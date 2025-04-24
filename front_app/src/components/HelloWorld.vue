<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useGeolocation } from "../composable/useGeolocation";
import {
  haversineDistanceMine,
  haversineDistanceAI,
} from "../functions/Distance";
import { type City } from "../types/City";

import { fetchCities } from "../functions/Data";

const { latitude, longitude, error, getLocation } = useGeolocation();

onMounted(() => {
  getLocation();
  loadCities();
});
const distanceMine = ref(0);
const distanceAI = ref(0);
const cities = ref<City[]>([]);

const tokyoLocation = {
  latitude: 35.6895,
  longitude: 139.6917,
};

const loadCities = async () => {
  try {
    cities.value = await fetchCities();
  } catch (err) {
    console.error("Failed to fetch cities:", err);
  }
};

watch(
  [latitude, longitude],
  ([lat, lon]) => {
    if (lat !== null && lon !== null) {
      distanceMine.value = haversineDistanceMine(
        lat,
        lon,
        tokyoLocation.latitude,
        tokyoLocation.longitude
      );
      distanceAI.value = haversineDistanceAI(
        lat,
        lon,
        tokyoLocation.latitude,
        tokyoLocation.longitude
      );
    }
  },
  { immediate: true }
);

defineProps<{ msg: string }>();
</script>

<template>
  <h1>Distance between my location and Tokyo is:</h1>
  <div v-if="error">Error: {{ error }}</div>
  <div v-else-if="latitude && longitude">
    <p>Location: {{ latitude }}, {{ longitude }}</p>
    <p>My formula for distance: {{ distanceMine }} km</p>
    <p>AI formula for distance: {{ distanceAI }} km</p>
  </div>
  <div v-else>Loading location...</div>
  <p>{{ msg }}</p>
  <div>
    <h2>List of Cities</h2>
    <ul>
      <!-- Note: Key is country, because we have 25 unique countries so its okay -->
      <li v-for="city in cities" :key="city.country">
        {{ city.name }} - {{ city.country }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

li {
  list-style: none;
  padding: 5px;
  margin: 5px;

  border-radius: 5px;
}
</style>
