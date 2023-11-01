export default class Validation {
  validateEmail(email) {
    return new Promise((resolve, reject) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const isValidEmail = emailRegex.test(email);
      if (email !== "") {
        if (isValidEmail) {
          resolve({ status: true });
        } else {
          resolve({
            message: "El correo no es valido",
            status: false,
          });
        }
      } else {
        resolve({
          message: "No se puede dejar correo vacio",
          status: false,
        });
      }
    });
  }

  validatePassword(password, confirmPassword) {
    return new Promise((resolve, reject) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
      const isValidPassword = passwordRegex.test(password);

      if (password != "" || confirmPassword != "") {
        if (isValidPassword) {
          if (password === confirmPassword) {
            resolve({
              status: true,
            });
          } else {
            resolve({
              message: "Las contraseñas no coinciden",
              status: false,
            });
          }
        } else {
          resolve({
            message: "La contraseña no es valida",
            status: false,
          });
        }
      } else {
        resolve({
          message: "No se puede dejar contraseñas vacias",
          status: false,
        });
      }
    });
  }

  validateName(name) {
    const nameRegex = /[a-zA-Z]+'?[a-zA-Z]+/g;
    const isNameValid = nameRegex.test(name);
    return new Promise((resolve, reject) => {
      if (name.trim() !== "") {
        if (isNameValid === true) {
          resolve({
            status: true,
          });
        } else {
          resolve({
            message: "EL nombre no puede contener numeros",
            status: false,
          });
        }
      } else {
        resolve({
          message: "No se puede dejar nombre vacio",
          status: false,
        });
      }
    });
  }

  validateNotNull(text) {
    return new Promise((resolve, reject) => {
      if (text === null || text === undefined || text === "") {
        resolve({
          message: "No puede dejar vacio este campo",
          status: false,
        });
      } else {
        resolve({
          status: true,
        });
      }
    });
  }

  validateNewPassword(newPassword, currentPassword) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    const isValidPassword1 = passwordRegex.test(newPassword);
    const isValidPassword2 = passwordRegex.test(currentPassword);
    return new Promise((resolve, reject) => {
      if (newPassword === "" || currentPassword === "") {
        resolve({
          message: "La nueva contraseña no puede estar vacia",
          status: false,
        });
      } else {
        if (!isValidPassword1) {
          resolve({
            message: "Las contraseña no es valida",
            status: false,
          });
        } else {
          resolve({
            status: true,
          });
        }
      }
    });
  }
  async validateServerStatus() {
    const BASE_URL = "https://metriklass-api-qgrw-dev.fl0.io/";
    const res = await fetch(BASE_URL + "status");
    const resjson = await res.json();
    // console.log(resjson);
    return new Promise((resolve, reject) => {
      if (resjson.isOnline === true) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
