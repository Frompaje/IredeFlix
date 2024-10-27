import Home from "../pages/Home.vue";
import Series from "../pages/Series.vue";
import Movies from "../pages/Movies.vue";
import { createRouter, createWebHistory } from "vue-router";
import Favorite from "../pages/Favorite.vue";
import MoviesDetails from "../pages/MoviesDetails.vue";
import SeriesDetails from "../pages/SeriesDetails.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/movies", name: "Movies", component: Movies },
    { path: "/series", name: "Series", component: Series },
    { path: "/movies/:id", component: MoviesDetails, props: true },
    { path: "/series/:id", component: SeriesDetails, props: true },
    { path: "/favorite", name: "Favorite", component: Favorite },
  ]
})
