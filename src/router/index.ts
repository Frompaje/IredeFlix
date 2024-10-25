import Home from "../pages/Home.vue";
import Series from "../pages/Series.vue";
import Movies from "../pages/Movies.vue";
import MoviesDetails from "../pages/MoviesDetails.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/series", name: "Series", component: Series },
    { path: "/movies", name: "Movies", component: Movies }, 
    { path: "/favorite", name: "Favorite", component: Series },
    { path:"/movies/:id", component: MoviesDetails, props:true}
  ]
})
