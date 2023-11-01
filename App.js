import React from "react";
import { AppProvider } from "./src/utils/context/AppContext";
import { ConfigAppProvider } from "./src/utils/context/ConfigContext";
import { ToastProvider } from "react-native-toast-notifications";
import SplashScreen from "./src/Sections/Screens/SplashScreen";
import MainNavigation from "./src/Sections/Navigators/MainNavigation";
import NoInternetConnectionModal from "./src/components/elements/Modals/NoInternetConnectionModal";
export default function App() {
 
  return (
    <AppProvider>
      <ConfigAppProvider>
      <ToastProvider>
        <MainNavigation />
      </ToastProvider>
      </ConfigAppProvider>
    </AppProvider>
  );
}
