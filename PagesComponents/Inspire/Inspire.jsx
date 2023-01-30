import React, { useEffect, useState } from "react";

import * as S from "./styles";

import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

// Template do site
import Loading from "../../components/Loading";

import FiltersInspireClassificationsPhotos from "../../components/FiltersInspireClassificationsPhotos";
import notification from "../../services/notification";
import { ModalInspireImagePhotobookOptions } from "../../components/ModalInspireImagePhotobookOptions";

function InspireComponent({
  wishListApi,
  mktName,
  headerUrl,
  companyId,
  setCartLength,
}) {
  const [classifications, setClassifications] = useState([]);
  const [optionNamesIds, setOptionNamesIds] = useState([]);
  const [optionId, setOptionId] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("inactive");
  const [choosedPhoto, setChoosedPhoto] = useState(false);
  const [photosPagination, setPhotosPagination] = useState(null);

  async function loadClassifications() {
    setLoading(true);
    try {
      const { data: responseList } = await wishListApi.get(
        "/photobook/public/classification",
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
            Company: companyId,
          },
        }
      );

      console.log(responseList);

      setClassifications(responseList.data);
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
        notification("Erro ao carregar a lista de Photobooks", "error");
        setLoading(false);
      }
    }
  }

  function handleOptionsId(objectNameId) {
    const filterNamesIds = optionNamesIds.filter(
      (option) => option.id === objectNameId.id
    );

    if (filterNamesIds.length > 0) {
      const filterDifferentNameIds = optionNamesIds.filter(
        (optionName) => optionName.id !== objectNameId.id
      );
      setOptionNamesIds(filterDifferentNameIds);
      const mapOnlyIds = filterDifferentNameIds.map((filter) => filter.id);
      setOptionId(mapOnlyIds);
    } else {
      setOptionNamesIds([...optionNamesIds, objectNameId]);
      setOptionId([...optionId, objectNameId.id]);
    }
  }

  async function loadPhotos() {
    if (optionId.length === 0) {
      try {
        const { data: responseList } = await wishListApi.get(
          "/photobook/public/images",
          {
            headers: {
              Type: "customer",
              "Url-Store": headerUrl,
              Company: companyId,
            },
          }
        );
        setPhotos(responseList.data);

        setPhotosPagination(responseList.links.next);
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
          notification("Erro ao carregar as fotos", "error");
        }
      }
    } else {
      const params = optionId
        .reduce(function (acc, value, index) {
          return (acc = [...acc, `classification_options[${index}]=${value}&`]);
        }, [])
        .join("");

      try {
        const { data: responseList } = await wishListApi.get(
          `/photobook/public/images?${params}`,
          {
            headers: {
              Type: "customer",
              "Url-Store": headerUrl,
              Company: companyId,
            },
          }
        );
        setPhotos(responseList.data);
        setPhotosPagination(responseList.links.next);
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
          notification("Erro ao carregar as fotos", "error");
          setLoading(false);
        }
      }
    }
  }

  async function loadMorePhotos() {
    if (optionId.length === 0) {
      try {
        const { data: responseList } = await wishListApi.get(photosPagination, {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
            Company: companyId,
          },
        });

        setPhotos([...photos, ...responseList.data]);
        setPhotosPagination(responseList.links.next);
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
          notification("Erro ao carregar as fotos", "error");
        }
      }
    } else {
      const params = optionId
        .reduce(function (acc, value, index) {
          return (acc = [...acc, `classification_options[${index}]=${value}&`]);
        }, [])
        .join("");

      try {
        const { data: responseList } = await wishListApi.get(
          photosPagination.concat(`&${params}`),
          {
            headers: {
              Type: "customer",
              "Url-Store": headerUrl,
              Company: companyId,
            },
          }
        );
        setPhotos([...photos, ...responseList.data]);
        setPhotosPagination(responseList.links.next);
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
          notification("Erro ao carregar as fotos", "error");
          setLoading(false);
        }
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    if (classifications.length === 0) {
      loadClassifications();
    }
    loadPhotos();
    setLoading(false);
  }, [optionId]);

  return (
    <>
      <ModalInspireImagePhotobookOptions
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        choosedPhoto={choosedPhoto}
        wishListApi={wishListApi}
        setCartLength={setCartLength}
        mktName={mktName}
        headerUrl={headerUrl}
      />
      <S.GeneralContainerExternal>
        <S.GeneralContainer>
          <S.BannerContainer>
            <span>Inspire-se</span>
          </S.BannerContainer>
          {loading ? (
            <Loading />
          ) : (
            <>
              <S.GeneralDataContainer>
                <S.ContainerFilters>
                  <div className="labelFilter">Filtrar</div>
                  <div className="containerFiltered">
                    {optionNamesIds.length > 0 &&
                      optionNamesIds.map((optionNameId, optionNameIdIndex) => (
                        <div className="boxNameFilter" key={optionNameIdIndex}>
                          <div className="name">{optionNameId.name}</div>
                          <div
                            className="excludeButton"
                            onClick={() => handleOptionsId(optionNameId)}
                          >
                            <CloseOutline />
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="filters">
                    <div className="title">Filtros</div>
                    <div className="classifications">
                      {classifications !== undefined &&
                        classifications.map(
                          (classification, classificationIndex) => (
                            <FiltersInspireClassificationsPhotos
                              key={classificationIndex}
                              index={classification.id}
                              classifications={classification}
                              handleOptionsId={handleOptionsId}
                              optionId={optionId}
                              wishListApi={wishListApi}
                              headerUrl={headerUrl}
                              companyId={companyId}
                            />
                          )
                        )}
                    </div>
                  </div>
                </S.ContainerFilters>
                <S.ContainerPhotosBoxes>
                  {photos !== undefined && photos.length > 0 ? (
                    <>
                      {photos.map((photo, photoIndex) => (
                        <a
                          key={photoIndex}
                          className="containerBox"
                          onClick={() => {
                            setActiveModal("active");
                            setChoosedPhoto(photo);
                            document.body.style.overflow = "hidden";
                          }}
                        >
                          <img src={photo.image} alt={photo.name} />
                        </a>
                      ))}
                      {photosPagination !== null && (
                        <div className="boxLoadMore">
                          <button
                            className="positiveButton"
                            onClick={() => loadMorePhotos()}
                          >
                            VER MAIS
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="nothing">
                      Não há fotos para a filtragem atual
                    </div>
                  )}
                </S.ContainerPhotosBoxes>
              </S.GeneralDataContainer>
            </>
          )}
        </S.GeneralContainer>
      </S.GeneralContainerExternal>
    </>
  );
}

export default InspireComponent;
