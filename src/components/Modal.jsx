import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-items-center absolute top-0 z-40 backdrop-blur h-screen w-screen">
          <div className="m-auto relative z-50 min-h-[200px] min-w-[80%] bg-white">
            <div className="flex justify-end">
              <img
                className="mr-1"
                onClick={onClose}
                width={25}
                src="/close.svg"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
