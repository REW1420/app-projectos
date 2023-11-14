import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import AppContext from "../../../utils/context/AppContext";
import CustomButton from "../Buttons/CustomButton";
import Icon from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import ProjectController from "../../../utils/Networking/ProjectController";
import ToastService from "../Toast/ToastService";
import { useToast, ToastProvider } from "react-native-toast-notifications";
import * as Clipboard from "expo-clipboard";
import FoundProjectCard from "../Cards/FoundProjectCard";
export default function SearchProjectModal() {
  const toas = useToast();
  const projectNetworking = new ProjectController(toas);
  const toastService = new ToastService(toas);
  const { state, dispatch } = React.useContext(AppContext);
  const [queryID, setQueryID] = React.useState("");
  const [error, setError] = React.useState(false);
  const [projectFound, setProjectFound] = React.useState(false);
  const [projectData, setProjectData] = React.useState();
  const [projectFoundError, setProjectFoundError] = React.useState(false);

  const toggleModal = () => {
    dispatch({
      type: "SET_SEARCH_MODAL_VISIBILITY",
      payload: false,
    });
    setError(false);
    setProjectFoundError(false);
    setProjectFound(false);
    setQueryID("");
  };
  const handleSearchProject = async () => {
    if (queryID === "" || queryID === undefined || queryID === null) {
      setError(true);
      return;
    }
    const res = await projectNetworking.getSingleProjectInfo(
      queryID,
      state.userID
    );

    if (res.status === 404) {
      console.log("no se encontro protecto");
      setProjectFoundError(true);
    } else if (res.status === 200) {
      setProjectData(res);
      setProjectFound(true);
    }
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync({
      preferredFormat: Clipboard.StringFormat.PLAIN_TEXT,
    });

    setQueryID(text);
  };
  const handleChangeText = (text) => {
    setQueryID(text);
  };
  const handleJoinTeam = async () => {
    await projectNetworking
      .updateJoinTeam(queryID, state.userID)
      .then(() => toggleModal());
  };
  const handleLeftTeam = async () => {
    await projectNetworking.leaveProject(queryID, state.userID).then(() => {
      toggleModal();
    });
  };
  return (
    <Modal
      isVisible={state.searchProjectModalVisibility}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
    >
      {projectFound ? (
        <FoundProjectCard
          daysLeft={projectData.daysLeft}
          total={projectData.mision.length}
          percentage={projectData.progress}
          projectName={projectData.projectName}
          deadLine={projectData.deadLine}
          totalTeam={projectData.team.length}
          key={0}
          projecID={queryID}
          handleJoinTeam={() => console.log("join team")}
          toggleModal={toggleModal}
          userID={state.userID}
          teamData={projectData.team}
          handleLeftTeam={handleLeftTeam}
          isMemberInTeam={projectData.isMemberInTeam}
          projectOwner={projectData.projectOwner}
        />
      ) : (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 15,
            }}
          >
            <Text style={{ fontSize: 25 }}>Buscar proyecto por ID</Text>
            <View
              style={{
                alignItems: "center",
                marginTop: 15,
                flexDirection: "row",
              }}
            >
              <TextInput
                placeholder="Ingrese el ID"
                style={{
                  width: 200,
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 15,
                }}
                value={queryID}
                onChangeText={(text) => handleChangeText(text)}
              />

              <Pressable
                style={{ marginHorizontal: 5, ...styles.centerContent }}
              >
                <Icon
                  name="clipboard-outline"
                  size={30}
                  onPress={fetchCopiedText}
                />
              </Pressable>
            </View>

            <View style={{ marginVertical: 15 }}>
              {error && <Text style={{ color: "red" }}>Ingrese un ID</Text>}
              {projectFoundError && (
                <Text style={{ color: "red" }}>No se encontro el proyecto</Text>
              )}
            </View>

            <View style={{ flexDirection: "row" }}>
              <CustomButton title={"Cancelar"} onPress={toggleModal} />
              <CustomButton title={"Buscar"} onPress={handleSearchProject} />
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    height: 50,

    fontSize: 14,
    fontWeight: "500",
    borderRadius: 50,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
