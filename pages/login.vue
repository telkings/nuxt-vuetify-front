<template>
  <v-form @submit.prevent="login">
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
    <v-btn @click="login" type="submit" color="primary" block
      >Iniciar Sesión</v-btn
    >
    <p class="text-center mt-2">
      <NuxtLink to="/register">¿No tienes cuenta? Regístrate</NuxtLink>
    </p>
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  layout: "auth", // Usa el layout sin sidebar
});

const auth = useAuthStore();

const email = ref("");
const password = ref("");

const login = () => {
  const success = auth.login({ email: email.value, password: password.value });
  if (success) {
    console.log("Inicio de sesión exitoso");
    navigateTo("/dashboard");
  }
};
</script>
