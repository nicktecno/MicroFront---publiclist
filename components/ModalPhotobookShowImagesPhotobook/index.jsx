import React, { useEffect, useState } from "react";

import * as S from "./styles";

import notification from "../../services/notification";

import { Carousel } from "react-bootstrap";
import ModalPhotobookAddImagePhotobook from "../ModalPhotobookAddImagePhotobook";
import { ModalPhotobookDeletePhotobookImage } from "../ModalPhotobookDeletePhotobookImage";
import ModalPhotobookUpdateImagePhotobook from "../ModalPhotobookUpdateImagePhotobook";

import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash } from "@styled-icons/ionicons-solid/Trash";
import { Like } from "@styled-icons/boxicons-regular/Like";

import { ModalPhotobookShowAllImagesPhotobook } from "../ModalPhotobookShowAllImagesPhotobook";

export default function ModalPhotobookShowImagesPhotobook({
  activeModalAddImagesPhotobook,
  setActiveModalAddImagesPhotobook,
  photobookData,
  modalEditMobile,
  setCartLength,
  wishListApi,
  api,
  mktName,
  headerUrl,
}) {
  const [galleryData, setGalleryData] = useState(photobookData);

  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);

  const [activeNewImageModal, setActiveNewImageModal] = useState("inactive");
  const [activeUpdateImageModal, setActiveUpdateImageModal] =
    useState("inactive");

  const [
    activeShowAllImagesPhotobookModal,
    setActiveShowAllImagesPhotobookModal,
  ] = useState("inactive");
  const [activeDeleteImageModal, setActiveDeleteImageModal] =
    useState("inactive");

  const [selectImage, setSelectImage] = useState(false);

  const [allLikes, setAllLikes] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  async function handleLike(item) {
    setLoading(true);

    try {
      await wishListApi.post(
        `/photobook/customer/gallery/${photobookData.id}/image/like/${item.id}`,
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
        `/photobook/customer/gallery/${photobookData.id}/image/dislike/${item.id}`,
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

  async function loadGallery() {
    setLoading(true);

    try {
      const { data: responseList } = await wishListApi.get(
        `/photobook/customer/gallery`,
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      const filter = responseList.data.filter(
        (eachData) => eachData.id === photobookData.id
      );

      setGalleryData(filter[0]);
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
        console.log(e);
        notification("Erro ao carregar a galeria do Photobook", "error");
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem(mktName) &&
      activeModalAddImagesPhotobook === "active"
    ) {
      loadLikes();
    }
  }, [activeModalAddImagesPhotobook]);

  return (
    <>
      <ModalPhotobookUpdateImagePhotobook
        activeUpdateImageModal={activeUpdateImageModal}
        setActiveUpdateImageModal={setActiveUpdateImageModal}
        photobookData={galleryData}
        loadGallery={loadGallery}
        selectImage={selectImage}
        api={api}
        wishListApi={wishListApi}
        setCartLength={setCartLength}
        headerUrl={headerUrl}
      />
      <ModalPhotobookAddImagePhotobook
        activeNewImageModal={activeNewImageModal}
        setActiveNewImageModal={setActiveNewImageModal}
        photobookData={galleryData}
        loadGallery={loadGallery}
        headerUrl={headerUrl}
      />

      <ModalPhotobookDeletePhotobookImage
        setActiveDeleteImageModal={setActiveDeleteImageModal}
        activeDeleteImageModal={activeDeleteImageModal}
        selectImage={selectImage}
        loadGallery={loadGallery}
        photobookData={galleryData}
        setIndex={setIndex}
        headerUrl={headerUrl}
        mktName={mktName}
      />

      <ModalPhotobookShowAllImagesPhotobook
        setActiveShowAllImagesPhotobookModal={
          setActiveShowAllImagesPhotobookModal
        }
        activeShowAllImagesPhotobookModal={activeShowAllImagesPhotobookModal}
        photobookData={galleryData}
        loadGallery={loadGallery}
        wishListApi={wishListApi}
        setCartLength={setCartLength}
        headerUrl={headerUrl}
        mktName={mktName}
      />

      {activeNewImageModal === "inactive" &&
        activeUpdateImageModal === "inactive" &&
        activeDeleteImageModal === "inactive" &&
        activeShowAllImagesPhotobookModal === "inactive" && (
          <S.ModalPhotobook className={activeModalAddImagesPhotobook}>
            <S.Transparent
              onClick={() => {
                if (modalEditMobile === "inactive") {
                  document.body.style.overflow = "auto";
                }

                setActiveModalAddImagesPhotobook("inactive");
              }}
            />

            <S.AlertCenterPhotobook>
              <div className="modalTitle">
                <span className="title">Photobook {photobookData.name}</span>
                <S.closeButton
                  onClick={() => {
                    if (modalEditMobile === "inactive") {
                      document.body.style.overflow = "auto";
                    }

                    setActiveModalAddImagesPhotobook("inactive");
                  }}
                >
                  x
                </S.closeButton>
              </div>

              <S.ContainerCenterBox>
                <div className="carouselContainer">
                  <Carousel activeIndex={index} onSelect={handleSelect}>
                    {activeModalAddImagesPhotobook === "active" &&
                    galleryData.images.length > 0 ? (
                      galleryData.images.map((item, index) => (
                        <Carousel.Item key={item.id} interval={10000000}>
                          <div className="containerItem">
                            <S.ImageBannerWeb
                              alt={item.name}
                              title={item.description}
                              src={item.image}
                            />
                            <div className="containerButtons">
                              <button
                                className="update"
                                onClick={() => {
                                  setActiveUpdateImageModal("active");
                                  setSelectImage(item);
                                }}
                              >
                                <div className="image">
                                  <Pencil />
                                </div>
                                <div className="title">Atualizar</div>
                              </button>

                              {allLikes.length > 0 &&
                              allLikes.includes(item.image) ? (
                                <button
                                  className="liked"
                                  onClick={() => handleDislike(item)}
                                >
                                  <div className="image">
                                    <Like />
                                  </div>
                                  <div className="title">Curtida</div>
                                </button>
                              ) : (
                                <button
                                  className="like"
                                  onClick={() => handleLike(item)}
                                >
                                  <div className="image">
                                    <Like />
                                  </div>
                                  <div className="title">Curtir</div>
                                </button>
                              )}
                              <button
                                className="delete"
                                onClick={() => {
                                  setSelectImage(item);
                                  setActiveDeleteImageModal("active");
                                }}
                              >
                                <div className="image">
                                  <Trash />
                                </div>
                                <div className="title">Deletar</div>
                              </button>
                            </div>
                          </div>
                        </Carousel.Item>
                      ))
                    ) : (
                      <div className="noImages">Sem imagens adicionadas</div>
                    )}
                  </Carousel>
                </div>
                <div className="dataContainer">
                  <div className="containerPhotoData">
                    <div className="titleContent">Nome da Foto</div>
                    <div className="content name">
                      {galleryData.images[index]?.name}
                    </div>
                    <div className="titleContent">Classificação</div>
                    <div className="content">
                      {galleryData.images[index]?.classifications.map(
                        (classification, classificationIndex) => (
                          <div key={classificationIndex}>
                            {classification.name}
                          </div>
                        )
                      )}
                    </div>
                    <div className="titleContent">Descrição</div>
                    <div className="content">
                      {galleryData.images[index]?.description}
                    </div>
                    <div className="containerAddNewImage">
                      <div
                        className="addNewImage positiveButton"
                        onClick={() => setActiveNewImageModal("active")}
                      >
                        Adicionar nova imagem ao Photobook
                      </div>
                      {photobookData.images.length > 0 && (
                        <div
                          className="addNewImage positiveButton"
                          onClick={() =>
                            setActiveShowAllImagesPhotobookModal("active")
                          }
                        >
                          Visualizar todas as imagens do Photobook
                        </div>
                      )}
                      {photobookData.code !== undefined &&
                        photobookData.code !== null && (
                          <a
                            target="_blank"
                            className="addNewImage positiveButton"
                            href={`/publiclist/${photobookData.code}`}
                            rel="noreferrer"
                          >
                            Ver Projeto vinculado
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </S.ContainerCenterBox>
            </S.AlertCenterPhotobook>
          </S.ModalPhotobook>
        )}
    </>
  );
}
