import { useState } from "react";

const useDisclose = () => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return { onClose, isOpen, onOpen };
};

export default useDisclose;
