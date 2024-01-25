import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  s?: any;
}

export const CustomModal = ({
  children,
  isOpen,
  onClose,
  onAfterClose,
  s,
}: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s?.modal}
      onAfterClose={onAfterClose}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        },
      }}
    >
      {children}
    </Modal>
  );
};
