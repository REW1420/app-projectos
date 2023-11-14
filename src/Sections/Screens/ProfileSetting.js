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
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Pressable } from "react-native";
import CustomButton from "../../components/elements/Buttons/CustomButton";
import AppContext from "../../utils/context/AppContext";
import xhrGetBlob from "../../utils/Firebase/FirebaseFuntions";
import UserController from "../../utils/Networking/UserController";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { storage } from "../../utils/Firebase/FirebaseConfig";
import CustomPasswordInput from "../../components/elements/Inputs/CustomPasswordInput";
import Icon from "react-native-vector-icons/Ionicons";
import Validation from "../../utils/Validations/Validation";
import { useToast } from "react-native-toast-notifications";
const validations = new Validation();

const ProfileSetting = () => {
  const toast = useToast();
  const userNetworking = new UserController(toast);
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);
  const userInfo = state.userInfo;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState(userInfo.password);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState(userInfo.bornDate);
  const [startedDate, setStartedDate] = useState(today.toString());

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    setSelectedImage(result.assets[0].uri);
    console.log(selectedImage);
  };
  const [profileURL, setProfileURL] = React.useState(userInfo.profilePhoto);

  async function handleUpdateUser() {
    if (selectedImage !== null) {
      try {
        await uploadImage(selectedImage, userInfo._id);

        // Aquí puedes realizar otras acciones con 'data'
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
        // Maneja el error de acuerdo a tus necesidades
      }
    } else {
      userNetworking.updateUser(userInfo._id, data);
    }
  }

  async function uploadImage(uri, user_id) {
    const storageRef = ref(storage, `users/profilePhotos/${user_id}`);
    const metadata = {
      contentType: "image/jpg",
    };

    await deleteObject(storageRef)
      .then(() => {
        console.log("object deleted");
      })
      .then(async () => {
        const blob = await xhrGetBlob(uri);

        const uploadTask = uploadBytes(storageRef, blob, metadata);

        // Obtener la URL de descarga una vez que se haya completado la carga
        await getDownloadURL((await uploadTask).ref)
          .then(async (url) => {
            setProfileURL(url);
            console.log("hola", profileURL);
          })
          .then(async () => {
            await userNetworking.updateUser(userInfo._id, data);
            const data2 = await userNetworking.getUserInfo(userInfo._id);
            dispatch({ type: "SET_USER_INFO", payload: data2 });
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
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
            console.log(res);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  const data = {
    name: name,
    email: email,
    password: password,
    profilePhoto: profileURL,
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
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <CustomButton
              title={"Actualizar perfil"}
              key={1}
              onPress={async () => handleUpdateUser()}
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
            <Pressable
              onPress={() => setSecure(!secure)}
              style={{ marginTop: 10 }}
            >
              <Icon
                name={secure ? "eye-outline" : "eye-off-outline"}
                size={35}
              />
            </Pressable>
          </View>

          <View>
            <CustomPasswordInput
              Placeholder={"Contraseña actual"}
              secure={secure}
              _onChangeText={(text) => handleChange("currentPassword", text)}
            />
            {promiseError !== undefined ? (
              <Text>{promiseError.message}</Text>
            ) : null}
            <CustomPasswordInput
              Placeholder={"Contraseña nueva"}
              secure={secure}
              _onChangeText={(text) => handleChange("newPassword", text)}
            />
            {promiseError !== undefined ? (
              <Text>{promiseError.message}</Text>
            ) : null}
            {serverError !== undefined ? (
              <Text>{serverError.error}</Text>
            ) : null}
          </View>
          <CustomButton
            title={"Actualizar contraseña"}
            onPress={() => handleUpdatePassword()}
          />
        </BottomSheetView>
      </BottomSheet>
    </React.Fragment>
  );
};

export default ProfileSetting;
