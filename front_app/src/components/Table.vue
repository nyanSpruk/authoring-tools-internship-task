<script setup lang="ts">
import { computed } from "vue";
import { useCitiesStore } from "../stores/cityStore";
import { useLocationStore } from "../stores/locationStore";

const citiesStore = useCitiesStore();
const locationStore = useLocationStore();

const citiesList = computed(() => citiesStore.citiesList);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>City Name</th>
        <th>Country Name</th>
        <th>Country Code</th>
        <th>Coordinates</th>
        <th>Distance (My)</th>
        <th>Distance (AI)</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="citiesList?.length"
        v-for="city in citiesList"
        @click="
          locationStore.updateCurrentLocation({
            latitude: city.lat,
            longitude: city.lng,
          })
        "
      >
        <td>{{ city.name }}</td>
        <td>{{ city.country_name }}</td>
        <td>{{ city.country }}</td>
        <td>( {{ city.lat }}, {{ city.lng }})</td>
        <td>1000km</td>
        <td>1000km</td>
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
</style>
