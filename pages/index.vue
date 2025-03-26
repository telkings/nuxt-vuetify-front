<template>
  <div>
    <p>Redirigiendo...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { navigateTo } from "#app"; // Importa navigateTo de Nuxt

onMounted(() => {
  navigateTo("/dashboard"); // Redirige a la página de Dashboard
});
</script>
