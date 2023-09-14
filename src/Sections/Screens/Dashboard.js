import React from "react";
import {
  ScrollView,
  StatusBar,
  Dimensions,
  Text,
  ScrollableTabView,
  View,
} from "react-native";
//import ScrollableTabView from 'react-native-scrollable-tab-view'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { contributionData, pieChartData, progressChartData } from "./data";
import AddButton from "../../components/elements/Buttons/AddButton";
// in Expo - swipe left to see the following styling, or create your own
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
  legend: ["Titulo"],
};
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

const data2 = [
  {
    name: "Enero",
    population: 20,
    color: "#FF5733",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Febrero",
    population: 45,
    color: "#33FF57",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Marzo",
    population: 28,
    color: "#5733FF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Abril",
    population: 80,
    color: "#FF5733",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Mayo",
    population: 99,
    color: "#33FF57",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];
export default function Dashboard() {
  const width = Dimensions.get("window").width - 50; // from react-native
  const height = 220;

  return (
    <>
      <ScrollView>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Bezier Line Chart</Text>

          <ProgressChart
            data={progressChartData}
            width={300}
            height={200}
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          <ContributionGraph
            values={[
              { date: "2017-01-02", count: 1 },
              { date: "2017-01-03", count: 2 },
              { date: "2017-01-04", count: 3 },
              { date: "2017-01-05", count: 4 },
              { date: "2017-01-06", count: 5 },
              { date: "2017-01-30", count: 2 },
              { date: "2017-01-31", count: 3 },
              { date: "2017-03-01", count: 2 },
              { date: "2017-04-02", count: 4 },
              { date: "2017-03-05", count: 2 },
              { date: "2017-02-30", count: 4 },
            ]}
            endDate={new Date("2017-04-01")}
            numDays={105}
            width={width}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      </ScrollView>

    </>
  );
}
