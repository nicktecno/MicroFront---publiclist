import { useEffect, useState } from "react";

import notification from "../../services/notification";
import * as S from "./styles";
import { Like } from "@styled-icons/boxicons-regular/Like";

export function ModalInspireImagePhotobookOptions({
  activeModal,
  setActiveModal,
  choosedPhoto,
  wishListApi,
  setCartLength,
  headerUrl,
  mktName,
}) {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allLikes, setAllLikes] = useState([]);

  async function loadLikes() {
    setLoading(true);

    try {
      const { data: response } = await wishListApi.get(
        `/photobook/customer/like`,

        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
      if (response.data !== undefined) {
        const mapLikes = response.data.map((like) => like.image);
        setAllLikes(mapLikes);
      } else {
        setAllLikes([]);
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
        notification("Erro ao carregar curtidas do Photobook", "error");
        setLoading(false);
      }
    }
  }

  async function handleLike(item) {
    setLoading(true);

    try {
      await wishListApi.post(
        `/photobook/customer/gallery/${item.gallery_id}/image/like/${item.id}`,
        {},
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      notification("Foto curtida com sucesso", "success");
      loadLikes();
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
        notification("Erro ao curtir foto", "error");
        setLoading(false);
      }
    }
  }

  async function handleDislike(item) {
    setLoading(true);

    try {
      await wishListApi.post(
        `/photobook/customer/gallery/${item.gallery_id}/image/dislike/${item.id}`,
        {},
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      notification("Curtida removida com sucesso", "success");
      loadLikes();
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
        notification("Erro ao remover curtida", "error");
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem(mktName) && activeModal === "active") {
      loadLikes();
      setLogged(true);
    }
  }, [activeModal]);

  return (
    <>
      {activeModal === "active" && (
        <S.ModalImagePhotobookOptions className={activeModal}>
          <S.Transparent
            onClick={() => {
              document.body.style.overflow = "auto";

              setActiveModal("inactive");
            }}
          />

          <S.centerModalImagePhotobookOptions>
            <div className="modalTitle">
              <span className="title">{choosedPhoto.name}</span>
              <S.closeButton
                onClick={() => {
                  document.body.style.overflow = "auto";

                  setActiveModal("inactive");
                }}
              >
                x
              </S.closeButton>
            </div>
            <div className="boxData">
              <div className="boxImage">
                <img src={choosedPhoto.image} alt={choosedPhoto.name} />
                {logged && (
                  <>
                    {allLikes.length > 0 &&
                    allLikes.includes(choosedPhoto.image) ? (
                      <div
                        className="add liked"
                        onClick={() => handleDislike(choosedPhoto)}
                      >
                        <Like />
                        <div className="like ">CURTIDA</div>
                      </div>
                    ) : (
                      <div
                        className="add"
                        onClick={() => handleLike(choosedPhoto)}
                      >
                        <Like />
                        <div className="like">CURTIR</div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="containerData">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`/profilepublicpromoter/${choosedPhoto.customer_id}`}
                  className="data name"
                >
                  <span className="name">Nome do Promotor Responsável:</span>{" "}
                  <strong className="name">{choosedPhoto.customer_name}</strong>
                  <span className="name">
                    Clique para ver o Perfil do Promotor
                  </span>
                </a>
                {choosedPhoto.wish_lists_code !== undefined &&
                  choosedPhoto.wish_lists_code !== null && (
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={`/publiclist/${choosedPhoto.wish_lists_code}`}
                      className="data name"
                    >
                      <span className="name">
                        Esta foto está vinculada a lista:
                      </span>
                      <strong className="name">
                        {choosedPhoto.wish_lists_name}
                      </strong>
                      <span className="name">Clique para ver a lista</span>
                    </a>
                  )}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`/publicphotobook/${choosedPhoto.customer_id}/${choosedPhoto.gallery_id}`}
                  className="data name"
                >
                  <span className="name">Esta foto pertence ao Photobook:</span>{" "}
                  <strong className="name">{choosedPhoto.gallery_name}</strong>
                  <span className="name">Clique para ver o Photobook</span>
                </a>

                <div className="data">
                  <span>Classificações:</span>{" "}
                  {choosedPhoto.classification_options_name.map(
                    (classif, classifIndex) => (
                      <strong key={classifIndex}>{classif}</strong>
                    )
                  )}
                </div>

                <div className="data">
                  <span>Descrição:</span>{" "}
                  <strong>{choosedPhoto.description}</strong>
                </div>
              </div>
            </div>
          </S.centerModalImagePhotobookOptions>
        </S.ModalImagePhotobookOptions>
      )}
    </>
  );
}
