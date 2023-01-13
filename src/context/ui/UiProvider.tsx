import { FC, useState } from "react";
import { UiContext } from "./";

interface Props {
  children: React.ReactNode;
}

export const UiProvider: FC<Props>  = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <UiContext.Provider
      value={{
        isMenuOpen,

        // Methods
        toggleSideMenu,
      }}>
      {children}
    </UiContext.Provider>
  );
};
