import { defineStore } from "pinia"; // Importa la función 'defineStore' de Pinia para definir el store
import { ref } from "vue"; // Importa 'ref' de Vue para crear referencias reactivas
import axios from "axios"; // Importa 'axios' para realizar solicitudes HTTP
import { onMounted } from "vue"; // Importa 'onMounted' de Vue para ejecutar código después de que el componente esté montado

// Define un store con el nombre "auth" utilizando Pinia
export const useAuthStore = defineStore("auth", () => {
  // Declaramos las variables reactivas 'user' y 'token' usando 'ref'
  const user = ref(null);  // 'user' almacena los datos del usuario
  const token = ref(null); // 'token' almacena el token de autenticación

  // Método para cargar los datos de 'localStorage' cuando la aplicación se monta
  const loadFromLocalStorage = () => {
    // Solo ejecutamos este código en el cliente (navegador)
    if (process.client) {
      // Recuperamos los valores almacenados en 'localStorage'
      const storedUser = localStorage.getItem("user"); // Obtiene el usuario almacenado
      const storedToken = localStorage.getItem("token"); // Obtiene el token almacenado

      // Si el usuario existe en 'localStorage', lo asignamos a la variable reactiva 'user'
      if (storedUser) {
        user.value = JSON.parse(storedUser); // Parseamos el JSON para convertirlo en objeto
      }

      // Si el token existe en 'localStorage', lo asignamos a la variable reactiva 'token'
      if (storedToken) {
        token.value = storedToken;
      }
    }
  };

  // Ejecutamos la carga de los datos de 'localStorage' cuando el componente se monta
  onMounted(() => {
    loadFromLocalStorage(); // Carga los datos del localStorage cuando el componente se monta
  });

  // Función para registrar un nuevo usuario
  const register = async (userData) => {
    try {
      // Enviamos una solicitud POST a la API para registrar al usuario
      const res = await axios.post("http://localhost:5000/api/auth/register", userData);

      // Guardamos el token y el usuario en las variables reactivas 'token' y 'user'
      token.value = res.data.token;
      user.value = res.data.user;

      // Si estamos en el cliente, almacenamos el token y el usuario en 'localStorage'
      if (process.client) {
        localStorage.setItem("token", token.value); // Guarda el token en 'localStorage'
        localStorage.setItem("user", JSON.stringify(user.value)); // Guarda el usuario en 'localStorage'
      }

      console.log("✅ Registro exitoso:");
    } catch (error) {
      console.error("❌ Error en el registro:", error.response?.data?.message || error.message);
      throw error; // Lanza el error para que pueda ser manejado en el componente
    }
  };

  // Función para iniciar sesión con las credenciales proporcionadas
  const login = async (credentials) => {
    try {
      // Enviamos una solicitud POST a la API para autenticar al usuario
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);

      // Guardamos el token y el usuario en las variables reactivas 'token' y 'user'
      token.value = res.data.token;
      user.value = res.data.user;

      // Si estamos en el cliente, almacenamos el token y el usuario en 'localStorage'
      if (process.client) {
        localStorage.setItem("token", token.value); // Guarda el token en 'localStorage'
        localStorage.setItem("user", JSON.stringify(user.value)); // Guarda el usuario en 'localStorage'
      }

      console.log("✅ Login exitoso:");
      return true; // Retorna 'true' para indicar que el login fue exitoso
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error.response?.data?.message || error.message);
      return false; // Retorna 'false' si ocurrió un error en el login
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    token.value = null; // Limpia el token
    user.value = null;  // Limpia el usuario

    // Si estamos en el cliente, eliminamos el token y el usuario de 'localStorage'
    if (process.client) {
      localStorage.removeItem("token"); // Elimina el token de 'localStorage'
      localStorage.removeItem("user");  // Elimina el usuario de 'localStorage'
    }
  };

  // Retornamos las variables y métodos para que puedan ser utilizados en otros componentes
  return { user, token, register, login, logout };
});
