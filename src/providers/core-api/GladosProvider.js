import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },
  updateEntity(id, updatedEntityData) {
    return coreApiClient.sendRequest("patch", `/entities/${id}`, updatedEntityData)
  },
  getRooms() {
    return coreApiClient.sendRequest("get", "/rooms", {})
  },
  deleteEntity(entityId) {
    return coreApiClient.sendRequest("delete", `/entities/${entityId}`, {})
  },
  createEntity(newEntityData) {
    return coreApiClient.sendRequest("post", "/entities", newEntityData)
  }
}
