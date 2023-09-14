import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
export default function ProfileItemCard({ tittle, expiration }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 15,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 15 }}>{tittle}</Text>
          <Text style={{ fontSize: 15 }}>{expiration}</Text>
        </View>
        <View style={{ margin: 20 }}>
          <Icon name="eye-outline" size={20} />
        </View>
      </View>
    </View>
  );
}
