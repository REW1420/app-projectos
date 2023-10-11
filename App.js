import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/Sections/Navigators/StackNavigator";
import { AppProvider } from "./src/utils/context/AppContext";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ToastProvider>
    </AppProvider>
  );
}
