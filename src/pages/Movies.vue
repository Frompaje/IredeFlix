<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { MoviesService } from "../service/movies";
import { Play } from "lucide-vue-next";
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
  <main>
    <div v-for="movie in movies.slice(0)" :key="movie.id" >
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
  </main>
  <footer>
    <Pagination :page="dataPage.page" :total_pages="dataPage.total_pages" :total_results="dataPage.total_results"
      @update:page="currentPage = $event" />
  </footer>
</template>
