import { createContext, useContext, useState } from "react";
import { preRegisterList as initialList } from "../data/preRegisterData";

const PreRegisterContext = createContext(null);

export function PreRegisterProvider({ children }) {
  const [preRegList, setPreRegList] = useState(initialList);

  function addPreReg(newItem) {
    const id = `PR${String(preRegList.length + 1).padStart(3, "0")}_NEW`;
    setPreRegList(prev => [...prev, {
      id,
      ...newItem,
      status: "반입예정",
      invoiceFile: newItem.invoiceFile || null,
    }]);
  }

  return (
    <PreRegisterContext.Provider value={{ preRegList, addPreReg }}>
      {children}
    </PreRegisterContext.Provider>
  );
}

export function usePreRegisterContext() {
  return useContext(PreRegisterContext);
}