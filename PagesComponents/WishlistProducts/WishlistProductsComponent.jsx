import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import "bootstrap/dist/css/bootstrap.min.css";

import notification from "../../services/notification";

// componentes boostrap
import { Container, Row, Col } from "react-bootstrap";

// Css do componente
import * as S from "./style";
import { ShareAlt } from "@styled-icons/boxicons-solid/ShareAlt";
import { Copy } from "@styled-icons/evaicons-solid/Copy";

//imagens

import BoxWishListItemWishList from "../../components/BoxWishListItemWishList";

import BoxGeneralWhite from "../../components/BoxGeneralWhite";

const WishlistProductsComponent = ({
  api,
  wishListApi,
  setCartLength,
  headerUrl,
  appUrl,
  mktName,
  width,
  show,
}) => {
  const history = useRouter();

  const [modalEdicaoMobile, setModalEdicaoMobile] = useState("inativo");

  const [code, setCode] = useState([]);
  const [productsOfList, setProductsOfList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [detailList, setDetailList] = useState({});
  const [loadingAddList, setLoadingAddList] = useState(false);
  const [atualizarEstado, setAtualizarEstado] = useState(false);
  const [addAllCartLocal, setAddAllCartLocal] = useState([]);
  const [shared, setShared] = useState("true");
  const [shareModal, setShareModal] = useState("inativo");
  const [permission, setPermission] = useState(false);
  const [emailShare, setEmailShare] = useState("");

  async function addAllCart() {
    setLoading(true);

    addAllCartLocal.map(async (cart) => {
      try {
        const dataCart = [
          {
            product: cart.product.id,
            quantity: cart.quantity,
            seller_info: {
              item_id: cart.idList,
              seller_id: cart.product.offers[0].marketplace_seller_id,
              offer: cart.product.offers[0].id,
              store: cart.product.offers[0].marketplace_seller[0].shop_title,
            },
          },
        ];

        const response = await api.post(
          "/customer/checkout/cart/add",
          dataCart
        );
        if (localStorage.getItem(mktName)) {
          const { data: responseCustomer } = await api.get(
            "/customer/checkout/cart"
          );
          if (responseCustomer.data !== null) {
            setCartLength(responseCustomer.data.items_qty);
          }
        }
        setAtualizarEstado(!atualizarEstado);
        notification("Produtos adicionados ao carrinho com sucesso", "success");
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
          notification(
            "Erro ao adicionar alguns ou todos os produtos ao carrinho",
            "error"
          );
          setLoading(false);
          setAtualizarEstado(!atualizarEstado);
        }
      }
    });
  }

  async function handleGetList() {
    setLoading(true);
    setProductsOfList([]);
    try {
      const { data: responseList } = await wishListApi.get(
        `/wish-list/customer/detail/${history.query.code[0]}`,
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      if (responseList.data.items.length > 0) {
        const products = responseList.data.items.map((item) => item);

        setProductsOfList(products);
        setDetailList(responseList.data);
      } else {
        setProductsOfList([]);
      }

      setLoading(false);
    } catch {
      notification("Erro ao carregar a lista de produtos", "error");
      setLoading(false);
    }
  }

  async function handleSharedList() {
    setLoading(true);

    try {
      const { data: responseList } = await wishListApi.get(
        `/wish-list/customer/shared-list`,
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      if (responseList.data.length > 0) {
        const verificador = responseList.filter(
          (sharedList) => sharedList.code === code
        );
        if (verificador.length > 0) {
          setShared("true");
        } else {
          setShared("false");
        }
      } else {
        setShared("false");
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
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (history.isReady) {
      const token = localStorage.getItem(mktName);
      setCode(history.query.code[0]);
      if (token) {
        handleSharedList();
        handleGetList();
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);

        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atualizarEstado, history.isReady]);

  async function handleShare() {
    setLoadingAddList(true);
    const emailTeste = getEmailValid(emailShare);

    if (emailTeste) {
      const dataWishList = {
        email: emailShare,
        edit: permission,
      };

      try {
        const token = localStorage.getItem(mktName);
        if (token) {
          wishListApi.defaults.headers.Authorization = token;
        } else {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);

          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        }

        const { data: response } = await wishListApi.post(
          `/wish-list/customer/share/${detailList.code}`,
          dataWishList,
          {
            headers: {
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );

        setPermission(false);
        setEmailShare("");
        notification("Compartilhamento realizado com sucesso", "success");
        document.body.style.overflow = "auto";
        setShareModal("inativo");
        setModalEdicaoMobile("inativo");
        setLoadingAddList(false);
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setLoadingAddList(false);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          notification("Erro no compartilhamento", "error");
          setLoadingAddList(false);
        }
      }
    } else {
      notification("Erro no compartilhamento", "error");
      setLoadingAddList(false);
    }
  }

  function getEmailValid(email) {
    var pattern = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );

    if (!pattern.test(email)) {
      notification("Email inválido", "error");
      return false;
    }

    return true;
  }

  function copyText(link) {
    notification("Link copiado", "success");
    navigator.clipboard.writeText(link);
  }

  return (
    <>
      {shareModal === "ativo" && (
        <S.ModalWishList className={shareModal}>
          <S.Transparente
            onClick={() => {
              if (modalEdicaoMobile !== "ativo") {
                document.body.style.overflow = "auto";
              }
              setShareModal("inativo");
            }}
          />

          <S.centroAlertaWishList>
            <div className="modalTitle">
              <span className="title">Compartilhar Lista</span>
              <S.closeButton
                onClick={() => {
                  if (modalEdicaoMobile !== "ativo") {
                    document.body.style.overflow = "auto";
                  }
                  setShareModal("inativo");
                }}
              >
                x
              </S.closeButton>
            </div>
            <div className="caixaShare">
              <div className="name">{detailList.name}</div>
              <div className="type">
                Nível de permissão que você deseja conceder:
              </div>
              <div className="containerBotoes">
                <button
                  onClick={() => setPermission(false)}
                  className={
                    permission
                      ? "botao positiveButton"
                      : "botaoActive positiveButton"
                  }
                >
                  Visualizar
                </button>
                <button
                  onClick={() => setPermission(true)}
                  className={
                    !permission
                      ? "botao positiveButton"
                      : "botaoActive positiveButton"
                  }
                >
                  Visualizar e editar
                </button>
              </div>
              <div className="containerEmail">
                <div className="title">Digite o e-mail do destinatário</div>
                <input
                  type="text"
                  onBlur={(e) => getEmailValid(e.target.value)}
                  onChange={(e) => setEmailShare(e.target.value)}
                  required
                />
              </div>
              {detailList.type === "public" && (
                <>
                  <div className="title">Link de compartilhamento</div>
                  <div className="containerCopyURL">
                    <div className="url">
                      <input
                        readOnly
                        type="text"
                        value={`${appUrl}/publiclist/${detailList.code}`}
                      />
                      <button
                        className="copyButton"
                        onClick={() =>
                          copyText(`${appUrl}/publiclist/${detailList.code}`)
                        }
                      >
                        <Copy />
                      </button>
                    </div>
                    <div className="boxButtons">
                      {loadingAddList ? (
                        <img
                          className="loading"
                          src="/images/loadingIcon.svg"
                          alt="Carregando"
                        />
                      ) : (
                        <button
                          onClick={() => handleShare()}
                          className="positiveButton"
                        >
                          <S.EmailIcon />
                        </button>
                      )}
                      <a
                        className="socialMediaButton positiveButton"
                        href={`https://api.whatsapp.com/send?text= Olá, estou te enviando o link de uma lista meu no ${mktName}. Click no link abaixo para acessá-lo. ${appUrl}/publiclist/${detailList.code}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <S.WhatsIcon />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modalFooter">
              <button
                onClick={() => {
                  if (modalEdicaoMobile !== "ativo") {
                    document.body.style.overflow = "auto";
                  }
                  setShareModal("inativo");
                }}
                className="cancelar negativeButton"
              >
                CANCELAR
              </button>
              {detailList.type === "private" && (
                <button
                  onClick={() => handleShare()}
                  className="positiveButton"
                >
                  Compartilhar <S.EmailIcon />
                </button>
              )}
            </div>
          </S.centroAlertaWishList>
        </S.ModalWishList>
      )}

      <S.caminho>
        <Container>
          <Row>
            <Col>
              <p>
                <Link href="/profile/wishlist" passhref="true">
                  <span>Meus Projetos &#62;</span>
                </Link>
                <Link
                  href={`/profile/wishlist/${code}`}
                  passhref="
                  true"
                >
                  <span> {detailList.name}</span>
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </S.caminho>
      <Container>
        <S.vendidopor>
          <div className="containerTopo">
            <div className="containerBanner" />
            <div className="coberturaVerde" />
            <div className="boxShareButton">
              <button
                className="positiveButton"
                onClick={() => {
                  document.body.style.overflow = "hidden";
                  setShareModal("ativo");
                }}
              >
                <div>Compartilhar</div>
                <span>
                  <ShareAlt />
                </span>
              </button>
            </div>

            <S.DadosSeller>
              <h2>{detailList.name}</h2>
              <h4>{detailList.description}</h4>
            </S.DadosSeller>
          </div>
        </S.vendidopor>
      </Container>
      <S.Lists>
        <Container>
          {loading ? (
            <div className="containerLoading">
              <img
                className="loading"
                src="/images/loadingIcon.svg"
                alt="carregando"
              />
            </div>
          ) : (
            <>
              {productsOfList && productsOfList.length > 0 ? (
                <>
                  <S.ContainerGeral>
                    <div className="containerComBotoes">
                      <div className="containerListas">
                        {productsOfList.map((list, index) => (
                          <div
                            className="containerCartoes"
                            key={index}
                            xs={12}
                            md={6}
                          >
                            <BoxWishListItemWishList
                              setAtualizarEstado={setAtualizarEstado}
                              atualizarEstado={atualizarEstado}
                              code={code}
                              shared={shared}
                              edit={detailList.edit}
                              comments={list.comments}
                              idOffer={list.offer_id}
                              id={list.product_id}
                              idList={list.id}
                              addAllCartLocal={addAllCartLocal}
                              setAddAllCartLocal={setAddAllCartLocal}
                              products={list}
                              details={detailList}
                              wishListApi={wishListApi}
                              api={api}
                              setCartLength={setCartLength}
                              show={show}
                            />
                          </div>
                        ))}
                      </div>
                      <S.ContainerBotoes>
                        {loading ? (
                          <div className="containerLoading">
                            <img
                              className="loading"
                              src="/images/loadingIcon.svg"
                              alt="carregando"
                            />
                          </div>
                        ) : width < 899 ? (
                          <>
                            <BoxGeneralWhite>
                              {" "}
                              {productsOfList.length > 0 &&
                                addAllCartLocal.length > 0 && (
                                  <S.BotaoAdicionar
                                    className="positiveButton"
                                    onClick={() => addAllCart()}
                                  >
                                    ADICIONAR TUDO AO CARRINHO
                                  </S.BotaoAdicionar>
                                )}
                            </BoxGeneralWhite>
                          </>
                        ) : (
                          <>
                            <S.BotaoVoltar
                              className="negativeButton"
                              onClick={() => history.push("/profile/wishlist")}
                            >
                              VOLTAR
                            </S.BotaoVoltar>
                            {productsOfList.length > 0 &&
                              addAllCartLocal.length > 0 && (
                                <S.BotaoAdicionar
                                  className="positiveButton"
                                  onClick={() => addAllCart()}
                                >
                                  ADICIONAR TUDO AO CARRINHO
                                </S.BotaoAdicionar>
                              )}
                          </>
                        )}
                      </S.ContainerBotoes>
                    </div>
                  </S.ContainerGeral>
                </>
              ) : (
                <S.ContainerSemEndereco>
                  <strong>Nenhum item adicionado</strong>
                  <S.ContainerBotoes>
                    <S.BotaoVoltar
                      className="negativeButton"
                      onClick={() => history.push("/profile/wishlist")}
                    >
                      VOLTAR
                    </S.BotaoVoltar>
                  </S.ContainerBotoes>
                </S.ContainerSemEndereco>
              )}
            </>
          )}
        </Container>
      </S.Lists>
    </>
  );
};

export default WishlistProductsComponent;
