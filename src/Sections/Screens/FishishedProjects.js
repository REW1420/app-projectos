//import liraries
import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import COLORS from "../../utils/COLORS";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import CustomListItem from "../../components/elements/Particles/CustomListItem";
import CustomSearchbar from "../../components/elements/Particles/CustomSearchbar";
import ItemCard from "../../components/elements/Cards/ItemCard";
import ItemShimer from "../../components/elements/Shimers/ItemShimer";
import ProjectController from "../../utils/Networking/ProjectController";
import AppContext from "../../utils/context/AppContext";
import { useToast } from "react-native-toast-notifications";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// create a component
export default function FishishedProjects() {
  const toast = useToast();
  const ProjecNetworking = new ProjectController(toast);
  const { state } = React.useContext(AppContext);

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const user_id = useState(state.userID);
  const [data2, setData2] = useState([]);
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
  const handleGetData = async () => {
    const projects = await ProjecNetworking.getCloseProject(state.userID);
    setData2(projects);
    console.log(projects);
    setIsLoading(true);
    setRefreshing(false);
  };

  const onRefresh = React.useCallback(() => {
    handleGetData();

    setTimeout(() => {
      setRefreshing(true);
    }, 100);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Esta función se ejecutará cuando esta pantalla obtenga el foco.
      handleGetData();
      return () => {
        // Esta función se ejecutará cuando se deje esta pantalla.
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
              Ups, No hay proyectos completados
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
