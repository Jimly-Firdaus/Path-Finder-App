<template>
  <GoogleMap
    ref="map"
    api-key="AIzaSyBLrkK67ZokwGfK6v64zcbhpon6jZ757YUxx"
    style="width: 100%; height: 25em"
    :center="centerVal"
    :zoom="15"
  >
    <GoogleMapMarker
      ref="startPos"
      :options="{
        position: marker1,
        draggable: true,
        label: 'start',
      }"
      @dragend="updateStartPos"
    />
    <GoogleMapMarker
      ref="goalPos"
      :options="{
        position: marker2,
        draggable: true,
        label: 'goal',
      }"
      @dragend="updateGoalPos"
    />
    <template v-if="foundPath">
      <Polyline :options="pathToGoal" />
    </template>
  </GoogleMap>
  <BaseBtn label="Update Map" size="md" @click="updateMap" />
  <!-- <BaseBtn label="Check Arr" size="md" @click="checkArr" /> -->
</template>

<script setup lang="ts">
import { computed, defineProps, ref, PropType, watch, getCurrentInstance } from 'vue';
import {
  GoogleMap,
  Marker as GoogleMapMarker,
  Polyline,
} from 'vue3-google-map';
import { MapMouseEvent } from 'google.maps';
import { Path } from 'src/composables';
import { useStore } from 'vuex';

const props = defineProps({
  path: {
    type: Array as PropType<Path[]>,
    required: true,
  },
  center: {
    type: Object as PropType<{ lat: number; lng: number }>,
    required: true,
  },
  foundRoute: {
    type: Boolean,
    default: false,
  },
});

console.log('props.path:', props.path);
const foundPath = ref(props.foundRoute);
const centerVal = ref(props.center);

const marker1 = ref({ lat: -6.9174639, lng: 107.6191228 });
const marker2 = ref({ lat: -6.9174639, lng: 107.6191228 });

const updateStartPos = (event: MapMouseEvent) => {
  marker1.value.lat = event.latLng.lat();
  marker1.value.lng = event.latLng.lng();
};

const updateGoalPos = (event: MapMouseEvent) => {
  marker2.value.lat = event.latLng.lat();
  marker2.value.lng = event.latLng.lng();
};

// const path = computed(() =>
//   props.path.map((path) => ({
//     lat: path.latitude,
//     lng: path.longitude,
//   }))
// );
const store = useStore();

const pathRetrieved = computed(() => store.state.pathRetrieved);

const path = computed(() =>
  pathRetrieved.value.map((p: {latitude: number; longitude: number}) => ({ lat: p.latitude, lng: p.longitude }))
);

const pathToGoal = ref({
  path: path.value,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
});
const map = ref<InstanceType<typeof GoogleMap>>();
const polyline = ref<InstanceType<typeof google.maps.Polyline>>();
watch(
  [() => centerVal.value, () => pathToGoal.value.path],
  () => {
    console.log(props.foundRoute);
    pathToGoal.value.path = path.value;
    console.log(pathToGoal.value.path);
    console.log("-------------------------")
    foundPath.value = props.foundRoute;
    // Update the map center
    map.value?.map?.panTo(centerVal.value);
  }
);

const updateMap = () => {
  // just to reflect all async changes to sync child with parent
  centerVal.value = props.center;
};

const checkArr = () => {
  console.log("Retrieved len: " + path.value.length);
  console.log(path.value);
  console.log(centerVal.value);
};

// const startMarker = {
//   url: startIcon,
//   scaledSize: new google.maps.Size(25, 25),
// };

// const goalMarker = {
//   url: goalIcon,
//   scaledSize: new google.maps.Size(25, 25),
// };

// defineComponent({
//   components: {
//     GoogleMap,
//     GoogleMapMarker,
//   },
// });
</script>
