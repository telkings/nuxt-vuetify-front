import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const register = (userData) => {
    if (process.client) {
      console.log("Guardando usuario en localStorage:", userData);
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  };

  const login = ({ email, password }) => {
    if (process.client) {
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) {
        alert("No hay usuarios registrados.");
        return false;
      }

      const userData = JSON.parse(storedUser);

      if (userData.email === email && userData.password === password) {
        localStorage.setItem("isAuthenticated", "true"); // Guarda autenticación
        return true;
      } else {
        alert("Correo o contraseña incorrectos");
        return false;
      }
    }
  };

  const logout = () => {
    if (process.client) {
      localStorage.removeItem("isAuthenticated");
    }
  };

  return { register, login, logout };
});
