import { View, Text, ScrollView, RefreshControl } from "react-native";
import React from "react";
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
import { useToast } from "react-native-toast-notifications";
import ToastService from "../../components/elements/Toast/ToastService";
import Icon from "react-native-vector-icons/Ionicons";
import DashboardController from "../../utils/Networking/DashboarController";
import { Pressable } from "react-native";

export default function Mision() {
  const toast = useToast();
  const toastService = new ToastService(toast);
  const ProjecNetworking = new ProjectController(toast);
  const dashboardNetworking = new DashboardController(toast);

  const navigation = useNavigation();
  const [showFinishedOptions, setShowFinishedOptions] = React.useState(false);
  const [deleteNisionModalVisibility, setDeleteMisionModalVisibility] =
    React.useState(false);
  const [misionID, setMisionID] = React.useState("");
  const [isMissionFinished, setIsMissionFinished] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      // Esta función se ejecutará cuando esta pantalla obtenga el foco.

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
  const bottomSheetRef2 = React.useRef(null);

  const [itemDescription, setItemDescription] = React.useState("");
  const [MISIONID, SETMISIONID] = React.useState("");

  const handleSnapPress = React.useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleSnapPress2 = React.useCallback((index) => {
    bottomSheetRef2.current?.snapToIndex(index);
  }, []);

  const snapPoints = ["30%"];

  React.useEffect(() => {
    handleGetData();
    handleSetOwnerShip();
    handleIsInTeam();
    dispatch({ type: "SET_PROJECT_ID", payload: projectInfo._id });
    dispatch({ type: "SET_IS_IN_TEAM", payload: projectInfo.isMemberInTeam });
  }, []);

  const handleSetOwnerShip = () => {
    if (projectInfo.projectOwner === state.userID) {
      dispatch({ type: "SET_IS_OWNER", payload: true });
    } else {
      dispatch({ type: "SET_IS_OWNER", payload: false });
    }
  };
  const handleIsInTeam = () => {};
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

    toggleModal();
    navigation.navigate("Proyectos");
  };
  const handleCloseProject = async () => {
    const res = await ProjecNetworking.updateProjectClose(
      projectInfo._id,
      true
    );

    toggleModal();
    navigation.navigate("Proyectos");
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const handleGetData = async () => {
    const res = await ProjecNetworking.getSingleProjectInfo(
      projectInfo._id,
      state.userID
    );

    setProjectInfo(res);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleGetData();
    handleIsInTeam();
    setRefreshing(false);
  }, []);

  const handleStartProject = async () => {
    const res = await ProjecNetworking.updateProjectClose(
      projectInfo._id,
      false
    );

    toggleModal();
    navigation.navigate("Proyectos");
  };

  const [isNewModalVisible, setIsNewModalVisible] = React.useState(false);
  const toggleNewModal = () => {
    setIsNewModalVisible(!isNewModalVisible);
  };

  const handleLeaveProject = async () => {
    await ProjecNetworking.leaveProject(projectInfo._id, state.userID).finally(
      () => {
        toastService.CustomToast("Hecho", "success");
        navigation.navigate("TabNav");
        dispatch({
          type: "SET_ALERTMODAL_VISIBILITY",
          payload: false,
        });
      }
    );
  };

  const handleUpdateMisionStatus = async (_mision_id, _status, _isFinished) => {
    const response = await ProjecNetworking.updateMissionStatusv2(
      _isFinished,
      _status,
      projectInfo._id,
      _mision_id
    );
    setProjectInfo(response);
    handleCloseBottomSheet();
  };

  const toggleDeleteMisionAlert = () => {
    setDeleteMisionModalVisibility(!deleteNisionModalVisibility);
  };
  const handleDeleteMision = async () => {
    const res = await ProjecNetworking.DeleteSingleMision(
      projectInfo._id,
      misionID,
      state.userID
    );
    setProjectInfo(res);
    toggleDeleteMisionAlert();
    handleCloseBottomSheet();
  };
  const handleCloseBottomSheet = () => bottomSheetRef.current.close();

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
            total={projectInfo.total}
            missingTotal={projectInfo.completedMisions}
            daysLeft={projectInfo.daysLeft}
            projecID={projectInfo._id}
            key={0}
          />

          <View style={styles.textContainerRigth}>
            <Text style={styles.hint_text}>Trabajando</Text>
          </View>

          {projectInfo.mision.every((item) => item.status !== "Trabajando") ? (
            <View>
              <Text>Escoge misiones para continuar el proyecto</Text>
            </View>
          ) : (
            projectInfo.mision.map((item, index) => {
              if (item.status === "Trabajando") {
                return (
                  <WorkingSwipeableList
                    key={index}
                    tittle={item.misionName}
                    status={item.status}
                    misionId={item.id}
                    projectId={projectInfo._id}
                    updateAction={() =>
                      handleUpdateMisionStatus(item._id, "Pendiente", false)
                    }
                    updateToFinish={async () => {
                      await handleUpdateMisionStatus(
                        item._id,
                        "Terminado",
                        true
                      );
                      dashboardNetworking.addContribution(state.userID);
                    }}
                    onPressSnap={() => {
                      handleSnapPress2(0);
                      setItemDescription(item.description);
                      SETMISIONID(item._id);
                    }}
                  />
                );
              }
            })
          )}
          <View style={styles.textContainerRigth}>
            <Text style={styles.hint_text}>Pendientes</Text>
          </View>
          {projectInfo.mision.every((item) => item.status !== "Pendiente") ? (
            <Text>No hay tareas pendientes aun</Text>
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
                    updateAction={() =>
                      handleUpdateMisionStatus(item._id, "Trabajando", false)
                    }
                    onPressSnap={() => {
                      handleSnapPress(0);
                      setMisionID(item._id);
                      setItemDescription(item.description);
                      setShowFinishedOptions(false);
                      SETMISIONID(item._id);
                    }}
                  />
                );
              }
            })
          )}

          <View style={styles.textContainerRigth}>
            <Text style={styles.hint_text}>Terminadas</Text>
          </View>

          {projectInfo.mision.every(
            (item) => item.isFinished !== true && item.status !== "Terminado"
          ) ? (
            <Text>Completa una mision para verla aqui</Text>
          ) : (
            projectInfo.mision.map((item, index) => {
              if (item.isFinished === true) {
                return (
                  <FishishedListItem
                    key={index}
                    mision={item}
                    onPressAction={() => {
                      handleSnapPress(0);
                      setItemDescription(item.description);
                      setIsMissionFinished(item.isFinished);
                      setShowFinishedOptions(true);
                      SETMISIONID(item._id);
                    }}
                  />
                );
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
        title={"¿Estas seguro de reaunar el projecto?"}
        isModalVisible={isModalVisibleStart}
        back={() => toggleModalStart()}
        handleDelete={() => handleStartProject()}
      />
      <AlertModal
        title={"¿Esta seguro de dejar el proyecto?"}
        isModalVisible={state.alerModalVisibility}
        back={() => {
          dispatch({
            type: "SET_ALERTMODAL_VISIBILITY",
            payload: false,
          });
        }}
        handleDelete={() => {
          handleLeaveProject();
        }}
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
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 20 }}>Descipción de la Mision</Text>
            {state.isOwner &&
              !projectInfo.isProjectClose &&
              !isMissionFinished && (
                <Pressable
                  style={{
                    marginLeft: 10,
                  }}
                  onPress={() => toggleDeleteMisionAlert()}
                >
                  <Icon name="trash-outline" size={30} color={"red"} />
                </Pressable>
              )}
          </View>
          <Text style={{ margin: 15 }}>{itemDescription}</Text>
          <View style={{ marginTop: 15 }}>
            {showFinishedOptions === true ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {state.isOwner ? (
                  <CustomButton
                    title={"Desmarcar completado"}
                    onPress={async () => {
                      handleUpdateMisionStatus(MISIONID, "Pendiente", false);
                    }}
                  />
                ) : null}
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!projectInfo.isProjectClose && (
                  <React.Fragment>
                    <CustomButton
                      title={"Marcar Trabajando"}
                      onPress={() => {
                        handleUpdateMisionStatus(MISIONID, "Trabajando", false);
                      }}
                    />

                    <CustomButton
                      title={"Marcar Completado"}
                      onPress={async () => {
                        await handleUpdateMisionStatus(
                          MISIONID,
                          "Terminado",
                          true
                        );
                        dashboardNetworking.addContribution(state.userID);
                      }}
                    />
                  </React.Fragment>
                )}
              </View>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        ref={bottomSheetRef2}
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
          <View style={{ margin: 15 }}>
            <Text>{itemDescription}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomButton
                title={"Marcar Pendiente"}
                onPress={() => {
                  handleUpdateMisionStatus(MISIONID, "Pendiente", false);
                }}
              />

              <CustomButton
                title={"Marcar Completado"}
                onPress={async () => {
                  await handleUpdateMisionStatus(MISIONID, "Terminado", true);
                  dashboardNetworking.addContribution(state.userID);
                }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <AlertModal
        isModalVisible={deleteNisionModalVisibility}
        back={toggleDeleteMisionAlert}
        handleDelete={handleDeleteMision}
        title={"¿Esta seguro de eliminar la mision?"}
        key={0}
      />
    </React.Fragment>
  );
}
