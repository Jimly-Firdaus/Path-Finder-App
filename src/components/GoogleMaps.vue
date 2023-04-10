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
      <Polyline :options="pathToGoal" :z-index="4" geodesic />
      <!-- <Polyline :options="allPath" :z-index="1" geodesic /> -->
      <Polygon :options="allPath" :z-index="1"/>
    </template>
  </GoogleMap>
  <div class="tw-flex tw-flex-col tw-items-center">
    <template v-if="foundPath">
      <h3>Estimated: {{ cost }} km</h3>
    </template>
    <BaseBtn label="Update Map" size="md" class="tw-w-36" @click="updateMap" :disable="path.length === 0"/>
  </div>
  <!-- <BaseBtn label="Check Arr" size="md" @click="checkArr" /> -->
</template>

<script setup lang="ts">
import { computed, defineProps, ref, PropType, watch } from 'vue';
import {
  GoogleMap,
  Marker as GoogleMapMarker,
  Polyline,
  Polygon
} from 'vue3-google-map';
import { MapMouseEvent } from 'google.maps';
import { Path } from 'src/composables';
import { useStore } from 'vuex';

const props = defineProps({
  path: {
    type: Array as PropType<Path[]>,
    required: true,
  },
  fullPath: {
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
const allPosition = computed(() => store.state.allPosition);

const path = computed(() =>
  pathRetrieved.value.map((p: { latitude: number; longitude: number }) => ({
    lat: p.latitude,
    lng: p.longitude,
  }))
);

const fullPath = computed(() =>
  allPosition.value.map((p: { latitude: number; longitude: number }) => ({
    lat: p.latitude,
    lng: p.longitude,
  }))
);

const pathToGoal = ref({
  path: path.value,
  geodesic: true,
  strokeColor: '#000000',
  strokeOpacity: 1,
  strokeWeight: 5,
});

const allPath = ref({
  path: fullPath.value,
  geodesic: true,
  strokeColor: '#F50000',
  strokeOpacity: 0.3,
  strokeWeight: 2,
  fillColor: '#90EE90',
});

const map = ref<InstanceType<typeof GoogleMap>>();
watch([() => centerVal.value, () => pathToGoal.value.path], () => {
  foundPath.value = props.foundRoute;

  emit('update:usedUpdate', true);
  totalDistance.value = props.cost;
  // Update the map center
  map.value?.map?.panTo(centerVal.value);
});

const updateMap = () => {
  // just to reflect all async changes to sync child with parent
  pathToGoal.value.path = [{}];
  allPath.value.path = [{}];
  centerVal.value = props.center;
  marker1.value = path.value[0];
  marker2.value = path.value[path.value.length - 1];
  pathToGoal.value.path = path.value;
  allPath.value.path = fullPath.value;
};
</script>
