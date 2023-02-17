import "react-toastify/dist/ReactToastify.min.css";
import { useCart } from "../../Context/CartLengthContext";
import { useLang } from "../../Context/LangContext";
import { Context } from "../../Context/AuthContext";
import { useContext } from "react";
import { useLocation } from "../../Context/Location";

import api from "../../services/api";
import wishListApiUnlogged from "../../services/msWishListUnlogged";
import wishListApi from "../../services/msWishList";

import PubliclistComponent from "./publiclistPage";

const PubliclistPage = () => {
  const { routeTranslations } = useLang();
  const { validaLogin } = useContext(Context);
  const { setCartLength } = useCart();
  const { localizado, setModal } = useLocation();
  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  const companyId = process.env.NEXT_PUBLIC_REACT_APP_COMPANY_ID;
  const appUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;
  const appHeaderUrl = process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL;
  const appImages = process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL;

  return (
    <>
      <PubliclistComponent
        api={api}
        wishListApiUnlogged={wishListApiUnlogged}
        wishListApi={wishListApi}
        validaLogin={validaLogin}
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
        located={localizado}
        setModal={setModal}
        mktName={mktName}
        companyId={companyId}
        appUrl={appUrl}
        appHeaderUrl={appHeaderUrl}
        appImages={appImages}
      />
    </>
  );
};

export default PubliclistPage;
