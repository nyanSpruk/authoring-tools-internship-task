<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useGeolocation } from "../composable/useGeolocation";
import {
  haversineDistanceMine,
  haversineDistanceAI,
} from "../functions/Distance";

const { latitude, longitude, error, getLocation } = useGeolocation();

onMounted(() => {
  getLocation();
});
const distanceMine = ref(0);
const distanceAI = ref(0);

const tokyoLocation = {
  latitude: 35.6895,
  longitude: 139.6917,
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
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
