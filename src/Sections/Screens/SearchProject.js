import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import CustomSearchbar from "../../components/elements/Particles/CustomSearchbar";
import COLORS from "../../utils/COLORS";
import ItemCard from "../../components/elements/Cards/ItemCard";
import ProjectController from "../../utils/Networking/ProjectController";
import ItemShimer from "../../components/elements/Shimers/ItemShimer";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../utils/context/AppContext";
import { useToast } from "react-native-toast-notifications";

export default function SearchProject() {
  const toast = useToast();
  const ProjecNetworking = new ProjectController(toast);
  const { state } = React.useContext(AppContext);

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const user_id = useState(state.userID);

  const [data2, setData2] = useState([]);
  const fetchData = async () => {
    try {
      const projects = await ProjecNetworking.getProjectImNotIn(user_id);
      setData2(projects);
      setIsLoading(true);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
    console.log(data2);
  }, []);

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState({});
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
  return (
    <ScrollView style={styles.initB}>
      <View style={styles.primary_backgroud}>
        <CustomSearchbar
          PlaceHolder={"Buscar..."}
          onChange={handleSearch}
          query={query}
        />
        {isLoading ? (
          filteredData.length > 0 ? (
            filteredData.map((item, i) => (
              <ItemCard
                key={i}
                item={item}
                navigateFuntion={() => {
                  navigation.navigate("Mision", {
                    projectInfo: item,
                  });
                  fetchData();
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
                  fetchData();
                }}
              />
            ))
          )
        ) : (
          <ItemShimer />
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
