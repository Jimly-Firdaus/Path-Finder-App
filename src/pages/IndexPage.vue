<template>
  <q-page class="row items-center tw-p-2 bg-grey-3 justify-center tw-gap-4">
    <BaseCard shadow :border-width="2" class="tw-p-2 tw-w-full">
      <h6>
        Welcome to our route planning website! Our UCS and A* algorithm helps
        you find the shortest path between two locations using real-time data
        from Google Maps. Simply enter your starting and destination points and
        let our algorithm do the rest. Remember to click
        <strong>Update Map</strong> (bottom of this page) to show the results
        and the estimated distance.
        <q-space />
        If the map is showing "For development purposes only" then increase your
        brightness for the results :D (i've tried many ways to remove that)
      </h6>
    </BaseCard>
    <div>
      <q-img
        :src="fileConfig"
        fit="contain"
        width="450px"
        height="auto"
        draggable
      />
      <q-tooltip anchor="bottom middle" self="top middle">
        File Config
      </q-tooltip>
    </div>

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
      <div class="q-gutter-sm">
        <q-radio
          v-model="solver"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="UCS"
          label="UCS"
        />
        <q-radio
          v-model="solver"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="A*"
          label="A*"
        />
      </div>
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
          :disable="
            (source.length === 0 && dest.length === 0) ||
            (defaultChoice === null && file === null) ||
            solver.length === 0
          "
        ></BaseBtn>
        <div
          class="tw-p-2 tw-rounded-md"
          :class="
            wait === 'Ready'
              ? 'bg-grey-4'
              : wait === 'Busy'
              ? 'bg-red'
              : wait === 'Infinite Loop'
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
      <h6 v-if="refreshRequired" class="text-red">Please refresh the page!</h6>
    </div>
    <!-- Test Map here -->
    <GoogleMaps
      :path="pathRetrieved"
      :full-path="allPosition"
      :center="center"
      :found-route="foundRoute"
      :cost="cost"
      @update:used-update="handleRefreshPrompt"
    />
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="promptRefresh" position="top">
        <q-card style="width: 350px">
          <q-linear-progress :value="1" color="dark" />

          <q-card-section class="col items-center no-wrap bg-grey-4">
            <div>
              <div class="text-weight-bold">We need to refresh this page</div>
              <div class="text-grey">
                This is needed to restart the Polyline
              </div>
            </div>

            <q-space />
            <div class="tw-pt-2 tw-flex tw-justify-center tw-gap-x-4">
              <q-btn label="Refresh" @click="refreshPage" rounded />
              <q-btn
                label="Later"
                rounded
                @click="
                  () => {
                    promptRefresh = false;
                    refreshRequired = true;
                  }
                "
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, watch } from 'vue';
import axios, { AxiosError } from 'axios';
import { Path } from 'src/composables';
import { useStore } from 'vuex';
import { useQuasar, Notify } from 'quasar';
import {
  ALUN_ALUN_BANDUNG,
  BUAH_BATU,
  ITB,
  MEDAN,
  dataToString,
} from 'src/composables/useDefaultData';
import fileConfig from 'src/assets/file_config.png';

const store = useStore();
const $q = useQuasar();
const file = ref<File | null>(null);
const source = ref<string>('');
const dest = ref<string>('');
const mapData = ref<string[]>([]);
const destOption = computed(() =>
  mapData.value.filter((item) => item !== source.value)
);

const refreshRequired = ref(false);
const solver = ref('');
const defaultOptions = ['Alun Alun Kota Bandung', 'Buah Batu', 'ITB', 'Medan'];

const defaultChoice = ref<string | null>(null);
const defaultData = ref<string>('');

const allPosition = ref<Path[]>([]);
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
    default:
      defaultData.value = '';
      break;
  }
  const lines = defaultData.value.split('\n');
  mapData.value = lines.filter(
    (_, index) => index > 0 && index % 2 !== 0 && index < parseInt(lines[0]) * 2
  );
  for (let i = 1; i <= parseInt(lines[0]); i++) {
    const latLongLine = lines[i * 2];
    const latLong = latLongLine.split(' ').map((x) => parseFloat(x));
    allPosition.value.push({ latitude: latLong[0], longitude: latLong[1] });
  }
};

const updateDestOption = () => {
  dest.value = '';
};

const handleFileUpload = (file: File) => {
  if (file) {
    mapData.value = [];
    allPosition.value = [];
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
        allPosition.value.push({ latitude: latLong[0], longitude: latLong[1] });
      }
    };
    reader.readAsText(file);
  }
};
const promptRefresh = ref(false);
const handleRefreshPrompt = (refresh: boolean) => {
  if (refresh) {
    promptRefresh.value = true;
  }
};

const refreshPage = () => {
  location.reload();
};

const pathRetrieved = ref<Path[]>([]);
const route = ref<number[]>([]);
const cost = ref<number>(0);
const foundRoute = ref(false);
const center = ref(
  pathRetrieved.value.length > 0
    ? {
        lat: pathRetrieved.value[0].latitude,
        lng: pathRetrieved.value[0].longitude,
      }
    : { lat: -6.9174639, lng: 107.61912280000001 }
);

watch([() => file.value, () => defaultChoice.value], () => {
  if (file.value === null && defaultChoice.value === null) {
    wait.value = 'Ready';
  }
});

watchEffect(() => {
  pathRetrieved.value;
});

const wait = file.value === null ? ref('Ready') : ref(null);
const pathInString = ref("");
const getFile = async () => {
  // TODO: refactor the same block code
  pathRetrieved.value = [];
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
          solver: solver.value.toString(),
        };
        const response = await axios.post(
          'https://jimlyfirdaus.pythonanywhere.com/solve',
          JSON.stringify(data),
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
          }
        );
        const result = response.data;
        route.value = result[1].split('-').map((x: any) => parseInt(x));
        cost.value = result[0];
        route.value.forEach((ele, index) => {
          pathInString.value += mapData.value[ele] + " -> ";
        })
        mapData.value.forEach((ele, index) => {
          if (route.value.includes(index)) {
            pathRetrieved.value.push(allPosition.value[index]);
          }
        });
        pathInString.value = pathInString.value.slice(0, -3);
        center.value.lat = pathRetrieved.value[0].latitude;
        center.value.lng = pathRetrieved.value[0].longitude;
        foundRoute.value = true;
        store.dispatch('updatePathRetrieved', pathRetrieved);
        store.dispatch('updateAllPosition', allPosition);
        store.dispatch('updatePathInString', pathInString);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 500:
              $q.loading.hide();
              wait.value = 'Infinite Loop';
              let i = 5;
              const intervalId = setInterval(() => {
                Notify.create({
                  message: `Something wrong with your file. Please match with the given config! Refreshing in ${i}`,
                });
                i--;
                if (i < 1) {
                  clearInterval(intervalId);
                  refreshPage();
                }
              }, 1000);
              break;
          }
        }
      } finally {
        setTimeout(() => {
          $q.loading.hide();
          if (wait.value !== 'Infinite Loop') {
            wait.value = 'Finished';
          }
        }, 1500);
      }
    };
    reader.readAsText(file.value);
  } else {
    if (defaultChoice.value) {
      defaultChoice.value = null;
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
          solver: solver.value.toString(),
        };
        const response = await axios.post(
          'https://jimlyfirdaus.pythonanywhere.com/solve',
          JSON.stringify(data),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const result = response.data;

        route.value = result[1].split('-').map((x: any) => parseInt(x));
        cost.value = result[0];
        route.value.forEach((ele, index) => {
          pathInString.value += mapData.value[ele] + " -> ";
        })
        mapData.value.forEach((ele, index) => {
          if (route.value.includes(index)) {
            pathRetrieved.value.push(allPosition.value[index]);
          }
        });
        pathInString.value = pathInString.value.slice(0, -3);
        center.value.lat = pathRetrieved.value[0].latitude;
        center.value.lng = pathRetrieved.value[0].longitude;
        foundRoute.value = true;
        store.dispatch('updatePathRetrieved', pathRetrieved);
        store.dispatch('updateAllPosition', allPosition);
        store.dispatch('updatePathInString', pathInString);
      } finally {
        setTimeout(() => {
          $q.loading.hide();
          wait.value = 'Finished';
        }, 1500);
      }
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
