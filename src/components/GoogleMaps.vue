<template>
  <GoogleMap
    ref="map"
    api-key="AIzaSyBLrkK67ZokwGfK6v64zcbhpon6jZ757YU"
    style="width: 100%; height: 500px"
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
    <Polyline ref="polyline" :options="pathToGoal" />
  </GoogleMap>
  <BaseBtn label="CheckPos" size="md" @click="checkPos" />
  <BaseBtn label="Check Arr" size="md" @click="checkArr" />
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
});

console.log('props.path:', props.path);

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
watch(
  [() => centerVal.value, () => pathToGoal.value.path],
  () => {
    console.log("-------------------------")
    // Update the map center
    map.value?.map?.panTo(centerVal.value);
  }
);

const checkPos = async () => {
  console.log('start: ' + marker1.value.lat + ', ' + marker1.value.lng);
  console.log('goal: ' + +marker2.value.lat + ', ' + marker2.value.lng);
  console.log('center: ' + props.center.lat + ', ' + props.center.lng);
  console.log('path: ' + pathToGoal.value.path);
  console.log('props: ' + props.path.values);
  // path.value.length = props.path.length;
  // props.path.forEach((ele, index) => {
  //   console.log(ele.latitude + ', ' + ele.longitude);
  //   path.value[index] = {
  //     lat: ele.latitude,
  //     lng: ele.longitude,
  //   };
  // });
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
