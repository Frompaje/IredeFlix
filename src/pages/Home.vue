<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '../components/Button.vue';
import { MoviesService } from '../service/movies';
import { MovieData } from '../types/movies';
import { Play } from "lucide-vue-next";
import { SeriesService } from '../service/series';
import { SeriesData } from '../types/series';


const moviesPopular = ref<MovieData[]>([])
const series = ref<SeriesData[]>([])

const fetchMovies = async () => {
  const data = await MoviesService.listPopularMovies()
  moviesPopular.value = data.results
};

const fetchSeries = async () => {
  const data = await SeriesService.listSeries()
  series.value = data.results
};

onMounted(fetchSeries)
onMounted(fetchMovies)

</script>

<template>
  <main class="bg-gradient-to-r from-violet-600 to-indigo-600">
    <div v-for="movie in moviesPopular.slice(5, 6)" :key="movie.id">
      <a :href="'movies/' + movie.id">
        <div class="w-full">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            class=" hover:bg-white-500 shadow-lg hover:shadow-purple-500/90">
        </div>

        <div class="flex flex-col items-center relative bottom-24 right-20">
          <a :href="'movies/' + movie.id">
            <Button class="pr-5">About Movie</Button>
          </a>
        </div>
      </a>
    </div>

    <section>
      <div class="ml-8">
        <h1 class="font-bold text-white text-2xl">POPULAR</h1>
      </div>
      <div class="grid grid-cols-2 gap-4 p-4">
        <div v-for="movie in moviesPopular.slice(10, 14)" :key="movie.id">
          <a :href="'movies/' + movie.id">
            <div class="w-full flex justify-center items-center">
              <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
                class="rounded-xl hover:bg-white-500 shadow-lg hover:shadow-purple-500/90">
            </div>
          </a>
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center flex-col w-full gap-2 pt-7">
        <h1 class="font-bold text-white text-2xl">MOVIES</h1>
        <a href="movies/">
          <Button class="pr-5">More movies for you</Button>
        </a>
      </div>
      <div class="grid grid-cols-2 gap-4 p-4">
        <div v-for="movie in moviesPopular.slice(7, 11)" :key="movie.id">
          <a :href="'movies/' + movie.id">
            <div class="w-full flex justify-center items-center ">
              <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
                class="rounded-xl hover:bg-white-500 shadow-lg hover:shadow-purple-500/90">
            </div>
          </a>
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center flex-col w-full gap-2 pt-7">
        <h1 class="font-bold text-white text-2xl">TV SERIES</h1>
        <a href="series/">
          <Button class="pr-5">More series for you</Button>
        </a>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4">
        <div v-for="serie in series.slice(4, 8)" :key="serie.id">
          <a :href="'series/' + serie.id">
            <div class="w-full flex justify-center items-center">
              <img :src="'https://image.tmdb.org/t/p/w300' + serie.poster_path"
                class="rounded-xl hover:bg-white-500 shadow-lg hover:shadow-purple-500/90">
            </div>
          </a>
        </div>
      </div>
    </section>

  </main>
</template>
