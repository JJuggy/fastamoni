/* eslint-disable react-native/no-inline-styles */
import React, {
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useState,
} from 'react';
import Modal from 'react-native-modal';

type ModalConfig = {
  as: 'fullscreen' | 'bottomSheet' | 'normal' | 'topSheet';
  content: ReactElement;
};

interface ContextProps {
  show: (config: ModalConfig) => void;
  close: () => void;
}

export const ModalContext = createContext({} as ContextProps);

const DynamicModalProvider = ({children}: PropsWithChildren) => {
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>(
    {} as ModalConfig,
  );

  const show = (config: ModalConfig) => {
    setShowModal(true);
    setModalConfig(config);
  };

  const close = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        show,
        close,
      }}>
      {children}
      <Modal
        style={{
          margin: 0,
          flex: 1,
          justifyContent:
            modalConfig.as === 'bottomSheet'
              ? 'flex-end'
              : modalConfig.as === 'topSheet'
              ? 'flex-start'
              : 'center',
        }}
        isVisible={showModal}
        onBackdropPress={close}
        onBackButtonPress={close}>
        {modalConfig.content}
      </Modal>
    </ModalContext.Provider>
  );
};

export default DynamicModalProvider;

export const useModal = () => useContext(ModalContext);
