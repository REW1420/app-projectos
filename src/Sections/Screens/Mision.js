import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useContext } from "react";
import { styles } from "../../utils/Styles";
import PercentageCard from "../../components/elements/Cards/PercentageCard";
import { useRoute } from "@react-navigation/native";
import SwipeableList, {
  WorkingSwipeableList,
} from "../../components/elements/Particles/SwipeableList";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FAB } from "@rneui/themed";
import { FishishedListItem } from "../../components/elements/Particles/CustomListItem";
import CustomButton from "../../components/elements/Buttons/CustomButton";
import AppContext from "../../utils/context/AppContext";
import NewMisionModal from "../../components/elements/Modals/NewMisionModal";
import AlertModal from "../../components/elements/Modals/AlertModal";
import ProjectController from "../../utils/Networking/ProjectController";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
const ProjecNetworking = new ProjectController();

export default function Mision() {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Esta función se ejecutará cuando esta pantalla obtenga el foco.
      console.log("Pantalla enfocada");
      return () => {
        // Esta función se ejecutará cuando se deje esta pantalla.
        dispatch({ type: "SET_FAB_VISIBILITY", payload: false });
      };
    }, [])
  );

  const { state, dispatch } = React.useContext(AppContext);
  const route = useRoute();
  const [projectInfo, setProjectInfo] = React.useState(
    route.params?.projectInfo
  );
  const bottomSheetRef = React.useRef(null);

  const [itemDescription, setItemDescription] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const handleSnapPress = React.useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const snapPoints = ["30%"];
  const [totalFinished, setTotalFinished] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    handleGetData();
    handleSetOwnerShip();
    handleIsInTeam();
    dispatch({ type: "SET_PROJECT_ID", payload: projectInfo._id });

    const misionesTerminadas = projectInfo.mision.filter(
      (mision) => mision.isFinished === true
    );
    const misionesTotal = Object.keys(projectInfo.mision).length;
    setTotal(misionesTotal);
    setTotalFinished(misionesTerminadas.length);
  }, []);
  const handleSetOwnerShip = () => {
    if (projectInfo.projectOwner === "user1") {
      dispatch({ type: "SET_IS_OWNER", payload: true });
      console.log(true);
    } else {
      dispatch({ type: "SET_IS_OWNER", payload: false });
      console.log(false);
    }
  };
  const handleIsInTeam = () => {
    dispatch({ type: "SET_IS_IN_TEAM", payload: projectInfo.isMemberInTeam });
  };
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisibleStop, setModalVisibleStop] = React.useState(false);
  const [isModalVisibleStart, setModalVisibleStart] = React.useState(false);

  const toggleModalStart = () => {
    setModalVisibleStart(!isModalVisibleStart);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalStop = () => {
    setModalVisibleStop(!isModalVisibleStop);
  };
  const handleDelete = async () => {
    const res = await ProjecNetworking.deleteFromID(projectInfo._id);
    console.log(res);
    toggleModal();
    navigation.navigate("Proyectos");
  };
  const handleCloseProject = async () => {
    const res = await ProjecNetworking.updateProjectClose(
      projectInfo._id,
      true
    );
    console.log(res);
    toggleModal();
    navigation.navigate("Proyectos");
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const handleGetData = async () => {
    const res = await ProjecNetworking.getSingleProjectInfo(projectInfo._id);

    setMisionId(res.lastMissionId);
    setProjectInfo(res);
    console.log(res);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleGetData();
    setRefreshing(false);
  }, []);
  const [misionId, setMisionId] = React.useState("");

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
    const res = await ProjecNetworking.updateMisionFinished(
      projectId,
      misionId
    );
    console.log(response, res);
  };
  const handleStartProject = async () => {
    const res = await ProjecNetworking.updateProjectClose(
      projectInfo._id,
      false
    );
    console.log(res);
    toggleModal();
    navigation.navigate("Proyectos");
  };

  const [isNewModalVisible, setIsNewModalVisible] = React.useState(false);
  const toggleNewModal = () => {
    setIsNewModalVisible(!isNewModalVisible);
  };
  return (
    <React.Fragment>
      <ScrollView
        style={styles.initB}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.primary_backgroud}>
          <View style={styles.textContainer}>
            <Text style={styles.hint_text}>Misiones</Text>
          </View>

          <PercentageCard
            percentage={projectInfo.progress}
            projectName={projectInfo.projectName}
            total={total}
            missingTotal={totalFinished}
            daysLeft={projectInfo.daysLeft}
          />
          <View style={styles.textContainerRigth}>
            <Text style={styles.hint_text}>Trabajando</Text>
          </View>
          {projectInfo.mision.map((item, index) => {
            if (item.status === "Trabajando") {
              return (
                <WorkingSwipeableList
                  key={index}
                  tittle={item.misionName}
                  status={item.status}
                  misionId={item.id}
                  projectId={projectInfo._id}
                  refresh={() => handleGetData()}
                  updateAction={() =>
                    handleUpdateToPending(projectInfo._id, item.id)
                  }
                  updateToFinish={() => {
                    handleUpdateToFinished(projectInfo._id, item.id);
                  }}
                />
              );
            }
          })}

          <View style={styles.textContainerRigth}>
            <Text style={styles.hint_text}>Pendientes</Text>
          </View>
          {projectInfo.mision.every((item) => item.isFinished === true) ? (
            <Text>Nada</Text>
          ) : (
            projectInfo.mision.map((item, index) => {
              if (item.isFinished !== true && item.status === "Pendiente") {
                return (
                  <SwipeableList
                    key={index}
                    tittle={item.misionName}
                    status={item.status}
                    MissionDetail={item.description}
                    misionId={item.id}
                    projectId={projectInfo._id}
                    refresh={() => handleGetData()}
                    updateAction={() =>
                      handleUpdateToWork(projectInfo._id, item.id)
                    }
                    onPressSnap={() => {
                      handleSnapPress(0);
                    }}
                  />
                );
              } else {
                return null;
              }
            })
          )}

          <View style={styles.textContainerRigth}>
            <Text style={styles.hint_text}>Terminadas</Text>
          </View>

          {projectInfo.mision.every((item) => item.isFinished !== true) ? (
            <Text>Nada</Text>
          ) : (
            projectInfo.mision.map((item, index) => {
              if (item.isFinished === true) {
                return <FishishedListItem key={index} mision={item} />;
              } else {
                return null; // Devuelve null en lugar de "Nada" si no quieres renderizar nada
              }
            })
          )}
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 5,
          flexGrow: 1,
          flexDirection: "row",
        }}
      >
        {projectInfo.isProjectClose === true ? (
          <FAB
            placement="right"
            visible={state.FABvisibility}
            style={{ bottom: 60 }}
            icon={{ name: "delete", color: "white" }}
            color="red"
            onPress={() => toggleModal()}
          />
        ) : null}
        {projectInfo.isProjectClose === true ? (
          <FAB
            placement="right"
            visible={state.FABvisibility}
            icon={{ name: "play", color: "white", type: "ionicon" }}
            color="green"
            onPress={() => toggleModalStart()}
          />
        ) : (
          <FAB
            placement="right"
            visible={state.FABvisibility}
            style={{ bottom: 60 }}
            icon={{ name: "stop", color: "white" }}
            color="orange"
            onPress={() => toggleModalStop()}
          />
        )}
        {projectInfo.isProjectClose === true ? null : (
          <>
            <FAB
              placement="right"
              visible={state.FABvisibility}
              icon={{ name: "edit", color: "white" }}
              color="green"
              onPress={() => {
                navigation.navigate("editProject", {
                  projectInfo: projectInfo,
                });
              }}
            />
            <FAB
              placement="right"
              visible={state.FABvisibility}
              icon={{ name: "add", color: "white" }}
              color="green"
              style={{ bottom: 120 }}
              onPress={() => {
                toggleNewModal();
              }}
            />
          </>
        )}
      </View>
      <AlertModal
        title={"¿Estas seguro de eliminar el projecto?"}
        isModalVisible={isModalVisible}
        back={() => toggleModal()}
        handleDelete={() => handleDelete()}
      />
      <AlertModal
        title={"¿Estas seguro de detener el projecto?"}
        isModalVisible={isModalVisibleStop}
        back={() => toggleModalStop()}
        handleDelete={() => handleCloseProject()}
      />
      <AlertModal
        title={"¿Estas seguro de continuar el projecto?"}
        isModalVisible={isModalVisibleStart}
        back={() => toggleModalStart()}
        handleDelete={() => handleStartProject()}
      />
      <NewMisionModal
        title={"Agregar nueva mision"}
        isModalVisible={isNewModalVisible}
        back={() => toggleNewModal()}
        id={projectInfo.lastMissionId}
        projectID={projectInfo._id}
      />
      <BottomSheet
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
      >
        <BottomSheetView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 20 }}>Descipción de la Mision</Text>
          </View>
          <Text style={{ margin: 15 }}>{itemDescription}</Text>
          <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <CustomButton
                title={"Marcar Trabajando"}
                onPress={() => {
                  handleSnapPress(0);
                  handleGetData();
                }}
              />
              <CustomButton title={"Marcar Completado"} />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </React.Fragment>
  );
}
