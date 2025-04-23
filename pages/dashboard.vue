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
            label="Nombre de Pantalla"
            outlined
          />
            <!-- Donde fisicamente se ubica la pantalla -->
            <v-text-field
            v-model="ubicacion"
            label="Ubicacion Pantalla"
            outlined
          />

          <!-- Orientación de pantalla -->
          <v-select
            v-model="orientacion"
            :items="['vertical', 'horizontal']"
            label="Orientación"
            outlined
            dense
            prepend-icon="mdi-monitor"
            append-icon="mdi-menu-down"
          />

          <!-- Selector para la escala de imagen -->
       <!--    <v-select
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
          /> -->

          <!-- Selector para elegir una imagen disponible -->
         <!--  <v-select
            v-model="nombreImagen"
            label="Selecciona una imagen"
            :items="imagenesDisponibles"
            outlined
            class="mt-2"
          /> -->

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
  <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000" location="top right">
  {{ snackbarText }}
</v-snackbar>
</v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

// Configura la página con un layout y middleware de autenticación
definePageMeta({
  layout: "default",
  middleware: "auth",
});

const token = localStorage.getItem("token");

// Variables reactivas
const dialog = ref(false); // Controla la visibilidad del diálogo
const isLinked = ref(false); // Verifica si ya se vinculó la pantalla
const codigoVinculacion = ref("");
const nombreDispositivo = ref("");
const ubicacion = ref("");
const orientacion = ref("");
const escalaImagen = ref("fit"); // Valor inicial recomendado para la escala
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('');

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


const vincularPantalla = async () => {

  try {
    const { data } = await axios.post('http://localhost:5000/api/validate/validate-code', {
      codigo: codigoVinculacion.value
    });

    if (data.valido) {
      isLinked.value = true;
      snackbarText.value = 'CODIGO EMPAREJADO EXISTOSAMENTE.'
      snackbarColor.value = 'success';
      snackbar.value = true
    } else {
      snackbarText.value = 'CODIGO NO VALIDO.'
      snackbarColor.value = 'red';
      snackbar.value = true
    }

  } catch (err) {
    console.error(err);
    snackbarText.value = 'CAMPO VACIO INGRESE CODIGO DE PANTALLA.'
    snackbarColor.value = 'red';
    snackbar.value = true
  }

}

const guardarPantalla = async () => {

  if (!nombreDispositivo.value.trim() || !ubicacion.value.trim() || !orientacion.value) {
    snackbarText.value = 'Por favor completa todos los campos.'
    snackbarColor.value = 'error'
    snackbar.value = true
    return
  }

  try {
    const res = await axios.post(
      'http://localhost:5000/api/screens/create-screen',
      {
       codigo_vinculacion: codigoVinculacion.value,
       nombre_pantalla: nombreDispositivo.value,
       ubicacion: ubicacion.value,
       orientacion: orientacion.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (res.data && res.data.valido) {

      isLinked.value = true
      // Mostrar snackbar
      snackbarText.value = 'Pantalla guardada con éxito.'
      snackbarColor.value = 'success';
      snackbar.value = true

       // Limpia todos los campos
      codigoVinculacion.value = "";
      nombreDispositivo.value = "";
      orientacion.value = "";
      ubicacion.value = "";
      escalaImagen.value = "fit";
      nombreImagen.value = "";

      isLinked.value = false; // ya vinculo pantalla
      dialog.value = false; // Cierra el modal
  
    } else {
      snackbarText.value = 'Código no válido o ya usado.'
      snackbarColor.value = 'red';
      snackbar.value = true
    }
  } catch (error) {
    snackbarText.value = 'Error al verificar el código.'
    snackbarColor.value = 'red';
    snackbar.value = true
    console.error(error)
  }

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
