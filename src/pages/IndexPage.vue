<template>
  <q-page
    class="row items-center tw-px-2 bg-grey-3 justify-center tw-gap-4 font-quicksand"
  >
    <BaseCard shadow :border-width="2" class="tw-p-2 tw-w-full">
      <h6 class="font-quicksand">
        Welcome to our route planning website! Our UCS and A* algorithm helps
        you find the shortest path between two locations using real-time data
        from Google Maps. Simply enter your starting and destination points and
        let our algorithm do the rest. With our website, you can save time and
        effort by always taking the most efficient route.
      </h6>
    </BaseCard>
    <div class="tw-w-72">
      <h1>Choose Default Map</h1>
      <q-select
        clearable
        v-model="defaultChoice"
        :options="defaultOptions"
        label="Click here!"
        :disable="file !== null"
        class="tw-w-full"
        @update:model-value="handleDefaultOptions"
      />
      <div class="tw-flex tw-items-center tw-justify-center tw-my-3">
        <div class="separator"></div>
        <div class="tw-mx-5 text-subtitle-2 text-grey-8">OR</div>
        <div class="separator"></div>
      </div>
      <q-file
        clearable
        :disable="defaultChoice !== null"
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
    </div>
    <div class="tw-ml-4 tw-gap-4 tw-w-72">
      <q-select
        v-model="source"
        :options="mapData"
        label="Choose a start point"
        :disable="file === null && defaultChoice === null"
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
        <BaseBtn
          label="Find!"
          @click="getFile"
          :disable="source.length === 0 && dest.length === 0"
        ></BaseBtn>
        <div
          class="tw-p-2 tw-rounded-md"
          :class="
            wait === 'Ready'
              ? 'bg-grey-4'
              : wait === 'Busy'
              ? 'bg-red'
              : 'bg-green'
          "
        >
          Status: {{ wait }}
          <h6 v-if="wait === 'Finished'">
            You can press the <b>Update Map</b> to show the results!
          </h6>
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
import {
  ALUN_ALUN_BANDUNG,
  BUAH_BATU,
  ITB,
  MEDAN,
  dataToString,
} from 'src/composables/useDefaultData';

const store = useStore();
const $q = useQuasar();
const file = ref<File | null>(null);
const source = ref<string>('');
const dest = ref<string>('');
const mapData = ref<string[]>([]);
const destOption = computed(() =>
  mapData.value.filter((item) => item !== source.value)
);

const defaultOptions = ['Alun Alun Kota Bandung', 'Buah Batu', 'ITB', 'Medan'];

const defaultChoice = ref<string | null>(null);
const defaultData = ref<string>('');

const handleDefaultOptions = (val: any) => {
  switch (val) {
    case 'Alun Alun Kota Bandung':
      defaultData.value = dataToString(ALUN_ALUN_BANDUNG);
      break;
    case 'Buah Batu':
      defaultData.value = dataToString(BUAH_BATU);
      break;
    case 'ITB':
      defaultData.value = dataToString(ITB);
      break;
    case 'Medan':
      defaultData.value = dataToString(MEDAN);
      break;
  }
  const lines = defaultData.value.split('\n');
  mapData.value = lines.filter(
    (_, index) => index > 0 && index % 2 !== 0 && index < parseInt(lines[0]) * 2
  );
};

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
      wait.value = 'Ready';
    }
  }
);

watchEffect(() => {
  pathRetrieved.value;
  console.log(center.value);
});

const wait = file.value === null ? ref('Ready') : ref(null);

const getFile = async () => {
  // TODO: refactor the same block code
  if (file.value) {
    wait.value = 'Busy';
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
  } else {
    if (defaultChoice.value) {
      wait.value = 'Busy';
      try {
        $q.loading.show({
          message: 'Finding nearest path. Hang on...',
        });
        const text = defaultData.value;
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
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.waiting {
  background-color: #6c757d;
}

.separator {
  height: 4px;
  width: 100%;
  background-color: #bdbdbd;
}
</style>
