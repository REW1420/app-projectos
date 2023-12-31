const BASE_URL = "https://metriklass-api-dev-fgtq.4.us-1.fl0.io/";
import ToastService from "../../components/elements/Toast/ToastService";
export default class DashboardController {
  constructor(toastObject) {
    this._toast = toastObject;
  }

  async getDataFromID(user_id) {
    try {
      const toastService = new ToastService(this._toast);
      const response = await fetch(BASE_URL + `kpi/get/${user_id}`);

      if (!response.ok) {
        toastService.CustomToast("Error servidor no disponible", "danger");
      }

      const resjson = await response.json();

      return resjson;
    } catch (error) {}
  }

  async addContribution(user_id) {
    try {
      const toastService = new ToastService(this._toast);
      const response = await fetch(BASE_URL + `kpi/post/${user_id}`);
      if (!response.ok) {
        toastService.CustomToast("Error en la peticion", "danger");
      }
      const resjson = await response.json();
      
    } catch (error) {}
  }
}
