<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { MovieData } from '../types/movies';
import { Play } from "lucide-vue-next";

const movies = ref<MovieData[]>([])

const listAllFavorite = async () => {
  const favorite: MovieData[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
  favorite.forEach((data) => movies.value.push(data))
};

onMounted(listAllFavorite)
</script>

<template>
  <div class="flex justify-center p-4">
    <h1 class="font-bold text-black text-2xl">Destaque da<span class="text-emerald-700">Semana!</span></h1>
  </div>
  <div class="flex gap-2 justify-center p-4">
    <div v-for="movie in movies.slice(0, 2)" :key="movie.id">
      <a :href="'favorite/' + movie.id">
        <div class="w-full flex justify-center pb-4 pt-4 items-center ">
          <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="" class="rounded-xl">
        </div>

        <div class="flex flex-col  items-center ">
          <span
            class="relative bottom-10 left-0 rounded-full bg-emerald-500 p-2 cursor-pointer transition ease-in-out duration-2000 hover:bg-emerald-800">
            <Play class="text-white" />
          </span>
        </div>
      </a>
    </div>
  </div>
</template>
