<template>
  <v-form @submit.prevent="login">
    <v-text-field v-model="email" label="Correo electrónico" type="email" required></v-text-field>
    <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
    <v-btn type="submit" color="primary" block>Iniciar Sesión</v-btn>
    <p class="text-center mt-2">
      <NuxtLink to="/register">¿No tienes cuenta? Regístrate</NuxtLink>
    </p>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'auth' // Usa el layout sin sidebar
})

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Iniciar sesión con:', email.value, password.value)
}
</script>



