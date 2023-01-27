import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import notification from "../../services/notification";

import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import * as S from "./style";

//imagens
import { BookHeart } from "@styled-icons/boxicons-regular/BookHeart";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash } from "@styled-icons/ionicons-solid/Trash";
import { ShareAlt } from "@styled-icons/boxicons-solid/ShareAlt";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ViewShow } from "@styled-icons/zondicons/ViewShow";

import { Copy } from "@styled-icons/evaicons-solid/Copy";

import { ModalWishlistUpdateWishList } from "../../components/ModalWishlistUpdateWishList";
import { ModalWishlistDeleteWishList } from "../../components/ModalWishlistDeleteWishList";
import { ModalWishListTerms } from "../../components/ModalWishListTerms";
import { ModalWishlistAddProject } from "../../components/ModalWishlistAddProject";

const WishlistComponent = ({
  wishListApi,
  show,
  setCartLength,
  headerUrl,
  mktName,
  appUrl,
  msLocation,
  api,
}) => {
  const history = useRouter();

  const [lists, setLists] = useState([]);

  const [modalEdicaoMobile, setModalEdicaoMobile] = useState("inativo");

  //estados para formulário

  const [modalDelete, setModalDelete] = useState("inativo");
  const [modalUpdate, setModalUpdate] = useState("inativo");
  const [shareModal, setShareModal] = useState("inativo");
  const [permission, setPermission] = useState(false);
  const [emailShare, setEmailShare] = useState("");

  const [terms, setTerms] = useState({});
  const [modalTerms, setModalTerms] = useState("inativo");

  const [loading, setLoading] = useState(false);
  const [loadingAddList, setLoadingAddList] = useState(false);

  const [addProjetoModal, setAddProjetoModal] = useState("inativo");
  const [codeOfList, setCodeOfList] = useState(false);

  const [activeFilter, setActiveFilter] = useState(false);

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
      setActiveFilter(true);
      setLists(responseList.data);
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
        notification("Erro ao carregar dados da lista", "error");
        document.body.style.overflow = "auto";
        setModalUpdate("inativo");
        setLoading(false);
      }
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

  async function getListWishList() {
    setLoading(true);
    try {
      const { data: responseList } = await wishListApi.get(
        "/wish-list/customer/my-list",
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      setLists(responseList.data);
      setActiveFilter(false);
      setLoading(false);
    } catch {
      setLoading(false);
      setActiveFilter(false);
      notification("Erro ao carregar as listas", "error");
    }
  }

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
          `/wish-list/customer/share/${codeOfList.code}`,
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

  function copiarTexto(link) {
    notification("Link copiado", "success");
    navigator.clipboard.writeText(link);
  }

  async function getTerm() {
    setLoading(true);
    try {
      const { data: responseTerm } = await wishListApi.get(
        "/wish-list/customer/term",
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
      setLoading(false);
      setTerms(responseTerm);
      getListWishList();
    } catch {
      setLoading(false);

      setActiveFilter(false);
      notification("Erro ao carregar os termos da wishlist", "error");
    }
  }

  useEffect(() => {
    if (localStorage.getItem(mktName)) {
      const token = localStorage.getItem(mktName);

      if (token) {
        getTerm();
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
  }, []);

  return (
    <>
      {!show && modalUpdate === "ativo" && modalTerms !== "ativo" && (
        <ModalWishlistUpdateWishList
          getListWishList={getListWishList}
          setModalUpdate={setModalUpdate}
          modalUpdate={modalUpdate}
          terms={terms}
          setModalTerms={setModalTerms}
          codeOfList={codeOfList}
          modalEdicaoMobile={modalEdicaoMobile}
          msLocation={msLocation}
          wishListApi={wishListApi}
          setCartLength={setCartLength}
          headerUrl={headerUrl}
          mktName={mktName}
        />
      )}

      {!show && modalDelete === "ativo" && (
        <ModalWishlistDeleteWishList
          codeOfList={codeOfList}
          setModalDelete={setModalDelete}
          modalDelete={modalDelete}
          getListWishList={getListWishList}
          modalEdicaoMobile={modalEdicaoMobile}
          setCartLength={setCartLength}
          wishListApi={wishListApi}
          mktName={mktName}
          headerUrl={headerUrl}
        />
      )}

      {!show && shareModal === "ativo" && (
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
              <div className="name">{codeOfList.name}</div>
              <div className="type">
                Nível de permissão que você deseja conceder:
              </div>
              <div className="containerBotoes">
                <button
                  onClick={() => setPermission(false)}
                  className={
                    permission
                      ? "botao negativeButton"
                      : "botaoActive positiveButton"
                  }
                >
                  Visualizar
                </button>
                <button
                  onClick={() => setPermission(true)}
                  className={
                    !permission
                      ? "botao negativeButton"
                      : "botaoActive positiveButton"
                  }
                >
                  Visualizar e editar
                </button>
              </div>
              <div className="containerEmail">
                <div className="title">Digite o e-mail do destinatário:</div>
                <input
                  type="text"
                  onBlur={(e) => getEmailValid(e.target.value)}
                  onChange={(e) => setEmailShare(e.target.value)}
                  required
                />
              </div>
              {codeOfList.type === "public" && (
                <>
                  <div className="title">Link de compartilhamento</div>
                  <div className="containerCopyURL">
                    <div className="url">
                      <input
                        readOnly
                        type="text"
                        value={`${appUrl}/publiclist/${codeOfList.code}`}
                      />
                      <button
                        className="copyButton negativeButton"
                        onClick={() =>
                          copiarTexto(`${appUrl}/publiclist/${codeOfList.code}`)
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
                          className="adicionar positiveButton"
                        >
                          <S.EmailIcon />
                        </button>
                      )}
                      <a
                        className="socialMediaButton positiveButton"
                        href={`https://api.whatsapp.com/send?text= Olá, estou te enviando o link de uma lista meu no ${mktName}. Click no link abaixo para acessá-lo. ${appUrl}/publiclist/${codeOfList.code}`}
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
              {codeOfList.type === "private" && (
                <button
                  onClick={() => handleShare()}
                  className="adicionar positiveButton"
                >
                  Compartilhar <S.EmailIcon />
                </button>
              )}
            </div>
          </S.centroAlertaWishList>
        </S.ModalWishList>
      )}

      {!show && modalTerms === "ativo" && (
        <ModalWishListTerms
          modalTerms={modalTerms}
          setModalTerms={setModalTerms}
          terms={terms}
        />
      )}

      {!show && addProjetoModal !== "inativo" && modalTerms !== "ativo" && (
        <ModalWishlistAddProject
          getListWishList={getListWishList}
          addProjetoModal={addProjetoModal}
          setAddProjetoModal={setAddProjetoModal}
          terms={terms}
          modalTerms={modalTerms}
          setModalTerms={setModalTerms}
          modalEdicaoMobile={modalEdicaoMobile}
          msLocation={msLocation}
          wishListApi={wishListApi}
          setCartLength={setCartLength}
          headerUrl={headerUrl}
          mktName={mktName}
        />
      )}
      <S.caminho>
        <Container>
          <Row>
            <Col>
              <p>
                <Link href="/profile">Minha Conta &#62; </Link>
                <Link href="/profile/wishlist" passhref="true">
                  <span>Minhas Listas</span>
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </S.caminho>
      {modalUpdate !== "ativo" &&
        shareModal !== "ativo" &&
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
              <div className="cabecalho">Sobre a lista</div>
              <div className="dadosLocalMobile">{codeOfList.name}</div>
              <div className="ContainerBotoesMobile">
                <div
                  className="botao positiveButton"
                  onClick={() => {
                    document.body.style.overflow = "auto";
                    history.push(`wishlist/${codeOfList.code}`);
                  }}
                >
                  <div className="containerTexto">Visualizar</div>
                  <div className="containerView">
                    <ViewShow />
                  </div>
                </div>
                {codeOfList.edit === true && activeFilter === true ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => {
                      document.body.style.overflow = "hidden";

                      setModalUpdate("ativo");
                    }}
                  >
                    <div className="containerTexto">Editar</div>
                    <div className="containerView">
                      <Pencil />
                    </div>
                  </div>
                ) : activeFilter === false ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => {
                      document.body.style.overflow = "hidden";

                      setModalUpdate("ativo");
                    }}
                  >
                    <div className="containerTexto">Editar</div>
                    <div className="containerView">
                      <Pencil />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {codeOfList.edit === true && activeFilter === true ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => {
                      document.body.style.overflow = "hidden";
                      setShareModal("ativo");
                    }}
                  >
                    <div className="containerTexto">Compartilhar</div>
                    <div className="containerView">
                      <ShareAlt />
                    </div>
                  </div>
                ) : activeFilter === false ? (
                  <div
                    className="botao  positiveButton"
                    onClick={() => {
                      document.body.style.overflow = "hidden";
                      setShareModal("ativo");
                    }}
                  >
                    <div className="containerTexto">Compartilhar</div>
                    <div className="containerView">
                      <ShareAlt />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="botao  positiveButton"
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setModalDelete("ativo");
                  }}
                >
                  <div className="containerTexto">Apagar</div>
                  <div className="containerView">
                    <Trash />
                  </div>
                </div>

                <div
                  onClick={() => {
                    document.body.style.overflow = "auto";
                    setModalEdicaoMobile("inativo");
                  }}
                  className="botaoVoltar negativeButton"
                >
                  Voltar
                </div>
              </div>
            </S.centroAlertaModalEditarMobile>
          </S.ModalEditarMobile>
        )}

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
              <S.ContainerGeral>
                {lists && lists.length > 0 ? (
                  <div className="containerComBotoes">
                    <div className="containerListas">
                      {lists.map((list, index) => (
                        <div
                          className="containerCartoes"
                          key={list.code}
                          xs={12}
                          md={6}
                        >
                          <S.boxCartao onClick={() => setCodeOfList(list)}>
                            <S.dadosListas>
                              <div className="containerEsquerda">
                                <div className="containerImage">
                                  {list.cover !== null &&
                                  list.cover.length > 0 ? (
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
                                  <S.cartaoTitle>{list.name}</S.cartaoTitle>
                                  <S.cartaoNumber>
                                    <strong>
                                      {list.type === "private"
                                        ? "Particular"
                                        : "Pública"}
                                    </strong>
                                    <span>{list.description}</span>
                                  </S.cartaoNumber>
                                </div>
                              </div>

                              <div className="containerEdicao">
                                <S.editarMobile
                                  onClick={() => {
                                    document.body.style.overflow = "hidden";
                                    setModalEdicaoMobile("ativo");
                                  }}
                                >
                                  <BsThreeDotsVertical />
                                </S.editarMobile>
                                <S.editarCartao
                                  onClick={() =>
                                    history.push(`wishlist/${list.code}`)
                                  }
                                >
                                  <ViewShow />
                                </S.editarCartao>
                                {list.edit === true && activeFilter === true ? (
                                  <S.editarCartao
                                    onClick={() => {
                                      document.body.style.overflow = "hidden";
                                      setShareModal("ativo");
                                    }}
                                  >
                                    <ShareAlt />
                                  </S.editarCartao>
                                ) : activeFilter === false ? (
                                  <S.editarCartao
                                    onClick={() => {
                                      document.body.style.overflow = "hidden";
                                      setShareModal("ativo");
                                    }}
                                  >
                                    <ShareAlt />
                                  </S.editarCartao>
                                ) : (
                                  ""
                                )}
                                {list.edit === true && activeFilter === true ? (
                                  <S.editarCartao
                                    onClick={() => {
                                      document.body.style.overflow = "hidden";

                                      setModalUpdate("ativo");
                                    }}
                                  >
                                    <Pencil />
                                  </S.editarCartao>
                                ) : activeFilter === false ? (
                                  <S.editarCartao
                                    onClick={() => {
                                      document.body.style.overflow = "hidden";

                                      setModalUpdate("ativo");
                                    }}
                                  >
                                    <Pencil />
                                  </S.editarCartao>
                                ) : (
                                  ""
                                )}

                                <S.deletarCartao
                                  onClick={() => {
                                    document.body.style.overflow = "hidden";
                                    setModalDelete("ativo");
                                  }}
                                >
                                  <Trash />
                                </S.deletarCartao>
                              </div>
                            </S.dadosListas>
                          </S.boxCartao>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="containerComBotoes removed">
                    <div className="containerListas removed">
                      Sem listas disponíveis
                    </div>
                  </div>
                )}

                <S.TipoEnderecoContainer>
                  <h4 className="titulo">TIPO DE LISTA</h4>
                  <div className="bloco">
                    <div
                      className={
                        activeFilter
                          ? "botao positiveButton"
                          : "botaoActive positiveButton "
                      }
                      onClick={() => getListWishList()}
                    >
                      Minhas Listas
                    </div>
                    <div
                      className={
                        activeFilter
                          ? "botaoActive negativeButton"
                          : "botao negativeButton"
                      }
                      onClick={() => handleSharedList()}
                    >
                      Compartilhados comigo
                    </div>
                  </div>
                  <div
                    className="botao positiveButton"
                    onClick={() => {
                      document.body.style.overflow = "hidden";
                      setAddProjetoModal("ativo");
                    }}
                  >
                    CRIAR LISTA
                  </div>
                  <div
                    className="botaoVoltar  negativeButton"
                    onClick={() => history.push("/profile")}
                  >
                    VOLTAR
                  </div>
                </S.TipoEnderecoContainer>
              </S.ContainerGeral>
            </>
          )}
        </Container>
      </S.Lists>
    </>
  );
};

export default WishlistComponent;
