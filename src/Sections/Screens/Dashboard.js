import React from "react";
import {
  ScrollView,
  Dimensions,
  Text,
  View,
  RefreshControl,
} from "react-native";

import { ProgressChart, ContributionGraph } from "react-native-chart-kit";

import DashboardController from "../../utils/Networking/DashboarController";
import { useToast } from "react-native-toast-notifications";

import ToastService from "../../components/elements/Toast/ToastService";
import AppContext from "../../utils/context/AppContext";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default function Dashboard() {
  const { state } = React.useContext(AppContext);
  const width = Dimensions.get("window").width - 25; // from react-native

  const toas = useToast();
  const dashboarNetworking = new DashboardController(toas);
  const toastService = new ToastService(toas);
  const [contributionData, setContibutionData] = React.useState(state.KPIData);
  const [_refreshing, setRefreshing] = React.useState(false);
  const [kpiProject, setKpiProject] = React.useState(state.KPIProject);

  const handleGetData = async () => {
    setRefreshing(true);
    const res = await dashboarNetworking.getDataFromID(state.userID);
    console.log("res", res);
    const usefullData = res.kpi.map((item) => ({
      count: item.count,
      date: item.date,
    }));
    setContibutionData(usefullData);
    setKpiProject(res.project);
    setRefreshing(false);
  };

  function formatDateString(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    const formattedDate = ` ${day < 10 ? "0" : ""}${day} ${month}`;

    return formattedDate;
  }

  function getTodayDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate;
  }
  console.log(kpiProject);
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={_refreshing}
            onRefresh={() => handleGetData()}
          />
        }
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",

            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 25,
            }}
          >
            Información sobre proyectos
          </Text>
          <View style={{ marginVertical: 15 }}>
            <Text style={{ fontSize: 15 }}>
              Terminados : {kpiProject.isFinished}
            </Text>
            <Text>{getTodayDate()}</Text>
            <Text style={{ fontSize: 15 }}>
              Pendientes : {kpiProject.pending}
            </Text>
            <Text>Participando: 10</Text>
          </View>

          <ProgressChart
            data={[, kpiProject.finishedPercentage]}
            width={width - 50}
            radius={20}
            height={200}
            chartConfig={chartConfig}
            center={true}
            style={{
              marginVertical: 15,
              borderRadius: 16,
            }}
          />
          <Text
            style={{
              fontSize: 25,
            }}
          >
            Contribuciones
          </Text>
          <ContributionGraph
            values={contributionData}
            endDate={getTodayDate()}
            numDays={105}
            width={width}
            height={220}
            style={{
              marginVertical: 15,
              borderRadius: 16,

              alignItems: "center",
              justifyContent: "center",
            }}
            chartConfig={chartConfig}
            onDayPress={(day) => {
              console.log(day);
              if (day.count === 0) {
                toastService.CustomToast(
                  `No hay contribuciones el día ${formatDateString(day.date)}`
                );
              } else {
                toastService.CustomToast(
                  `${formatDateString(day.date)} Contribuciones: ${day.count}`
                );
              }
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
