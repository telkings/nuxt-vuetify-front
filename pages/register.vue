<template>
  <v-form @submit.prevent="register">
    <v-text-field v-model="name" label="Nombre" required></v-text-field>
    <v-text-field v-model="email" label="Correo electrónico" type="email" required></v-text-field>
    <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
    <v-btn type="submit" color="primary" block>Registrarse</v-btn>
    <p class="text-center mt-2">
      <NuxtLink to="/login">¿Ya tienes cuenta? Inicia sesión</NuxtLink>
    </p>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'auth' // Usa el layout sin sidebar
})

const name = ref('')
const email = ref('')
const password = ref('')

const register = () => {
  console.log('Registrarse con:', name.value, email.value, password.value)
}
</script>


  