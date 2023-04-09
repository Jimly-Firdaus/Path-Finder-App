<script setup lang="ts">
import { QBtn } from 'quasar';

const props = withDefaults(
  defineProps<{
    label?: string | undefined;
    round?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Put component in disabled mode
     */
    disable?: boolean;
    submit?: boolean;
  }>(),
  {
    size: 'sm',
  }
);
</script>

<template>
  <q-btn
    :class="`
        btn-${size}
        ${disable ? 'disable' : ''}
      `"
    unelevated
    no-caps
    :label="label"
    :disable="disable"
    :type="submit ? 'submit' : undefined"
    @click="undefined"
  >
    <template v-if="$slots.default" #default>
      <slot></slot>
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading"></slot>
    </template>
  </q-btn>
</template>

<style lang="scss" scoped>
.q-btn {
  background-color: #007bff;
  color: #ffffff;
  &.disable {
    background-color: $grey-9;
  }
}
</style>
