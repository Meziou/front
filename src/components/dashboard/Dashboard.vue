<template>
  <div class="text-5xl mb-10 font-extrabold ...">
    <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
      Dashboard
    </span>
  </div>
  <div class="container mx-auto px-4">
    <div 
      class="flex flex-col gap-5"
      style="@/assets/images/parallax.jpg">
      <ul class="grid grid-rows-3 grid-flow-col gap-10">
        <li 
          v-for="entity in entities" 
          :key="entity.id">
          <div class="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
            <div class="md:flex">
              <div class="md:flex-shrink-0">
                <img 
                  class="h-48 w-full object-cover md:w-48" 
                  src="https://media.istockphoto.com/id/135843207/fr/photo/house-au-cr%C3%A9puscule.jpg?s=612x612&w=0&k=20&c=weaZvHADj7gX_9lCpvSU9o0fxT3FIJW3pEQ4PZxTbgw=" 
                  alt="Card image">
              </div>
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-bold">{{ entity.name }}</div>
                <a 
                  href="#"
                  class="block mt-1 text-l leading-tight font-semibold hover:underline">{{ entity.type }}</a>
                <p class="mt-2 text-gray-500">Value: {{ entity.value }}</p>
                <p class="mt-2 text-gray-500">Status: {{ entity.status }}</p>
              </div>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"

export default {
  name: "Dashboard",
  created() {
    this.getEntities()
  },
  data() {
    return {
      entities: [],
      isLoading: false,
      isError: false
    }
  },
  methods: {
    getEntities() {
      this.isLoading = true 

      coreApi.glados.getEntities()
        .then((entities) => {
          this.entities = entities
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>