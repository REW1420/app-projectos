import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import CustomProgressCircle from "../Particles/CustomProgressCircle";
import * as Clipboard from "expo-clipboard";
import { Button } from "react-native";
import { useToast } from "react-native-toast-notifications";
import ToastService from "../Toast/ToastService";
const PercentageCard = ({
  percentage,
  projectName,
  total,
  missingTotal,
  daysLeft,
  projecID,
}) => {
  const toas = useToast();
  const toastService = new ToastService(toas);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(projecID);
    toastService.CustomToast("ID copiado", "success");
  };

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
              <Text>
                Misiones: {missingTotal}/{total}
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Finaliza en:</Text>
            </View>
            <View style={styles.daysRemaining}>
              <Text style={styles.daysRemainingText}>{daysLeft}d</Text>
            </View>
            <Pressable onPress={() => copyToClipboard()}>
              <View style={styles.copyIDContainer}>
                <Text style={styles.copyIDText}>Copiar ID de proyecto</Text>
              </View>
            </Pressable>
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
});
export default PercentageCard;

