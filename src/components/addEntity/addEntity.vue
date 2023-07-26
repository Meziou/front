<template>
  <div class="container mx-auto px-4 md:container lg:px-8">
    <div class="columns-auto">
      <div class="text-5xl mb-10 font-extrabold ...">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Add new Entity
        </span>
      </div>
      <hr><br>

      <button 
        class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded md:w-auto"
        type="button"
        @click="showAddModal = true">
        Add
      </button><br><br>
      <table class=" table-fixed">
        <thead>
          <tr>
            <th class="px-12 py-8 md:px-6">Name</th>
            <th class="px-12 py-8 md:px-6">Type</th>
            <th class="px-12 py-8 md:px-6">Status</th>
            <th class="px-12 py-8 md:px-6">Value</th>
            <th class="px-12 py-8 md:px-6">Created at:</th>
            <th class="px-12 py-8 md:px-6">Room</th>
            <th class="px-12 py-8 md:px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="entity, index in entities" 
            :key="index">
            <td class="px-12 py-8 md:px-6">{{ entity.name }}</td>
            <td class="px-12 py-8 md:px-6">{{ entity.type }}</td>
            <td class="px-12 py-8 md:px-6">{{ entity.status }}</td>
            <td class="px-12 py-8 md:px-6">{{ entity.value }}</td>
            <td class="px-12 py-8 md:px-6">{{ entity.created_at }}</td>
            <td class="px-12 py-8 md:px-6">{{ entity.room }}</td> 
            <td class="px-12 py-8 md:px-6">
              <div class="btn-group">
                <button 
                  class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded md:w-auto"
                  type="button"
                  @click="openUpdateForm(entity)">
                  Update
                </button>
                <button 
                  class="bg-red-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded md:w-auto"
                  type="button"
                  @click="deleteEntity(entity.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="max-w-lg mx-auto md:my-4">
        <div 
          v-if="showAddModal" 
          class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div class="relative bg-white rounded-lg p-8 md:max-w-sm">
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
                <label 
                  for="room" 
                  class="block font-semibold text-gray-700">Room</label>
                <input 
                  v-model="newEntity.room"
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
        <div 
          v-if="isUpdateFormVisible" 
          class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div class="relative bg-white rounded-lg p-8">
            <h2 class="text-xl font-bold mb-4">Update Entity</h2>
            <form 
              @submit.prevent="updateEntity" 
              class="space-y-4">
              <div>
                <label 
                  for="update-name" 
                  class="block font-semibold text-gray-700">Name</label>
                <input 
                  v-model="updateEntityData.name" 
                  type="text" 
                  id="update-name" 
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
                  required>
              </div>
              <div>
                <label 
                  for="update-type" 
                  class="block font-semibold text-gray-700">Type</label>
                <input 
                  v-model="updateEntityData.type" 
                  type="text" 
                  id="update-type" 
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
                  equired>
              </div>
              <div>
                <label 
                  for="update-status" 
                  class="block font-semibold text-gray-700">Status</label>
                <input 
                  v-model="updateEntityData.status" 
                  type="text" 
                  id="update-status" 
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
                  required>
              </div>
              <div>
                <label 
                  for="update-value" 
                  class="block font-semibold text-gray-700">Value</label>
                <input 
                  v-model="updateEntityData.value" 
                  type="text" 
                  id="update-value" 
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
                  required>
              </div>
              <div>
                <label 
                  for="update-value" 
                  class="block font-semibold text-gray-700">Room</label>
                <input 
                  v-model="updateEntityData.room" 
                  type="text" 
                  id="update-value" 
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" 
                  required>
              </div>
              <div>
                <button 
                  type="submit" 
                  class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">Update Entity</button>
                <button 
                  type="button" 
                  class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ml-4"
                  @click="cancelUpdate">Cancel</button>
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

export default {
  name: "addEntity",
  created() {
    this.getEntities()
    this.getRooms()
  },
  data() {
    return {
      showAddModal: false,
      entities: [],
      rooms: [],
      isLoading: false,
      isError: false,
      newEntity: {
        name: "",
        type: "",
        status: "",
        value: ""
      },
      isUpdateFormVisible: false,
      updateEntityData: {
        id: null,
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
    getRooms() {
      // Méthode pour récupérer la liste des chambres depuis l'API
      this.isLoading = true 
      coreApi.glados.getRooms()
        .then((rooms) => {
          this.rooms = rooms
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
      const {
        name, type, status, value, room
      } = this.newEntity
      if (!name || !type || !status || !value || !room) {
        console.error("Tous les champs doivent être remplis.")
        return
      }
      const newEntityData = {
        name,
        type,
        status,
        value,
        room,
        created_at: new Date().toISOString()
      }
      console.log(coreApi.glados)
      coreApi.glados.createEntity(newEntityData)
        .then((response) => {
          console.log("La nouvelle entité a été créée :", response)
          this.newEntity = {
            name: "",
            type: "",
            status: "",
            value: "",
            room: ""
          }
          this.getEntities()
          this.showAddModal = false
        })
        .catch((error) => {
          console.error("Erreur lors de la création de l'entité :", error)
        })
    },
    updateEntity() {
      const {
        id, name, type, status, value
      } = this.updateEntityData
      if (!name || !type || !status || !value) {
        console.error("Tous les champs doivent être remplis.")
        return
      }
      const updatedEntityData = {
        id,
        name,
        type,
        status,
        value,
        updated_at: new Date().toISOString()
      }
      coreApi.glados.updateEntity(id, updatedEntityData)
        .then((response) => {
          console.log("L'entité a été mise à jour :", response)
          this.isUpdateFormVisible = false
          this.updateEntityData = {
            id: null,
            name: "",
            type: "",
            status: "",
            value: "",
            room: ""
          }
          this.getEntities()
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour de l'entité :", error)
        })
    },
    deleteEntity(entityId) {
      coreApi.glados.deleteEntity(entityId)
        .then((response) => {
          console.log("L'entité a été supprimée :", response)
          this.getEntities()
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'entité :", error)
        })
    },
    openUpdateForm(entity) {
      this.isUpdateFormVisible = true
      this.updateEntityData = {
        id: entity.id,
        name: entity.name,
        type: entity.type,
        status: entity.status,
        value: entity.value
      }
    },
    cancelUpdate() {
      this.isUpdateFormVisible = false
      this.updateEntityData = {
        id: null,
        name: "",
        type: "",
        status: "",
        value: ""
      }
    }
  }
}
</script>