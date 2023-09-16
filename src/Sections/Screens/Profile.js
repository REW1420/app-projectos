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
import { Button } from "react-native";
// create a component
export default function Profile() {
  const height = Dimensions.get("screen").height;

  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.primary_backgroud }}>
        <View style={styles.secondary_backgroud}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginTop: 30,
            }}
          >
            <SingleItemCard tittle={"Estado"} content={"Activo"} key={0} />
            <SingleItemCard tittle={"ID"} content={"005"} key={1} />
          </View>
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
            source={require("../../../assets/ProfilePhoto/JH.jpg")}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              top: -50,
            }}
          >
            <Text style={{ fontSize: 20 }}>
              William Ernesto Ramos Valladares
            </Text>
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
          <ProfileItemCard key={0} tittle={"DUI"} />
          <ProfileItemCard key={1} tittle={"Antecedentes penales"} />
          <ProfileItemCard key={2} tittle={"Solvencia PNC"} />
          <ProfileItemCard key={3} tittle={"Linkedin"} />
          <ProfileItemCard key={4} tittle={"Habilidades"} />
        </View>
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
    backgroundColor: "#F39F5A",
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
