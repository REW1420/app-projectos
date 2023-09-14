import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ progress }) => {
  let progressBarColor = "green";

  if (progress < 25) {
    progressBarColor = "red";
  } else if (progress >= 25 && progress <= 50) {
    progressBarColor = "orange";
  }

  return (
    <View style={[styles.progressBar, { borderColor: "white" }]}>
      <View
        style={[
          styles.progressFill,
          { width: `${progress}%`, backgroundColor: progressBarColor },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 15,
    backgroundColor: "lightgray",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
    overflow: "hidden",
    width: "90%",
  },
  progressFill: {
    height: "90%",
    borderRadius: 10,
  },
});

export default ProgressBar;
