<template>
  <q-page class="row items-center tw-px-2">
    <BaseCard shadow :border-width="2" class="tw-p-2 tw-w-1/2">
      <h1>
        Welcome to our route planning website! Our UCS and A* algorithm helps
        you find the shortest path between two locations using real-time data
        from Google Maps. Simply enter your starting and destination points and
        let our algorithm do the rest. With our website, you can save time and
        effort by always taking the most efficient route.
      </h1>
    </BaseCard>
    <div class="tw-ml-4 tw-gap-4 tw-w-72">
      <q-file
        color="teal"
        filled
        v-model="file"
        label="Label"
        @update:modelValue="handleFileUpload"
        class="tw-w-full"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
      </q-file>
      <q-select
        v-model="source"
        :options="mapData"
        label="Choose a start point"
        @update:model-value="updateDestOption"
        class="tw-w-full"
      />
      <q-select
        v-model="dest"
        :options="destOption"
        label="Choose a destination"
        :disable="source === null"
        class="tw-w-full"
      />
    </div>
    <BaseBtn label="Find!" @click="getFile"> </BaseBtn>
    <div>{{ wait }}</div>
    <!-- Test Map here -->
    <GoogleMaps :path="pathRetrieved" :center="center" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, watch, Ref } from 'vue';
import axios from 'axios';
import { Path } from 'src/composables';
import { useStore } from 'vuex';

const store = useStore();

const file = ref<File | null>(null);
const source = ref<string>('');
const dest = ref<string>('');
const mapData = ref<string[]>([]);

const destOption = computed(() =>
  mapData.value.filter((item) => item !== source.value)
);

const updateDestOption = () => {
  dest.value = '';
};

let allPosition: Path[] = [];
const handleFileUpload = (file: File) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      mapData.value = lines.filter(
        (_, index) =>
          index > 0 && index % 2 !== 0 && index < parseInt(lines[0]) * 2
      );
      for (let i = 1; i <= parseInt(lines[0]); i++) {
        const latLongLine = lines[i * 2];
        const latLong = latLongLine.split(' ').map((x) => parseFloat(x));
        allPosition.push({ latitude: latLong[0], longitude: latLong[1] });
      }
    };
    reader.readAsText(file);
    console.log(allPosition);
  }
};

const pathRetrieved = ref<Path[]>([]);
const route = ref<number[]>([]);
const cost = ref<number>();

const center = ref(
  pathRetrieved.value.length > 0
    ? {
        lat: pathRetrieved.value[0].latitude,
        lng: pathRetrieved.value[0].longitude,
      }
    : { lat: -6.9174639, lng: 107.61912280000001 }
);

watch(
  () => pathRetrieved.value,
  (newPath) => {
    if (newPath.length > 0) {
      center.value = {
        lat: newPath[0].latitude,
        lng: newPath[0].longitude,
      };
    } else {
      center.value = { lat: -6.9174639, lng: 107.61912280000001 };
    }
  }
);

watchEffect(() => {
  pathRetrieved.value;
  console.log(center.value);
});

const wait = ref("Waiting");

const getFile = () => {
  if (file.value) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const data = {
        text,
        src: source.value.toString(),
        dest: dest.value.toString(),
      };
      const response = await axios.post(
        'http://localhost:5000/solve',
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const result = response.data;
      route.value = result[1].split('-').map((x: any) => parseInt(x));
      cost.value = result[0];
      pathRetrieved.value = [];
      console.log("route: " + route.value);
      mapData.value.forEach((ele, index) => {
        if (route.value.includes(index)) {
          console.log(index);
          pathRetrieved.value.push(allPosition[index]);
        }
      });
      center.value.lat = pathRetrieved.value[0].latitude;
      center.value.lng = pathRetrieved.value[0].longitude;
      wait.value = "Finished";
      console.log("Filled arr: ");
      console.log(pathRetrieved.value);
      store.dispatch('updatePathRetrieved', pathRetrieved);
    };
    reader.readAsText(file.value);
  }
};
</script>
