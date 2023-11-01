import React, { createContext, useReducer } from "react";

const ConfigContext = createContext();

export const ConfigAppProvider = ({ children }) => {
  const initialState = {
    isAppReady: false,
  };

  const appReducer = (state, action) => {
    switch (action.type) {
      case "SET_APP_READY":
        return { ...state, isAppReady: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <ConfigContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
