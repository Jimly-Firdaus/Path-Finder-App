<template>
  <GoogleMap
    ref="map"
    api-key="AIzaSyBLrkK67ZokwGfK6v64zcbhpon6jZ757YU"
    style="width: 100%; height: 30em"
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
  <div class="tw-flex tw-flex-col tw-items-center">
    <template v-if="foundPath">
      <h3>Estimated: {{ cost }} km</h3>
    </template>
    <BaseBtn label="Update Map" size="md" class="tw-w-36" @click="updateMap" />
  </div>
  <!-- <BaseBtn label="Check Arr" size="md" @click="checkArr" /> -->
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  ref,
  PropType,
  watch,
  getCurrentInstance,
} from 'vue';
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
  cost: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits<{
  (e: 'update:usedUpdate', value: boolean): void;
}>();

console.log('props.path:', props.path);
const foundPath = ref(props.foundRoute);
const centerVal = ref(props.center);
const totalDistance = ref(props.cost);

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

const store = useStore();

const pathRetrieved = computed(() => store.state.pathRetrieved);

const path = computed(() =>
  pathRetrieved.value.map((p: { latitude: number; longitude: number }) => ({
    lat: p.latitude,
    lng: p.longitude,
  }))
);

const pathToGoal = ref({
  path: path.value,
  geodesic: true,
  strokeColor: '#000080',
  strokeOpacity: 0.8,
  strokeWeight: 3,
});
const map = ref<InstanceType<typeof GoogleMap>>();
const polyline = ref<InstanceType<typeof google.maps.Polyline>>();
watch([() => centerVal.value, () => pathToGoal.value.path], () => {
  console.log(props.foundRoute);
  foundPath.value = props.foundRoute;
  console.log(pathToGoal.value.path);
  console.log('-------------------------');
  emit('update:usedUpdate', true);
  totalDistance.value = props.cost;
  // Update the map center
  map.value?.map?.panTo(centerVal.value);
});

const updateMap = () => {
  // just to reflect all async changes to sync child with parent
  pathToGoal.value.path = [{}];
  centerVal.value = props.center;
  marker1.value = path.value[0];
  marker2.value = path.value[path.value.length - 1];
  pathToGoal.value.path = path.value;
  console.log(foundPath.value);
  console.log(centerVal.value.lat + ', ' + centerVal.value.lng);
};

const checkArr = () => {
  console.log('Retrieved len: ' + path.value.length);
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
