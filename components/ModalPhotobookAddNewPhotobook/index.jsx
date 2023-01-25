import React, { useEffect, useState } from "react";

import * as S from "./styles";

import { BookHeart } from "@styled-icons/boxicons-regular/BookHeart";

import notification from "../../services/notification";

export default function ModalPhotobookAddNewPhotobook({
  activeModalCreatePhotobook,
  setActiveModalCreatePhotobook,
  loadPhotobooks,
  setCartLength,
  api,
  wishListApi,
  headerUrl,
  mktName,
}) {
  const [idList, setIdList] = useState("");
  const [namePhotobook, setNamePhotobook] = useState("");
  const [descriptionPhotobook, setDescriptionPhotobook] = useState("");
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

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
      const filterPublicLists = responseList.data.filter(
        (list) => list.type === "public"
      );

      setLists(filterPublicLists);

      setLoading(false);
    } catch {
      setLoading(false);

      notification("Erro ao carregar as listas", "error");
    }
  }

  async function handleNewPhotobook() {
    setSubmit(true);
    setLoading(true);

    const token = localStorage.getItem(mktName);
    if (token) {
      api.defaults.headers.Authorization = token;
    } else {
      notification("Sua sessão expirou, faça o login novamente", "error");
      sessionStorage.setItem("urlantiga", window.location.href);

      setCartLength("0");
      setTimeout(function () {
        window.location.href = "/login";
      }, 3000);
    }

    if (namePhotobook === "" || descriptionPhotobook === "") {
      setLoading(false);

      notification(
        "O nome e a descrição do Photobook são obrigatórios",
        "error"
      );
    } else {
      const dataNotIdList = {
        name: namePhotobook,
        description: descriptionPhotobook,
      };
      const data = {
        name: namePhotobook,
        description: descriptionPhotobook,
        wish_list_id: idList,
      };
      try {
        await wishListApi.post(
          "/photobook/customer/gallery/store",
          idList !== "" ? data : dataNotIdList,
          {
            headers: {
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );
        notification("Photobook criado com sucesso", "success");
        setActiveModalCreatePhotobook("inactive");
        setSubmit(false);
        document.body.style.overflow = "auto";
        loadPhotobooks();
        setLoading(false);
      } catch (e) {
        if (e.response?.data.message === "Não Autorizado.") {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);
          setLoading(false);
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        } else {
          notification("Erro na criação do Photobook", "error");
          setLoading(false);
        }
      }
    }
  }
  useEffect(() => {
    if (localStorage.getItem(mktName)) {
      const token = localStorage.getItem(mktName);

      if (token) {
        getListWishList();
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
    <S.ModalPhotobook className={activeModalCreatePhotobook}>
      <S.Transparent
        onClick={() => {
          document.body.style.overflow = "auto";
          setIdList("");
          setNamePhotobook("");
          setDescriptionPhotobook("");

          setActiveModalCreatePhotobook("inactive");
        }}
      />

      <S.AlertCenterPhotobook>
        <div className="modalTitle">
          <span className="title">Criar Photobook</span>
          <S.closeButton
            onClick={() => {
              document.body.style.overflow = "auto";

              setIdList("");
              setNamePhotobook("");
              setDescriptionPhotobook("");

              setActiveModalCreatePhotobook("inactive");
            }}
          >
            x
          </S.closeButton>
        </div>
        <div className="boxInputs">
          <div className="containerInput">
            <input
              style={{
                border:
                  submit && namePhotobook.length === 0 && "2px solid #ce171f",
              }}
              type="text"
              placeholder="Digite o nome da lista"
              value={namePhotobook}
              onChange={(event) => {
                setNamePhotobook(event.target.value);
              }}
            />
          </div>
          <textarea
            onChange={(event) => {
              setDescriptionPhotobook(event.target.value);
            }}
            style={{
              border:
                submit &&
                descriptionPhotobook.length === 0 &&
                "2px solid #ce171f",
            }}
            rows="3"
            placeholder="Digite a descrição da lista"
            cols="40"
            value={descriptionPhotobook}
            maxLength="100"
          />
          {lists && lists.length > 0 ? (
            <>
              <span className="labelJoinWishList">
                {" "}
                Vincule seu Photobook a uma lista (Opcional)
              </span>
              <div className="listContainer">
                {lists.map((list, index) => (
                  <div
                    key={list.id}
                    className={
                      idList === list.id ? "boxWishList active" : "boxWishList"
                    }
                    onClick={() =>
                      idList === list.id ? setIdList("") : setIdList(list.id)
                    }
                  >
                    <div className="boxImage">
                      {list.cover !== null ? (
                        <img src={list.cover} alt="Capa da lista" />
                      ) : (
                        <BookHeart />
                      )}
                    </div>
                    <div className="boxText">
                      <div>{list.name}</div>

                      <div>
                        {list.type === "private" ? "Particular" : "Pública"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="listContainer not">
              Sem Projetos disponíveis para vincular
            </div>
          )}
        </div>
        <div className="modalFooter">
          <button
            onClick={() => {
              document.body.style.overflow = "auto";
              setIdList("");
              setNamePhotobook("");
              setDescriptionPhotobook("");

              setActiveModalCreatePhotobook("inactive");
            }}
            className="modalButton negativeButton"
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
              className="modalButton positiveButton"
              onClick={handleNewPhotobook}
            >
              ADICIONAR
            </button>
          )}
        </div>
      </S.AlertCenterPhotobook>
    </S.ModalPhotobook>
  );
}
