import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: ReactNode;
  onClose: () => void;
  sx?: string;
};

const modalRoot = document.getElementById("modal-root");

function Modal({ children, onClose, sx }: Props) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`bg-[#26252B] p-5 rounded-md relative z-10 flex flex-col text-white ${sx}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faX} className="w-4 h-4" />
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
