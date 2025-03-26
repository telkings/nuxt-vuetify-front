<template>
  <v-app>
    <!-- Menú lateral -->
    <v-navigation-drawer v-model="drawer" app>
      <!-- Logo -->
      <v-img
        src="/images/logo.png"
        max-width="200"
        max-height="80"
        contain
        class="my-4 mx-auto"
      />

      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :title="item.title"
          :prepend-icon="item.icon"
          :to="item.to"
          :class="{ 'active-link': $route.path === item.to }"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Barra superior -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Telkings</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const drawer = ref(true);
const $route = useRoute();

// Definir opciones del menú
const menuItems = [
  { title: "Pantallas", icon: "mdi-view-dashboard", to: "/" },
  { title: "Archivos", icon: "mdi-folder", to: "/files" },
  { title: "Listas de reproducción", icon: "mdi-playlist-music", to: "/playlist" },
];
</script>

<style>
/* Estilo para la opción activa en el menú lateral */
.active-link {
  color: white !important; /* Texto en blanco */
  font-weight: bold;
  background-color: #1565C0 !important; /* Azul fuerte */
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* Efecto al pasar el mouse (sin afectar el activo) */
.v-list-item:not(.active-link):hover {
  background-color: rgba(21, 101, 192, 0.2) !important; /* Azul claro con transparencia */
  transform: scale(1.05); /* Efecto de crecimiento */
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}
</style>


