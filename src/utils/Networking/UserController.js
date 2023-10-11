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

  async Login(data) {
    try {
      const response = await fetch(BASE_URL + "user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const serverRes = await response.json();
      return serverRes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updatePersonalDoc(data, user_id) {
    try {
      const response = await fetch(BASE_URL + `user/update-docs/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const serverRes = await response.json();
      console.log(serverRes);
    } catch (error) {
      throw error;
    }
  }

  async updatePass(data, user_id) {
    try {
      const response = await fetch(BASE_URL + `user/update-pass/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const serverRes = response.json();
      return serverRes;
    } catch (error) {
      throw error;
    }
  }
}
