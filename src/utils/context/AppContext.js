import React, { createContext, useReducer } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    misionData: [],
    projectTitle: "",
    FABvisibility: false,
    isOwner: false,
    projectInData: [],
    newMisionData: [],
    newProjectTitle: "",
    isInTeam: false,
    projectID: "",
    userID: "",
    userInfo: {},
    innerUserInfo: {},
    alerModalVisibility: false,
    KPIData: [],
    KPIProject: [],
    pendingProjectData: [],
    deadLine: "",
    searchProjectModalVisibility: false,
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
      case "SET_NEW_PROJECT_DATA":
        return { ...state, newMisionData: action.payload };
      case "SET_NEW_PROJECT_TITLE":
        return { ...state, newProjectTitle: action.payload };
      case "SET_IS_IN_TEAM":
        return { ...state, isInTeam: action.payload };
      case "SET_PROJECT_ID":
        return { ...state, projectID: action.payload };
      case "SET_USER_ID":
        return { ...state, userID: action.payload };
      case "SET_USER_INFO":
        return { ...state, userInfo: action.payload };
      case "SET_INNER_USER_INFO":
        return { ...state, innerUserInfo: action.payload };
      case "SET_ALERTMODAL_VISIBILITY":
        return { ...state, alerModalVisibility: action.payload };
      case "SET_KPI_DATA":
        return { ...state, KPIData: action.payload };
      case "SET_PROJECT_KPI_DATA":
        return { ...state, KPIProject: action.payload };
      case "SET_PENDINGPROJECT_DATA":
        return { ...state, pendingProjectData: action.payload };
      case "SET_PROJECT_DEADLINE":
        return { ...state, deadLine: action.payload };
      case "SET_SEARCH_MODAL_VISIBILITY":
        return { ...state, searchProjectModalVisibility: action.payload };
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
