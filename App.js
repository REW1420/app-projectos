import React from "react";
import { AppProvider } from "./src/utils/context/AppContext";
import { ConfigAppProvider } from "./src/utils/context/ConfigContext";
import { ToastProvider } from "react-native-toast-notifications";
import MainNavigation from "./src/Sections/Navigators/MainNavigation";
import { StatusBar } from "expo-status-bar";
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
