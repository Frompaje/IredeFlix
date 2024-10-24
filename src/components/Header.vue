<script setup lang="ts">
import { AlignJustify} from "lucide-vue-next";
import { ref } from "vue"



const switchMenu = ref(false)

const toggleValue = () => {
  switchMenu.value = !switchMenu.value
}

const lists = [
  { url: "/home", span: "Home" },
  { url: "/series", span: "Series" },
  { url: "/movies", span: "Movies" }
]
</script>

<template>
 <header  class="p-8 bg-emerald-800 text-white w-full">
  <button @click="toggleValue" > <AlignJustify  /></button>
  <div v-if="switchMenu" >
    <div v-for="list in lists" :key="list.span"  class="text-xl flex flex-col bg-emerald-900 relative right-10 w-screen rounded top-8 "> 
     <span class="hover:bg-emerald-950 p-4 cursos-pointer ">
      <a :href="list.url">{{ list.span }}</a>
    </span>
    </div>
  </div>
  
 </header>
</template>

