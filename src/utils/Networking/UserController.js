const BASE_URL = "https://metriklass-api-dev-fgtq.4.us-1.fl0.io/";
import ToastService from "../../components/elements/Toast/ToastService";
export default class UserController {
  constructor(toastObject) {
    this._toast = toastObject;
  }
  async getUserInfo(user_id) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + `user/get/${user_id}`);
      const userInfo = await response.json();
      if (!response.ok) {
        toastService.CustomToast("No se pudo iniciar sesion", "danger");
      }

      return userInfo;
    } catch (error) {
      console.error("Error en getUserInfo:", error);
    }
  }

  async updateUser(user_id, data) {
    const toastService = new ToastService(this._toast);
    toastService.CustomToast("Actualizando...", "normal");
    try {
      const response = await fetch(BASE_URL + `user/update/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toastService.CustomToast("No se pudo actualzar el perfil", "danger");
      } else {
        toastService.CustomToast("Actualizado", "success");
      }
      const newProject = await response.json();

      console.log("Respuesta del servidor:", newProject);
    } catch (error) {
      console.error("Error en updateUser:", error);
      throw error;
    }
  }

  async createUser(data) {
    const toastService = new ToastService(this._toast);
    toastService.CustomToast("Creando...", "normal");
    try {
      const response = await fetch(BASE_URL + "user/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const newProject = await response.json();
      console.log("Respuesta del servidor:", newProject);
      if (!response.ok) {
        toastService.CustomToast(newProject.message, "danger");
        return false;
      } else {
        toastService.CustomToast("Usuario creado", "success");
        return true;
      }
    } catch (error) {
      console.error("Error en createUser:", error);
      throw error;
    }
  }

  async Login(data) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + "user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const serverRes = await response.json();
      if (!response.ok) {
        toastService.CustomToast("No se pudo iniciar sesion", "danger");
      } else {
        toastService.CustomToast(`Bienvenido ${serverRes.name}`, "success");
      }
      return serverRes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updatePersonalDoc(data, user_id) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + `user/update-docs/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toastService.CustomToast("No se pudo subir datos", "danger");
      } else {
        toastService.CustomToast(`Datos actualizados`, "success");
      }
      const serverRes = await response.json();
      console.log(serverRes);
    } catch (error) {
      throw error;
    }
  }

  async updatePass(data, user_id) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + `user/update-pass/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toastService.CustomToast("No se pudo cambiar contraseña", "danger");
      } else {
        toastService.CustomToast("Contraseña atualizada", "success");
      }
      const serverRes = response.json();
      return serverRes;
    } catch (error) {
      throw error;
    }
  }
}
