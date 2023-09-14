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
import AlertModal from "../../components/elements/Modals/AlertModal";
import ProjectController from "../../utils/Networking/ProjectController";
import { useNavigation } from "@react-navigation/native";
const ProjecNetworking = new ProjectController();

export default function Mision() {
  const navigation = useNavigation();
  const { setIsOwner, FABvisibility } = React.useContext(AppContext);
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
    handleSetOwnerShip();
    const misionesTerminadas = projectInfo.mision.filter(
      (mision) => mision.isFinished === true
    );
    const misionesTotal = Object.keys(projectInfo.mision).length;
    setTotal(misionesTotal);
    setTotalFinished(misionesTerminadas.length);
  }, []);
  const handleSetOwnerShip = () => {
    if (projectInfo.projectOwner === "user1") {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDelete = async () => {
    const res = await ProjecNetworking.deleteFromID(projectInfo._id);
    console.log(res);
    toggleModal();
    navigation.navigate("Proyectos");
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const handleGetData = async () => {
    setRefreshing(true);
    const res = await ProjecNetworking.getSingleProjectInfo(projectInfo._id);
    setProjectInfo(res);
    console.log(res);

    setRefreshing(false);
  };
  const onRefresh = React.useCallback(() => {
    handleGetData();
  }, []);
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
                  refresh={() => onRefresh()}
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
                    refresh={() => onRefresh()}
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
        <FAB
          placement="right"
          visible={FABvisibility}
          style={{ bottom: 60 }}
          icon={{ name: "delete", color: "white" }}
          color="red"
          onPress={() => toggleModal()}
        />
        <FAB
          placement="right"
          visible={FABvisibility}
          icon={{ name: "edit", color: "white" }}
          color="green"
          onPress={() => console.log(projectInfo._id)}
        />
      </View>
      <AlertModal
        isModalVisible={isModalVisible}
        back={() => toggleModal()}
        handleDelete={() => handleDelete()}
      />
      <BottomSheet
        enablePanDownToClose={true}
        index={-1}
        initialPosition={0} // Lo establecemos en 0 para que esté en la parte inferior
        snapPoints={snapPoints} // Puedes ajustar los puntos de anclaje según tus necesidades
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
              <CustomButton tittle={"Marcar Trabajando"} />
              <CustomButton tittle={"Marcar Completado"} />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </React.Fragment>
  );
}
