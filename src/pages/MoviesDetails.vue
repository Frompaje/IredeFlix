<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Youtube } from "lucide-vue-next";
import { MoviesService } from "../service/movies";
import { MovieData } from "../types/movies";
import { useRoute } from "vue-router";
import Button from "../components/Button.vue";

const movies = ref<MovieData[]>([]);
let favoritesMoviesId = JSON.parse(localStorage.getItem('favoritos_') || '[]');
const linkTrailer = ref();
const route = useRoute();

const fetchMovies = async () => {
  const data = await MoviesService.getMoviesById(Number(route.params.id));
  movies.value = [data];
};

const handleTrailer = async () => {
  const data = await MoviesService.trailer(Number(route.params.id));

  linkTrailer.value = data.results[0].key;

  window.open(`https://www.youtube.com/watch?v=${linkTrailer.value}`, "_blank");
};

const handleMovieFavorite = async (data: MovieData) => {
  const movies: MovieData[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
  const isFavorite = movies.some((movie: MovieData) => movie.id === data.id);

  if (isFavorite) {
    return
  }

  movies.push(data);
  localStorage.setItem('favoritos', JSON.stringify(movies));
};


function toggleFavorite(data: MovieData) {

  if (favoritesMoviesId.includes(data.id)) {
    const updatedFavoriteId = favoritesMoviesId.filter((id: number) => id !== data.id);
    const updatedFavoriteMovies = movies.value.filter((movie) => movie.id !== data.id)

    localStorage.setItem("favoritos_", JSON.stringify({id:updatedFavoriteMovies, type:"Movie"}))
    localStorage.setItem("favoritos", JSON.stringify(updatedFavoriteId))
    window.location.reload()
    return
  }

  favoritesMoviesId.push({ id: data.id, type: "Movies" })
  localStorage.setItem('favoritos_', JSON.stringify(favoritesMoviesId));

  window.location.reload()

}



const hasFavoriteId = favoritesMoviesId.some((favorite: { id: number }) => favorite.id === Number(route.params.id))

onMounted(fetchMovies);
</script>

<template>
  <main>
    <div class="flex gap-2 justify-center bg-gradient-to-r from-slate-900 to-slate-900 text-white  ">
      <div v-for="movie in movies" :key="movie.id" class="lg:flex lg:h-screen lg:w-2/3">
        <div class="w-full flex justify-center items-center">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="">
        </div>

        <div class="flex justify-center flex-col gap-4 items-center p-4">
          <h1 class="font-bold text-2xl text-white">{{ movie.title }}</h1>
          <p class="font-bold text-wrap">{{ movie.overview }}</p>
          <div class="flex gap-4">
            <Button @click="handleTrailer">
              <Youtube />Trailer
            </Button>
            <div @click="() => toggleFavorite(movie)"
              class="bg-transparent text-emerald-900  hover:text-white hover:border-white">
              <Button class="flex" @click="() => handleMovieFavorite(movie)">
                {{ hasFavoriteId ? "Remove" : "Favorite" }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
