<template>
  <q-page class="row items-center tw-px-2 bg-grey-3 justify-center tw-gap-4 font-quicksand">
    <BaseCard shadow :border-width="2" class="tw-p-2 tw-w-1/2">
      <h6 class="font-quicksand">
        Welcome to our route planning website! Our UCS and A* algorithm helps
        you find the shortest path between two locations using real-time data
        from Google Maps. Simply enter your starting and destination points and
        let our algorithm do the rest. With our website, you can save time and
        effort by always taking the most efficient route.
      </h6>
    </BaseCard>
    <div class="tw-ml-4 tw-gap-4 tw-w-72">
      <q-file
        clearable
        :loading="file === null"
        accept=".txt"
        color="teal"
        filled
        v-model="file"
        label="Upload Text Files"
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
        :disable="file === null"
        @update:model-value="updateDestOption"
        class="tw-w-full"
      />
      <q-select
        v-model="dest"
        :options="destOption"
        label="Choose a destination"
        :disable="source.length === 0"
        class="tw-w-full"
      />
      <div class="tw-flex tw-items-center tw-gap-2 tw-mt-2">
          <BaseBtn label="Find!" @click="getFile" :disable="file === null || source.length === 0 || dest.length === 0"></BaseBtn>
        <div class="tw-p-2 tw-rounded-md" :class="wait === 'Ready' ? 'bg-grey-4' : wait === 'Busy' ? 'bg-red': 'bg-green'">Status: {{ wait }}
          <h6 v-if="wait === 'Finished'">You can press the <b>Update Map</b> to show the results!</h6>
        </div>
      </div>
    </div>
    <!-- Test Map here -->
    <GoogleMaps
      :path="pathRetrieved"
      :center="center"
      :found-route="foundRoute"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, watch, Ref } from 'vue';
import axios from 'axios';
import { Path } from 'src/composables';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

const store = useStore();
const $q = useQuasar();
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
const foundRoute = ref(false);
const center = ref(
  pathRetrieved.value.length > 0
    ? {
        lat: pathRetrieved.value[0].latitude,
        lng: pathRetrieved.value[0].longitude,
      }
    : { lat: -6.9174639, lng: 107.61912280000001 }
);

watch(
  () => file.value,
  () => {
    if (file.value === null) {
      wait.value = "Ready";
    }
  }
);

watchEffect(() => {
  pathRetrieved.value;
  console.log(center.value);
});

const wait = file.value === null ? ref('Ready') : ref(null);

const getFile = () => {
  if (file.value) {
    wait.value = 'Busy'
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        $q.loading.show({
          message: 'Finding nearest path. Hang on...',
        });
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
        console.log('route: ' + route.value);
        mapData.value.forEach((ele, index) => {
          if (route.value.includes(index)) {
            console.log(index);
            pathRetrieved.value.push(allPosition[index]);
          }
        });
        center.value.lat = pathRetrieved.value[0].latitude;
        center.value.lng = pathRetrieved.value[0].longitude;
        foundRoute.value = true;
        console.log('Filled arr: ');
        console.log(pathRetrieved.value);
        store.dispatch('updatePathRetrieved', pathRetrieved);
      } finally {
        setTimeout(() => {
          $q.loading.hide();
          wait.value = 'Finished';
        }, 1500);
        
      }
    };
    reader.readAsText(file.value);
  }
};
</script>

<style lang="scss" scoped>
.waiting {
  background-color: #6c757d;
}

.rotating-icon {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
