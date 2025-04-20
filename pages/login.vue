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
    <v-btn type="submit" color="primary" block
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

const login = async () => {
  const success = await auth.login({ email: email.value, password: password.value });

  if (success) {
    // Verificar si el token está en localStorage
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Redirigiendo...");
      navigateTo("/dashboard");
    } else {
      console.error("❌ No se encontró el token en localStorage");
    }
  } else {
    console.log("❌ Login fallido");
  }
};


</script>
