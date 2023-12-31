//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import COLORS from "../../utils/COLORS";
import CustomSearchbar from "../../components/elements/Particles/CustomSearchbar";
import ItemCard from "../../components/elements/Cards/ItemCard";
import ProjectController from "../../utils/Networking/ProjectController";
import AppContext from "../../utils/context/AppContext";
import ItemShimer from "../../components/elements/Shimers/ItemShimer";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

export default function PendingProjects() {
  const toast = useToast();
  const ProjecNetworking = new ProjectController(toast);
  const { state, dispatch } = React.useContext(AppContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data2, setData2] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const handleGetData = async () => {
    const projects = await ProjecNetworking.getProjectImIn(state.userID);
    setData2(projects);
    const projectsFinished = await ProjecNetworking.getCloseProject(
      state.userID
    );
    dispatch({ type: "SET_PENDINGPROJECT_DATA", payload: projectsFinished });
    setIsLoading(true);
    setRefreshing(false);
  };
  React.useEffect(() => {
    handleGetData();
  }, []);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notFoundItem, setNoFoundItem] = useState(false);

  const handleSearch = (value) => {
    setQuery(value);

    const filter = data2.filter((item) => {
      const itemData = item.projectName.toLowerCase();
      const textData = value.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(filter);
    if (filter.length === 0) {
      setNoFoundItem(true);
    }
  };
  const onRefresh = React.useCallback(() => {
    handleGetData();

    setRefreshing(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetData();
      return () => {
        handleGetData();
      };
    }, [])
  );
  return (
    <ScrollView
      style={styles.initB}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.primary_backgroud}>
        <CustomSearchbar
          PlaceHolder={"Buscar..."}
          onChange={handleSearch}
          query={query}
        />
        {data2.length >= 1 ? (
          isLoading ? (
            filteredData.length > 0 ? (
              filteredData.map((item, i) => (
                <ItemCard
                  key={i}
                  item={item}
                  navigateFuntion={() => {
                    navigation.navigate("Mision", {
                      projectInfo: item,
                    });
                    handleGetData();
                  }}
                />
              ))
            ) : notFoundItem === true ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 25,
                }}
              >
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  Ups, No se encontraron resultados
                </Text>
              </View>
            ) : (
              data2.map((item, i) => (
                <ItemCard
                  item={item}
                  key={i}
                  navigateFuntion={() => {
                    navigation.navigate("Mision", {
                      projectInfo: item,
                    });
                    handleGetData();
                  }}
                />
              ))
            )
          ) : (
            <ItemShimer />
          )
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Ups, No hay proyectos pendinetes
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    marginBottom: 30,
    margin: 10,
  },

  primary_backgroud: {
    backgroundColor: COLORS.primary_backgroud,
    padding: 10 * 2,
    borderRadius: 10 * 3,
    bottom: 10 * 3,
  },
  Logo: {
    width: 205,
    height: 105,
    alignSelf: "center",
    marginBottom: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
    flexDirection: "row",
  },
  hint_text: {
    color: COLORS.tittle_color,
    fontSize: 25,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  initB: {
    backgroundColor: COLORS.primary_backgroud,
  },
  secondary_backgroud: {
    backgroundColor: COLORS.secondary_background,
    width: "100%",
    height: 100,
  },
});
