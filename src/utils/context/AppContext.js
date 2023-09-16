import React, { useState, createContext, useReducer } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    misionData: [],
    projectTitle: "",
    FABvisibility: false,
    isOwner: false,
    projectInData: [],
  };
  const appReducer = (state, action) => {
    switch (action.type) {
      case "SET_MISION_DATA":
        return { ...state, misionData: action.payload };
      case "SET_PROJECT_TITLE":
        return { ...state, projectTitle: action.payload };
      case "SET_FAB_VISIBILITY":
        return { ...state, FABvisibility: action.payload };
      case "SET_IS_OWNER":
        return { ...state, isOwner: action.payload };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
