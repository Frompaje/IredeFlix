<script setup lang="ts">
import { AlignJustify, X } from "lucide-vue-next";
import { ref } from "vue"



const switchMenu = ref(false)

const toggleValue = () => {
  switchMenu.value = !switchMenu.value
}

const lists = [
  { path: "/home", span: "Home" },
  { path: "/series", span: "Series" },
  { path: "/movies", span: "Movies" }
]
</script>

<template>
 <header  class="p-8 bg-emerald-800 text-white w-full">
  
  <button @click="toggleValue" > 
    <AlignJustify  v-if="!switchMenu" /> 
    <X v-if="switchMenu"/>
  </button>
  <div v-if="switchMenu" class="absolute ">
    <div v-for="list in lists" :key="list.span"  class="text-xl flex flex-col bg-emerald-900 relative right-10 w-screen rounded top-8 "> 
     <span class="hover:bg-emerald-950 p-4 cursos-pointer w-full">
      <nav>
        
        <a class="pr-56 pt-4 pb-4 " :href="list.path">{{ list.span }}</a>
      </nav>
    </span>
    </div>
  </div>
  
 </header>
</template>

