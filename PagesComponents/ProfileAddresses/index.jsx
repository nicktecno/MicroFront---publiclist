import "react-toastify/dist/ReactToastify.min.css";

import { useLang } from "../../Context/LangContext";

import api from "../../services/api";
import msLocation from "../../services/msLocation";

import { useCart } from "../../Context/CartLengthContext";
import { useLocation } from "../../Context/Location";

import ProfileAddressesComponent from "./ProfileAddresses";

const ProfileAddressesPage = () => {
  const { routeTranslations } = useLang();

  const { setCartLength } = useCart();
  const { AtualizarModalPagina, setAtualizarModalPagina } = useLocation();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  const googleApiKey = process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <ProfileAddressesComponent
        AtualizarModalPagina={AtualizarModalPagina}
        setAtualizarModalPagina={setAtualizarModalPagina}
        mktName={mktName}
        api={api}
        msLocation={msLocation}
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
        googleApiKey={googleApiKey}
      />
    </>
  );
};

export default ProfileAddressesPage;
