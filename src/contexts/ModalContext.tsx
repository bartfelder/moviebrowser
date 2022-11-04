import { createContext, useState } from "react";
import { ModalContextType, ProviderProps } from "./contextTypes";

const defaultModalContext = {
  isOpen: false,
  setIsOpen: () => {},
};

export const ModalContext =
  createContext<ModalContextType>(defaultModalContext);

export const ModalProvider = ({ children }: ProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
