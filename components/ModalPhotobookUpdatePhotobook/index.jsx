import React, { useEffect, useState } from "react";

import * as S from "./styles";

import { BookHeart } from "@styled-icons/boxicons-regular/BookHeart";

import notification from "../../services/notification";

export default function ModalPhotobookUpdatePhotobook({
  activeModalUpdatePhotobook,
  setActiveModalUpdatePhotobook,
  photobookData,
  loadPhotobooks,
  modalEditMobile,
  api,
  wishListApi,
  setCartLength,
  headerUrl,
  mktName,
}) {
  const [idList, setIdList] = useState(photobookData.wish_List_id);
  const [namePhotobook, setNamePhotobook] = useState(photobookData.name);
  const [descriptionPhotobook, setDescriptionPhotobook] = useState(
    photobookData.description
  );
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

      setLists(responseList.data);

      setLoading(false);
    } catch {
      setLoading(false);

      notification("Erro ao carregar as listas", "error");
    }
  }

  async function handleUpdatePhotobook() {
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
      const data = {
        name: namePhotobook,
        description: descriptionPhotobook,
        wish_list_id: idList,
      };
      try {
        await wishListApi.put(
          `/photobook/customer/gallery/update/${photobookData.id}`,
          data,
          {
            headers: {
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );
        notification("Photobook atualizado com sucesso", "success");
        setActiveModalUpdatePhotobook("inactive");
        setSubmit(false);
        loadPhotobooks();
        document.body.style.overflow = "auto";
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
          notification("Erro na atualização do Photobook", "error");
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
    <S.ModalPhotobook className={activeModalUpdatePhotobook}>
      <S.Transparent
        onClick={() => {
          if (modalEditMobile === "inactive") {
            document.body.style.overflow = "auto";
          }

          setActiveModalUpdatePhotobook("inactive");
        }}
      />

      <S.AlertCenterPhotobook>
        <div className="modalTitle">
          <span className="title">Atualizar Photobook</span>
          <S.closeButton
            onClick={() => {
              if (modalEditMobile === "inactive") {
                document.body.style.overflow = "auto";
              }

              setActiveModalUpdatePhotobook("inactive");
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
                        <img src={list.cover} alt="Capa do projeto" />
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
            <div className="listContainer not">Sem lista disponíveis</div>
          )}
        </div>
        <div className="modalFooter">
          <button
            onClick={() => {
              if (modalEditMobile === "inactive") {
                document.body.style.overflow = "auto";
              }

              setActiveModalUpdatePhotobook("inactive");
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
              className="adicionar positiveButton"
              onClick={handleUpdatePhotobook}
            >
              ATUALIZAR
            </button>
          )}
        </div>
      </S.AlertCenterPhotobook>
    </S.ModalPhotobook>
  );
}
