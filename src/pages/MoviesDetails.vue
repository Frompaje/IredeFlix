<script setup lang="ts">
import { onMounted, ref, toValue } from "vue";
import { Youtube, Heart, X } from "lucide-vue-next";
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
  console.log(favoritesMoviesId)

  if (favoritesMoviesId.includes(data.id)) {
    const updatedFavoriteId = favoritesMoviesId.filter((id: number) => id !== data.id);
    const updatedFavoriteMovies = movies.value.filter((movie) => movie.id !== data.id)
    
    localStorage.setItem("favoritos_", JSON.stringify(updatedFavoriteMovies))
    localStorage.setItem("favoritos", JSON.stringify(updatedFavoriteId))
    window.location.reload()
    return
  }

  favoritesMoviesId.push(data.id)
  localStorage.setItem('favoritos_', JSON.stringify(favoritesMoviesId));

  window.location.reload()
  
}
console.log(favoritesMoviesId)
const hasFavoriteId = favoritesMoviesId.includes(Number(route.params.id))

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
            <div @click="() => toggleFavorite(movie)"
              class="bg-transparent text-emerald-900  hover:text-white hover:border-white">
              <Button class="flex" @click="() => handleMovieFavorite(movie)">
               {{ hasFavoriteId? "Remove" :"Favorite" }} 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
