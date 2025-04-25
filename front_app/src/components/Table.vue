<script setup lang="ts">
import { useCitiesStore } from "../stores/cityStore";
import { useLocationStore } from "../stores/locationStore";
import { useDistanceStore } from "../stores/distanceStore";
import { storeToRefs } from "pinia";

const citiesStore = useCitiesStore();
const locationStore = useLocationStore();
const distanceStore = useDistanceStore();
const { distancesMine, distancesAI } = storeToRefs(distanceStore);

const { filteredCities, showOnlyWithMagnets } = storeToRefs(citiesStore);
</script>

<template>
  <label style="display: block; margin-bottom: 10px">
    <input type="checkbox" v-model="showOnlyWithMagnets" />
    Show only cities with magnets
  </label>
  <table>
    <thead>
      <tr>
        <th>City Name</th>
        <th class="hide">Country Name</th>
        <th class="hide">Country Code</th>
        <th class="hide">Coordinates</th>
        <th>Distance (My)</th>
        <th class="hide">Distance (AI)</th>
        <th class="hide">Magnet</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="filteredCities.length"
        v-for="(city, index) in filteredCities"
        @click="
          locationStore.updateCurrentLocation({
            latitude: city.lat,
            longitude: city.lng,
          })
        "
      >
        <td>{{ city.name }}</td>
        <td class="hide">{{ city.country_name }}</td>
        <td class="hide">{{ city.country }}</td>
        <td class="hide">( {{ city.lat }}, {{ city.lng }})</td>
        <td>{{ distancesMine[index]?.toFixed(2) }} km</td>
        <td class="hide">{{ distancesAI[index]?.toFixed(2) }} km</td>
        <td class="hide">
          {{ city.hasMagnet ? "Yes" : "No" }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #735151;
}

@media (max-width: 200px) {
  .hide {
    display: none;
  }
}
</style>
