import { View, Text } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export default function ItemShimer({ visible }) {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];
  return (
    <>
      {data.map((item, index) => (
        <View
          key={index}
          style={
            visible === true ? { marginVertical: 0 } : { marginVertical: 15 }
          }
        >
          <ShimmerPlaceholder
            style={{ height: 100, width: "100%", borderRadius: 15 }}
            visible={visible}
          ></ShimmerPlaceholder>
        </View>
      ))}
    </>
  );
}
