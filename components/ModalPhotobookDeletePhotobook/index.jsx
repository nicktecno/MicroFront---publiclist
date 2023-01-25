import notification from "../../services/notification";

import * as S from "./styles";

//Carrossel atributos

import { useState } from "react";

export function ModalPhotobookDeletePhotobook({
  photobookData,
  loadPhotobooks,
  modalDeleteActive,
  setModalDeleteActive,
  modalEditMobile,
  wishListApi,
  setCartLength,
  mktName,
  headerUrl,
}) {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars

  async function deleteList() {
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
        `/photobook/customer/gallery/delete/${photobookData.id}`,

        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
      notification("Photobook removido com sucesso", "success");
      document.body.style.overflow = "auto";
      setModalDeleteActive("inactive");
      loadPhotobooks();
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
        notification("Erro ao remover Photobook", "error");
        setLoading(false);
      }
    }
  }
  return (
    <S.ModalWishList className={modalDeleteActive}>
      <S.Transparente
        onClick={() => {
          if (modalEditMobile === "inactive") {
            document.body.style.overflow = "auto";
          }
          setModalDeleteActive("inactive");
        }}
      />

      <S.centroAlertaWishList>
        <div className="modalTitle">
          <span className="title">Remover Photobook</span>
          <S.closeButton
            onClick={() => {
              if (modalEditMobile === "inactive") {
                document.body.style.overflow = "auto";
              }
              setModalDeleteActive("inactive");
            }}
          >
            x
          </S.closeButton>
        </div>
        <div className="caixaDelete">
          <div className="contentDelete">
            {" "}
            Deseja realmente remover a lista{" "}
            <strong>{photobookData.name}</strong> ?
          </div>
        </div>
        <div className="modalFooter">
          <button
            onClick={() => {
              if (modalEditMobile === "inactive") {
                document.body.style.overflow = "auto";
              }
              setModalDeleteActive("inactive");
            }}
            className="cancelar negativeButton"
          >
            VOLTAR
          </button>
          {loading ? (
            <img
              className="loading"
              src="/images/loadingIcon.svg"
              alt="Carregando"
            />
          ) : (
            <button
              onClick={() => deleteList()}
              className="adicionar positiveButton"
            >
              REMOVER
            </button>
          )}
        </div>
      </S.centroAlertaWishList>
    </S.ModalWishList>
  );
}
