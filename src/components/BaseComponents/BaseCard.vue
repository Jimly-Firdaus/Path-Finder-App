<script setup lang="ts">
import { computed, PropType, ref } from 'vue';

const props = defineProps({
  /**
   * Border Radius in px
   */
  borderRadius: {
    type: String as PropType<'none' | 'sm' | 'lg'>,
    default: 'lg',
  },
  /**
   * Thickness of border in px
   */
  borderWidth: {
    type: Number,
    default: 3,
  },
  /**
   * CSS `border-style` Property
   */
  borderStyle: {
    type: String,
    default: 'solid',
  },
  shadow: Boolean,
  clickable: Boolean,
});

const cardRef = ref();
defineExpose({
  cardRef,
});

const borderRadiusPx = computed(() => {
  return { none: '0px', sm: '10px', lg: '20px' }[props.borderRadius];
});
const borderWidthPx = computed(() => `${props.borderWidth}px`);
</script>

<template>
  <q-card :class="{ clickable, shadow }" :flat="!shadow" ref="cardRef">
    <slot></slot>
  </q-card>
</template>

<style lang="scss" scoped>
.q-card {
  border-radius: v-bind(borderRadiusPx);
  border: v-bind(borderWidthPx) v-bind(borderStyle) $grey-5;
  transition: all 300ms ease;

  background-color: $grey-2;
  border-color: $grey-10;

  .shadow {
    box-shadow: $subtle-shadow !important;
  }
}
</style>
