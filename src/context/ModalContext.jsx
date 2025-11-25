import { createContext, useContext, useState, useMemo } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeProperty, setActiveProperty] = useState(null);

  const openModal = (property) => setActiveProperty(property);
  const closeModal = () => setActiveProperty(null);

  const value = useMemo(() => ({ activeProperty, openModal, closeModal }), [activeProperty]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = () => useContext(ModalContext);
