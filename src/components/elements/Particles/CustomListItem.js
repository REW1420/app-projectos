import { View, Text } from "react-native";
import React from "react";
import { ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import ProgressBar from "./ProgressBar";
export default function CustomListItem({ item }) {
  const navigation = useNavigation();
  return (
    <View
      style={{ backgroundColor: "white", marginBottom: 15, borderRadius: 10 }}
    >
      <ListItem
        containerStyle={{ borderRadius: 20, overflow: "hidden", margin: 5 }}
        onPress={() =>
          navigation.navigate("Mision", {
            projectInfo: item,
          })
        }
      >
        <ListItem.Content>
          <ListItem.Title>{item.projectName}</ListItem.Title>
          <ListItem.Subtitle>{item.status}%</ListItem.Subtitle>
        </ListItem.Content>

        <ListItem.Chevron />
      </ListItem>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ProgressBar progress={item.status} />
      </View>
    </View>
  );
}

export function FishishedListItem({ mision, onPressAction }) {
  return (
    <ListItem
      containerStyle={{ borderRadius: 10, overflow: "hidden", margin: 5 }}
      onPress={() => {
        onPressAction();
       
      }}
    >
      <Icon name="bookmark" size={25} />
      <ListItem.Content>
        <ListItem.Title>{mision.misionName}</ListItem.Title>
        <ListItem.Subtitle>{mision.status}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron name="eye" size={30} type="ionicon" />
    </ListItem>
  );
}
