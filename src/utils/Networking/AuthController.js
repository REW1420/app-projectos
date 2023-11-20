const BASE_URL = "https://metriklass-api-dev-fgtq.4.us-1.fl0.io/";
import ToastService from "../../components/elements/Toast/ToastService";
export default class AuthController {
  constructor(toastObject) {
    this._toast = toastObject;
  }

  async sendOneTimeResetPassword(email) {
    const toastService = new ToastService(this._toast);
    try {
      const res = await fetch(BASE_URL + "auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (res.status === 404) {
        toastService.CustomToast("El correo no esta registrado", "warning");
      }

      if (res.status === 200) {
        toastService.CustomToast(
          "Se ha enviado un enlace para restablecer la contraseña",
          "success"
        );
      }
    } catch (error) {
      toastService.CustomToast("Algo a salido mal", "error");
    }
  }
}
