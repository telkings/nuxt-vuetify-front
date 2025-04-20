<template>
  <v-form @submit.prevent="register">
    <v-text-field v-model="name" label="Nombre" required></v-text-field>
    <v-text-field v-model="businessName" label="Nombre del Negocio" required></v-text-field>
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
const businessName = ref("");
const password = ref("");

const register = async () => {
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
    businessName: businessName.value
    };

    try {
    await auth.register(userData);
    console.log("✅ Datos de Registro Cliente =>", userData);
    navigateTo("/login");
  } catch (error) {
    alert("❌ Error al registrarse: " + (error.response?.data?.message || error.message));
  }
};
</script>
