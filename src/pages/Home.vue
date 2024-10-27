<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '../components/Button.vue';
import { MoviesService } from '../service/movies';
import { MovieData } from '../types/movies';
import { SeriesService } from '../service/series';
import { SeriesData } from '../types/series';
import MovieCard from '../components/MovieCard.vue';
import SerieCard from '../components/SerieCard.vue';

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
    <div class=" lg:flex flex-col p-2">
    <div class="ml-8 pt-8 lg:flex pb-5">
      <h1 class="font-bold text-white text-2xl ">DISCOVERS</h1>
    </div>

    <div class="flex justify-center items-center space-x-4 "> 
      <div v-for="movie in moviesPopular.slice(5, 8)" :key="movie.id" class="flex flex-col">
        <MovieCard :movie-id="movie.id" :poster_path="movie.poster_path"/>
      </div>
    </div>
  </div>

    <section>
      <div class="ml-8 pt-8 lg:pb-5">
        <h1 class="font-bold text-white text-2xl">POPULAR</h1>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4    lg:items-center lg:justify-center">
        <div v-for="movie in moviesPopular.slice(1, 7)" :key="movie.id">
          <MovieCard :movie-id="movie.id" :poster_path="movie.poster_path"/>
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

      <div class="grid grid-cols-2 gap-4 p-4  flex lg:flex lg:items-center lg:justify-center ">
        <div v-for="movie in moviesPopular.slice(7, 13)" :key="movie.id">
          <MovieCard :movie-id="movie.id" :poster_path="movie.poster_path"/>
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

      <div class="grid grid-cols-2 gap-4 p-4  lg:flex lg:flex lg:items-center lg:justify-center ">
        <div v-for="serie in series.slice(14, 20)" :key="serie.id">
          <SerieCard :serie-id="serie.id" :poster_path="serie.poster_path"/>
        </div>
      </div>
    </section>
  </main>
</template>
