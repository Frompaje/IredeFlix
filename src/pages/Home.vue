<script setup lang="ts">

import { onMounted, ref } from "vue";
import { Heart } from "lucide-vue-next";
import { Star } from "lucide-vue-next";
import { MoviesService } from "../service/movies";
import { MovieData } from "../types/movies";

const movies = ref<MovieData[]>([])
const urlImg = ref([])
const fetchMovies = async () => {
  try {
    const data = await MoviesService.listMovies()
    movies.value = data.results
    console.log(movies.value)
  } catch (error) {
    console.log(error)
  }

  
}
onMounted(fetchMovies)
</script>

<template>
  <div v-for="movie in movies" :key="movie.id" >
    <div class="w-ful flex justify-center pb-4 pt-4 items-center">
      <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="" class="rounded">
    </div>

    <div class="flex flex-col  items-center ">
      <h1 class="font-bold">{{ movie.title }}</h1>
      <div class="flex justify-between gap-4">
        <span>{{ movie.release_date.slice(0,4)}}</span>
        <div>
      <Heart />
        </div>
      </div>

    </div>
  </div>
</template>

