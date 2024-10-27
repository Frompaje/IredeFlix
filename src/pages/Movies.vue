<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { MoviesService } from "../service/movies";
import { Play } from "lucide-vue-next";
import { MovieData } from "../types/movies";
import Pagination from "../components/Pagination.vue";
import { PaginationResponse } from "../types/pagination";

const movies = ref<MovieData[]>([]);
const dataPage = ref<PaginationResponse>({
  page: 1,
  result: movies.value,
  total_pages: 0,
  total_results: 0,
});
const currentPage = ref(1);

const fetchMovies = async () => {
  const data = await MoviesService.listMovies(currentPage.value); // Passa a página atual
  dataPage.value.page = data.page;
  dataPage.value.result = data.results;
  dataPage.value.total_pages = data.total_pages;
  dataPage.value.total_results = data.total_results;

  movies.value = data.results;
};

onMounted(fetchMovies);

// Atualiza a lista de filmes sempre que currentPage mudar
watch(currentPage, fetchMovies);
</script>

<template>
  <main>
    <div class="flex justify-center p-4">
      <h1 class="font-bold text-black text-2xl">Destaque da <span class="text-emerald-700">Semana!</span></h1>
    </div>
    <div class="flex gap-2 justify-center p-4">
      <div v-for="movie in movies.slice(0, 2)" :key="movie.id">
        <a :href="'movies/' + movie.id">
          <div class="w-full flex justify-center pb-4 pt-4 items-center ">
            <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="" class="rounded-xl">
          </div>
          <div class="flex flex-col items-center">
            <span
              class="relative bottom-10 left-0 rounded-full bg-emerald-500 p-2 cursor-pointer transition ease-in-out duration-2000 hover:bg-emerald-800">
              <Play class="text-white" />
            </span>
          </div>
        </a>
      </div>
    </div>

    <div class="flex justify-center p-4">
      <h1 class="font-bold text-black text-2xl">Assista Também!</h1>
    </div>
    <div v-for="movie in movies.slice(4, 19)" :key="movie.id" class="w-full flex justify-center pb-4 pt-4 items-center">
      <button>
        <div>
          <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="" class="rounded-xl">
        </div>
        <div class="flex flex-col items-center">
          <div class="relative bottom-10 left-0 rounded-full bg-emerald-500 p-2 cursor-pointer transition ease-in-out duration-2000 hover:bg-emerald-800">
            <Play class="text-white" />
          </div>
        </div>
      </button>
    </div>
  </main>
  <footer>
    <Pagination 
      :page="dataPage.page" 
      :total_pages="dataPage.total_pages" 
      :total_results="dataPage.total_results"
      @update:page="currentPage = $event" />
  </footer>
</template>
