<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { MovieData } from '../types/movies';
import { Play } from "lucide-vue-next";

const movies = ref<MovieData[]>([])
const favorite: MovieData[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
console.log(favorite.length)
const listAllFavorite = async () => {
  favorite.forEach((data) => movies.value.push(data))
};

onMounted(listAllFavorite)
</script>

<template>
  <div class="bg-gradient-to-r from-slate-900 to-slate-900  h-screen ">
    <div class="flex justify-center p-4">
      <h1 v-if="favorite.length === 0" class="font-bold text-white text-2xl text-center">
        That's odd! It looks like you don't have any favorite movies or series.
        <span class="text-purple-500">Let's fix that!</span>
        I recommend watching the movie <span class="text-purple-500">The Prestige.</span>
      </h1>

      <h1 v-else class="font-bold text-white text-2xl text-center">
        Here are your favorite <span class="text-purple-500">movies</span> and <span
          class="text-purple-500">series!</span>
      </h1>
    </div>

    <div class="grid grid-cols-2 gap-4 p-4">
      <div v-for="movie in movies.slice(0)" :key="movie.id">
        <a :href="'favorite/' + movie.id">
          <div class="w-full flex justify-center  items-center">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              class="rounded-xl hover:bg-white-500 shadow-lg hover:shadow-purple-500/90">
          </div>
        </a>
      </div>
    </div>

  </div>
</template>
