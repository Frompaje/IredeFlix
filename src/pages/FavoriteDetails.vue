<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Youtube } from "lucide-vue-next";
import { MoviesService } from "../service/movies";
import { MovieData } from "../types/movies";
import { useRoute, useRouter } from "vue-router";
import Button from "../components/Button.vue";

const movies = ref<MovieData[]>([]);
const favoritesMoviesId = ref<number[]>(JSON.parse(localStorage.getItem('favoritos_') || '[]'));

const linkTrailer = ref();
const route = useRoute();
const redirect = useRouter();

const fetchMovies = async () => {
  const data = await MoviesService.getMoviesById(Number(route.params.id));
  movies.value = [data];
};

const handleTrailer = async () => {
  const data = await MoviesService.trailer(Number(route.params.id));
  linkTrailer.value = data.results[0].key;
  window.open(`https://www.youtube.com/watch?v=${linkTrailer.value}`, "_blank");
};


const removeFavorite = (data: MovieData) => {
  favoritesMoviesId.value = favoritesMoviesId.value.filter((id: number) => id !== data.id);

  const updatedFavoriteMovies = JSON.parse(localStorage.getItem('favoritos') || '[]').filter((movie: MovieData) => movie.id !== data.id);


  localStorage.setItem("favoritos_", JSON.stringify(favoritesMoviesId.value));
  localStorage.setItem("favoritos", JSON.stringify(updatedFavoriteMovies));

  redirect.push("/favorite");
};

onMounted(fetchMovies);
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
          <p class="font-bold text-wrap">{{ movie.overview }}</p>
          <div class="flex gap-4">
            <Button @click="handleTrailer">
              <Youtube />Trailer
            </Button>
            <div @click="() => removeFavorite(movie)"
              class="bg-transparent text-emerald-900 hover:text-white hover:border-white">
              <Button class="flex">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
