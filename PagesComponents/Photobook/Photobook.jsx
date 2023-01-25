import React, { useEffect, useState } from "react";

import * as S from "./style";

import Loading from "../../Loading";

import { User } from "@styled-icons/boxicons-regular/User";
import { ShareAlt } from "@styled-icons/boxicons-solid/ShareAlt";
import { PencilSquare } from "@styled-icons/bootstrap/PencilSquare";

import ModalPromoterProfileEdit from "../../components/ModalPromoterProfileEdit";
import BoxPromoterAssociationRequest from "../../components/BoxPromoterAssociationRequest";
import notification from "../../services/notification";
import BoxPromoterMyAssociations from "../../components/BoxPromoterMyAssociations";

import { PlusSquare } from "@styled-icons/bootstrap/PlusSquare";

import BoxPhotobookConfigPhotobook from "../../components/BoxPhotobookConfigPhotobook";
import ModalPhotobookAddNewPhotobook from "../../components/ModalPhotobookAddNewPhotobook";
import ModalPromoterShareProfile from "../../components/ModalPromoterShareProfile";

import BoxPromoterMyComissions from "../../components/BoxPromoterMyComissions";
import ModalPhotobookSharePhotobook from "../../components/ModalPhotobookSharePhotobook";
import BoxPromoterMySales from "../../components/BoxPromoterMySales";
import ReactInputMask from "react-input-mask";

function PhotobookComponent({
  api,
  setCartLength,
  wishListApi,
  mktName,
  routeTranslations,
  wishListApi,
  headerUrl,
  appUrl,
}) {
  const [photobookProfileModalActive, setPhotobookProfileModalActive] =
    useState("inactive");
  const [activeAssociateSellers, setActiveAssociateSellers] =
    useState("active");

  const [activeMyAssociations, setActiveMyAssociations] = useState("inactive");
  const [loading, setLoading] = useState(false);

  const [myAllAssociations, setMyAllAssociations] = useState([]);
  const [promoterUnlocked, setPromoterUnlocked] = useState(false);
  const [classificationFather, setClassificationFather] = useState([]);
  const [initialDateComissions, setInitialDateComissions] = useState("");
  const [finalDateComissions, setFinalDateComissions] = useState("");
  const [initialDateSales, setInitialDateSales] = useState("");
  const [finalDateSales, setFinalDateSales] = useState("");
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [paginationSales, setPaginationSales] = useState(null);

  const [allProfileData, setAllProfileData] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [description, setDescription] = useState(null);
  const [imgProfile, setImgProfile] = useState([]);
  const [cover, setCover] = useState([]);
  const [myAssociations, setMyAssociations] = useState([]);
  const [listSellersRefined, setListSellersRefined] = useState([]);
  const [idMyPhotobook, setIdMyPhotobook] = useState(false);

  const [shareModal, setShareModal] = useState("inactive");
  const [sharePhotobookModal, setSharePhotobookModal] = useState("inactive");
  const [activeMyPhotobook, setActiveMyPhotobook] = useState("inactive");
  const [activeMySales, setActiveMySales] = useState("inactive");
  const [activeMyComissions, setActiveMyComissions] = useState("inactive");
  const [sales, setSales] = useState([]);
  const [myPhotobooks, setMyPhotobooks] = useState([]);
  const [activeModalCreatePhotobook, setActiveModalCreatePhotobook] =
    useState("inactive");
  const [allComissions, setAllComissions] = useState([]);

  const { setCartLength } = useCart();

  async function requestMyAssociations() {
    try {
      const { data: response } = await api.get("/customer/promoter");

      setMyAllAssociations(response.data);
      const ImAPromoter = response.data.filter(
        (sellerAssociation) => sellerAssociation.promoter === "sim"
      );
      if (ImAPromoter.length > 0) {
        setPromoterUnlocked(true);
      }

      loadSellers(response.data);
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
        notification("Erro no compartilhamento", "error");
        setLoading(false);
      }
    }
  }

  async function loadComissions() {
    setLoading(true);

    try {
      const { data: response } = await api.get(
        `customer/promoter/resume/${allProfileData.id}`
      );
      if (response.data !== undefined) {
        setAllComissions(response.data);
      }
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
        notification("Erro ao carregar as comissões", "error");
        setLoading(false);
      }
    }
  }

  async function loadComissionsFiltered() {
    setLoading(true);

    if (
      initialDateComissions === "" ||
      finalDateComissions === "" ||
      initialDateComissions.replaceAll("_", "").length !== 10 ||
      finalDateComissions.replaceAll("_", "").length !== 10
    ) {
      notification("Verifique se os campos das datas estão corretos", "error");
      setLoading(false);
    } else {
      try {
        const { data: response } = await api.get(
          `customer/promoter/resume/${allProfileData.id}?start_date=${initialDateComissions}&end_date=${finalDateComissions}`
        );
        if (response.data !== undefined) {
          setAllComissions(response.data);
        }
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
          notification("Erro ao carregar as comissões", "error");
          setLoading(false);
        }
      }
    }
  }

  async function loadSellers(responseMyAllAssociations) {
    setLoading(true);
    try {
      const { data: responseList } = await api.get("/customer/sellers");

      setSellers(responseList.data);

      const filterSellers = responseList.data
        .map((seller) => {
          const filtering = responseMyAllAssociations.filter(
            (association) => association.seller_id === seller.id
          );

          if (filtering.length > 0) {
            return false;
          } else {
            return seller;
          }
        })
        .filter((finalFilter) => finalFilter !== false);

      setListSellersRefined(filterSellers);
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
        notification("Erro ao carregar lista de lojistas", "error");
        setLoading(false);
      }
    }
  }

  async function getProfileData() {
    try {
      const { data: response } = await api.get("/customer/promoter/profile");
      setAllProfileData(response.data);
      setDescription(response.data.description);
      setCover(
        response.data.cover !== null
          ? [
              {
                data_url: `https://plataz-bucket.s3.sa-east-1.amazonaws.com/${response.data.cover}`,
              },
            ]
          : []
      );
      setImgProfile(
        response.data.img_profile !== null
          ? [
              {
                data_url: `https://plataz-bucket.s3.sa-east-1.amazonaws.com/${response.data.img_profile}`,
              },
            ]
          : []
      );
      document.body.style.overflow = "auto";
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
        notification("Erro ao carregar dados da lista", "error");
        document.body.style.overflow = "auto";
        setPhotobookProfileModalActive("inactive");
        setLoading(false);
      }
    }
  }

  async function loadClassifications() {
    setLoading(true);
    try {
      const { data: responseList } = await api.get("/customer/classification");

      setClassificationFather(responseList.data);
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
        notification("Erro ao carregar as classificações de promotor", "error");
        setLoading(false);
      }
    }
  }

  async function loadPhotobooks() {
    setLoading(true);
    try {
      const { data: responseList } = await wishListApi.get(
        "/photobook/customer/gallery",
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      setMyPhotobooks(responseList.data);
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

  useEffect(() => {
    if (localStorage.getItem(mktName)) {
      const token = localStorage.getItem(mktName);

      if (token) {
        requestMyAssociations();
        loadClassifications();
        getProfileData();
      }
    } else {
      notification("Sua sessão expirou, faça o login novamente", "error");
      sessionStorage.setItem("urlantiga", window.location.href);

      setCartLength("0");
      setTimeout(function () {
        window.location.href = "/login";
      }, 3000);
    }
  }, []);

  function copyText(link) {
    notification("Link copiado", "success");
    navigator.clipboard.writeText(link);
  }

  async function loadMoreSales() {
    setLoading(true);
    if (
      initialDateSales === "" ||
      finalDateSales === "" ||
      initialDateSales.replaceAll("_", "").length !== 10 ||
      finalDateSales.replaceAll("_", "").length !== 10
    ) {
      try {
        const { data: response } = await api.get(paginationSales);
        setSales([...sales, ...response.data]);
        setPaginationSales(response.links.next);
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
          notification("Erro ao carregar dados das vendas", "error");
          document.body.style.overflow = "auto";
          setPhotobookProfileModalActive("inactive");
          setLoading(false);
        }
      }
      setLoading(false);
    } else {
      try {
        const { data: response } = await api.get(
          paginationSales.concat(
            `&start_date=${initialDateSales}&end_date=${finalDateSales}`
          )
        );
        setSales([...sales, ...response.data]);
        setPaginationSales(response.links.next);
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
          notification("Erro ao carregar dados das vendas", "error");
          document.body.style.overflow = "auto";
          setPhotobookProfileModalActive("inactive");
          setLoading(false);
        }
      }
    }
  }

  async function loadSalesFiltered() {
    setLoading(true);
    if (
      initialDateSales === "" ||
      finalDateSales === "" ||
      initialDateSales.replaceAll("_", "").length !== 10 ||
      finalDateSales.replaceAll("_", "").length !== 10
    ) {
      notification("Verifique se os campos das datas estão corretos", "error");
      setLoading(false);
    } else {
      try {
        const { data: response } = await api.get(
          `/customer/promoter/commission?start_date=${initialDateSales}&end_date=${finalDateSales}`
        );
        setSales(response.data);
        setPaginationSales(response.links.next);
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
          notification("Erro ao carregar dados das vendas", "error");
          document.body.style.overflow = "auto";
          setPhotobookProfileModalActive("inactive");
          setLoading(false);
        }
      }
    }
  }

  async function loadSalesFilteredId() {
    setLoading(true);

    try {
      const { data: response } = await api.get(
        `/customer/promoter/commission?order_id=${orderIdFilter}`
      );
      setSales(response.data);
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
        notification("Erro ao carregar dados das vendas", "error");
        document.body.style.overflow = "auto";
        setPhotobookProfileModalActive("inactive");
        setLoading(false);
      }
    }
  }

  async function loadSales() {
    setLoading(true);
    try {
      const { data: response } = await api.get("/customer/promoter/commission");
      setSales(response.data);
      setPaginationSales(response.links.next);
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
        notification("Erro ao carregar dados das vendas", "error");
        document.body.style.overflow = "auto";
        setPhotobookProfileModalActive("inactive");
        setLoading(false);
      }
    }
  }

  async function handleFunctionsPhotoboook(option) {
    if (option === "activeAssociateSellers") {
      if (classificationFather.length === 0 && sellers.length === 0) {
        loadClassifications();
        requestMyAssociations();
      }
      setActiveAssociateSellers("active");
      setActiveMyAssociations("inactive");
      setActiveMyPhotobook("inactive");
      setActiveMySales("inactive");
      setActiveMyComissions("inactive");
    }
    if (option === "activeMyAssociations") {
      const filterMyAssociations = sellers
        .map((seller) => {
          const filtering = myAllAssociations.filter(
            (association) => association.seller_id === seller.id
          );

          if (filtering.length > 0) {
            return { seller, filtering };
          } else {
            return false;
          }
        })
        .filter((finalFilter) => finalFilter !== false);
      setMyAssociations(filterMyAssociations);
      setActiveAssociateSellers("inactive");
      setActiveMyAssociations("active");
      setActiveMyPhotobook("inactive");
      setActiveMySales("inactive");
      setActiveMyComissions("inactive");
    }
    if (option === "activeMyPhotobook") {
      if (myPhotobooks.length === 0) {
        loadPhotobooks();
      }
      setActiveAssociateSellers("inactive");
      setActiveMyAssociations("inactive");
      setActiveMyPhotobook("active");
      setActiveMySales("inactive");
      setActiveMyComissions("inactive");
    }
    if (option === "activeMySales") {
      setLoading(true);
      if (sales.length === 0) {
        loadSales();
      }
      setActiveAssociateSellers("inactive");
      setActiveMyAssociations("inactive");
      setActiveMyPhotobook("inactive");
      setActiveMySales("active");
      setActiveMyComissions("inactive");
      setLoading(false);
    }
    if (option === "activeMyComissions") {
      setActiveAssociateSellers("inactive");
      setActiveMyAssociations("inactive");
      setActiveMyPhotobook("inactive");
      setActiveMySales("inactive");
      setActiveMyComissions("active");
      loadComissions();
    }
  }

  return (
    <>
      {activeModalCreatePhotobook === "active" && (
        <ModalPhotobookAddNewPhotobook
          activeModalCreatePhotobook={activeModalCreatePhotobook}
          setActiveModalCreatePhotobook={setActiveModalCreatePhotobook}
          loadPhotobooks={loadPhotobooks}
          api={api}
          setCartLength={setCartLength}
          wishListApi={wishListApi}
          headerUrl={headerUrl}
          mktName={mktName}
        />
      )}

      {shareModal === "active" && (
        <ModalPromoterShareProfile
          shareModal={shareModal}
          setShareModal={setShareModal}
          allProfileData={allProfileData}
          copyText={copyText}
          mktName={mktName}
          appUrl={appUrl}
        />
      )}

      {sharePhotobookModal === "active" && (
        <ModalPhotobookSharePhotobook
          shareModal={sharePhotobookModal}
          setShareModal={setSharePhotobookModal}
          allProfileData={allProfileData}
          copyText={copyText}
          modalInside={false}
          idMyPhotobook={idMyPhotobook}
        />
      )}

      {photobookProfileModalActive === "active" && (
        <ModalPromoterProfileEdit
          photobookProfileModalActive={photobookProfileModalActive}
          setPhotobookProfileModalActive={setPhotobookProfileModalActive}
          description={description}
          setDescription={setDescription}
          imgProfile={imgProfile}
          setImgProfile={setImgProfile}
          cover={cover}
          setCover={setCover}
          getProfileData={getProfileData}
          api={api}
          mktName={mktName}
        />
      )}

      <S.GeneralContainer>
        <div className="containerTopo">
          {cover.length > 0 ? (
            <div className="customContainerBanner">
              <img src={cover[0]["data_url"]} alt="Meu banner" />
            </div>
          ) : (
            <div className="containerBanner" />
          )}
          <div
            className={description !== null ? "logoLojista" : "logoLojista not"}
          >
            <div className="containerImage">
              {imgProfile.length > 0 ? (
                <img src={imgProfile[0]["data_url"]} alt="Meu perfil" />
              ) : (
                <User />
              )}
            </div>
          </div>
          <div
            className={
              description !== null
                ? "containerProfileFunctions"
                : "containerProfileFunctions not"
            }
          >
            <div className="containerDescription">
              <div className="title">{allProfileData.name}</div>
              {description !== null && (
                <div className="description">{description}</div>
              )}
            </div>

            {promoterUnlocked && (
              <div className="containerButtons">
                <button
                  className="negativeButton"
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setShareModal("active");
                  }}
                >
                  <div>COMPARTILHAR PERFIL</div>
                  <span>
                    <ShareAlt />
                  </span>
                </button>
                <button
                  className="configure positiveButton"
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setPhotobookProfileModalActive("active");
                  }}
                >
                  <div>Configurar perfil</div>
                  <span>
                    <PencilSquare />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
        <S.ContainerPhotobookFunctions>
          <div className="containerFunctionButtons">
            <div className="containerFirstButtons">
              <button
                className={
                  activeAssociateSellers !== "inactive" ? "active" : ""
                }
                onClick={() =>
                  handleFunctionsPhotoboook("activeAssociateSellers")
                }
              >
                ME ASSOCIAR
              </button>
              <button
                className={activeMyAssociations !== "inactive" ? "active" : ""}
                onClick={() =>
                  handleFunctionsPhotoboook("activeMyAssociations")
                }
              >
                MINHAS ASSOCIAÇÕES
              </button>
            </div>
            {promoterUnlocked && (
              <div className="containerUnlockedButtons">
                <button
                  className={activeMyPhotobook !== "inactive" ? "active" : ""}
                  onClick={() => handleFunctionsPhotoboook("activeMyPhotobook")}
                >
                  PHOTOBOOK
                </button>
                <button
                  className={activeMySales !== "inactive" ? "active" : ""}
                  onClick={() => handleFunctionsPhotoboook("activeMySales")}
                >
                  MINHAS VENDAS
                </button>
                <button
                  className={activeMyComissions !== "inactive" ? "active" : ""}
                  onClick={() =>
                    handleFunctionsPhotoboook("activeMyComissions")
                  }
                >
                  COMISSÕES
                </button>
              </div>
            )}
          </div>
          <S.ContainerDataFunctions>
            {loading ? (
              <Loading />
            ) : (
              <>
                {activeAssociateSellers !== "inactive" &&
                  listSellersRefined.length > 0 && (
                    <>
                      {listSellersRefined.map((seller, sellerIndex) => (
                        <BoxPromoterAssociationRequest
                          key={sellerIndex}
                          classificationFather={classificationFather}
                          seller={seller}
                          requestMyAssociations={requestMyAssociations}
                          api={api}
                          setCartLength={setCartLength}
                          wishListApi={wishListApi}
                          headerUrl={headerUrl}
                        />
                      ))}
                    </>
                  )}

                {activeMyAssociations !== "inactive" && (
                  <>
                    {myAssociations.length > 0 ? (
                      <>
                        {myAssociations.map((seller, sellerIndex) => (
                          <BoxPromoterMyAssociations
                            seller={seller}
                            key={sellerIndex}
                            api={api}
                          />
                        ))}
                      </>
                    ) : (
                      <div className="boxNothing">
                        Não há associações registradas
                      </div>
                    )}
                  </>
                )}
                {activeMySales === "active" && (
                  <>
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
                        <div className="title">Filtrar por ID da Ordem</div>
                        <div className="containerFilter">
                          <div className="containerInputs">
                            <ReactInputMask
                              placeholder="Apenas números"
                              type="text"
                              mask="9999999999999999"
                              value={orderIdFilter}
                              onChange={
                                orderIdFilter.includes("_") &&
                                !orderIdFilter.includes("_") &&
                                orderIdFilter.replaceAll("_", "") === ""
                                  ? () => setOrderIdFilter("")
                                  : (event) => {
                                      setOrderIdFilter(
                                        event.target.value.replaceAll("_", "")
                                      );
                                    }
                              }
                              onBlur={() => {
                                if (orderIdFilter.length === 0) {
                                  setOrderIdFilter("");
                                }
                              }}
                              onKeyPress={(e) => {
                                e.key === "Enter" && orderIdFilter === ""
                                  ? loadSales()
                                  : e.key === "Enter" && loadSalesFilteredId();
                              }}
                            />
                          </div>
                          <button
                            onClick={
                              orderIdFilter === ""
                                ? () => loadSales()
                                : () => loadSalesFilteredId()
                            }
                          >
                            Filtrar
                          </button>
                        </div>
                        <div className="title">Filtrar por período</div>
                        <div className="containerFilter">
                          <div className="containerInputs">
                            <ReactInputMask
                              placeholder="00/00/0000"
                              type="text"
                              mask="99/99/9999"
                              value={initialDateSales}
                              onChange={
                                initialDateSales === "__/__/____"
                                  ? setInitialDateSales("")
                                  : (event) => {
                                      setInitialDateSales(event.target.value);
                                    }
                              }
                              onBlur={() => {
                                if (initialDateSales.length === 0) {
                                  setFinalDateSales("");
                                }
                              }}
                              onKeyPress={(e) => {
                                e.key === "Enter" &&
                                finalDateSales === "" &&
                                initialDateSales === ""
                                  ? loadSales()
                                  : e.key === "Enter" && loadSalesFiltered();
                              }}
                            />
                            <div className="until">até</div>
                            <ReactInputMask
                              placeholder="00/00/0000"
                              type="text"
                              mask="99/99/9999"
                              value={finalDateSales}
                              onChange={
                                finalDateSales === "__/__/____"
                                  ? setFinalDateSales("")
                                  : (event) => {
                                      setFinalDateSales(event.target.value);
                                    }
                              }
                              onBlur={() => {
                                if (finalDateSales.length === 0) {
                                  setFinalDateSales("");
                                }
                              }}
                              onKeyPress={(e) => {
                                e.key === "Enter" &&
                                finalDateSales === "" &&
                                initialDateSales === ""
                                  ? loadSales()
                                  : e.key === "Enter" && loadSalesFiltered();
                              }}
                            />
                          </div>
                          <button
                            onClick={
                              finalDateSales === "" && initialDateSales === ""
                                ? () => loadSales()
                                : () => loadSalesFiltered()
                            }
                          >
                            Filtrar
                          </button>
                        </div>
                        {sales.length > 0 ? (
                          <>
                            {sales.map((comission) => (
                              <>
                                <BoxPromoterMySales comission={comission} />
                              </>
                            ))}
                            {paginationSales !== null && (
                              <div className="boxLoadMore">
                                <button
                                  className="positiveButton"
                                  onClick={() => loadMoreSales()}
                                >
                                  VER MAIS
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="boxNothing">
                            Não há vendas registradas
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {activeMyPhotobook === "active" && (
                  <>
                    {myPhotobooks.length > 0 ? (
                      <>
                        <div
                          className="boxAddNewPhotobook"
                          onClick={() => {
                            document.body.style.overflow = "hidden";
                            setActiveModalCreatePhotobook("active");
                          }}
                        >
                          <div
                            className="containerImage"
                            onClick={() => {
                              document.body.style.overflow = "hidden";
                              setActiveModalCreatePhotobook("active");
                            }}
                          >
                            <PlusSquare />
                          </div>
                          <div className="containerText">
                            CRIAR NOVO PHOTOBOOK
                          </div>
                        </div>
                        <div className="containerBoxPhotobook">
                          {myPhotobooks.map((photobook, photobookIndex) => (
                            <BoxPhotobookConfigPhotobook
                              key={photobookIndex}
                              loadPhotobooks={loadPhotobooks}
                              photobookData={photobook}
                              setIdMyPhotobook={setIdMyPhotobook}
                              setSharePhotobookModal={setSharePhotobookModal}
                              api={api}
                              setCartLength={setCartLength}
                              wishListApi={wishListApi}
                              headerUrl={headerUrl}
                              mktName={mktName}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="boxNothing">
                        <div
                          className="boxAddNewPhotobook"
                          onClick={() => {
                            document.body.style.overflow = "hidden";
                            setActiveModalCreatePhotobook("active");
                          }}
                        >
                          <div
                            className="containerImage"
                            onClick={() => {
                              document.body.style.overflow = "hidden";
                              setActiveModalCreatePhotobook("active");
                            }}
                          >
                            <PlusSquare />
                          </div>
                          <div className="containerText">
                            CRIAR NOVO PHOTOBOOK
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {activeMyComissions === "active" && (
                  <>
                    <div className="title">Filtrar por período</div>
                    <div className="containerFilter">
                      <div className="containerInputs">
                        <ReactInputMask
                          placeholder="00/00/0000"
                          type="text"
                          mask="99/99/9999"
                          value={initialDateComissions}
                          onChange={
                            initialDateComissions === "__/__/____"
                              ? setInitialDateComissions("")
                              : (event) => {
                                  setInitialDateComissions(event.target.value);
                                }
                          }
                          onBlur={() => {
                            if (initialDateComissions.length === 0) {
                              setFinalDateComissions("");
                            }
                          }}
                          onKeyPress={(e) => {
                            e.key === "Enter" &&
                            finalDateComissions === "" &&
                            initialDateComissions === ""
                              ? loadComissions()
                              : e.key === "Enter" && loadComissionsFiltered();
                          }}
                        />
                        <div className="until">até</div>
                        <ReactInputMask
                          placeholder="00/00/0000"
                          type="text"
                          mask="99/99/9999"
                          value={finalDateComissions}
                          onChange={
                            finalDateComissions === "__/__/____"
                              ? setFinalDateComissions("")
                              : (event) => {
                                  setFinalDateComissions(event.target.value);
                                }
                          }
                          onBlur={() => {
                            if (finalDateComissions.length === 0) {
                              setFinalDateComissions("");
                            }
                          }}
                          onKeyPress={(e) => {
                            e.key === "Enter" &&
                            finalDateComissions === "" &&
                            initialDateComissions === ""
                              ? loadComissions()
                              : e.key === "Enter" && loadComissionsFiltered();
                          }}
                        />
                      </div>
                      <button
                        onClick={
                          finalDateComissions === "" &&
                          initialDateComissions === ""
                            ? () => loadComissions()
                            : () => loadComissionsFiltered()
                        }
                      >
                        Filtrar
                      </button>
                    </div>
                    {allComissions !== undefined ? (
                      <>
                        <BoxPromoterMyComissions comission={allComissions} />
                      </>
                    ) : (
                      <div className="boxNothing">
                        Não há Comissões registradas
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </S.ContainerDataFunctions>
        </S.ContainerPhotobookFunctions>
      </S.GeneralContainer>
    </>
  );
}

export default PhotobookComponent;
