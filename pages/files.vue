<template>
  <div>
    <h1>Archivos</h1>
    <h1>{{ mensaje }}</h1>
    <p>Aquí puedes gestionar tus archivos.</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const mensaje = ref("Cargando...");

definePageMeta({
  layout: "default",
  middleware: "auth",
});

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:5000/api/saludo");
    const data = await response.json();
    mensaje.value = data.mensaje;
  } catch (error) {
    mensaje.value = "Error al conectar con el backend";
    console.error(error);
  }
});
</script>
