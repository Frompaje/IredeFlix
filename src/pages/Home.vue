<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '../components/Button.vue';
import { MoviesService } from '../service/movies';
import { MovieData } from '../types/movies';
import { SeriesService } from '../service/series';
import { SeriesData } from '../types/series';


const moviesPopular = ref<MovieData[]>([])
const series = ref<SeriesData[]>([])

const fetchMovies = async () => {
  const data = await MoviesService.listPopularMovies()
  moviesPopular.value = data.results
};

const fetchSeries = async () => {
  const data = await SeriesService.listSeries(3)
  series.value = data.results
};

onMounted(fetchSeries)
onMounted(fetchMovies)

</script>

<template>
  <main class="bg-gradient-to-r from-slate-900 to-slate-900 text-white">
    
    <div class="hidden lg:flex flex-col">
    <div class="ml-8 pt-8 lg:flex pb-5">
      <h1 class="font-bold text-white text-2xl ">DISCOVERS</h1>
    </div>
    <div class="flex justify-center items-center space-x-4 "> 
      <div v-for="movie in moviesPopular.slice(5, 8)" :key="movie.id" class="flex flex-col">
        <a :href="'movies/' + movie.id">
          <div class="lg:p-8">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              class="hover:bg-white-500 shadow-lg hover:shadow-purple-500/90 w-full lg:rounded-2xl lg:object-cover ">
          </div>
        </a>
      </div>
    </div>
  </div>

    <section>
      <div class="ml-8 pt-8 lg:pb-5">
        <h1 class="font-bold text-white text-2xl">POPULAR</h1>
      </div>
      <div class="grid grid-cols-2 gap-4 p-4  lg:hidden">
        <div v-for="movie in moviesPopular.slice(1, 3)" :key="movie.id">
          <a :href="'movies/' + movie.id">
            <div class="w-full flex justify-center items-center">
              <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
                class="rounded-xl hover:bg-white-300 shadow-lg hover:shadow-purple-500/90">
            </div>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4 hidden lg:flex lg:flex lg:items-center lg:justify-center">
        <div v-for="movie in moviesPopular.slice(1, 7)" :key="movie.id">
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
      <div class="flex items-center flex-col w-full gap-2 pt-7 lg:pb-5">
        <h1 class="font-bold text-white text-2xl">MOVIES</h1>
        <a href="movies/">
          <Button class="pr-5">More movies for you</Button>
        </a>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4 lg:hidden">
        <div v-for="movie in moviesPopular.slice(7, 11)" :key="movie.id">
          <a :href="'movies/' + movie.id">
            <div class="w-full flex justify-center items-center ">
              <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
                class="rounded-xl hover:bg-white-300 shadow-lg hover:shadow-purple-500/90">
            </div>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4 hidden lg:flex lg:flex lg:items-center lg:justify-center ">
        <div v-for="movie in moviesPopular.slice(7, 13)" :key="movie.id">
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
      <div class="flex items-center flex-col w-full gap-2 pt-7 lg:pb-5">
        <h1 class="font-bold text-white text-2xl">TV SERIES</h1>
        <a href="series/">
          <Button class="pr-5">More series for you</Button>
        </a>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4 lg:hidden">
        <div v-for="serie in series.slice(14, 18)" :key="serie.id">
          <a :href="'series/' + serie.id">
            <div class="w-full flex justify-center items-center">
              <img :src="'https://image.tmdb.org/t/p/w300' + serie.poster_path"
                class="rounded-xl hover:bg-white-300 shadow-lg hover:shadow-purple-500/90">
            </div>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4 hidden lg:flex lg:flex lg:items-center lg:justify-center ">
        <div v-for="serie in series.slice(14, 20)" :key="serie.id">
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
