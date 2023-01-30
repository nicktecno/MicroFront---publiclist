import React, { useEffect, useState } from "react";

import * as S from "./styles";

function FiltersInspireClassificationsPhotos({
  classifications,
  handleOptionsId,
  optionId,
  wishListApi,
  headerUrl,
  companyId,
}) {
  const [chooseClassification, setChooseClassification] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState([]);
  console.log(companyId, headerUrl);
  async function optionsExtract() {
    setLoading(true);
    try {
      const { data: responseList } = await wishListApi.get(
        `/photobook/public/classification/${classifications.id}`,
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
            Company: companyId,
          },
        }
      );

      setOptions(responseList.data);
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
        console.log(e);
        notification("Erro ao carregar as opções das classificações", "error");
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    optionsExtract();
    // eslint-disable-next-line
  }, []);

  return (
    <S.EachClassification>
      <div
        className="containerClassification"
        onClick={() => setChooseClassification(!chooseClassification)}
      >
        <div className="name">{classifications.name}</div>
        <div className="arrow">
          <img
            src={
              chooseClassification
                ? "/images/icon-errow-up.png"
                : "/images/icon-errow-down.png"
            }
            alt=""
          />
        </div>
      </div>
      {chooseClassification &&
        options.options.length > 0 &&
        options.options.map((option, optionIndex) => (
          <S.Options key={optionIndex}>
            <div
              className={
                optionId.includes(option.id) ? "checkBox active" : "checkBox"
              }
              onClick={() =>
                handleOptionsId({ id: option.id, name: option.name })
              }
            />
            <div className="optionName">{option.name}</div>
          </S.Options>
        ))}
    </S.EachClassification>
  );
}

export default FiltersInspireClassificationsPhotos;
