<script setup lang="ts">
import { useCitiesStore } from "../stores/cityStore";
import { useLocationStore } from "../stores/locationStore";
import { useDistanceStore } from "../stores/distanceStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const citiesStore = useCitiesStore();
const locationStore = useLocationStore();
const distanceStore = useDistanceStore();
const { distancesMine, distancesAI } = storeToRefs(distanceStore);
const { filteredCities } = storeToRefs(citiesStore);
const selectedIndex = ref<number | null>(null);

const emit = defineEmits<{
  (e: "row-click", lat: number, lng: number): void;
}>();
</script>

<template>
  <div class="outer-scroll-wrapper">
    <div class="rounded-mask">
      <div class="scrollable-content">
        <table>
          <thead>
            <tr>
              <th class="first-col">City</th>
              <th class="hide">Country</th>
              <th class="hide">Code</th>
              <th class="hide">Coordinates</th>
              <th>Distance (My)</th>
              <th class="hide">Distance (AI)</th>
              <th class="hide magnet-header">Magnet</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(city, index) in filteredCities"
              :key="city.name + index"
              :class="{ selected: selectedIndex === index }"
              @click="
                () => {
                  selectedIndex = index;
                  locationStore.updateCurrentLocation({
                    latitude: city.lat,
                    longitude: city.lng,
                  });
                  emit('row-click', city.lat, city.lng);
                }
              "
            >
              <td class="first-col">{{ city.name }}</td>
              <td class="hide">{{ city.country_name }}</td>
              <td class="hide">{{ city.country }}</td>
              <td class="hide">{{ city.lat }}, {{ city.lng }}</td>
              <td>{{ distancesMine[index]?.toFixed(2) }} km</td>
              <td class="hide">{{ distancesAI[index]?.toFixed(2) }} km</td>
              <td class="hide">{{ city.hasMagnet ? "Yes" : "No" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer-scroll-wrapper {
  width: 100%;
  max-height: 93vh;
  margin: 1rem;
  display: flex;
}

.scrollable-content {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 90vh;
}

.scrollable-content::-webkit-scrollbar {
  height: 0;
}
.scrollable-content {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.rounded-mask {
  position: relative;
  border-radius: 3rem;
  overflow: hidden;
  margin: 1rem;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.9) inset, 0 0 16px #0582b6;
}

table {
  min-width: 900px;
  border-collapse: collapse;
  font-size: 0.9rem;
  background-color: transparent;
  color: white;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #172f4e;
}

th {
  background-color: #1e3a5fce;
  color: white;
  font-weight: 600;
  position: sticky;
  top: 0;
  text-align: center;
}

th,
td {
  padding: 1rem 1.5rem;
  text-align: left;
  height: 60px;
  max-width: 50px;
  vertical-align: middle;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

tbody tr:nth-child(odd),
tbody tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

tbody tr:hover,
tbody tr.selected {
  background-color: rgba(30, 144, 255, 0.3);
  cursor: pointer;
}

.table-container::-webkit-scrollbar {
  height: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: #2c2c2c;
  border-radius: 32px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #666;
  border-radius: 32px;
  transition: background-color 0.3s ease;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}

.table-container {
  scrollbar-width: thin;
  scrollbar-color: #666 #2c2c2c;
}

@media (max-width: 1024px) {
  table {
    font-size: 0.9rem;
  }

  .table-container {
    scrollbar-width: none;
    max-height: 95%;
  }
  .outer-scroll-wrapper {
    margin: 0;
    scrollbar-width: none;
    max-height: 42vh;
  }
}

@media (max-width: 768px) {
  table {
    font-size: 0.85rem;
  }
  .hide {
    display: none;
  }
}
@media (max-width: 768px) {
  table {
    min-width: unset !important;
    width: 100%;
    table-layout: fixed;
  }

  .outer-scroll-wrapper {
    max-height: 43vh;
  }
  .table-container {
    max-height: 95%;
  }
}

@media (max-width: 480px) {
  table {
    font-size: 0.8rem;
  }

  .outer-scroll-wrapper {
    max-height: 43vh;
  }
  .table-container {
    max-height: 95%;
  }
}

@media (max-width: 360px) {
  table {
    font-size: 0.75rem;
  }
  .outer-scroll-wrapper {
    max-height: 45vh;
  }
  .table-container {
    max-height: 95%;
  }
}
</style>
