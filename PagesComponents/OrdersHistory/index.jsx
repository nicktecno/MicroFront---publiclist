import "react-toastify/dist/ReactToastify.min.css";

import { useLang } from "../../Context/LangContext";

import api from "../../services/api";
import OrdersHistoryComponent from "./OrdersHistory";

const OrderHistoryPage = () => {
  const { routeTranslations } = useLang();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;

  return (
    <>
      <OrdersHistoryComponent
        mktName={mktName}
        api={api}
        routeTranslations={routeTranslations}
      />
    </>
  );
};

export default OrderHistoryPage;
