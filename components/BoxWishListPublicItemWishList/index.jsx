import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

// Template do site
import * as S from "./styles";

import { GET_PRODUCT } from "./Querys";

import { useMenu } from "../../Context/Menu";
import notification from "../../services/notification";

function BoxWishListPublicItem({
  id,
  idOffer,
  code,
  comments,
  setAtualizarEstado,
  atualizarEstado,
  idList,
  addAllCartLocal,
  setAddAllCartLocal,
  mktName,
  appHeaderUrl,
  located,
  setModal,
  api,
  wishListApi,
  setCartLength,
  appImages,
}) {
  const {
    data: productData,
    // eslint-disable-next-line no-unused-vars
    error: productError,
    // eslint-disable-next-line no-unused-vars
    loading: productLoading,
    refetch: refetchProduct,
  } = useQuery(
    GET_PRODUCT,

    {
      fetchPolicy: "no-cache",
      variables: {
        offer_id: idOffer,
        id: id,
      },
    }
  );

  const [modalAddCarrinho, setModalAddCarrinho] = useState("inativo");

  const [product, setProduct] = useState({});
  const [atributos, setAtributos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [varianteProdutoAtual, setVarianteProdutoAtual] = useState({});

  const [commentValue, setCommentValue] = useState(
    comments.length > 0 ? comments[0].comment : ""
  );
  const [prioridade, setPrioridade] = useState(
    comments.length > 0 ? comments[0].priority : false
  );
  const [quantidade, setQuantidade] = useState(
    comments.length > 0 ? comments[0].quantity : 1
  );

  const { show } = useMenu();

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

  async function handleCart() {
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
      const dataCart = [
        {
          product: Number(id),
          quantity: quantidade,
          seller_info: {
            seller_id: Number(
              productData.children[0].offers[0].marketplace_seller_id
            ),
            item_id: idList,
            offer: idOffer,
            store:
              productData.children[0].offers[0].marketplace_seller[0]
                .shop_title,
          },
        },
      ];

      const dataCart2 = [
        {
          loja: {
            [productData.children[0].offers[0].marketplace_seller[0]
              .shop_title]: [
              {
                product: Number(id),
                quantity: quantidade,
                atributos: varianteProdutoAtual,
                valor: productData.children[0].offers[0].price,
                seller_info: {
                  item_id: idList,
                  seller_id: Number(
                    productData.children[0].offers[0].marketplace_seller_id
                  ),
                  offer: idOffer,
                  store:
                    productData.children[0].offers[0].marketplace_seller[0]
                      .shop_title,
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
        notification("Produto adicionado ao carrinho com sucesso", "success");
        setAtualizarEstado(!atualizarEstado);
        document.body.style.overflow = "auto";

        setModalAddCarrinho("inativo");
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

          notification("Produto adicionado ao carrinho com sucesso", "success");
          setAtualizarEstado(!atualizarEstado);
          document.body.style.overflow = "auto";

          setModalAddCarrinho("inativo");

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
            notification("Erro ao adicionar produto ao carrinho", "error");
            setLoading(false);
          }
        }
      }
    }
  }

  async function getListCharge() {
    setLoading(true);

    const mapFiltroAtual = productData.children[0].attributes.filter(
      (atributos) => atributos.configurable === true
    );

    if (mapFiltroAtual.length > 0) {
      setVarianteProdutoAtual(mapFiltroAtual);
    }
    setLoading(false);
  }

  async function deleteItem(initial) {
    setLoading(true);

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

      const { data: response } = await wishListApi.delete(
        `/wish-list/customer/${code}/item/delete`,
        {
          headers: {
            Type: "customer",
            "Url-Store": appHeaderUrl,
          },
          params: {
            product_id: id,
          },
        }
      );
      if (initial === "initial") {
        notification(
          "Item removido devido indisponibilidade no catálogo",
          "success"
        );
        document.body.style.overflow = "auto";
        setModalDelete("inativo");

        setAtualizarEstado(!atualizarEstado);
        setLoading(false);
      } else {
        notification("Item removido com sucesso", "success");
        document.body.style.overflow = "auto";
        setModalDelete("inativo");

        setAtualizarEstado(!atualizarEstado);
        setLoading(false);
      }
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
        notification("Erro ao remover item", "error");
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (productData) {
      getListCharge();

      if (productData.children[0] === undefined) {
        deleteItem("initial");
      } else {
        setProduct(productData.children[0]);
        if (productData.children[0].offers.length > 0) {
          setAddAllCartLocal([
            ...addAllCartLocal,
            {
              product: productData.children[0],
              quantity: quantidade,
              idList,
            },
          ]);
        }

        const filterAttributes = productData.children[0].attributes
          .map((atributo) => {
            if (atributo.configurable === true) {
              return atributo;
            } else {
              return;
            }
          })
          .filter((filtrado) => filtrado !== undefined);
        setAtributos(filterAttributes);

        if (comments.length > 0) {
          setCommentValue(comments[0].comment);
        }
      }
    } else {
      setAddAllCartLocal([]);
    }
  }, [productData, atualizarEstado]);

  return (
    <>
      {!show && modalAddCarrinho === "ativo" && (
        <S.ModalWishList className={modalAddCarrinho}>
          <S.Transparente
            onClick={() => {
              document.body.style.overflow = "auto";
              setModalAddCarrinho("inativo");
            }}
          />

          <S.centroAlertaWishList>
            <div className="modalTitle">
              <span className="title">Adicionar item ao carrinho</span>
              <S.closeButton
                onClick={() => {
                  document.body.style.overflow = "auto";
                  setModalAddCarrinho("inativo");
                }}
              >
                x
              </S.closeButton>
            </div>
            <div className="caixaAdicionarCarrinho">
              <div className="boxImage">
                <img
                  src={
                    product.images !== undefined
                      ? `${appImages}/${product.images[0].path}`
                      : ""
                  }
                  alt="Item image"
                  className="imageList"
                />
              </div>
              <div className="boxData">
                <strong>{product.name}</strong>
                {atributos !== undefined && atributos.length > 0 && (
                  <ul>
                    {atributos.map((atributo, atributoIndex) => (
                      <li key={atributoIndex}>
                        {atributo.attribute[0].admin_name
                          .charAt(0)
                          .toUpperCase() +
                          atributo.attribute[0].admin_name.substr(1)}
                        :{" "}
                        {atributo.value.charAt(0).toUpperCase() +
                          atributo.value.substr(1)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="modalFooter">
              <button
                onClick={() => {
                  document.body.style.overflow = "auto";
                  setModalAddCarrinho("inativo");
                }}
                className="cancelar negativeButton"
              >
                CANCELAR
              </button>
              {loading ? (
                <img
                  className="loading"
                  src="/images/loadingIcon.svg"
                  alt="Carregando"
                />
              ) : (
                <button
                  onClick={() => handleCart()}
                  className="adicionar positiveButton"
                >
                  ADICIONAR
                </button>
              )}
            </div>
          </S.centroAlertaWishList>
        </S.ModalWishList>
      )}

      {!productData && (
        <S.ContainerLoading>
          <img src="/images/loadingIcon.svg" alt="loading" />
        </S.ContainerLoading>
      )}
      {productData !== undefined && product !== undefined && (
        <S.ContainerGeral>
          <S.boxCartao>
            <S.dadosListas>
              <div className="containerEsquerda">
                <div className="containerImage">
                  <img
                    src={
                      product.images !== undefined
                        ? `${appImages}/${product.images[0].path}`
                        : ""
                    }
                    alt="Item image"
                    className="imageList"
                  />
                </div>
                <div className="containerDados">
                  <S.cartaoTitle>{product.name}</S.cartaoTitle>
                  <S.cartaoNumber>
                    {atributos !== undefined && atributos.length > 0 && (
                      <ul>
                        {atributos.map((atributo, atributoIndex) => (
                          <li key={atributoIndex}>
                            {atributo.attribute[0].admin_name
                              .charAt(0)
                              .toUpperCase() +
                              atributo.attribute[0].admin_name.substr(1)}
                            :{" "}
                            {atributo.value.charAt(0).toUpperCase() +
                              atributo.value.substr(1)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </S.cartaoNumber>
                </div>
              </div>

              <div className="containerValores">
                {product.offers !== undefined && product.offers.length > 0 ? (
                  <>
                    <section>
                      <span>Unidade</span>
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                        })
                          .format(product.offers[0].price)
                          .replace(/\xA0/g, " ")}
                      </span>
                    </section>
                    <section>
                      <span>
                        Total ( <strong> {quantidade}</strong> unidades)
                      </span>
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                        })
                          .format(product.offers[0].price * quantidade)
                          .replace(/\xA0/g, " ")}
                      </span>
                    </section>
                  </>
                ) : (
                  "Indisponível"
                )}
              </div>

              <div className="containerEdicao">
                {product.offers !== undefined && product.offers.length > 0 && (
                  <>
                    <S.editarCartao
                      className="addCart positiveButton"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setModalAddCarrinho("ativo");
                      }}
                    >
                      ADICIONAR AO CARRINHO
                    </S.editarCartao>
                  </>
                )}
              </div>
            </S.dadosListas>
          </S.boxCartao>
          <S.boxComments>
            <div className="bubble"></div>
            <textarea
              placeholder={
                "Não é possível adicionar comentários porque você não tem permissão de edição"
              }
              readOnly
              maxLength={200}
              cols="30"
              rows="10"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />

            {comments.length > 0 && (
              <div className="containerButtonComment">
                <div className="containerLinhaAcima">
                  <div>
                    Prioridade:{" "}
                    {comments[0].priority === 1
                      ? "Muito Baixa"
                      : comments[0].priority === 2
                      ? "Baixa"
                      : comments[0].priority === 3
                      ? "Média"
                      : comments[0].priority === 4
                      ? "Alta"
                      : "Muito Alta"}
                  </div>
                </div>
              </div>
            )}
            <div className="containerEdicao">
              {product.offers !== undefined && product.offers.length > 0 && (
                <>
                  <S.editarCartao
                    className="addCart mobile negativeButton"
                    onClick={() => {
                      document.body.style.overflow = "hidden";
                      setModalAddCarrinho("ativo");
                    }}
                  >
                    ADICIONAR AO CARRINHO
                  </S.editarCartao>
                </>
              )}
            </div>
          </S.boxComments>
        </S.ContainerGeral>
      )}
    </>
  );
}

export default BoxWishListPublicItem;
