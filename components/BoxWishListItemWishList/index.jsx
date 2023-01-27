import { useQuery } from "@apollo/client";

import { useRouter } from "next/router";

// Template do site
import * as S from "./style";

import { GET_PRODUCT } from "./Querys";
import { useEffect, useState } from "react";

import { Trash } from "@styled-icons/ionicons-solid/Trash";
import { Gear } from "@styled-icons/octicons/Gear";
import { BookHeart } from "@styled-icons/boxicons-regular/BookHeart";
import { ChangeCircle } from "@styled-icons/material-sharp/ChangeCircle";
import { Cart } from "@styled-icons/ionicons-sharp/Cart";

import { DotsHorizontal } from "@styled-icons/boxicons-regular/DotsHorizontal";

import notification from "../../services/notification";

function BoxWishListItemWishList({
  id,
  idOffer,
  code,
  comments,
  setAtualizarEstado,
  atualizarEstado,
  idList,
  addAllCartLocal,
  setAddAllCartLocal,
  edit,
  shared,
  wishListApi,
  api,
  setCartLength,
  show,
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

  const [modalEdicaoMobile, setModalEdicaoMobile] = useState("inativo");
  const [modalAddCarrinho, setModalAddCarrinho] = useState("inativo");
  const [openEditModal, setOpenEditModal] = useState("inativo");
  const [modalDelete, setModalDelete] = useState("inativo");
  const [openWishList, setOpenWishList] = useState("inativo");
  const [product, setProduct] = useState({});
  const [atributos, setAtributos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [codeOfList, setCodeOfList] = useState(false);
  const [getList, setGetList] = useState([]);
  const [commentValue, setCommentValue] = useState(
    comments.length > 0 ? comments[0].comment : ""
  );
  const [prioridade, setPrioridade] = useState(
    comments.length > 0 ? comments[0].priority : false
  );
  const [quantidade, setQuantidade] = useState(
    comments.length > 0 ? comments[0].quantity : 1
  );

  const [submit, setSubmit] = useState(false);

  const history = useRouter();

  async function addComment() {
    setSubmit(true);
    const dataCart = {
      item_id: idList,
      comment: commentValue,
      priority: prioridade,
      quantity: quantidade,
    };

    if (commentValue === "") {
      notification("Adicione algum comentário antes de adicionar", "error");
    } else if (prioridade === false) {
      notification("Adicione a prioridade da lista", "error");
    } else {
      try {
        const { data: responseListMove } = await wishListApi.post(
          `/wish-list/customer/comment/create`,
          dataCart,
          {
            headers: {
              Type: "customer",
              "Url-Store": process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL,
            },
          }
        );
        document.body.style.overflow = "auto";
        notification("Comentário adicionado com sucesso", "success");
        setAtualizarEstado(!atualizarEstado);
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);

          document.body.style.overflow = "auto";
        } else {
          notification("Erro ao adicionar comentário", "error");
          document.body.style.overflow = "auto";
        }
      }
    }
  }

  async function updateComment() {
    setSubmit(true);
    const dataCart = {
      comment: commentValue,
      priority: prioridade,
      quantity: quantidade,
    };

    if (commentValue === "") {
      notification(
        "Adicione algum comentário antes de atualizar ou o remova",
        "error"
      );
    } else {
      try {
        const { data: responseListMove } = await wishListApi.put(
          `/wish-list/customer/comment/update/${comments[0].id}`,
          dataCart,
          {
            headers: {
              Type: "customer",
              "Url-Store": process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL,
            },
          }
        );
        document.body.style.overflow = "auto";
        notification("Comentário atualizado com sucesso", "success");
        setAtualizarEstado(!atualizarEstado);
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          sessionStorage.setItem("urlantiga", window.location.href);
          document.body.style.overflow = "auto";
          notification("Sua sessão expirou, faça o login novamente", "error");
          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          document.body.style.overflow = "auto";
          notification("Erro ao atualizar comentário", "error");
        }
      }
    }
  }

  async function deleteComment() {
    try {
      const { data: responseListMove } = await wishListApi.delete(
        `/wish-list/customer/comment/delete/${comments[0].id}`,
        {
          headers: {
            Type: "customer",
            "Url-Store": process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL,
          },
        }
      );
      document.body.style.overflow = "auto";
      notification("Comentário removido com sucesso", "success");
      setAtualizarEstado(!atualizarEstado);
    } catch (e) {
      if (e.response?.data.message === "Não Autorizado.") {
        document.body.style.overflow = "auto";
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      } else {
        document.body.style.overflow = "auto";
        notification("Erro ao remover produto", "error");
      }
    }
  }

  async function handleCart() {
    setLoading(true);
    const dataCart = [
      {
        product: id,

        quantity: quantidade,
        seller_info: {
          item_id: idList,
          seller_id: productData.children[0].offers[0].marketplace_seller_id,
          offer: idOffer,
          store:
            productData.children[0].offers[0].marketplace_seller[0].shop_title,
        },
      },
    ];

    try {
      const response = await api.post("/customer/checkout/cart/add", dataCart);
      if (localStorage.getItem(process.env.NEXT_PUBLIC_REACT_APP_NAME)) {
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
      setModalEdicaoMobile("inativo");

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

  async function changeProductOtherList() {
    setLoading(true);
    const dataProductList = {
      product_id: id,
      code: codeOfList.code,
    };

    try {
      const { data: responseListMove } = await wishListApi.post(
        `/wish-list/customer/${code}/item/move`,
        dataProductList,
        {
          headers: {
            Type: "customer",
            "Url-Store": process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL,
          },
        }
      );
      notification("Item movido com sucesso", "success");
      document.body.style.overflow = "auto";
      setOpenWishList("inativo");
      setModalEdicaoMobile("inativo");
      setAtualizarEstado(!atualizarEstado);
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
        notification("Erro ao mover produto de lista", "error");
        setLoading(false);
      }
    }
  }

  async function getListCharge() {
    setLoading(true);
    try {
      const { data: responseList } = await wishListApi.get(
        "/wish-list/customer/my-list",
        {
          headers: {
            Type: "customer",
            "Url-Store": process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL,
          },
        }
      );

      const filtro = responseList.data.filter((list) => list.code !== code);

      setGetList(filtro);

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
        notification(
          "Erro ao carregar lista para mover produtos entre listas",
          "error"
        );
        setLoading(false);
      }
    }
  }

  async function deleteItem(initial) {
    setLoading(true);

    try {
      const token = localStorage.getItem(
        process.env.NEXT_PUBLIC_REACT_APP_NAME
      );
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
            "Url-Store": process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL,
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
        setModalEdicaoMobile("inativo");
        setAtualizarEstado(!atualizarEstado);
        setLoading(false);
      } else {
        notification("Item removido com sucesso", "success");
        document.body.style.overflow = "auto";
        setModalDelete("inativo");
        setModalEdicaoMobile("inativo");
        setAtualizarEstado(!atualizarEstado);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
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
    if (history.isReady) {
      if (getList.length === 0) {
        getListCharge();
      }
      if (productData) {
        if (productData.children[0] === undefined) {
          deleteItem("initial");
        } else {
          setProduct(productData.children[0]);

          if (productData.children[0]?.offers?.length > 0) {
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
    }
  }, [productData, atualizarEstado]);

  return (
    <>
      {!show && openWishList === "ativo" && (
        <S.ModalWishList className={openWishList}>
          <S.Transparente
            onClick={() => {
              setOpenWishList("inativo");
              setCodeOfList(false);
            }}
          />

          <S.centroAlertaWishList>
            <div className="modalTitle">
              <span className="title">Mover produto de lista</span>
              <S.closeButton
                onClick={() => {
                  setOpenWishList("inativo");
                  setCodeOfList(false);
                }}
              >
                x
              </S.closeButton>
            </div>
            <div className="caixaLista">
              {getList !== undefined && getList.length > 0 ? (
                <>
                  {getList.map((list) => (
                    <div
                      key={list.code}
                      className={
                        codeOfList.code === list.code
                          ? "adicionarProjeto selecionado"
                          : "adicionarProjeto"
                      }
                      onClick={() => setCodeOfList(list)}
                    >
                      <div className="containerImage">
                        {list.cover !== null ? (
                          <img
                            className="imageList"
                            src={list.cover}
                            alt={list.name}
                          />
                        ) : (
                          <BookHeart />
                        )}
                      </div>
                      <div className="containerDados">
                        <div className="titleCard">{list.name}</div>
                        <div className="subtitle">
                          {list.type === "private" ? "Particular" : "Pública"}
                        </div>
                        <div className="subtitle">{list.description}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="nothing">Sem listas disponíveis para mover</div>
              )}
            </div>
            <div className="modalFooter">
              <button
                onClick={() => {
                  setOpenWishList("inativo");
                  setCodeOfList(false);
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
                  onClick={
                    codeOfList !== false
                      ? () => changeProductOtherList()
                      : () =>
                          notification(
                            "Selecione uma das listas para mover o produto da lista atual",
                            "error"
                          )
                  }
                  className={
                    codeOfList !== false
                      ? "adicionar positiveButton"
                      : "adicionarBloqueado positiveButton"
                  }
                >
                  MOVER
                </button>
              )}
            </div>
          </S.centroAlertaWishList>
        </S.ModalWishList>
      )}

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
                      ? `https://plataz-bucket.s3.sa-east-1.amazonaws.com/${product.images[0].path}`
                      : ""
                  }
                  alt="Item picture"
                  className="imageList"
                />
              </div>
              <div className="boxData">
                <strong>{product.name}</strong>
                {atributos !== undefined && atributos.length > 0 && (
                  <ul>
                    {atributos.map((atributo, index) => (
                      <li key={index}>
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

      {!show && modalDelete === "ativo" && (
        <S.ModalWishList className={modalDelete}>
          <S.Transparente onClick={() => setModalDelete("inativo")} />

          <S.centroAlertaWishListDelete>
            <div className="modalTitle">
              <span className="title">Remover item</span>
              <S.closeButton onClick={() => setModalDelete("inativo")}>
                x
              </S.closeButton>
            </div>
            <div className="caixaDelete">
              <div className="contentDelete">
                {" "}
                Deseja realmente remover o item <strong>
                  {product.name}
                </strong>{" "}
                ?
              </div>
            </div>
            <div className="modalFooter">
              <button
                onClick={() => setModalDelete("inativo")}
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
                  onClick={() => deleteItem(id)}
                  className="adicionar positiveButton"
                >
                  REMOVER
                </button>
              )}
            </div>
          </S.centroAlertaWishListDelete>
        </S.ModalWishList>
      )}

      {!show && openEditModal === "ativo" && (
        <S.ModalWishList className={openEditModal}>
          <S.Transparente onClick={() => setOpenEditModal("inativo")} />

          <S.centroAlertaWishListEdit>
            <div className="modalTitle">
              <span className="title">Editar item</span>
              <S.closeButton onClick={() => setOpenEditModal("inativo")}>
                x
              </S.closeButton>
            </div>
            <div className="caixaEdit">
              <strong className="label">Comentário</strong>
              <textarea
                style={{
                  border:
                    submit && commentValue.length === 0 && "2px solid #ce171f",
                }}
                placeholder={
                  edit === true && shared === "true"
                    ? "Digite aqui seu Comentário"
                    : shared === "false"
                    ? "Digite aqui seu Comentário"
                    : "Não é possível adicionar comentários porque você não tem permissão de edição"
                }
                readOnly={
                  edit === true && shared === "true"
                    ? false
                    : shared === "false"
                    ? false
                    : true
                }
                maxLength={200}
                cols="30"
                rows="10"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <strong className="label">Prioridade</strong>
              <select
                style={{
                  border: submit && prioridade === false && "2px solid #ce171f",
                }}
                value={prioridade}
                className="selectMaiorMenor"
                onChange={(event) => {
                  setPrioridade(event.target.value);
                }}
              >
                <option value="" hidden>
                  Selecione a prioridade
                </option>
                <option value={1}>Muito Baixa</option>
                <option value={2}>Baixa</option>
                <option value={3}>Média</option>
                <option value={4}>Alta</option>
                <option value={5}>Muito Alta</option>
              </select>
              <strong className="label">Quantidade</strong>
              <div className="containerInput">
                <input
                  style={{
                    border:
                      submit && quantidade.length === 0 && "2px solid #ce171f",
                  }}
                  maxLength="20"
                  type="number"
                  placeholder="Digite a quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </div>
            </div>

            <div className="modalFooter">
              {loading ? (
                <img
                  className="loading"
                  src="/images/loadingIcon.svg"
                  alt="Carregando"
                />
              ) : (
                <>
                  <button
                    onClick={comments.length > 0 ? updateComment : addComment}
                    className="adicionar positiveButton"
                  >
                    {comments.length > 0 ? "ATUALIZAR" : "ADICIONAR"}
                  </button>
                  {comments.length > 0 && (
                    <button
                      onClick={deleteComment}
                      className="adicionar positiveButton"
                    >
                      REMOVER
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => setOpenEditModal("inativo")}
                className="cancelar negativeButton"
              >
                CANCELAR
              </button>
            </div>
          </S.centroAlertaWishListEdit>
        </S.ModalWishList>
      )}

      {modalAddCarrinho !== "ativo" &&
        openWishList !== "ativo" &&
        openEditModal !== "ativo" &&
        modalEdicaoMobile === "ativo" &&
        !show &&
        modalDelete !== "ativo" && (
          <S.ModalEditarMobile className={modalEdicaoMobile}>
            <S.Transparente
              className="transparenteModalEditarMobile"
              onClick={() => {
                document.body.style.overflow = "auto";
                setModalEdicaoMobile("inativo");
              }}
            />
            <S.centroAlertaModalEditarMobile>
              <div className="cabecalho">Sobre o item</div>

              <div className="dadosLocalMobile">
                <div className="boxImage">
                  <img
                    src={
                      product.images !== undefined
                        ? `https://plataz-bucket.s3.sa-east-1.amazonaws.com/${product.images[0].path}`
                        : ""
                    }
                    alt="Item image"
                    className="imageList"
                  />
                </div>
                {product.name}{" "}
                <strong>
                  Unidade:{" "}
                  {product.offers !== undefined && product.offers.length > 0
                    ? Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                      })
                        .format(product.offers[0].price)
                        .replace(/\xA0/g, " ")
                    : "Indisponível"}
                </strong>
                <strong>
                  Total:{" "}
                  {product.offers !== undefined && product.offers.length > 0
                    ? Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                      })
                        .format(product.offers[0].price * quantidade)
                        .replace(/\xA0/g, " ")
                    : "Indisponível"}
                </strong>
              </div>
              <div className="ContainerBotoesMobile">
                {edit === true && shared === "true" ? (
                  <div
                    className="botao positiveButton"
                    onClick={() => {
                      setOpenWishList("ativo");
                    }}
                  >
                    <div className="containerTexto">Mover</div>
                    <div className="containerView">
                      <ChangeCircle />
                    </div>
                  </div>
                ) : shared === "false" ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => setOpenWishList("ativo")}
                  >
                    <div className="containerTexto">Mover</div>
                    <div className="containerView">
                      <ChangeCircle />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {edit === true && shared === "true" ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => setOpenEditModal("ativo")}
                  >
                    <div className="containerTexto">Editar</div>
                    <div className="containerView">
                      <Gear />
                    </div>
                  </div>
                ) : shared === "false" ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => setOpenEditModal("ativo")}
                  >
                    <div className="containerTexto">Editar</div>
                    <div className="containerView">
                      <Gear />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {product.offers !== undefined && product.offers.length > 0 && (
                  <div
                    className="botao  positiveButton"
                    onClick={() => handleCart()}
                  >
                    <div className="containerTexto">Comprar</div>
                    <div className="containerView">
                      <Cart />
                    </div>
                  </div>
                )}
                {edit === true && shared === "true" ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => setModalDelete("ativo")}
                  >
                    <div className="containerTexto">Apagar</div>
                    <div className="containerView">
                      <Trash />
                    </div>
                  </div>
                ) : shared === "false" ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => setModalDelete("ativo")}
                  >
                    <div className="containerTexto">Apagar</div>
                    <div className="containerView">
                      <Trash />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div
                  onClick={() => {
                    document.body.style.overflow = "auto";
                    setModalEdicaoMobile("inativo");
                  }}
                  className="botaoVoltar  negativeButton"
                >
                  Voltar
                </div>
              </div>
            </S.centroAlertaModalEditarMobile>
          </S.ModalEditarMobile>
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
                        ? `https://plataz-bucket.s3.sa-east-1.amazonaws.com/${product.images[0].path}`
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
                        {atributos.map((atributo, index) => (
                          <li key={index}>
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
                )}{" "}
                <S.editarCartao
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setModalEdicaoMobile("ativo");
                  }}
                >
                  <DotsHorizontal style={{ minWidth: "50px" }} />
                </S.editarCartao>
              </div>
            </S.dadosListas>
          </S.boxCartao>
          <S.boxComments>
            <div className="bubble"></div>
            <textarea
              placeholder={
                edit === true && shared === "true"
                  ? "Adicione um comentário pelo menu de edição"
                  : shared === "false"
                  ? "Adicione um comentário pelo menu de edição"
                  : "Não é possível adicionar comentários porque você não tem permissão de edição"
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
                  {/*<div>Quantidade: {comments[0].quantity}</div>*/}
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
                {/*  {product.offers !== undefined && product.offers.length > 0 && (*/}
                {/*      <>*/}
                {/*<span className="total">*/}
                {/*  Total:*/}
                {/*  <strong>*/}
                {/*    &nbsp;*/}
                {/*    {Intl.NumberFormat("pt-BR", {*/}
                {/*      style: "currency",*/}
                {/*      currency: "BRL",*/}
                {/*      minimumFractionDigits: 2,*/}
                {/*    })*/}
                {/*        .format(product.offers[0].price * quantidade)*/}
                {/*        .replace(/\xA0/g, " ")}*/}
                {/*  </strong>*/}
                {/*</span>*/}
                {/*      </>*/}
                {/*  )}*/}
              </div>
            )}
            <div className="containerEdicao">
              {product.offers !== undefined && product.offers.length > 0 && (
                <>
                  <S.editarCartao
                    className="addCart mobile negativeButton"
                    onClick={() => setModalAddCarrinho("ativo")}
                  >
                    ADICIONAR AO CARRINHO
                  </S.editarCartao>
                  <S.editarCartao
                    className="mobile dots"
                    onClick={() => {
                      document.body.style.overflow = "hidden";

                      setModalEdicaoMobile("ativo");
                    }}
                  >
                    <Gear />
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

export default BoxWishListItemWishList;
