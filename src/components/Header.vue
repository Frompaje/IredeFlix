<script setup lang="ts">
import { AlignJustify, X } from "lucide-vue-next"
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
];


</script>

<template>
  <header class="p-4 bg-purple-800 text-white w-full lg:flex ">
    <div class="hidden lg:flex ml-4 text-3xl  font-bold">
      <a href="/"><h1>Irede<span class="text-purple-500">Flix</span></h1></a>
      <div v-for="route in routes" :key="route.name" class="ml-5 text-center" >
        <nav class="flex flex-row space-x-4"> 
          <a class="text-lg hover:underline mt-2" :href="route.path"> 
            {{ route.name }}
          </a>
        </nav>
      </div>
    </div>

    <button @click="toggleValue" class="lg:hidden">
      <AlignJustify v-if="!switchMenu" />
      <X v-if="switchMenu" />
    </button>

    <div v-if="switchMenu" class="relative ">
      <div v-for="route in routes" :key="route.name"
        class="z-50 text-xl flex flex-col bg-purple-900 relative right-5 w-screen rounded top-4  pb-2 ">
        <span class="hover:bg-purple-950 p-4 cursos-pointer ">
          <nav class="w-full">
            <a class="pr-50 pt-2  pb-2" :href="route.path">
              {{ route.name }}
            </a>
          </nav>
        </span>

      </div>
    </div>

   

  </header>
</template>
