<script setup lang="ts">
import { AlignJustify, X } from "lucide-vue-next";

import { ref } from "vue"

const switchMenu = ref(false)

const toggleValue = () => {
  switchMenu.value = !switchMenu.value
}
const routes = [
  { path: "/", name: "Home" },
  { path: "/series", name: "Series" },
  { path: "/movies", name: "Movies" },
  { path: "/favorite", name: "Favorite" }
]

</script>

<template>
  <header class="p-4 bg-purple-800 text-white w-full">
    <button @click="toggleValue">
      <AlignJustify v-if="!switchMenu" />
      <X v-if="switchMenu" />
    </button>


    <div v-if="switchMenu" class="absolute">

      <div v-for="route in routes" :key="route.name"
        class="z-50 text-xl flex flex-col bg-purple-900 relative right-5 w-screen rounded top-4 ">
        <span class="hover:bg-purple-950 p-4 cursos-pointer w-full">
          <nav>
            <a class="pr-50 pt-2 pb-2" :href="route.path">
              {{ route.name }}
            </a>
          </nav>
        </span>
      </div>


    </div>
  </header>
</template>
