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
    <q-file color="teal" filled v-model="file" label="Label">
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>
    <BaseBtn label="Find!" @click="getFile"> </BaseBtn>
    <!-- Test Map here -->
    <GoogleMaps />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const file = ref(null);

const getFile = () => {
  if (file.value) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result;
      // do something with the text
      const response = await axios.post('http://localhost:5000/solve', text, {
        headers: { 'Content-Type': 'text/plain' },
      });
      const result = response.data;
      console.log(result);
    };
    reader.readAsText(file.value);
  }
  console.log(file.value);
};
</script>
