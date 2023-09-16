const BASE_URL = "https://metriklass-api-qgrw-dev.fl0.io/";

export default class ProjectController {
  //all methods REST here
  //POST method
  async createProject(projectData) {
    try {
      const response = await fetch(BASE_URL + "project-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el proyecto.");
      }

      const newProject = await response.json();

      console.log("Respuesta del servidor:", newProject);
    } catch (error) {
      console.error("Error en createProject:", error);
      throw error;
    }
  }

  async getProjectImNotIn(userID) {
    try {
      const response = await fetch(BASE_URL + `projects/out/${userID}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener el proyecto");
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en getProjectImNotIn:", error);
      throw error;
    }
  }

  async getProjectImIn(userID) {
    try {
      const response = await fetch(BASE_URL + `projects/in/${userID}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener el proyecto");
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error :", error);
      throw error;
    }
  }

  async getCloseProject(userID) {
    try {
      const response = await fetch(BASE_URL + `projects/close/${userID}`);

      if (!response.ok) {
        throw new Error(
          `Error en la solicitud: ${response.status} ${response.statusText}`
        );
      }

      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }

  async deleteFromID(projectId) {
    try {
      const response = await fetch(BASE_URL + `projects/delete/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          `Error en la solicitud: ${response.status} ${response.statusText}`
        );
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }

  async updateMisionStatus(projectId, misionId, status) {
    try {
      const response = await fetch(
        BASE_URL + `projects/update-status/${projectId}/${misionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newStatus: status,
          }),
        }
      );
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }
  async updateMisionFinished(projectId, misionId) {
    try {
      const response = await fetch(
        BASE_URL + `projects/update-finished/${projectId}/${misionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isFinished: true,
          }),
        }
      );
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }
  async updateProjectClose(projectId, status) {
    try {
      const response = await fetch(
        BASE_URL + `projects/update-close/${projectId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isFinished: status,
          }),
        }
      );
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }
  async getSingleProjectInfo(projectId) {
    try {
      const response = await fetch(BASE_URL + `projects/info/${projectId}`);
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }
}
