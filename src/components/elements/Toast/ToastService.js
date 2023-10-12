export default class ToastService {
  constructor(toastObject) {
    this.toast = toastObject;
  }
  WelcomeToast = () => {
    this.toast.show("Bienvenido!!", {
      type: "normal",
      placement: "bottom",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  };

  CustomToast = (message, type) => {
    this.toast.show(message, {
      type: type,
      placement: "bottom",
      duration: 1500,
      offset: 30,
      animationType: "slide-in",
    });
  };

  UpdateToast = (pendingMssg, successMssg) => {
    let id = this.toast.show(pendingMssg, {});

    setTimeout(() => {
      if (id) {
        this.toast.update(id, successMssg, {
          type: "success",
        });
      }
    }, 1500);
  };
}
