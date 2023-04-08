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
    <!-- Test Map here -->
    <GoogleMaps />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';

const file = ref<File | null>(null);
const source = ref<string | null>(null);
const dest = ref<string | null>(null);
const mapData = ref<string[]>([]);
const destOption = computed(() =>
  mapData.value.filter((item) => item !== source.value)
);

const updateDestOption = () => {
  dest.value = null;
};

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
    };
    reader.readAsText(file);
  }
};

const getFile = () => {
  if (file.value) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      console.log(source.value);
      console.log(dest.value);
      const data = {
        text,
        src: source.value,
        dest: dest.value,
      };
      const response = await axios.post(
        'http://localhost:5000/solve',
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const result = response.data;
      console.log(result);
    };
    reader.readAsText(file.value);
  }
  console.log(file.value);
};
</script>
