import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { ListItem, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import ProjectController from "../../../utils/Networking/ProjectController";

export default function SwipeableList({
  tittle,
  status,
  refresh,
  onPressSnap,
  updateAction,
}) {
  return (
    <SafeAreaView>
      <ListItem.Swipeable
        onPress={onPressSnap}
        containerStyle={{ borderRadius: 10, overflow: "hidden", margin: 5 }}
        leftWidth={80}
        rightWidth={90}
        minSlideWidth={40}
        rightContent={(reset) => (
          <View>
            <Button
              containerStyle={{
                borderRadius: 10,
                margin: 5,
                justifyContent: "center",
              }}
              onPress={async () => {
                await updateAction();
                refresh();
                //reset();
              }}
              icon={<Icon name="thumbs-up-outline" size={35} color={"green"} />}
              buttonStyle={{ minHeight: "110%", backgroundColor: "white" }}
            />
          </View>
        )}
      >
        <Icon name="bookmark-outline" size={25} />
        <ListItem.Content>
          <ListItem.Title>{tittle}</ListItem.Title>
          <ListItem.Subtitle>{status}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron name="eye" size={30} type="ionicon" />
      </ListItem.Swipeable>
    </SafeAreaView>
  );
}

export function WorkingSwipeableList({
  tittle,
  status,

  onPressSnap,
  refresh,
  updateAction,
  updateToFinish,
}) {
  return (
    <SafeAreaView>
      <ListItem.Swipeable
        onPress={onPressSnap}
        containerStyle={{ borderRadius: 10, overflow: "hidden", margin: 5 }}
        leftWidth={80}
        rightWidth={90}
        minSlideWidth={40}
        leftContent={(reset) => (
          <Button
            containerStyle={{
              borderRadius: 10,
              margin: 5,
              justifyContent: "center",
            }}
            onPress={async () => {
              await updateAction();
              refresh();
              reset();
            }}
            icon={<Icon name="stop-circle-outline" size={35} color={"red"} />}
            buttonStyle={{ minHeight: "110%", backgroundColor: "white" }}
          />
        )}
        rightContent={(reset) => (
          <View>
            <Button
              containerStyle={{
                borderRadius: 10,
                margin: 5,
                justifyContent: "center",
              }}
              onPress={async () => {
                await updateToFinish();
                refresh();
                reset();
              }}
              icon={<Icon name="checkmark-outline" size={35} color={"green"} />}
              buttonStyle={{ minHeight: "110%", backgroundColor: "white" }}
            />
          </View>
        )}
      >
        <Icon name="bookmark-outline" size={25} />
        <ListItem.Content>
          <ListItem.Title>{tittle}</ListItem.Title>
          <ListItem.Subtitle>{status}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron name="eye" size={30} type="ionicon" />
      </ListItem.Swipeable>
    </SafeAreaView>
  );
}
