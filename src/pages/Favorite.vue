<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MovieData } from '../types/movies'
import { SeriesData } from '../types/series'
import { FavoriteItem } from '../types/favorite'
import FavoriteCard from '../components/FavoriteCard.vue'

const items = ref<(MovieData | SeriesData)[]>([])
const favorites = JSON.parse(localStorage.getItem('favoritos') || '[]');
const favoritesType: FavoriteItem[] = JSON.parse(localStorage.getItem('favoritos_') || '[]');

const listAllFavorites = async () => {
  favorites.forEach((data: MovieData | SeriesData) => items.value.push(data));
}

const isTypeOfMovie = (id: number) => {
  const favoriteItem = favoritesType.find((item) => item.id === id);
  return favoriteItem ? favoriteItem.type === 'Movies' : false;
}

onMounted(listAllFavorites)
</script>

<template>
  <div class="bg-gradient-to-r from-slate-900 to-slate-900 min-h-screen">
    <div class="flex justify-center p-4">
      <h1 v-if="items.length === 0" class="font-bold text-white text-2xl text-center">
        That's odd! It looks like you don't have any favorite movies or series.
        <span class="text-purple-500">Let's fix that!</span>
        I recommend watching the movie <span class="text-purple-500">The Prestige.</span>
      </h1>

      <h1 v-else class="font-bold text-white text-2xl text-center">
        Here are your favorite <span class="text-purple-500">movies</span> and <span
          class="text-purple-500">series!</span>
      </h1>
    </div>

    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
      <div v-for="item in items" :key="item.id">
        <FavoriteCard :is-type-of-movie="isTypeOfMovie(item.id)" :itemId="item.id" :poster_path="item.poster_path"/>
      </div>
    </div>
  </div>
</template>
