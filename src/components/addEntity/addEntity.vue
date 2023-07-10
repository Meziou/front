<template>
  <div class="container mx-auto px-4">
    <div class="columns-auto">
      <div class="text-5xl mb-10 font-extrabold ...">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Add new Entity
        </span>
      </div>
      <hr><br>

      <button 
        class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" 
        type="button"
        @click="showAddModal = true">
        Add
      </button><br><br>
      <table class=" table-fixed">
        <thead>
          <tr>
            <th class="px-12 py-8">Name</th>
            <th class="px-12 py-8">Type</th>
            <th class="px-12 py-8">Status</th>
            <th class="px-12 py-8">Value</th>
            <th class="px-12 py-8">Created at:</th>
            <th class="px-12 py-8">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="entity, index in entities" 
            :key="index">
            <td class="px-12 py-8">{{ entity.name }}</td>
            <td class="px-12 py-8">{{ entity.type }}</td>
            <td class="px-12 py-8">{{ entity.status }}</td>
            <td class="px-12 py-8">{{ entity.value }}</td>
            <td class="px-12 py-8">{{ entity.created_at }}</td>
            <td class="px-12 py-8">
              <div class="btn-group">
                <button 
                  class="bg-purple-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded" 
                  type="button">
                  Update
                </button>
                <button 
                  class="bg-red-500 hover:bg-orange-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded m-2" 
                  type="button"
                  @click="deleteEntity(entity.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="max-w-lg mx-auto">
        <div 
          v-if="showAddModal" 
          class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div class="relative bg-white rounded-lg p-8">
            <form 
              @submit.prevent="createEntity" 
              class="space-y-4">
              <div class="text-5xl mb-10 font-extrabold ...">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  Add new Entity
                </span>
              </div>
              <div>
                <label 
                  for="name" 
                  class="block font-semibold text-gray-700">Name</label>
                <input 
                  v-model="newEntity.name" 
                  type="text" 
                  required>
              </div>
              <div>
                <label 
                  for="type" 
                  class="block font-semibold text-gray-700">Type</label>
                <input 
                  v-model="newEntity.type" 
                  type="text" 
                  id="type" 
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
                  required>
              </div>
              <div>
                <label 
                  for="status" 
                  class="block font-semibold text-gray-700">Status</label>
                <input 
                  v-model="newEntity.status" 
                  type="text" 
                  id="status" 
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
                  required>
              </div>
              <div>
                <label 
                  for="value" 
                  class="block font-semibold text-gray-700">Value</label>
                <input 
                  v-model="newEntity.value" 
                  type="text" 
                  id="value" 
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
                  required>
              </div>
              <div>
                <button 
                  type="submit" 
                  class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
                  Add Entity
                </button>
                <button 
                  class="top-2 right-2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded m-2"
                  @click="showAddModal = false">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import coreApi from "@/providers/core-api"
import axios from "axios"

export default {
  name: "addEntity",
  created() {
    this.getEntities()
  },
  data() {
    return {
      showAddModal: false,
      entities: [],
      isLoading: false,
      isError: false,
      newEntity: {
        name: "",
        type: "",
        status: "",
        value: ""
      }
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
    },
    createEntity() {
      const { name, type, status, value } = this.newEntity
      if (!name || !type || !status || !value) {
        console.error("Tous les champs doivent être remplis.")
        return
      }
      const newEntityData = {
        name,
        type,
        status,
        value,
        created_at: new Date().toISOString()
      }
      axios.post("http://localhost:5001/entities", newEntityData)
        .then((response) => {
          console.log("La nouvelle entité a été créée :", response)
          this.newEntity = {
            name: "",
            type: "",
            status: "",
            value: ""
          }
          this.getEntities()
        })
        .catch((error) => {
          console.error("Erreur lors de la création de l'entité :", error)
        })
    },
    deleteEntity(entityId) {
      axios
        .delete(`http://localhost:5001/entities/${entityId}`)
        .then((response) => {
          console.log("L'entité a été supprimée :", response)
          this.getEntities()
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'entité :", error)
        })
    },
  }
}
</script>