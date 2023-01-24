import "react-toastify/dist/ReactToastify.min.css";

import { useLang } from "../../Context/LangContext";

import api from "../../services/api";

import { useCart } from "../../Context/CartLengthContext";
import AddPaymentMethodComponent from "./AddPaymentMethod";

const AddPaymentMethodPage = () => {
  const { routeTranslations } = useLang();

  const { setCartLength } = useCart();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;

  return (
    <>
      <AddPaymentMethodComponent
        mktName={mktName}
        api={api}
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
      />
    </>
  );
};

export default AddPaymentMethodPage;
