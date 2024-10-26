<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Youtube, Heart } from "lucide-vue-next";
import { MoviesService } from "../service/movies";
import { MovieData } from "../types/movies";
import { useRoute } from "vue-router";
import Button from "../components/Button.vue";

const movies = ref<MovieData[]>([])
const route = useRoute()


const fetchMovies = async () => {
  try {
    const data = await MoviesService.getMoviesById(Number(route.params.id))
    console.log(data)
    movies.value = [data]
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchMovies)
</script>

<template>
  <main>
    <div class="flex gap-2 justify-center">
      <div v-for="movie in movies" :key="movie.id">
        <div class="w-full flex justify-center items-center">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="">
        </div>

        <div class="flex justify-center flex-col gap-4 items-center p-4">
          <h1 class="font-bold text-black text-2xl">{{ movie.title }}</h1>
          <p class="font-bold  text-wrap">{{ movie.overview }}</p>
          <div class="flex gap-4">
            <Button>
              <Youtube />Trailer
            </Button>
            <Button
              class="bg-transparent text-emerald-900  border-solid border-emerald-500 border-2 hover:bg-emerald-900 hover:text-white hover:border-white">
              <Heart /> Favorite
            </Button>
          </div>
        </div>
      </div>

    </div>

  </main>

</template>
