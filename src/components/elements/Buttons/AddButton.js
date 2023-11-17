import React, { useState } from "react";

import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../../utils/context/AppContext";
import SearchProjectModal from "../Modals/SearchProjectModal";
import { Modal } from "react-native-paper";
const AddButton = ({}) => {
  const navigation = useNavigation();
  const [opened, setOpened] = useState(false);
  const animation = React.useRef(new Animated.Value(0)).current;
  const { dispatch, state } = React.useContext(AppContext);
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.box}>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch({
                type: "SET_SEARCH_MODAL_VISIBILITY",
                payload: true,
              });
            }}
          >
            <Animated.View
              style={[
                styles.item,
                opacity,
                {
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -100],
                      }),
                    },
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -15],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Icon name="search-outline" size={30} />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("AddProject")}
          >
            <Animated.View
              style={[
                styles.item,
                opacity,
                {
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -50],
                      }),
                    },
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -15],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Icon name="add-outline" size={40} />
            </Animated.View>
          </TouchableWithoutFeedback>
         
          <TouchableWithoutFeedback
            onPress={() => toggleOpened()}
            style={styles.addButton}
          >
            <Animated.View
              style={[
                styles.addButtonInner,
                {
                  transform: [
                    {
                      rotate: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "180deg"],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Icon name="chevron-back-outline" size={30} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <React.Fragment>
        <SearchProjectModal />
      </React.Fragment>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {},
  box: {
    width: 40,
    height: 40,
  },
  addButton: {
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
  },
  addButtonIcon: {
    width: 40,
    height: 40,
    tintColor: "white",
  },
  item: {
    position: "absolute",
    top: 5,
    left: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemIcon: {
    width: 32,
    height: 32,
    tintColor: "white",
  },
});

export default AddButton;
