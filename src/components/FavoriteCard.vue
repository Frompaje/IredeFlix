<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  itemId: {
    type: Number,
  },

  poster_path: {
    type: String
  },
  
  isTypeOfMovie: {
    type: Boolean,
    required:true
  }
});

</script>

<template>
  <a :href="props.isTypeOfMovie ? 'movies/' + props.itemId : 'series/' + props.itemId">
    <div class="w-full flex justify-center items-center">
      <img :src="'https://image.tmdb.org/t/p/w500' + props.poster_path"
        class="rounded-xl hover:bg-white-500 shadow-lg hover:shadow-purple-500/90">
    </div>
  </a>
</template>
