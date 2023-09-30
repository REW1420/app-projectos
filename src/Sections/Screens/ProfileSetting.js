import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/Firebase/FirebaseConfig";
const userNetworking = new UserController();

const ProfileSetting = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const userInfo = state.userInfo._j;
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

  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 35,
              width: "90%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: "white",
                textHeaderColor: "#469ab6",
                textDefaultColor: "black",
                selectedTextColor: "black",
                mainColor: "#469ab6",
                textSecondaryColor: "black",
                borderColor: "rgba(122,146,165,0.1)",
              }}
            />

            <Pressable onPress={handleOnPressStartDate}>
              <Text style={{ color: "black" }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }
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

  const data = {
    id: userInfo.id,
    name: name,
    email: email,
    password: password,
    bornDate: selectedStartDate,
    profilePhoto: profileURL,
  };

  async function uploadImage(uri, userName) {
    const storageRef = ref(storage, `users/profilePhotos/${userName}`);
    const metadata = {
      contentType: "image/jpg",
    };

    let URL;
    // Obtener el blob de la URL de manera sincrónica
    const blob = await xhrGetBlob(uri);

    //  console.log(blob);

    // Subir el blob a Firebase Storage
    const uploadTask = uploadBytes(storageRef, blob, metadata);

    // Obtener la URL de descarga una vez que se haya completado la carga
    await getDownloadURL((await uploadTask).ref)
      .then((url) => {
        // console.log("hola", url);
        setProfileURL(url);
      })
      .then(() => {
        userNetworking.updateUser(userInfo._id, data);
        const data = userNetworking.getUserInfo(userInfo._id);
        dispatch({ type: "SET_USER_INFO", payload: data });
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
  }
  return (
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
          >
            <Text>Contraseña</Text>
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
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable={true}
                secureTextEntry
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Fecha de nacimiento</Text>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
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
              <Text>{selectedStartDate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton
          title={"Actualizar"}
          key={0}
          onPress={async () => handleUpdateUser()}
        />

        {renderDatePicker()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSetting;
