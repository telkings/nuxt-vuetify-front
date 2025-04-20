// stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);

  const register = async (userData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", userData);
      token.value = res.data.token;
      user.value = res.data.user;

      // Guardar en localStorage
      if (process.client) {
        localStorage.setItem("token", token.value);
        localStorage.setItem("user", JSON.stringify(user.value));
      }

      console.log("✅ Registro exitoso:");
    } catch (error) {
      console.error("❌ Error en el registro:", error.response?.data?.message || error.message);
      throw error; // Para que el componente sepa si falló
    }
  };

  const login = async (credentials) => {
    try {
      // Realizar la solicitud POST para el login
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      
      // Si el login es exitoso, almacenar el token y el usuario en localStorage
      token.value = res.data.token;
      user.value = res.data.user;
  
      // Guardar token y usuario solo en el cliente (navegador)
      if (process.client) {
        localStorage.setItem("token", token.value);
        localStorage.setItem("user", JSON.stringify(user.value));
      }
  
      console.log("✅ Login exitoso:");
      // Retornar true para indicar que el login fue exitoso
      return true; 
  
    } catch (error) {
      // Si ocurre un error, mostrar mensaje de error en consola y manejar el error
      console.error("❌ Error al iniciar sesión:", error.response?.data?.message || error.message);
  
      // Retornar false si el login falla
      return false; 
    }
  };
  

  const logout = () => {
    token.value = null;
    user.value = null;
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  return { user, token, register, login, logout };
});

