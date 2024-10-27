<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { PaginationResponse } from "../types/pagination";
import { SeriesData } from "../types/series";
import Pagination from "../components/Pagination.vue";
import { SeriesService } from "../service/series";
import SerieCard from "../components/SerieCard.vue";

const series = ref<SeriesData[]>([]);
const dataPage = ref<PaginationResponse>({
  page: 1,
  result:[],
  total_pages: 0,
  total_results: 0,
});

const currentPage = ref(1);

const fetchSeries = async () => {
  const data = await SeriesService.listSeries(currentPage.value);
  console.log(data)

  dataPage.value.page = data.page;
  dataPage.value.result = data.results;
  dataPage.value.total_pages = data.total_pages;
  dataPage.value.total_results = data.total_results;
  series.value = data.results;
};

onMounted(fetchSeries);
watch(currentPage, fetchSeries);
</script>

<template>
  <div class="bg-gradient-to-r from-slate-900 to-slate-900 text-white flex flex-col">
    <div class="p-4">
      <h1 class="font-bold text-white text-2xl text-center">TV Series</h1>
      <p class="text-white text-center">Discover the best TV series, latest episodes, and timeless favorites.</p>
    </div>

    <main class="flex-grow p-4">
      <div class="grid grid-cols-2 gap-10 p-10 lg:grid-cols-4">
        <div v-for="serie in series" :key="serie.id">
          <SerieCard :serie-id="serie.id" :poster_path="serie.poster_path"/>
        </div>
      </div>
    </main>

    <footer class="p-4">
      <Pagination :page="dataPage.page" :total_pages="dataPage.total_pages" :total_results="dataPage.total_results"
        @update:page="currentPage = $event" />
    </footer>
  </div>
</template>
