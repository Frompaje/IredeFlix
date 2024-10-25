<script setup lang="ts">
import Header from '../components/Header.vue';
import { onMounted, ref } from "vue";
import { Play } from "lucide-vue-next";
import { MovieData } from "../types/movies";
import { SeriesService } from '../service/series';


const series = ref<MovieData[]>([])
const fetchMovies = async () => {
  try {
    const data = await SeriesService.listSeries()
    series.value = data.results
  } catch (error) {
    console.log(error)
  }

}
onMounted(fetchMovies)
</script>

<template>
  <main>
    <div class="flex justify-center p-4">
      <h1 class="font-bold text-black text-2xl">Destaque da <span class="text-emerald-700">Semana!</span></h1>
    </div>

    <div class="flex gap-4 p-3">
      <div v-for="serie in series.slice(0, 3)" :key="serie.id">
        <div class="w-full flex justify-center pb-4 pt-4 items-center ">
          <img :src="'https://image.tmdb.org/t/p/w200' + serie.poster_path" alt="" class="rounded-xl">
        </div>

        <div class="flex flex-col  items-center  ">
          <div
            class="relative bottom-10 left-0 rounded-full bg-emerald-500 p-2 cursor-pointer transition ease-in-out duration-2000 hover:bg-emerald-800">
            <Play class="text-white" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center p-4">
      <h1 class="font-bold text-black text-2xl">Assista Também!</h1>
    </div>
    <div v-for="serie in series.slice(4, 19)" :key="serie.id">
      <div class="w-full flex justify-center pb-4 pt-4 items-center  ">
        <img :src="'https://image.tmdb.org/t/p/w200' + serie.poster_path" alt="" class="rounded-xl">

      </div>

      <div class="flex flex-col  items-center  ">
        <div
          class="relative bottom-10 left-0 rounded-full bg-emerald-500 p-2 cursor-pointer transition ease-in-out duration-2000 hover:bg-emerald-800">
          <Play class="text-white" />
        </div>
      </div>
    </div>
  </main>

</template>
