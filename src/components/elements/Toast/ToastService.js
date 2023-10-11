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

  UpdateToast = () => {
    let id = this.toast.show("This toast will update", {});

    setTimeout(() => {
      if (id) {
        this.toast.update(id, "Toast updated", {
          type: "success",
        });
      }
    }, 1000);
  };
}
