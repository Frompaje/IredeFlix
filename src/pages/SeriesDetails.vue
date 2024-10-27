<script setup lang="ts">
import { onMounted, ref } from "vue"
import { House } from "lucide-vue-next"
import { SeriesService } from "../service/series"
import { SeriesData } from "../types/series"
import { useRoute } from "vue-router"
import Button from "../components/Button.vue"

const series = ref<SeriesData[]>([])


let favoritesSeriesId = JSON.parse(localStorage.getItem('favoritos_') || '[]')
const route = useRoute()

const fetchSeries = async () => {
  const data = await SeriesService.getSeriesById(Number(route.params.id))
  series.value = [data];
};

const handleSeriesFavorite = async (data: SeriesData) => {
  const series: SeriesData[] = JSON.parse(localStorage.getItem('favoritos') || '[]');

  const isFavorite = series.some((serie: SeriesData) => serie.id === data.id);
  if (isFavorite) {
    return
  }

  series.push(data);
  localStorage.setItem('favoritos', JSON.stringify(series));
};


function toggleFavorite(data: SeriesData) {
  let series: SeriesData[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
  const hasFavoriteType = favoritesSeriesId.some((value: SeriesData) => value.id === data.id)
  const hasFavoriteContent = series.some((movie: SeriesData) => movie.id === data.id);

  if (hasFavoriteContent && hasFavoriteType) {
    favoritesSeriesId = favoritesSeriesId.filter((value: SeriesData) => value.id !== data.id)
    series = series.filter((value: SeriesData) => value.id !== data.id)


    localStorage.setItem('favoritos_', JSON.stringify(favoritesSeriesId));
    localStorage.setItem('favoritos', JSON.stringify(series));
    window.location.reload()
    return
  }


  favoritesSeriesId.push({ id: data.id, type: "Series" })
  localStorage.setItem('favoritos_', JSON.stringify(favoritesSeriesId));
  window.location.reload()
}

const hasFavoriteId = favoritesSeriesId.some((favorite: { id: number }) => favorite.id === Number(route.params.id))

onMounted(fetchSeries)
</script>

<template>
  <main>
    <div class="flex gap-2 justify-center bg-gradient-to-r from-slate-900 
    to-slate-900 text-white min-h-svh lg:justify-center w-full">

      <div v-for="serie in series" :key="serie.id" class="flex flex-col lg:flex-row items-center lg:gap-8">
        <div class="flex justify-center w-full ">
          <img :src="'https://image.tmdb.org/t/p/w500' + serie.poster_path" class="w-[40rem] h-[36rem] rounded-xl">
        </div>

        <div class="flex flex-col gap-4 items-center lg:items-start lg:pl-5 w-full lg:w-1/2">
          <h1 class="font-bold text-2xl text-white">{{ serie.original_name }}</h1>
          <span class="text-xl">Genre: {{ serie.type }}</span>
          <div class="flex flex-col gap-2 text-xl items-center lg:items-start">
            <span>Total Seasons: {{ serie.number_of_seasons }}</span>
            <span>Total Episodes: {{ serie.number_of_episodes }}</span>
          </div>
          <div class="flex gap-4">
            <a :href="serie.homepage" target="_blank">
              <Button>
                <House />Homepage
              </Button>
            </a>

            <div @click="() => toggleFavorite(serie)"
              class="bg-transparent text-emerald-900 hover:text-white hover:border-white">
              <Button class="flex" @click="() => handleSeriesFavorite(serie)">
                {{ hasFavoriteId ? "Remove" : "Favorite" }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
