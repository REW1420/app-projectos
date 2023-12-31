import { View, Text, Pressable } from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import AlertModal from "../Modals/AlertModal";
import { Linking } from "react-native";
import xhrGetBlob from "../../../utils/Firebase/FirebaseFuntions";
import { storage } from "../../../utils/Firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UserController from "../../../utils/Networking/UserController";
import ToastService from "../Toast/ToastService";
import { useToast } from "react-native-toast-notifications";
export default function ProfileItemCard({
  tittle,
  handleSnapPress,
  link,
  userID,
  docName,
}) {
  const toast = useToast();
  const userNetworking = new UserController(toast);
  const toastService = new ToastService(toast);
  const [modalVisible, setModalVisible] = React.useState(false);
  const _docName = docName;
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleUploadPDF = async () => {
    

    await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    }).then((res) => {
      uploadPDF(res.assets[0].uri);
    });
  };

  async function uploadPDF(uri) {
    toastService.CustomToast("Subiendo PDF", "normal");

    

    const storageRef = ref(storage, `users/personalDocs/${userID}/${tittle}`);
    const metadata = {
      contentType: "application/pdf",
    };

    // Obtener el blob de la URL de manera sincrónica
    const blob = await xhrGetBlob(uri);
    let URL;
   

    // Subir el blob a Firebase Storage
    const uploadTask = uploadBytes(storageRef, blob, metadata);

    // Obtener la URL de descarga una vez que se haya completado la carga
    await getDownloadURL((await uploadTask).ref)
      .then((url) => {
        toastService.CustomToast("Se subio el archivo", "succed");

        URL = url;
      })
      .then(async () => {
        const data = {
          [_docName]: URL,
        };

        await userNetworking.updatePersonalDoc(data, userID);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            toastService.CustomToast("Error al subir el archivo", "error");
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            toastService.CustomToast(
              "Error al subir el archivo, no hay permisos",
              "error"
            );

            break;
          case "storage/canceled":
            // User canceled the upload
            toastService.CustomToast(
              "Se cancelo la subida del archivo",
              "warnign"
            );

            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            toastService.CustomToast("Error en el servidor", "error");

            break;
        }
      });
  }
  return (
    <React.Fragment>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          marginHorizontal: 20,
          marginTop: 15,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <Text style={{ fontSize: 15 }}>{tittle}</Text>
          </View>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {link !== null ? (
              <Pressable
                onPress={() => Linking.openURL(link)}
                style={{ marginHorizontal: 10 }}
              >
                <Icon name="eye-outline" size={25} />
              </Pressable>
            ) : null}
            <Pressable
              style={{ marginHorizontal: 10 }}
              onPress={() => handleUploadPDF()}
            >
              <Icon name="pencil-sharp" size={25} />
            </Pressable>
          </View>
        </View>
      </View>
      <AlertModal
        back={toggleModal}
        title={`Estas seguro de actualizar el documento ${tittle}`}
        isModalVisible={modalVisible}
        handleDelete={async () => {
          await handleUploadPDF();
        }}
      />
    </React.Fragment>
  );
}
