import "react-toastify/dist/ReactToastify.min.css";
import { useCart } from "../../Context/CartLengthContext";

import { useLang } from "../../Context/LangContext";

import api from "../../services/api";
import wishListApi from "../../services/msWishList";

import PhotobookComponent from "./Photobook";

const PhotobookPage = () => {
  const { routeTranslations } = useLang();
  const { setCartLength } = useCart();
  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  const headerUrl = process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL;
  const appUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;
  return (
    <>
      <PhotobookComponent
        mktName={mktName}
        api={api}
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
        wishListApi={wishListApi}
        headerUrl={headerUrl}
        appUrl={appUrl}
      />
    </>
  );
};

export default PhotobookPage;
