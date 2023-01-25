import notification from "../../services/notification";

import * as S from "./styles";

//Carrossel atributos

import { useState } from "react";

export function ModalPhotobookDeletePhotobookImage({
  setActiveDeleteImageModal,
  activeDeleteImageModal,
  selectImage,
  loadGallery,
  photobookData,
  setIndex,
  wishListApi,
  setCartLength,
  headerUrl,
  mktName,
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
        `/photobook/customer/gallery/${photobookData.id}/image/delete/${selectImage.id}`,

        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
      notification("Imagem removida com sucesso", "success");
      setIndex(0);
      setActiveDeleteImageModal("inactive");
      loadGallery();
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
        notification("Erro ao remover imagem", "error");
        setLoading(false);
      }
    }
  }
  return (
    <S.ModalWishList className={activeDeleteImageModal}>
      <S.Transparent
        onClick={() => {
          setActiveDeleteImageModal("inactive");
        }}
      />

      <S.centroAlertaWishList>
        <div className="modalTitle">
          <span className="title">Remover imagem </span>
          <S.closeButton
            onClick={() => {
              setActiveDeleteImageModal("inactive");
            }}
          >
            x
          </S.closeButton>
        </div>
        <div className="caixaDelete">
          <div className="contentDelete">
            {" "}
            Deseja realmente remover a imagem{" "}
            <strong>{selectImage.name}</strong> ?
          </div>
        </div>
        <div className="modalFooter">
          <button
            onClick={() => {
              setActiveDeleteImageModal("inactive");
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
