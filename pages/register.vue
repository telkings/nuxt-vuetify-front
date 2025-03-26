<template>
  <v-form @submit.prevent="register">
    <v-text-field v-model="name" label="Nombre" required></v-text-field>
    <v-text-field
      v-model="email"
      label="Correo electrónico"
      type="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Contraseña"
      type="password"
      required
    ></v-text-field>
    <v-btn @click="register" type="submit" color="primary" block
      >Registrarse</v-btn
    >
    <p class="text-center mt-2">
      <NuxtLink to="/login">¿Ya tienes cuenta? Inicia sesión</NuxtLink>
    </p>
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  layout: "auth", // Usa el layout sin sidebar
});

const auth = useAuthStore(); // Define correctamente el store

const name = ref("");
const email = ref("");
const password = ref("");

const register = () => {
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  auth.register(userData); // Llama al método register del store
  //alert('Registro exitoso. Ahora puedes iniciar sesión.')
  navigateTo("/login");
};
</script>
