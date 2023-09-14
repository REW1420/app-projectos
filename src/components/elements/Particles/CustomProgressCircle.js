import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

export default function CustomProgressCircle({ progress }) {
  let progressBarColor = "green";

  if (progress < 25) {
    progressBarColor = "red";
  } else if (progress >= 25 && progress <= 50) {
    progressBarColor = "orange";
  } else if (progress === 0) {
    progressBarColor = "gray";
  }

  return (
    <View style={styles.container}>
      <CircularProgress
        radius={50}
        value={progress}
        fontSize={20}
        valueSuffix="%"
        inActiveStrokeColor="gray"
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={6}
        activeStrokeColor={progressBarColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECDFE9",
    alignItems: "center",
    justifyContent: "center",
  },
});
