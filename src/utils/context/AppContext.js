import React, { useState, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [misionData, setMisionData] = useState([]);
  const [projectTitle, setProyectTitle] = useState("");
  const [FABvisibility, setFABvisibility] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  return (
    <AppContext.Provider
      value={{
        misionData,
        setMisionData,
        projectTitle,
        setProyectTitle,
        FABvisibility,
        setFABvisibility,
        isOwner,
        setIsOwner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
