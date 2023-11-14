const BASE_URL = "https://metriklass-api-qgrw-dev.fl0.io/";
import ToastService from "../../components/elements/Toast/ToastService";

export default class ProjectController {
  //all methods REST here
  //POST method

  constructor(toastObject) {
    this._toast = toastObject;
  }

  async createProject(projectData) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + "project-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        toastService.CustomToast("No se pudo crear al proyecto", "danger");
      } else {
        toastService.CustomToast("Creado", "success");
      }

      const newProject = await response.json();

      console.log("Respuesta del servidor:", newProject);
    } catch (error) {
      console.error("Error en createProject:", error);
      throw error;
    }
  }
  async updateMissionStatusv2(_isFinished, _status, _projectID, _misionID) {
    const toastService = new ToastService(this._toast);
    try {
      const res = await fetch(
        `https://metriklass-api-qgrw-dev.fl0.io/projects/update-status/${_projectID}/${_misionID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isFinished: _isFinished,
            newStatus: _status,
          }),
        }
      );
      if (!res.ok) {
        toastService.CustomToast(
          `No se pudo actualizar la misión a ${_status}`,
          "danger"
        );
      }
      const response = await res.json();
      console.log(response);
      return response.project;
    } catch (error) {
      console.error("Error en actualizar estado:", error);
      throw error;
    }
  }
  async getProjectImNotIn(userID) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + `projects/out/${userID}`);
      if (!response.ok) {
        toastService.CustomToast("Error en la peticion", "danger");
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en getProjectImNotIn:", error);
      throw error;
    }
  }

  async getProjectImIn(userID) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + `projects/in/${userID}`);
      if (!response.ok) {
        toastService.CustomToast("Error en la peticion", "danger");
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error :", error);
      throw error;
    }
  }

  async getCloseProject(userID) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + `projects/close/${userID}`);

      if (!response.ok) {
        toastService.CustomToast("No se pudo cerrar proyecto", "danger");
      }

      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }

  async deleteFromID(projectId) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + `projects/delete/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toastService.CustomToast("No se pudo eliminar", "danger");
      } else {
        toastService.CustomToast("Eliminado", "success");
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }

  async updateMisionStatus(projectId, misionId, status) {
    const toastService = new ToastService(this._toast);
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
      if (!response.ok) {
        toastService.CustomToast("No se pudo actualizar", "danger");
      } else {
        toastService.CustomToast(status, "success");
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }
  async updateMisionFinished(projectId, misionId, status) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(
        BASE_URL + `projects/update-finished/${projectId}/${misionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isFinished: status,
          }),
        }
      );
      if (!response.ok) {
        toastService.CustomToast("No se pudo actualizar la mision", "danger");
      } else {
        toastService.CustomToast("Terminada", "success");
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }
  async updateProjectClose(projectId, status) {
    const toastService = new ToastService(this._toast);
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
      if (!response.ok) {
        toastService.CustomToast(
          "No se pudo unir cerrar el proyecto",
          "danger"
        );
      } else {
        toastService.CustomToast("Hecho", "success");
      }
      const project = await response.json();
      return project;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }
  async getSingleProjectInfo(projectId, userID) {
    try {
      const response = await fetch(
        BASE_URL + `projects/info/${projectId}/${userID}`
      );
      const project = await response.json();
      if (!response.ok) {
        const badData = {
          status: 404,
          ...project,
        };
        return badData;
      }
      const goodData = {
        status: 200,
        ...project,
      };
      return goodData;
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }

  async updateJoinTeam(projectId, userId) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(
        BASE_URL + `projects/update-team/${projectId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newMemberId: userId,
          }),
        }
      );
      if (!response.ok) {
        toastService.CustomToast("No se pudo unir al proyecto", "danger");
      } else {
        toastService.CustomToast("Hecho", "success");
      }
      const project = await response.json();
      //console.log(project);
    } catch (error) {
      console.error("Error en:", error);
    }
  }

  async updateProject(projectID, newData) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(BASE_URL + `projects/update/${projectID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        toastService.CustomToast("No se pudo actualizar el proyecto", "danger");
      } else {
        toastService.CustomToast("Actualizado", "success");
      }
      const project = await response.json();
      console.log(project);
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }

  async updateAddNewMision(misionData, projectId) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(
        BASE_URL + `projects/add-mision/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(misionData),
        }
      );
      if (!response.ok) {
        toastService.CustomToast("No se pudo crear nueva mision", "danger");
      } else {
        toastService.CustomToast("Creado", "success");
      }
      const project = await response.json();
      console.log(project);
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }

  async leaveProject(projectID, userID) {
    const toastService = new ToastService(this._toast);
    try {
      const response = await fetch(
        BASE_URL + `projects/delete-member/${projectID}/${userID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        toastService.CustomToast("No se pudo abandonar el proyecto", "danger");
      } else {
        toastService.CustomToast("Hecho", "success");
      }
      const resJson = await response.json();
      console.log(resJson);
    } catch (error) {
      console.error("Error en:", error);
      throw error;
    }
  }
}
