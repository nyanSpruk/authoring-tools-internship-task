import { ref } from "vue";
import { defineStore } from "pinia";
import { type City } from "../types/City";
import { fetchCities } from "../functions/Data";

export const useCitiesStore = defineStore("city", () => {
  const citiesList = ref<City[]>([]);

  const getCities = async () => {
    try {
      citiesList.value = await fetchCities();
    } catch (err) {
      console.error("Failed to fetch cities: ", err);
    }
  };
  return { citiesList, getCities };
});
