<script setup lang="ts">
import { defineProps } from 'vue';
import { cn } from '../lib/utils';

const props = defineProps({
  class: {
    type: String,
  },
});
</script>

<template>
  <button
    :class="cn('bg-emerald-500 p-3 rounded-lg text-white font-bold cursor-pointer hover:bg-emerald-900 ease-in duration-200 flex gap-2 text-center', props.class)">
    <slot />
  </button>
</template>
