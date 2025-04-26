<template>
  <div class="globe-wrapper" :style="globeStyle">
    <div class="globe" ref="globeContainer"></div>
  </div>
</template>

<script setup lang="ts">
import notoSans from "../assets/Noto Sans_Regular.typeface.json";
import Globe from "globe.gl";
import { ref, onMounted, watch, computed, type CSSProperties } from "vue";

import { storeToRefs } from "pinia";
import { useCitiesStore } from "../stores/cityStore";
import { useDistanceStore } from "../stores/distanceStore";
import { useLocationStore } from "../stores/locationStore";

const globeContainer = ref<HTMLElement | null>(null);
let globeInstance: any = null;

const cityStore = useCitiesStore();
const distanceStore = useDistanceStore();
const locationStore = useLocationStore();

const { currentLocation, userLocation } = storeToRefs(locationStore);
const { filteredCities } = storeToRefs(cityStore);
const { distancesMine } = storeToRefs(distanceStore);

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const size = computed(() => {
  const calculatedSize =
    windowHeight.value > windowWidth.value
      ? windowWidth.value * 0.8
      : windowHeight.value * 0.8;

  if (windowWidth.value < 450) {
    return Math.min(calculatedSize, 300);
  }
  if (windowWidth.value < 600) {
    return Math.min(calculatedSize, 400);
  }
  if (windowWidth.value < 1200) {
    return 480;
  }
  if (windowWidth.value < 1500) {
    return Math.min(calculatedSize, 600);
  }
  return Math.min(calculatedSize, 700);
});

const globeStyle = computed(() => {
  return {
    width: `${size.value}px`,
    height: `${size.value}px`,
    clipPath: `circle(${size.value / 2}px at ${size.value / 2}px ${
      size.value / 2
    }px)`,
    position: "relative",
    margin: "0 auto",
  } as CSSProperties;
});

watch(
  [filteredCities, distancesMine, currentLocation],
  () => {
    updateLabels();
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  await cityStore.getCities();
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  });

  if (globeContainer.value) {
    globeInstance = Globe()(globeContainer.value)
      .globeImageUrl(
        "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
      )
      .backgroundColor("rgba(0,0,0,0)")
      .bumpImageUrl(
        "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
      )
      .height(size.value)
      .width(size.value);

    globeInstance.controls().autoRotate = true;
    globeInstance.controls().autoRotateSpeed = 0.6;
    globeInstance.pointOfView({
      lat: userLocation.value?.latitude,
      lng: userLocation.value?.longitude,
      altitude: 1.5,
    });

    // Zoom clamping
    const minZoom = 0.5;
    const maxZoom = 2.5;
    globeInstance.controls().addEventListener("change", () => {
      const pov = globeInstance.pointOfView();
      if (pov.altitude < minZoom) {
        globeInstance.pointOfView({ altitude: minZoom }, 0);
      } else if (pov.altitude > maxZoom) {
        globeInstance.pointOfView({ altitude: maxZoom }, 0);
      }
    });

    updateLabels();
  }
});

function onLabelClick(label: { lat: number; lng: number }) {
  locationStore.updateCurrentLocation({
    latitude: label.lat,
    longitude: label.lng,
  });
  zoomToLocation(label.lat, label.lng);
}

function zoomToLocation(lat: number, lng: number, altitude = 0.65) {
  if (!globeInstance) return;

  globeInstance.controls().autoRotate = false;
  globeInstance.pointOfView({ lat, lng, altitude }, 1000);

  setTimeout(() => {
    if (globeInstance) {
      globeInstance.controls().autoRotate = true;
      globeInstance.pointOfView({ lat, lng, altitude: 1.5 }, 1000);
    }
  }, 3000);
}

// This is so Table.vue can access the function
defineExpose({
  zoomToLocation,
});
function updateLabels() {
  if (!globeInstance || !filteredCities.value.length) return;

  const currentLoc = currentLocation.value;
  const userLoc = userLocation.value;

  const citiesWithDistance = filteredCities.value.map((city) => {
    const distance =
      distancesMine.value?.[
        cityStore.citiesList.findIndex((c) => c.name === city.name)
      ] ?? null;

    const isCurrentLoc =
      currentLoc &&
      city.lat === currentLoc.latitude &&
      city.lng === currentLoc.longitude;

    return {
      lat: city.lat,
      lng: city.lng,
      name: isCurrentLoc
        ? `You are in ${city.name}`
        : distance !== null
        ? `${city.name}`
        : city.name,
      toolTipText: isCurrentLoc
        ? `You are in ${city.name}`
        : distance !== null
        ? `${city.name} - ${distance} km`
        : city.name,
      size: city.hasMagnet ? 0.45 : 0.4,
      color: isCurrentLoc ? "red" : city.hasMagnet ? "yellow" : "white",
    };
  });

  const locationLabels = [];

  if (userLoc) {
    locationLabels.push({
      lat: userLoc.latitude,
      lng: userLoc.longitude,
      name: "Your location",
      toolTipText: `Your location`,
      size: 0.5,
      color: "cyan",
    });
  }

  globeInstance
    .labelsData([...citiesWithDistance, ...locationLabels])
    .labelText("name")
    .labelSize("size")
    .labelLabel("toolTipText")
    .labelColor("color")
    .labelDotRadius(0.5)
    .labelAltitude(0.02)
    .labelResolution(2)
    .labelsTransitionDuration(0)
    .onLabelClick((d: any) => onLabelClick(d))
    .labelTypeFace(notoSans);
}
</script>

<style scoped>
.globe-wrapper {
  width: 100%;
  height: 90vh;
  /* min-width: 900px; */
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.globe-inner {
  width: 100%;
  height: 100vh;
  max-width: 95vw;
  max-height: 95vh;
  clip-path: circle(50% at 50% 50%);
  position: relative;
}

.globe:hover {
  cursor: pointer;
}

.globe:active {
  cursor: grabbing;
}
</style>
