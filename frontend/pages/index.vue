<script setup lang="ts">
import { ref } from 'vue'


let users = ref()

const showModal = ref(false) // Estado para mostrar el modal
const newUserName = ref('') // Estado para almacenar el nombre del nuevo usuario
const toast = useToast()

// Función para abrir el modal
const openModal = () => {
  showModal.value = true
}
const fetchUsers = async () => {
  users.value = await $fetch('/api/usuarios')
}

const deleteUser = async (_id: string) => {
  await $fetch('/api/usuarios', {
    method: 'DELETE',
    body: {
      _id: _id
    }
  })

  await fetchUsers()

  toast.add({
    id: 'deleted_user',
    title: 'Usuario borrado.',
    description: 'Se ha eliminado correctamente',
    icon: 'i-heroicons-check-circle',
    timeout: 5000,
  })
}

fetchUsers()

// Función para manejar el envío del formulario
const submitForm = async () => {
  if (newUserName.value) {

    await $fetch('/api/usuarios',
        {
          method: 'POST',
          body: { nombre: newUserName.value }
        });

    showModal.value = false // Cerrar el modal
    newUserName.value = '' // Limpiar el campo

    toast.add({
      id: 'added_user',
      title: 'Usuario Añadido.',
      description: 'Se ha añadido correctamente',
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
    })

    await fetchUsers()
  }
}
</script>

<template>
  <client-only>
    <UContainer class="flex flex-col flex-wrap justify-center gap-y-6">
    <div class="flex items-center gap-x-4 mt-10">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 cursor-pointer hover:text-blue-500" @click="fetchUsers" />
      <h1 class="text-xl">Usuarios</h1>
      <UIcon name="i-heroicons-plus" class="w-6 h-6 cursor-pointer hover:text-green-500" @click="openModal" />
    </div>
    <div class="flex flex-wrap gap-4">
      <div v-for="user in users" :key="user.id" class="relative">
        <UCard class="flex justify-center gap-y-4 w-52 cursor-pointer">
          <div class="absolute top-2 right-2">
            <button @click="deleteUser(user._id)" class="text-red-500 hover:text-red-700">
              <UIcon name="i-heroicons-trash" class="w-6 h-6 cursor-pointer"  />
            </button>
          </div>
          <div>
            {{ user?.nombre }}
          </div>
        </UCard>
      </div>
    </div>

    <!-- Modal -->

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-gray-900 p-6 rounded shadow-lg">
        <h2 class="text-xl mb-4">Agregar Usuario</h2>
        <input
            v-model="newUserName"
            type="text"
            placeholder="Nombre del usuario"
            class="border p-2 w-full mb-4"
        />
        <button @click="submitForm" class="bg-blue-500 text-white p-2 rounded">Agregar</button>
        <button @click="showModal = false" class="bg-gray-500 p-2 rounded ml-2">Cancelar</button>
      </div>
    </div>

  </UContainer>
  </client-only>
</template>

<style scoped>
/* Estilos adicionales para el modal */
.fixed {
  position: fixed;
}
</style>