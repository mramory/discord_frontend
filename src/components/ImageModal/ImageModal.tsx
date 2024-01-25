import Image from "next/image";
import s from "./ImageModal.module.scss"
import Modal from "react-modal"
import { RxCross2 } from "react-icons/rx"


interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    src: string;
}

export default function ImageModal({isOpen, onClose, src}: ImageModalProps) {
  return (
    <Modal
      appElement={document.getElementById('app')!}
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      contentLabel="Example Modal"
      style={{content: {
        inset: "100px",
        background: "#2B2D31",
        padding: "0",
        overflow: "hidden",
      }}}
    >
      <div className={s.closeBtn}><RxCross2 onClick={onClose} size={24} /></div>
      <Image fill className={s.image} alt="imageModal" src={src} />
    </Modal>
  );
}
