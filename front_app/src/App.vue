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
                class="location-btn"
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

              <label class="switch-container">
                <input type="checkbox" v-model="showOnlyWithMagnets" />
                <span class="slider"></span>
                <span class="switch-text">Filter cities</span>
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
}

.globe-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.left-container {
  padding: 0 2rem 0 2rem;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
#globe {
  padding-bottom: 4rem;
}

.location-btn {
  background-color: #046e9c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2.5rem;
  height: 3rem;
  width: 50%;
  cursor: pointer;
  box-shadow: 0 0 16px #0581b66a;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Only color and shadow transition */
}

.location-btn:hover {
  background-color: rgb(13, 103, 162);
  box-shadow: 0 0 16px #1382cb;
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between switch and text */
  cursor: pointer;
}

.switch-container input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: relative;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;
}

.slider:before {
  content: "";
  position: absolute;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #046e9c;
  box-shadow: 0 0 10px #0582b6;
}

input:focus + .slider {
  box-shadow: 0 0 10px #0582b6;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.switch-text {
  font-size: 1rem;
  color: #fff;
  user-select: none;
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
