import Home from "../pages/Home.vue";
import Series from "../pages/Series.vue";
import Movies from "../pages/Movies.vue";
import MoviesDetails from "../pages/MoviesDetails.vue";
import { createRouter, createWebHistory } from "vue-router";
import Favorite from "../pages/Favorite.vue";
import FavoriteDetails from "../pages/FavoriteDetails.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/series", name: "Series", component: Series },
    { path: "/movies", name: "Movies", component: Movies },
    { path: "/movies/:id", component: MoviesDetails, props: true },
    { path: "/favorite", name: "Favorite", component: Favorite },
    { path: "/favorite/:id", component: FavoriteDetails },
  ]
})
