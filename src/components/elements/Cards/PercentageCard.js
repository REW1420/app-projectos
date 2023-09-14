import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import CustomProgressCircle from "../Particles/CustomProgressCircle";
const PercentageCard = ({
  percentage,
  projectName,
  total,
  missingTotal,
  daysLeft,
}) => {
  return (
    <>
      <View style={{ flexDirection: "column", ...styles.card }}>
        <View style={{ flexDirection: "row", margin: 15 }}>
          <Text style={styles.projectName}>{projectName}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View style={{ marginVertical: 10 }}>
              <Text>Misiones: {missingTotal}/{total}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Fecha de inicio</Text>
            </View>
            <View style={styles.daysRemaining}>
              <Text style={styles.daysRemainingText}>{daysLeft}d</Text>
            </View>
          </View>
          <View>
            <CustomProgressCircle progress={percentage} />
          </View>
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
  },
  daysRemainingText: {
    color: "white",
  },
});
export default PercentageCard;

function Test() {
  return (
    <View style={{ flexDirection: "column", ...styles.card }}>
      <View style={{ flexDirection: "row", margin: 15 }}>
        <Text style={styles.projectName}>projectName</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <Text>Misiones:</Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Fecha de inicio</Text>
          </View>
          <View style={styles.daysRemaining}>
            <Text style={styles.daysRemainingText}>daysLeftd</Text>
          </View>
        </View>
        <View>
          <CustomProgressCircle progress={33} />
        </View>
      </View>
    </View>
  );
}
