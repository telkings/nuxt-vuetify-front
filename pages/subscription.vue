<template>
  <v-container>
    <h1>Plan de Suscripción</h1>
    <p>Aquí puedes ver y gestionar tu plan de suscripción.</p>
  </v-container>
</template>
<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>
