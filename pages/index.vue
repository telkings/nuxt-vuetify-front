<template>
    <div>
      <p>Redirigiendo...</p>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue'
  
  const router = useRouter()
  
  onMounted(() => {
    router.push('/dashboard') // Redirige a la página de Dashboard
  })
  </script>
  