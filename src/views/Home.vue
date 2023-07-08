<template>
  <div class="flex flex-col items-center gap-5 h-full">
    <Header />
    <div class="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md shadow-lg px-5 py-10 w-full flex-1 bg-clip-border p-6 border-4 border-violet-400 border-dashed">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/navigations/Header.vue"

export default {
  name: "Home",
  components: { Header } 
}
</script>