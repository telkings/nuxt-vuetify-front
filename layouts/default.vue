<template>
  <v-app>
    <!-- Menú lateral -->
    <v-navigation-drawer v-if="isClient" v-model="drawer" app>
      <!-- Logo -->
      <v-img
        src="/images/telkings_logo_1920_540.png"
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
      <!-- Nombre del usuario (cerca al avatar) -->
          <div class="mr-3 text-subtitle-1">
             {{ userName }}
         </div>

      <!-- Menú de usuario -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="40">
              <v-img src="/images/avatar.png" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>{{ userName }}</v-list-item-title>
            <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/settings">
            <v-list-item-title>⚙️ Configuración</v-list-item-title>
          </v-list-item>
          <v-list-item to="/subscription">
            <v-list-item-title>📜 Plan de Suscripción</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>🚪 Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <!-- Botón flotante de WhatsApp -->
    <v-btn
      fab
      dark
      color="green"
      class="whatsapp-button"
      @click="showWhatsappDialog = true"
    >
      <v-img src="/images/whatsapp.png" width="60" height="40" contain />
    </v-btn>

    <!-- Modal de WhatsApp -->
    <v-dialog v-model="showWhatsappDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">¿Necesitas ayuda?</v-card-title>
        <v-card-text>
          Puedes escribirnos por WhatsApp y nuestro equipo te atenderá lo antes
          posible.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" text @click="showWhatsappDialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="green" text @click="openWhatsApp">Ir a WhatsApp</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from 'vue';
import { useAuthStore } from "@/stores/auth";
import { onMounted } from 'vue'

const isClient = ref(false)
const auth = useAuthStore(); // Accede al store de Pinia
const userName = computed(() => auth.user?.name || 'Usuario');
const userEmail = computed(() => auth.user?.email || 'correo');
const drawer = ref(true);
const $route = useRoute();
const showWhatsappDialog = ref(false);

onMounted(() => {
  isClient.value = true

  /* console.log("auth.user al montar:", auth.user);
  console.log("Nombre de usuario:", userName.value);

  console.log(localStorage.getItem('user')); 
  console.log(localStorage.getItem('token'));  */
})

// Usar un watch para estar atentos a los cambios de auth.user
watch(
  () => auth.user, // Observar el valor de auth.user
  (newUser) => {
    if (newUser) {
      //console.log("usuario cargado =>", newUser.name);
    }
  }
);

const openWhatsApp = () => {
  window.open("https://wa.me/573112701507", "_blank");
};

// Definir opciones del menú
const menuItems = [
  { title: "Pantallas", icon: "mdi-view-dashboard", to: "/dashboard" },
  { title: "Archivos", icon: "mdi-folder", to: "/files" },
  {
    title: "Listas de reproducción",
    icon: "mdi-playlist-music",
    to: "/playlist",
  },
];

const logout = () => {
  console.log("Cerrando sesión...");
  // llama la funcion logout de store auth con pinia
  auth.logout();
  navigateTo("/login"); // Redirige al login sin necesidad de useRouter()
};
</script>

<style>
/* Estilo para la opción activa en el menú lateral */
.active-link {
  color: white !important; /* Texto en blanco */
  font-weight: bold;
  background-color: #1565c0 !important; /* Azul fuerte */
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* Efecto al pasar el mouse (sin afectar el activo) */
.v-list-item:not(.active-link):hover {
  background-color: rgba(
    21,
    101,
    192,
    0.2
  ) !important; /* Azul claro con transparencia */
  transform: scale(1.05); /* Efecto de crecimiento */
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* Estilos del botón flotante de WhatsApp */
.whatsapp-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
