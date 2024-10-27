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
  const seriesList: SeriesData[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
  const isFavorite = seriesList.some((serie: SeriesData) => serie.id === data.id)

  if (isFavorite) {
    return
  }

  seriesList.push(data)
  localStorage.setItem('favoritos', JSON.stringify(seriesList))
};


function toggleFavorite(data: SeriesData) {

  if (favoritesSeriesId.some((favorite: { id: number }) => favorite.id === data.id)) {
    const updatedFavoriteSeries = series.value.filter((serie) => serie.id !== data.id)

    localStorage.setItem("favoritos_", JSON.stringify(updatedFavoriteSeries))
    localStorage.setItem("favoritos", JSON.stringify(updatedFavoriteSeries))
    window.location.reload()
    return
  }

  favoritesSeriesId.push({ id: data.id, type: "Series" })
  localStorage.setItem('favoritos_', JSON.stringify(favoritesSeriesId))

  window.location.reload()
}


const redirectToHomepage = (url: string) => {
  window.open(url, '_blank')
}

const hasFavoriteId = favoritesSeriesId.some((favorite: { id: number }) => favorite.id === Number(route.params.id))


onMounted(fetchSeries)
</script>

<template>
  <main>
    <div class="flex gap-2 justify-center bg-gradient-to-r from-slate-900 to-slate-900 text-white min-h-svh">
      <div v-for="serie in series" :key="serie.id">
        <div class="w-full flex justify-center items-center">
          <img :src="'https://image.tmdb.org/t/p/w500' + serie.poster_path">
        </div>

        <div class="flex flex-col gap-4 items-center pt-5">
          <h1 class="font-bold text-2xl text-white">{{ serie.original_name }}</h1>
          <span class="text-xl">Genre: {{ serie.type }}</span>
          <div class="flex flex-col gap-2 text-xl items-center">
            <span>Total Seasons: {{ serie.number_of_seasons }}</span>
            <span>Total Episodes: {{ serie.number_of_episodes }}</span>
          </div>
          <div class="flex gap-4">
            <Button @click="redirectToHomepage(serie.homepage)">
              <House />Homepage
            </Button>

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
