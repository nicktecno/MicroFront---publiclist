import { useEffect, useState } from "react";
import * as S from "./style";
import MultipleSelectCheckmarksPromoterClassifications from "../MultipleSelectCheckmarksPromoterClassifications";

import { User } from "@styled-icons/boxicons-regular/User";

import notification from "../../services/notification";

import SelectPromoterClassifications from "../SelectPromoterClassifications";

export default function BoxPromoterAssociationRequest({
  seller,
  classificationFather,
  requestMyAssociations,
  setCartLength,
  api,
  wishListApi,
  headerUrl,
}) {
  const [loading, setLoading] = useState(false);
  const [classificationId, setClassificationId] = useState([]);
  const [classificationName, setClassificationName] = useState([]);
  const [option, setOption] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [, setStatusUpdate] = useState(false);

  async function handleAssociation() {
    setLoading(true);

    const reduceOption = option
      .map((subOption) => {
        const reduceSubOption = subOption.refineId.map((optionsZ) => optionsZ);
        return reduceSubOption;
      })
      .flat();

    const dataAssociation = { seller_id: seller.id, options: reduceOption };
    try {
      await api.post("/customer/promoter/association", dataAssociation);
      requestMyAssociations();
      notification("Associação enviada com sucesso", "success");
      setLoading(false);
    } catch (e) {
      if (e.response?.data.message === "Não Autorizado.") {
        notification("Sua sessão expirou, faça o login novamente", "error");

        sessionStorage.setItem("urlantiga", window.location.href);
        setLoading(false);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      } else {
        notification("Erro ao associar lojista", "error");
        document.body.style.overflow = "auto";

        setLoading(false);
      }
    }
  }

  useEffect(() => {
    setClassifications(classificationFather);
    // eslint-disable-next-line
  }, []);

  return (
    <S.BoxSeller>
      <div className="containerLogoName">
        <div className="boxLogo">
          {seller.logo === "" ? (
            <User />
          ) : (
            <img
              src={seller.logo}
              alt={`imagem da logo da empresa ${seller.name}`}
            />
          )}
        </div>
        <div className="boxName">{seller.name}</div>
        <div className="containerAssociation mobile">
          {option.length > 0 && (
            <>
              {loading ? (
                <img
                  src="/images/loadingIcon.svg"
                  alt="Carregando"
                  style={{ width: "30px", marginRight: "10px" }}
                />
              ) : (
                <div className="requestAssociation" onClick={handleAssociation}>
                  PEDIR ASSOCIAÇÃO
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="containerSelection">
        <div className="boxMultipleSelect">
          <SelectPromoterClassifications
            classifications={classifications}
            classificationId={classificationId}
            setClassificationId={setClassificationId}
            classificationName={classificationName}
            setClassificationName={setClassificationName}
            setStatusUpdate={setStatusUpdate}
          />
          {classificationName.length > 0 && (
            <div className="containerSelectOptions">
              {classificationName.map((miniClassificationName, index) => (
                <MultipleSelectCheckmarksPromoterClassifications
                  key={index}
                  classificationName={miniClassificationName}
                  classifications={classifications}
                  classificationNameFather={classificationName}
                  option={option}
                  setOption={setOption}
                  setLoading={setLoading}
                  api={api}
                  wishListApi={wishListApi}
                  setCartLength={setCartLength}
                  headerUrl={headerUrl}
                />
              ))}
            </div>
          )}
        </div>
        <div className="containerAssociation">
          {option.length > 0 && (
            <>
              {loading ? (
                <img
                  src="/images/loadingIcon.svg"
                  alt="Carregando"
                  style={{ width: "30px", marginRight: "10px" }}
                />
              ) : (
                <div className="requestAssociation" onClick={handleAssociation}>
                  PEDIR ASSOCIAÇÃO
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </S.BoxSeller>
  );
}
