import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import notification from "../../services/notification";

// componentes boostrap
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Css do componente
import * as S from "./styles";
import { ShareAlt } from "@styled-icons/boxicons-solid/ShareAlt";

//imagens

import BoxWishListPublicItemWishList from "../../components/BoxWishListPublicItemWishList";
import ModalSharePubliclist from "../../components/ModalSharePubliclist";
import useWindowDimensions from "../../services/windowSizeHook";

import BoxGeneralWhite from "../../components/BoxGeneralWhite";

function PubliclistComponent({
  api,
  wishListApiUnlogged,
  wishListApi,
  routeTranslations,
  setCartLength,
  located,
  setModal,
  mktName,
  companyId,
  appUrl,
  appHeaderUrl,
  appImages,
}) {
  const history = useRouter();
  const { width } = useWindowDimensions();
  const [productsOfList, setProductsOfList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [detailList, setDetailList] = useState({});
  const [sharePublicListModal, setSharePublicListModal] = useState("inactive");
  const [atualizarEstado, setAtualizarEstado] = useState(false);

  const [addAllCartLocal, setAddAllCartLocal] = useState([]);

  function quantityCartAnonymous(obj) {
    const chaveObjAtual = Object.keys(obj.loja);

    if (sessionStorage.getItem("cart") !== null) {
      const objArray = JSON.parse(sessionStorage.getItem("cart"));

      // procuramos na array existente todos os lojistas

      const confirmarSeExisteLojista = objArray.find(
        (loja) => Object.keys(loja)[0] === chaveObjAtual[0]
      );

      // existe o lojista?
      if (confirmarSeExisteLojista !== undefined) {
        //existe esse produto no lojista?

        const filtroProduto = confirmarSeExisteLojista[chaveObjAtual[0]].filter(
          (produto, index) =>
            // validamos se o produto existe no lojista
            produto.product === obj.loja[chaveObjAtual[0]][0].product
        );

        if (filtroProduto.length > 0) {
          const newObjArray = {
            atributos: obj.loja[chaveObjAtual][0].atributos,
            product: obj.loja[chaveObjAtual][0].product,
            quantity:
              filtroProduto[0].quantity + obj.loja[chaveObjAtual][0].quantity,
            seller_info: obj.loja[chaveObjAtual][0].seller_info,
            valor: obj.loja[chaveObjAtual][0].valor,
          };

          const removerProduto = objArray.reduce(function (acc, value) {
            if (value[chaveObjAtual[0]]) {
              const verificador = value[chaveObjAtual[0]].filter(
                (filtrado) => filtrado.product === newObjArray.product
              );

              if (verificador.length > 0) {
                const filtroRemover = value[chaveObjAtual[0]].filter(
                  (filtrado) => filtrado.product !== newObjArray.product
                );

                const adicionar = {
                  [chaveObjAtual[0]]: [filtroRemover, newObjArray].flat(),
                };

                acc = [...acc, adicionar];
                return acc;
              } else {
                acc = [...acc, value];
                return acc;
              }
            } else {
              acc = [...acc, value];
              return acc;
            }
          }, []);

          sessionStorage.setItem("cart", JSON.stringify(removerProduto));
        } else {
          // caso não exista o produto no lojista vamos adicionar
          const removerProduto = objArray.reduce(function (acc, value) {
            if (Object.keys(value)[0] === chaveObjAtual[0]) {
              const adicionar = {
                [chaveObjAtual[0]]: [
                  value[chaveObjAtual[0]],
                  obj.loja[chaveObjAtual][0],
                ].flat(),
              };

              acc = [...acc, adicionar];
              return acc;
            } else {
              acc = [...acc, value];
              return acc;
            }
          }, []);
          sessionStorage.setItem("cart", JSON.stringify(removerProduto));
        }
      } else {
        // se não achar adiciona o lojista e o produto
        const novoObjArray = {
          [chaveObjAtual[0]]: [obj.loja[chaveObjAtual][0]],
        };

        let novoObjSession = JSON.parse(sessionStorage.getItem("cart"));
        novoObjSession.push(novoObjArray);

        sessionStorage.setItem("cart", JSON.stringify(novoObjSession));
      }
    } else {
      sessionStorage.setItem(
        "cart",
        JSON.stringify([{ [chaveObjAtual[0]]: [obj.loja[chaveObjAtual][0]] }])
      );
    }
  }

  async function addAllCart() {
    setLoading(true);
    if (!located && !localStorage.getItem(mktName)) {
      setLoading(false);
      notification(
        "Antes de adicionar ao carrinho faça sua geolocalização",
        "error"
      );
      document.body.style.overflow = "hidden";
      setModal(true);
    } else {
      addAllCartLocal.map(async (cart) => {
        if (cart.product.offers.length === 0) {
          notification(
            "Erro ao adicionar alguns ou todos os produtos ao carrinho",
            "error"
          );
          setLoading(false);
          setAtualizarEstado(!atualizarEstado);
        } else {
          const dataCart = [
            {
              product: cart.product.id,
              quantity: cart.quantity,
              seller_info: {
                item_id: cart.idList,
                seller_id: Number(cart.product.offers[0].marketplace_seller_id),
                offer: Number(cart.product.offers[0].id),
                store: cart.product.offers[0].marketplace_seller[0].shop_title,
              },
            },
          ];
          const mapFiltroAtual = cart.product.attributes.filter(
            (atributos) => atributos.configurable === true
          );

          const dataCart2 = [
            {
              loja: {
                [cart.product.offers[0].marketplace_seller[0].shop_title]: [
                  {
                    product: Number(cart.product.id),
                    quantity: cart.quantity,
                    atributos: mapFiltroAtual,
                    valor: cart.product.offers[0].price,
                    seller_info: {
                      seller_id: Number(
                        cart.product.offers[0].marketplace_seller_id
                      ),
                      offer: Number(cart.product.offers[0].id),
                      store:
                        cart.product.offers[0].marketplace_seller[0].shop_title,
                    },
                  },
                ],
              },
            },
          ];

          if (!localStorage.getItem(mktName)) {
            quantityCartAnonymous(dataCart2[0]);

            let countItensCart = sessionStorage.getItem("cart")
              ? JSON.parse(sessionStorage.getItem("cart"))
              : [];

            let count = 0;
            let valorTotal = 0;
            // eslint-disable-next-line array-callback-return
            countItensCart.map((item) => {
              // eslint-disable-next-line array-callback-return
              Object.values(item).map((p, i) => {
                // eslint-disable-next-line array-callback-return
                p.map((pq, iq) => {
                  count = count + pq.quantity;
                  valorTotal = valorTotal + pq.valor * pq.quantity;
                });
              });
            });

            setCartLength(count);
            setAtualizarEstado(!atualizarEstado);
            notification(
              "Produtos adicionados ao carrinho com sucesso",
              "success"
            );
            setLoading(false);

            return true;
          } else {
            try {
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
              notification(
                "Produtos adicionados ao carrinho com sucesso",
                "success"
              );
              setLoading(false);
            } catch (e) {
              if (e.response?.data.message === "Não Autorizado.") {
                notification(
                  "Sua sessão expirou, faça o login novamente",
                  "error"
                );
                sessionStorage.setItem("urlantiga", window.location.href);
                setLoading(false);
                setTimeout(function () {
                  history.push("/login");
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
          }
        }
      });
    }
  }

  async function handleGetList() {
    setLoading(true);
    setProductsOfList([]);
    const data = { company_id: companyId };

    try {
      const { data: response } = await wishListApiUnlogged.post(
        `/wish-list/detail/${history.query.code[0]}`,
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.items.length > 0) {
        const products = response.data.items.map((item) => item);

        setProductsOfList(products);
        setDetailList(response.data);
      } else {
        setProductsOfList([]);
      }

      setLoading(false);
    } catch {
      notification("Erro ao carregar a lista de produtos", "error");
      setLoading(false);
    }
  }

  function copyText(link) {
    notification("Link copiado", "success");
    navigator.clipboard.writeText(link);
  }

  useEffect(() => {
    if (history.isReady) {
      handleGetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atualizarEstado, history]);

  return (
    <>
      <ModalSharePubliclist
        sharePublicListModal={sharePublicListModal}
        setSharePublicListModal={setSharePublicListModal}
        detailList={detailList}
        copyText={copyText}
        mktName={mktName}
        appUrl={appUrl}
      />

      <S.caminho>
        <Container>
          <Row>
            <Col>
              <p>
                <Link href="/profile/wishlist" passhref="true">
                  <span>Minhas listas &#62;</span>
                </Link>
                <Link
                  href={`/profile/wishlist/${
                    history.query.code !== undefined && history.query.code[0]
                  }`}
                  passhref="true"
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
            {detailList.code !== undefined && (
              <div className="boxShareButton">
                <button
                  className="positiveButton"
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setSharePublicListModal("active");
                  }}
                >
                  <div>Compartilhar</div>
                  <span>
                    <ShareAlt />
                  </span>
                </button>
              </div>
            )}

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
                        {productsOfList.map((list, listIndex) => (
                          <div
                            className="containerCartoes"
                            key={listIndex}
                            xs={12}
                            md={6}
                          >
                            <BoxWishListPublicItemWishList
                              setAtualizarEstado={setAtualizarEstado}
                              atualizarEstado={atualizarEstado}
                              code={history.query.code[0]}
                              edit={detailList.edit}
                              comments={list.comments}
                              idOffer={list.offer_id}
                              id={list.product_id}
                              idList={list.id}
                              addAllCartLocal={addAllCartLocal}
                              setAddAllCartLocal={setAddAllCartLocal}
                              mktName={mktName}
                              located={located}
                              setModal={setModal}
                              appImages={appImages}
                              appHeaderUrl={appHeaderUrl}
                              api={api}
                              wishListApi={wishListApi}
                              setCartLength={setCartLength}
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
                              onClick={() => history.push("/")}
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
                  <strong>
                    Nenhum item adicionado ou lista pública inexistente
                  </strong>
                  <S.ContainerBotoes>
                    <S.BotaoVoltar
                      className="negativeButton"
                      onClick={() => history.push("/")}
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
}

export default PubliclistComponent;
