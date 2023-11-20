import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../Buttons/CustomButton";
import ConfigContext from "../../../utils/context/ConfigContext";
import NetInfo from "@react-native-community/netinfo";

export default function NoInternetConnectionModal({ hasConnection }) {
  const { dispatch } = React.useContext(ConfigContext);
  return (
    <Modal isVisible={hasConnection}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Text>Ups, No tiene conneción a internet</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignContent: "space-between",
            flexDirection: "row",
          }}
        >
          <CustomButton
            title={"Reintentar"}
            key={0}
            width={"100%"}
            onPress={() => {
              NetInfo.fetch().then((state) => {
                dispatch({ type: "SET_APP_READY", payload: state.isConnected });
              });
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
