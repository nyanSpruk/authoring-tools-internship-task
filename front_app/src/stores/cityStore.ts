import { ref } from "vue";
import { defineStore } from "pinia";
import { type City } from "../types/ExternalData";
import { fetchCities } from "../functions/Data";

import { useMagnetStore } from "./magnetStore";

export const useCitiesStore = defineStore("city", () => {
  const citiesList = ref<(City & { hasMagnet: boolean })[]>([]);

  const getCities = async () => {
    try {
      const magnetStore = useMagnetStore();

      await magnetStore.getMagnets();
      const rawCities = await fetchCities();

      const magnetCodes = magnetStore.magnetList.map((m) => m.code);
      console.debug(magnetCodes);

      citiesList.value = rawCities.map((city) => ({
        ...city,
        hasMagnet: magnetCodes.includes(city.country),
      }));
    } catch (err) {
      console.error("Failed to fetch cities: ", err);
    }
  };

  return { citiesList, getCities };
});
