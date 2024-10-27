<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  serieId: {
    type: Number,
  },
  poster_path: {
    type: String
  }
});

</script>

<template>
  <a :href="'series/' + props.serieId">
    <div class="w-full flex justify-center items-center">
      <img :src="'https://image.tmdb.org/t/p/w300' + props.poster_path"
        class="rounded-xl hover:bg-white-500 shadow-lg hover:shadow-purple-500/90">
    </div>
  </a>
</template>
