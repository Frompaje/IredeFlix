<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { MoviesService } from "../service/movies";
import { MovieData } from "../types/movies";
import { PaginationResponse } from "../types/pagination";
import Pagination from "../components/Pagination.vue";

const movies = ref<MovieData[]>([])
const dataPage = ref<PaginationResponse>({
  page: 1,
  result: movies.value,
  total_pages: 0,
  total_results: 0,
});

const currentPage = ref(1)

const fetchMovies = async () => {
  const data = await MoviesService.listMovies(currentPage.value)
  dataPage.value.page = data.page
  dataPage.value.result = data.results
  dataPage.value.total_pages = data.total_pages
  dataPage.value.total_results = data.total_results
  console.log(data.results)
  movies.value = data.results
};

onMounted(fetchMovies)
watch(currentPage, fetchMovies)
</script>

<template>
  <div class="bg-gradient-to-r from-slate-900 to-slate-900 text-white">
    <div class="p-4">
      <h1 class="font-bold text-white text-2xl text-center">Movies</h1>
      <p class="text-white text-center">Discover the most popular movies, new releases, and classics.</p>
    </div>

    <main>
      <div class="grid grid-cols-2 gap-2 p-2  lg:grid-cols-4">
        <div v-for="movie in movies.slice(0)" :key="movie.id">
          <a :href="'movies/' + movie.id">
            <div class="w-full flex justify-center ">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                class="rounded-xl hover:bg-white-500 shadow-lg hover:shadow-purple-500/90">
            </div>
          </a>
        </div>
      </div>

    </main>

    <footer>
      <Pagination  :page="dataPage.page" :total_pages="dataPage.total_pages" :total_results="dataPage.total_results"
        @update:page="currentPage = $event" />
    </footer>
  </div>
</template>
