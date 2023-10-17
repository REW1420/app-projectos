const BASE_URL = "https://metriklass-api-qgrw-dev.fl0.io/";
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
        toastService.CustomToast("Error en la peticion", "danger");
      }

      const resjson = await response.json();
      console.log(resjson);
      return resjson;
    } catch (error) {
      console.log(error);
    }
  }

  async addContribution(user_id) {
    try {
      const toastService = new ToastService(this._toast);
      const response = await fetch(BASE_URL + `kpi/post/${user_id}`);
      if (!response.ok) {
        toastService.CustomToast("Error en la peticion", "danger");
      }
      const resjson = await response.json();
      console.log(resjson);
    } catch (error) {
      console.log(error);
    }
  }
}
