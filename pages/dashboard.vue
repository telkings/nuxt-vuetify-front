<template>
  <div>
    <h2>Bienvenido al Dashboard</h2>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth", // Usa el middleware de autenticación
});
</script>
