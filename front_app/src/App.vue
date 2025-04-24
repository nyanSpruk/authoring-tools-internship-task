<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Table from "./components/Table.vue";
import { useCitiesStore } from "./stores/cityStore";
import { useLocationStore } from "./stores/locationStore";

const citiesStore = useCitiesStore();
const locationStore = useLocationStore();

const loading = ref(true);
const fetchError = ref<string | null>(null);
const isLoading = computed(
  () => loading.value || locationStore.loadingLocation
);
const showRetryLocation = computed(() => !!locationStore.locationError);

onMounted(async () => {
  loading.value = true;
  fetchError.value = null;

  try {
    locationStore.getLocation();
    await citiesStore.getCities();
  } catch (err) {
    fetchError.value = "Failed to load cities.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>

  <div v-else-if="fetchError">{{ fetchError }}</div>

  <div v-else-if="showRetryLocation">
    <p>Location error: {{ locationStore.locationError }}</p>
    <p>
      You denied location access. Please allow it in your browser settings and
      try again.
    </p>
  </div>

  <div v-else>
    <p>
      Your location: ({{ locationStore.userLocation?.latitude }},
      {{ locationStore.userLocation?.longitude }})
    </p>
    <p>
      Current location: ({{ locationStore.currentLocation?.latitude }},
      {{ locationStore.currentLocation?.longitude }})
    </p>
    <Table />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
