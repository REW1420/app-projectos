import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CustomProgressCircle from "../Particles/CustomProgressCircle";
import CustomButton from "../Buttons/CustomButton";
const FoundProjectCard = ({
  percentage,
  projectName,
  total,
  projecID,
  totalTeam,
  deadLine,
  toggleModal,
  handleJoinTeam,
  userID,
  projectOwner,
  isMemberInTeam,
  handleLeftTeam,
}) => {
  return (
    <>
      <View style={{ flexDirection: "column", ...styles.card }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.projectName}>{projectName}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View style={{ marginVertical: 10 }}>
              <Text>Misiones: {total}</Text>
            </View>
            <View>
              <Text>Integrantes: {totalTeam}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Finaliza en: {deadLine}</Text>
            </View>
          </View>

          <View>
            <CustomProgressCircle progress={percentage} />
          </View>
        </View>

        <View style={{ marginTop: 15, ...styles.rowFlexCenter }}>
          <CustomButton title={"Cancelar"} onPress={toggleModal} />
          {isMemberInTeam === false ? (
            <CustomButton title={"Unirme"} onPress={handleJoinTeam} />
          ) : userID === projectOwner ? null : (
            <CustomButton title={"Abandonar"} onPress={handleLeftTeam} />
          )}
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ color: "gray" }}>
            * El proyecto es administrado por el usuario, no se puede abadnonar
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 25,
    backgroundColor: "#ECDFE9",
  },
  percentageText: {
    fontSize: 32 * 2,
    fontWeight: "bold",
    color: "black",
  },
  projectName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  daysRemaining: {
    backgroundColor: "black",
    borderRadius: 15, // Esto hace que el fondo sea redondo
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "60%",
  },
  daysRemainingText: {
    color: "white",
  },
  copyIDContainer: {
    marginVertical: 10,
  },
  copyIDText: {
    textAlign: "right",
    color: "blue",
    textDecorationLine: "underline",
  },
  rowFlexCenter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
export default FoundProjectCard;
