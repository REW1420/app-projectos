//import liraries
import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  Text,
  Dimensions,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import COLORS from "../../utils/COLORS";
import Icon from "react-native-vector-icons/Ionicons";
import SingleItemCard from "../../components/elements/Cards/SingleItemCard";
import ProfileItemCard from "../../components/elements/Cards/ProfileItemCard";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AppContext from "../../utils/context/AppContext";
import { useFocusEffect } from "@react-navigation/native";

import UserController from "../../utils/Networking/UserController";
const userNetworking = new UserController();

// create a component
export default function Profile() {
  const height = Dimensions.get("screen").height;
  const { state, dispatch } = React.useContext(AppContext);
  const [userInfo, setUserInfo] = React.useState(state.userInfo);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    const data = await userNetworking.getUserInfo(userInfo._id);
    setUserInfo(data);

    setIsRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Esta función se ejecutará cuando esta pantalla obtenga el foco.

      onRefresh();
      //  setUserInfo(data);
      return () => {
        // Esta función se ejecutará cuando se deje esta pantalla.
        console.log("Pantalla deenfocada");
      };
    }, [])
  );
  const handleSnapPress = React.useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const bottomSheetRef = React.useRef(null);
  const snapPoints = ["30%"];

  const ProfileItemCardData = [
    { id: 0, title: "DUI", link: userInfo.personalDocs.DUI, docName: "DUI" },
    {
      id: 1,
      title: "Antecedentes penales",
      link: userInfo.personalDocs.Antecedentes,
      docName: "Antecedentes",
    },
    {
      id: 2,
      title: "Solvencia PNC",
      link: userInfo.personalDocs.Solvencia,
      docName: "Solvencia",
    },
  ];
  return (
    <>
      <ScrollView
        style={{ backgroundColor: COLORS.primary_backgroud }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.secondary_backgroud}>
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 30,
            }}
          ></View>
        </View>

        <View style={styles.primary_backgroud}>
          <Image
            resizeMode="contain"
            style={{
              flex: 1,
              width: 155,
              height: 155,
              borderRadius: 999,
              borderWidth: 5,
              borderColor: "white",

              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              bottom: height / 12,
            }}
            source={{ uri: userInfo.profilePhoto }}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              top: -50,
            }}
          >
            <Text style={{ fontSize: 20 }}>{userInfo.name}</Text>
            <Text style={{ fontSize: 20 }}>Programador JR</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: -30,
          }}
        >
          <Text style={{ fontSize: 30 }}>Datos personales</Text>
        </View>
        <View style={{ marginBottom: 15 }}>
          {ProfileItemCardData.map((item, index) => (
            <ProfileItemCard
              key={index}
              tittle={item.title}
              link={item.link}
              userID={userInfo._id}
              docName={item.docName}
            />
          ))}
        </View>
        <BottomSheet
          index={-1}
          enablePanDownToClose={true}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
        >
          <BottomSheetView style={{ zIndex: 999 }}></BottomSheetView>
        </BottomSheet>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  inputTxt: {
    backgroundColor: COLORS.input_color,
    padding: 15,
    margin: 15,
    borderRadius: 50,
    borderWidth: 1.5,
    width: "80%",
    color: COLORS.input_text,
    textAlign: "center",
    borderColor: COLORS.input_color,
    alignSelf: "center",
  },
  isNotPaid: {
    margin: 5,
    fontWeight: "bold",
    color: "red",
  },
  isPaid: {
    margin: 5,
    fontWeight: "bold",
    color: "green",
  },
  modalBackdround: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackdround2: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    backgroundColor: COLORS.primary_button,
    borderRadius: 20,
    shadowColor: COLORS.secondary_button,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "40%",
  },
  button_text: {
    color: COLORS.primary_buton_text,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  cardItems: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "100%",
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000000",
    shadowOffset: {
      width: -7,
      height: 7,
    },
  },
  modalHeader: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
  },
  secondary_backgroud: {
    width: "100%",
    height: 100,
    backgroundColor: COLORS.secondary_background,
  },
  primary_backgroud: {
    backgroundColor: COLORS.primary_backgroud,

    borderRadius: 10 * 3,
    bottom: 10 * 2,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  containerTopLeft: {
    position: "absolute",
    top: 200,
    left: 20,
    flex: 1,
    width: 200,
    height: 200,
  },
  textError: {
    color: "red",
  },
  textValid: {
    color: "green",
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
