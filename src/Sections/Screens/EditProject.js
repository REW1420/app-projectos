import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState, useRef, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import EditProjectCard from "../../components/elements/Cards/EditProjectCard";
import AppContext from "../../utils/context/AppContext";
import CustomTextInput from "../../components/elements/Inputs/CustomTextInput";
import { useFocusEffect } from "@react-navigation/native";
export default function EditProject() {
  const route = useRoute();
  const projectInfo = route.params?.projectInfo;

  const [numInputs, setNumInputs] = useState(projectInfo.mision.length);
  const [textValue, setTextValue] = useState("");
  const refInputs = useRef([textValue]);
  const initialMisionValues = projectInfo.mision;
  const { dispatch } = useContext(AppContext);

  const [tmpMisionData, setTempMisionData] = useState({
    mision: projectInfo.mision,
  });

  React.useEffect(() => {}, []);
  useFocusEffect(
    React.useCallback(() => {
      dispatch({ type: "SET_NEW_PROJECT_DATA", payload: initialMisionValues });
      dispatch({ type: "SET_PROJECT_ID", payload: projectInfo._id });
      return () => {
        dispatch({ type: "SET_NEW_PROJECT_TITLE", payload: "" });
        dispatch({ type: "SET_PROJECT_DEADLINE", payload: "" });
      };
    }, [])
  );
  const inputs = [];
  for (let i = 0; i < numInputs; i++) {
    misionValues = initialMisionValues[i];

    inputs.push(
      <React.Fragment key={i + 1}>
        <View
          style={{ marginTop: 15, flexDirection: "row", ...styles.container }}
        >
          <Text style={{ fontSize: 20 }}>Mision {i + 1}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 15,
          }}
        >
          <CustomTextInput
            onChangeText={(value) => setInputValue(i, value, "misionName")}
            placeholder={"Titulo"}
            value={misionValues.misionName}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 15,
          }}
        >
          <CustomTextInput
            onChangeText={(value) => setInputValue(i, value, "description")}
            placeholder={"Descripcion"}
            value={misionValues.description}
          />
        </View>
      </React.Fragment>
    );
  }
  const handleNewItems = (newData, data) => {
    const newJson = { ...data };
    newJson.mision = [...newJson.mision, ...newData];
    return newJson;
  };
  const setInputValue = (index, value, field) => {
    // Primero, almacenamos el valor de entrada en el array refInputs para rastrearlos
    const inputs = refInputs.current;
    inputs[index] = value;
    // También establecemos el valor de texto en el campo de entrada onChangeText

    const updateData = { ...tmpMisionData };
    updateData.mision[index] = {
      ...updateData.mision[index],
      id: index,
      isFinished: false,
      status: "Pendiente",
      [field]: value,
    };
    dispatch({ type: "SET_NEW_PROJECT_DATA", payload: updateData });
    console.log(updateData);
    setTextValue(value);
  };
  const addInput = () => {
    // Agregar un nuevo elemento en nuestro array refInputs
    refInputs.current.push("");
    // Aumentar el número de entradas
    setNumInputs((value) => value + 1);
  };
  const removeInput = (i) => {
    const updateData = { ...tmpMisionData };
    updateData.mision.pop();
    dispatch({ type: "SET_NEW_PROJECT_DATA", payload: updateData });
    // Eliminar del array por valor de índice
    refInputs.current.splice(i, 1);
    // Disminuir el número de entradas
    setNumInputs((value) => value - 1);
  };

  return (
    <ScrollView>
      <View>
        <EditProjectCard
          projectName={projectInfo.projectName}
          key={0}
          DATE={projectInfo.deadLine}
        />
      </View>
      {inputs}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
