const BASE_URL = "https://metriklass-api-qgrw-dev.fl0.io/";

export default class UserController {
  async getUserInfo(user_id) {
    try {
      const response = await fetch(BASE_URL + `user/get/${user_id}`);

      if (!response.ok) {
        throw new Error("Error al crear el proyecto.");
      }

      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      console.error("Error en getUserInfo:", error);
      throw error;
    }
  }

  async updateUser(user_id, data) {
    try {
      const response = await fetch(BASE_URL + `user/update/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const newProject = await response.json();

      console.log("Respuesta del servidor:", newProject);
    } catch (error) {
      console.error("Error en updateUser:", error);
      throw error;
    }
  }

  async createUser(data) {
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
    } catch (error) {
      console.error("Error en createUser:", error);
      throw error;
    }
  }
}
