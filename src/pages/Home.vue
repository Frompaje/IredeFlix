<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '../components/Button.vue';
import { MoviesService } from '../service/movies';
import { MovieData } from '../types/movies';
import { Play } from "lucide-vue-next";


const moviesPopular = ref<MovieData[]>([])

const fetchMovies = async () => {
  const data = await MoviesService.listPopularMovies()
  moviesPopular.value = data.results
};

onMounted(fetchMovies)

</script>

<template>
  <main class="bg-gradient-to-r from-violet-600 to-indigo-600">
    <div>
      <img :src="'https://image.tmdb.org/t/p/w500' + '/Oqlmo1bhDQWWBPrMxMauuHL7y7.jpg'">
      <div class="relative bottom-28 left-3">
        <h1 class="font-bold text-white text-2xl">The Demon</h1>
        <a :href="'movies/' + 1128941">
          <Button class="pr-5">About Movie</Button>
        </a>
      </div>
    </div>
    
    <section>
      <div class="ml-8">
        <h1 class="font-bold text-white text-2xl">POPULAR</h1>
      </div>

      <div v-for="movie in moviesPopular.slice(1, 3)" :key="movie.id">
        <a :href="'movies/' + movie.id">
          <div class="w-full flex justify-center pb-4 pt-4 items-center ">
            <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" class="rounded-xl">
          </div>

          <div class="flex flex-col items-center">
            <span
              class="relative bottom-10 left-0 rounded-full bg-purple-500 p-2 cursor-pointer transition ease-in-out duration-2000 hover:bg-purple-800">
              <Play class="text-white" />
            </span>
          </div>

        </a>
      </div>
    </section>

  </main>
</template>
