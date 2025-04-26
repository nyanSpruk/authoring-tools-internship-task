<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Table from "./components/Table.vue";
import { useCitiesStore } from "./stores/cityStore";
import { useLocationStore } from "./stores/locationStore";
import Globe from "./components/Globe.vue";
import { storeToRefs } from "pinia";

const citiesStore = useCitiesStore();
const locationStore = useLocationStore();

const loading = ref(true);
const fetchError = ref<string | null>(null);
const isLoading = computed(
  () => loading.value || locationStore.loadingLocation
);
const showRetryLocation = computed(() => !!locationStore.locationError);

const userLocation = computed(() => locationStore.userLocation);

const { showOnlyWithMagnets } = storeToRefs(citiesStore);

const globeRef = ref<InstanceType<typeof Globe> | null>(null);

const handleZoomToLocation = (lat: number, lng: number) => {
  globeRef.value?.zoomToLocation(lat, lng);
};
onMounted(async () => {
  loading.value = true;
  fetchError.value = null;

  try {
    locationStore.getLocation();
  } catch (err) {
    fetchError.value = "Failed to load cities.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container">
    <div v-if="isLoading" class="status">Loading...</div>
    <div v-else-if="fetchError" class="status error">{{ fetchError }}</div>

    <div v-else-if="showRetryLocation" class="status error">
      <p>Location error: {{ locationStore.locationError }}</p>
      <p>
        You denied location access. Please allow it in your browser settings and
        try again.
      </p>
    </div>

    <div v-else class="content">
      <div class="main-view">
        <div class="left-container">
          <div class="title-container">
            <h1 class="title">Magnet Miles</h1>
            <p class="description">your travel map, reimagined</p>
          </div>
          <div class="globe-container">
            <div class="controls">
              <button
                class="location-btn table-glow"
                v-if="userLocation"
                @click="
                  () => {
                    if (userLocation) {
                      locationStore.updateCurrentLocation(userLocation);
                      handleZoomToLocation(
                        userLocation.latitude,
                        userLocation.longitude
                      );
                    }
                  }
                "
              >
                Use My Location
              </button>

              <label style="display: block; margin-bottom: 10px">
                <input type="checkbox" v-model="showOnlyWithMagnets" />
                Filter cities
              </label>
            </div>
            <Globe id="globe" ref="globeRef" />
          </div>
        </div>

        <Table @row-click="handleZoomToLocation" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.globe-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.left-container {
  padding: 0 2rem 0 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
#globe {
  padding-bottom: 4rem;
}

@media screen and (max-width: 1024px) {
  .left-container {
    padding: 0 1rem 0 1rem;
    gap: 1.5rem;
  }

  .main-view {
    flex-direction: column;
    overflow: hidden;
  }

  .main-view > * {
    flex: none;
    min-width: auto;
    overflow: hidden;
  }

  #globe {
    padding-bottom: 1rem;
  }
}

@media (min-width: 1024px) {
  .main-view {
    flex-direction: row;
    overflow: auto;
  }

  .main-view > * {
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }
}

.location-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.location-info {
  flex-grow: 1;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controls {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
