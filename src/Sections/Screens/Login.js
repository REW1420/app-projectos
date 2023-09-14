import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../utils/COLORS";
import CustomTextInput from "../../components/elements/Inputs/CustomTextInput";
import CustomButton from "../../components/elements/Buttons/CustomButton";
export default function Login() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.initB}>
      <View style={styles.secondary_backgroud}></View>
      <View style={styles.primary_backgroud}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 16,
            height: 200,
          }}
        ></View>

        <View style={styles.textContainer}>
          <Text style={styles.hint_text}>Bienvenido</Text>
        </View>
        <CustomTextInput
          placeholder={"Carnet"}
          secureTextEntry={false}
          onChangeText={(text) => {
            setUser(text);
          }}
        />
        <CustomTextInput
          placeholder={"Contraseña"}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPwd(text);
          }}
        />

        <View style={styles.container}>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>¿Olvido la contraseña?</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          tittle={"Iniciar sesion"}
          onPress={() => {
            console.log("Fetch to db using", user, pwd);
            navigation.navigate("TabNav");
          }}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    marginBottom: 30,
    margin: 10,
  },

  primary_backgroud: {
    backgroundColor: COLORS.primary_backgroud,
    padding: 10 * 2,
    borderRadius: 10 * 3,
    bottom: 10 * 3,
  },
  Logo: {
    width: 205,
    height: 105,
    alignSelf: "center",
    marginBottom: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    flexDirection: "row",
  },
  hint_text: {
    color: COLORS.tittle_color,
    fontSize: 25,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  initB: {
    backgroundColor: COLORS.primary_backgroud,
  },
  secondary_backgroud: {
    backgroundColor: COLORS.secondary_background,
    width: "100%",
    height: 100,
  },
});
