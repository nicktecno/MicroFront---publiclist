import "react-toastify/dist/ReactToastify.min.css";
import { useCart } from "../../Context/CartLengthContext";

import { useLang } from "../../Context/LangContext";

import wishListApi from "../../services/msWishList";

import LikesComponent from "./LikesComponent";

const LikesPage = () => {
  const { routeTranslations } = useLang();
  const { setCartLength } = useCart();
  const headerUrl = process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL;

  return (
    <>
      <LikesComponent
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
        wishListApi={wishListApi}
        headerUrl={headerUrl}
      />
    </>
  );
};

export default LikesPage;
