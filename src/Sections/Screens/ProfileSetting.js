import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../../components/elements/Buttons/CustomButton";
import AppContext from "../../utils/context/AppContext";
import xhrGetBlob from "../../utils/Firebase/FirebaseFuntions";
import UserController from "../../utils/Networking/UserController";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  list,
} from "firebase/storage";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { storage } from "../../utils/Firebase/FirebaseConfig";
import CustomPasswordInput from "../../components/elements/Inputs/CustomPasswordInput";
import Icon from "react-native-vector-icons/Ionicons";
import Validation from "../../utils/Validations/Validation";
import { useToast } from "react-native-toast-notifications";
import ToastService from "../../components/elements/Toast/ToastService";
import PaperTextInput from "../../components/elements/Inputs/PaperTextInput";
const validations = new Validation();

const ProfileSetting = () => {
  const toast = useToast();
  const userNetworking = new UserController(toast);
  const toastService = new ToastService(toast);
  const { state, dispatch } = React.useContext(AppContext);
  const userInfo = state.userInfo;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState(userInfo.password);

  const [selectedImage, setSelectedImage] = useState(null);
  const data = {
    name: name,
    email: email,
    password: password,
    profilePhoto: profileURL,
  };
  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (result.canceled) {
      return;
    } else {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const [profileURL, setProfileURL] = React.useState(userInfo.profilePhoto);

  async function handleUpdateUser() {
    try {
      if (selectedImage !== null) {
        uploadImagev2(selectedImage);
      } else {
        if (validations.validateNotNullArray([data.name, data.email])) {
          await userNetworking.updateUser(userInfo._id, data);
          const updatedUserInfo = await userNetworking.getUserInfo(
            userInfo._id
          );
          dispatch({ type: "SET_USER_INFO", payload: updatedUserInfo });
        } else {
          toastService.CustomToast(
            "Los campos no pueden estar vacíos",
            "warning"
          );
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toastService.CustomToast("Error al actualizar el usuario", "danger");
    }
  }

  async function uploadImage(uri) {
    const storageRef = ref(storage, `users/profilePhotos/${userInfo._id}`);
    const metadata = {
      contentType: "image/jpg",
    };

    const blob = await xhrGetBlob(uri);

    //upload photo
    const uploadTask = uploadBytes(storageRef, blob, metadata);

    await getDownloadURL((await uploadTask).ref)
      .then(async (url) => {
        setProfileURL(url);
      })
      .then(async () => {
        await userNetworking.updateUser(userInfo._id, data);
        const data2 = await userNetworking.getUserInfo(userInfo._id);
        dispatch({ type: "SET_USER_INFO", payload: data2 });
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            break;
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      });
  }
  function uploadImagev2(uri) {
    const storageRef = ref(storage, `users/profilePhotos/${userInfo._id}`);
    deleteObject(storageRef)
      .then(() => {
        uploadImage(uri);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!

        switch (error.code) {
          case "storage/object-not-found":
            uploadImage(uri);
            break;
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      });
  }
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const bottomSheetRef = React.useRef(null);
  const handleSnapPress = React.useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const snapPoints = ["50%", "60%", "80%"];
  const [secure, setSecure] = useState(true);
  const [passData, setPassData] = useState({
    newPassword: "",
    currentPassword: "",
  });
  const handleChange = (name, value) => {
    setPassData({
      ...passData,
      [name]: value,
    });
  };
  const [promiseError, setPromiseError] = useState();
  const [serverError, setServerError] = useState();
  const handleUpdatePassword = async () => {
    try {
      validations
        .validateNewPassword(passData.newPassword, passData.currentPassword)
        .then(async (res) => {
          setPromiseError(res);

          if (res.status) {
            const res = await userNetworking.updatePass(passData, state.userID);
            setServerError(res);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 22,
        }}
      >
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              marginVertical: 22,
            }}
          >
            <TouchableOpacity onPress={handleImageSelection}>
              <Image
                source={{
                  uri:
                    selectedImage === null
                      ? userInfo.profilePhoto
                      : selectedImage,
                }}
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: "white",
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  zIndex: 9999,
                }}
              >
                <MaterialIcons name="photo-camera" size={32} color={"black"} />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <Text>Nombre</Text>
              <View
                style={{
                  height: 44,
                  width: "100%",
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                }}
              >
                <TextInput
                  value={name}
                  onChangeText={(value) => setName(value)}
                  editable={true}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <Text>Correo</Text>
              <View
                style={{
                  height: 44,
                  width: "100%",
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                }}
              >
                <TextInput
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  editable={true}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            ></View>
          </View>
          <View style={{ marginVertical: 15 }}>
            <CustomButton
              title={"Actualizar contraseña"}
              key={0}
              onPress={() => handleSnapPress(0)}
              width={"100%"}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <CustomButton
              title={"Actualizar perfil"}
              key={1}
              onPress={async () => handleUpdateUser()}
              width={"100%"}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
      >
        <BottomSheetView
          style={{
            padding: 10 * 2,
            borderRadius: 10 * 3,
            bottom: 10 * 3,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Actualizar contraseña
            </Text>
          </View>

          <View>
            <PaperTextInput
              iconName="lock-closed-outline"
              label="Contraseña"
              placeholder="Ingresa tu contraseña actual"
              password
              autoCapitalize={"none"}
              OnChangeText={(text) => handleChange("currentPassword", text)}
            />
            <PaperTextInput
              iconName="lock-closed-outline"
              label="Repetir contraseña"
              placeholder="Ingrese su nueva contraseña"
              password
              autoCapitalize={"none"}
              OnChangeText={(text) => handleChange("newPassword", text)}
            />
            {promiseError !== undefined ? (
              <Text>{promiseError.message}</Text>
            ) : null}

            {promiseError !== undefined ? (
              <Text>{promiseError.message}</Text>
            ) : null}
            {serverError !== undefined ? (
              <Text>{serverError.error}</Text>
            ) : null}
          </View>
          <CustomButton
            title={"Actualizar contraseña"}
            width={"80%"}
            onPress={() => handleUpdatePassword()}
          />
        </BottomSheetView>
      </BottomSheet>
    </React.Fragment>
  );
};

export default ProfileSetting;
