import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ProgressBar from "../Particles/ProgressBar";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

import { useNavigation } from "@react-navigation/native";
export default function ItemCard({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{ marginBottom: 10 }}
      onPress={() =>
        navigation.navigate("Mision", {
          projectInfo: item,
        })
      }
    >
      <View style={{ backgroundColor: "white", borderRadius: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <Text style={{ fontSize: 15 }}>{item.projectName}</Text>
          </View>
          <View style={{ margin: 20 }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            flexDirection: "row",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {item.progress !== undefined ? (
            <ProgressBar progress={item.progress} />
          ) : (
            <ProgressBar progress={"10"} />
          )}
          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 15 }}>{item.progress}%</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
