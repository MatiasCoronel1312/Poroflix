import { useStore } from "@/components/contexts/store";

const ModalForm = ({ children }) => {
  const handleOpenModal = useStore((state) => state.handleOpenModal);
  const handleModalContainerClick = (e) => e.stopPropagation();
  return (
    <div
      className={`bg-black/90 fixed z-40 top-0 left-0 w-full min-h-screen flex justify-center items-center`}
      onClick={handleOpenModal}
    >
      <div //modal container
        className="relative bg-black opacity-90 rounded-3xl w-96 h-150 overflow-y-auto border-3 border-[#0830c2] p-3"
        onClick={handleModalContainerClick}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalForm;
