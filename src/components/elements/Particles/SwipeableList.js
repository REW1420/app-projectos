import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { ListItem, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import ProjectController from "../../../utils/Networking/ProjectController";
const ProjecNetworking = new ProjectController();
const handleUpdateToWork = async (projectId, misionId) => {
  const response = await ProjecNetworking.updateMisionStatus(
    projectId,
    misionId,
    "Trabajando"
  );
  console.log(response);
};
const handleUpdateToPending = async (projectId, misionId) => {
  const response = await ProjecNetworking.updateMisionStatus(
    projectId,
    misionId,
    "Pendiente"
  );
  console.log(response);
};
const handleUpdateToFinished = async (projectId, misionId) => {
  const response = await ProjecNetworking.updateMisionStatus(
    projectId,
    misionId,
    "Terminado"
  );
  const res = await ProjecNetworking.updateMisionFinished(projectId, misionId);
  console.log(response, res);
};
export default function SwipeableList({
  tittle,
  status,
  Laction,
  Raction,
  refresh,
  onPressSnap,
  misionId,
  projectId,
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
              onPress={() => {
                console.log("res");
                handleUpdateToWork(projectId, misionId);
                refresh();
                reset()
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
  Laction,
  Raction,
  MissionDetail,
  onPressSnap,
  refresh,
  misionId,
  projectId,
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
            onPress={() => {
              handleUpdateToPending(projectId, misionId);
              refresh();
              reset();
            }}
            icon={<Icon name="stop-circle-outline" size={35} color={"red"} />}
            buttonStyle={{ minHeight: "110%", backgroundColor: "white" }}
          />
        )}
        rightContent={() => (
          <View>
            <Button
              containerStyle={{
                borderRadius: 10,
                margin: 5,
                justifyContent: "center",
              }}
              onPress={Raction}
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
