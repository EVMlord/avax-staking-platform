import { useContext } from "react";
import { ModalContext } from "components/widgets/Modal/ModalContext";

const useWalletContext = () => useContext(ModalContext);
export default useWalletContext;
