<template>
<v-container>
  <!-- Botón principal que abre el modal para agregar una pantalla -->
  <v-btn color="primary" @click="dialog = true">Agregar Pantalla</v-btn>

  <!-- Modal de diálogo para vincular una pantalla -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h5">Vincular Pantalla</span>
      </v-card-title>

      <v-card-text>
        <!-- Formulario para ingresar el código de vinculación (paso 1) -->
        <v-form v-if="!isLinked">
          <v-text-field
            v-model="codigoVinculacion"
            label="Código de Vinculación"
            outlined
          />
          <v-btn color="primary" block @click="vincularPantalla">Vincular</v-btn>
        </v-form>

        <!-- Segundo formulario visible solo si ya está vinculada -->
        <v-form v-else>
          <!-- Nombre del dispositivo -->
          <v-text-field
            v-model="nombreDispositivo"
            label="Nombre del Dispositivo"
            outlined
          />

          <!-- Tipo de recurso: imagen, video o página web -->
          <v-select
            v-model="tipoRecurso"
            :items="['Imagen', 'Video', 'Página Web']"
            label="Tipo de Recurso"
            outlined
          />

          <!-- Orientación de pantalla -->
          <v-select
            v-model="orientacion"
            :items="['Vertical', 'Horizontal']"
            label="Orientación"
            outlined
          />

          <!-- Selector para la escala de imagen -->
          <v-select
            v-model="escalaImagen"
            label="Escala de Imagen"
            :items="[
              { text: 'Ajustar proporcionalmente (Recomendado)', value: 'fit' },
              { text: 'Llenar pantalla (puede recortar)', value: 'cover' },
              { text: 'Estirar para llenar (puede deformarse)', value: 'stretch' },
              { text: 'Tamaño original (sin escalar)', value: 'original' },
            ]"
            item-title="text"
            item-value="value"
            outlined
          />

          <!-- Selector para elegir una imagen disponible -->
          <v-select
            v-model="nombreImagen"
            label="Selecciona una imagen"
            :items="imagenesDisponibles"
            outlined
            class="mt-2"
          />

          <!-- Vista previa de la imagen seleccionada y su escala -->
          <v-card class="mt-4" outlined v-if="nombreImagen">
            <v-card-title class="text-subtitle-1">Vista previa de la imagen</v-card-title>
            <v-card-text>
              <div class="preview-container" :style="previewStyles">
                <v-img
                  :src="urlVistaPrevia"
                  :contain="escalaImagen === 'fit'"
                  :cover="escalaImagen === 'cover'"
                  :class="{
                    'stretch-image': escalaImagen === 'stretch',
                    'original-size': escalaImagen === 'original',
                  }"
                  :style="imageStyles"
                />
              </div>
            </v-card-text>
          </v-card>

          <!-- Botón para guardar configuración -->
          <v-btn color="success" class="ml-2" @click="guardarPantalla">Guardar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script setup>
import { ref, computed } from "vue";

// Configura la página con un layout y middleware de autenticación
definePageMeta({
  layout: "default",
  middleware: "auth",
});

// Variables reactivas
const dialog = ref(false); // Controla la visibilidad del diálogo
const isLinked = ref(false); // Verifica si ya se vinculó la pantalla
const codigoVinculacion = ref("");
const nombreDispositivo = ref("");
const tipoRecurso = ref("");
const orientacion = ref("");
const escalaImagen = ref("fit"); // Valor inicial recomendado para la escala

// Lista de imágenes disponibles en DigitalOcean
const imagenesDisponibles = ref([
  "arena_gato.png",
  "cafe_aguila.png",
  "dogourmet.png",
  "lecheklim.jpg",
]);

const nombreImagen = ref(""); // Imagen seleccionada por el usuario

// URL de vista previa dinámica basada en imagen seleccionada
const urlVistaPrevia = computed(() => {
  return `https://telkings.nyc3.digitaloceanspaces.com/${nombreImagen.value}`;
});

// Estilo dinámico para el contenedor de la vista previa
const previewStyles = computed(() => {
  const isVertical = orientacion.value === "Vertical";
  return {
    width: "100%",
    aspectRatio: isVertical ? "3 / 5" : "4 / 3",
    maxWidth: isVertical ? "300px" : "100%",
    margin: "0 auto",
  };
});

// Estilo dinámico para aplicar escala según selección del usuario
const imageStyles = computed(() => {
  let fit = "contain";
  if (escalaImagen.value === "cover") fit = "cover";
  else if (escalaImagen.value === "stretch") fit = "fill";
  else if (escalaImagen.value === "original") fit = "none";

  return {
    objectFit: fit,
    objectPosition: "center",
    width: escalaImagen.value === "original" ? "auto" : "100%",
    height: escalaImagen.value === "original" ? "auto" : "100%",
    maxWidth: "100%",
    maxHeight: "100%",
  };
});

// Simula vinculación de pantalla al hacer clic
const vincularPantalla = () => {
  if (codigoVinculacion.value.trim()) {
    isLinked.value = true;
  }
};

// Imprime la configuración de la pantalla al hacer clic en "Guardar"
const guardarPantalla = () => {
  console.log("Codigo => " + codigoVinculacion.value);
  console.log("Nombre Dispositivo => " + nombreDispositivo.value);
  console.log("Recurso => " + tipoRecurso.value);
  console.log("Orientacion => " + orientacion.value);
  console.log("Escala Imagen => " + escalaImagen.value);
  dialog.value = false; // Cierra el modal
};

</script>

<style scoped>
.preview-container {
  background-color: #000;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  aspect-ratio: 4 / 3; /* fallback para navegadores antiguos */
}

.v-img {
  width: 100%;
  height: 100%;
}
</style>
