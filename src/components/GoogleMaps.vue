<template>
  <GoogleMap
    api-key="AIzaSyBLrkK67ZokwGfK6v64zcbhpon6jZ757YU"
    style="width: 100%; height: 500px"
    :center="center"
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
    <Polyline :options="pathToGoal" />
  </GoogleMap>
  <BaseBtn label="CheckPos" size="md" @click="checkPos" />
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from 'vue';
import {
  GoogleMap,
  Marker as GoogleMapMarker,
  Polyline,
} from 'vue3-google-map';
import {
  startMarker as startIcon,
  goalMarker as goalIcon,
} from 'src/composables/marker';
import { MapMouseEvent } from 'google.maps';
// import { snapToRoads } from '@googlemaps/roads';

interface SnappedPoint {
  location: {
    latitude: number;
    longitude: number;
  };
  placeId: string;
}

const center = { lat: -6.9174639, lng: 107.61912280000001 };
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

const path = [
  { lat: -6.9174639, lng: 107.61912280000001 },
  { lat: -6.914744, lng: 107.60981 },
  { lat: -6.902482, lng: 107.618706 },
  { lat: -6.903888, lng: 107.634789 },
  { lat: -6.9174639, lng: 107.61912280000001 },
];

const pathToGoal = {
  path: path,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
};

const lat1 = marker1.value.lat;
const lng1 = marker1.value.lng;
const lat2 = marker2.value.lat;
const lng2 = marker2.value.lng;

const lat3 = lat1;
const lng3 = lng2;
const lat4 = lat2;
const lng4 = lng1;

const checkPos = () => {
  console.log('start: ' + marker1.value.lat + ', ' + marker1.value.lng);
  console.log('goal: ' + +marker2.value.lat + ', ' + marker2.value.lng);
};

const startMarker = {
  url: startIcon,
  scaledSize: new google.maps.Size(25, 25),
};

const goalMarker = {
  url: goalIcon,
  scaledSize: new google.maps.Size(25, 25),
};

defineComponent({
  components: {
    GoogleMap,
    GoogleMapMarker,
  },
});
</script>
