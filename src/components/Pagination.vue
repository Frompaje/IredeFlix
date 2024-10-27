<script setup lang="ts">
import { SquareArrowLeft, SquareArrowRight } from "lucide-vue-next";
import Button from "./Button.vue";
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  total_pages: {
    type: Number,
    required: true,
  },
  total_results: {
    type: Number,
    required: true,
  },
});

const pageLimit = 3;

const visiblePages = computed(() => {
  const pages = [];
  const startPage = Math.max(1, props.page - Math.floor(pageLimit / 2));
  const endPage = Math.min(props.total_pages, startPage + pageLimit - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const emit = defineEmits(['update:page']);

function goToPage(page: number) {
  if (page >= 1 && page <= props.total_pages) {
    emit('update:page', page); 
  }
}
</script>

<template>
  <main class="flex text-center w-full justify-between pr-4 pl-4 pb-3">
    <Button 
      @click="goToPage(props.page - 1)" 
      :disabled="props.page === 1" 
      class="max-w-28"
    >
      <SquareArrowLeft />
    </Button>

    <Button
      v-for="page in visiblePages"
      :key="page"
      @click="goToPage(page)"
      :class="`pr-8 pl-8 ${page === props.page ? 'opacity-50 cursor-not-allowed' : ''}`"
    >
      {{ page }}
    </Button>

    <Button 
      @click="goToPage(props.page + 1)" 
      :disabled="props.page === props.total_pages" 
      class="max-w-28"
    >
      <SquareArrowRight />
    </Button>
  </main>
</template>
