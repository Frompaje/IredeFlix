<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { cn } from '../lib/utils';

const props = defineProps({
  class: {
    type: String,
  },
});

const emit = defineEmits(["click"])
const handleClick = (e: MouseEvent) => {
  emit("click", e)
}

</script>

<template>
  <button
  @click="handleClick"
    :class="cn('bg-emerald-500 p-3 rounded-lg text-white font-bold cursor-pointer hover:bg-emerald-900 ease-in duration-200 flex gap-2 text-center', props.class)">
    <slot />
  </button>
</template>
