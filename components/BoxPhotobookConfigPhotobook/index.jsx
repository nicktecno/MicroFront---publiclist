import { useState } from "react";
import * as S from "./style";

import { DotsThreeHorizontal } from "@styled-icons/entypo/DotsThreeHorizontal";

import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash } from "@styled-icons/ionicons-solid/Trash";
import { ShareAlt } from "@styled-icons/boxicons-solid/ShareAlt";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ViewShow } from "@styled-icons/zondicons/ViewShow";
import { Gallery } from "@styled-icons/remix-fill/Gallery";
import { ModalPhotobookDeletePhotobook } from "../ModalPhotobookDeletePhotobook";
import ModalPhotobookUpdatePhotobook from "../ModalPhotobookUpdatePhotobook";
import ModalPhotobookShowImagesPhotobook from "../ModalPhotobookShowImagesPhotobook";

export default function BoxPhotobookConfigPhotobook({
  photobookData,
  loadPhotobooks,
  setIdMyPhotobook,
  setSharePhotobookModal,
  api,
  wishListApi,
  setCartLength,
  headerUrl,
  mktName,
}) {
  const [modalEditMobile, setModalEditMobile] = useState("inactive");
  const [modalDeleteActive, setModalDeleteActive] = useState("inactive");
  const [activeModalUpdatePhotobook, setActiveModalUpdatePhotobook] =
    useState("inactive");
  const [activeModalAddImagesPhotobook, setActiveModalAddImagesPhotobook] =
    useState("inactive");

  return (
    <>
      <ModalPhotobookShowImagesPhotobook
        activeModalAddImagesPhotobook={activeModalAddImagesPhotobook}
        setActiveModalAddImagesPhotobook={setActiveModalAddImagesPhotobook}
        photobookData={photobookData}
        modalEditMobile={modalEditMobile}
        api={api}
        wishListApi={wishListApi}
        setCartLength={setCartLength}
        mktName={mktName}
        headerUrl={headerUrl}
      />

      <ModalPhotobookUpdatePhotobook
        activeModalUpdatePhotobook={activeModalUpdatePhotobook}
        setActiveModalUpdatePhotobook={setActiveModalUpdatePhotobook}
        photobookData={photobookData}
        loadPhotobooks={loadPhotobooks}
        modalEditMobile={modalEditMobile}
        api={api}
        wishListApi={wishListApi}
        setCartLength={setCartLength}
        headerUrl={headerUrl}
        mktName={mktName}
      />
      <ModalPhotobookDeletePhotobook
        loadPhotobooks={loadPhotobooks}
        photobookData={photobookData}
        modalDeleteActive={modalDeleteActive}
        setModalDeleteActive={setModalDeleteActive}
        modalEditMobile={modalEditMobile}
        wishListApi={wishListApi}
        setCartLength={setCartLength}
        mktName={mktName}
        headerUrl={headerUrl}
      />
      {modalEditMobile === "active" &&
        modalDeleteActive === "inactive" &&
        activeModalUpdatePhotobook === "inactive" &&
        activeModalAddImagesPhotobook === "inactive" && (
          <S.ModalEditarMobile className={modalEditMobile}>
            <S.Transparent
              className="transparenteModalEditarMobile"
              onClick={() => {
                document.body.style.overflow = "auto";
                setModalEditMobile("inactive");
              }}
            />
            <S.centroAlertaModalEditarMobile>
              <div className="cabecalho">Sobre o Photobook</div>
              <div className="dadosLocalMobile">{photobookData.name}</div>
              <div className="ContainerBotoesMobile">
                <div
                  className="botao positiveButton"
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setActiveModalAddImagesPhotobook("active");
                  }}
                >
                  <div className="containerTexto">Visualizar</div>
                  <div className="containerView">
                    <ViewShow />
                  </div>
                </div>
                <div
                  className="botao positiveButton"
                  onClick={() => {
                    document.body.style.overflow = "hidden";

                    setActiveModalUpdatePhotobook("active");
                  }}
                >
                  <div className="containerTexto">Editar</div>
                  <div className="containerView">
                    <Pencil />
                  </div>
                </div>
                <div
                  className="botao positiveButton"
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
                <div
                  className="botao positiveButton"
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setModalDeleteActive("active");
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
                    setModalEditMobile("inactive");
                  }}
                  className="botaoVoltar negativeButton"
                >
                  Voltar
                </div>
              </div>
            </S.centroAlertaModalEditarMobile>
          </S.ModalEditarMobile>
        )}

      <S.BoxPhotobookConfigPhotobook>
        <div className="containerLogoName">
          <div className="boxLogo">
            {photobookData.images.length < 1 ? (
              <Gallery />
            ) : (
              <img
                src={photobookData.images[0].image}
                alt={`imagem da logo da empresa ${photobookData.name}`}
              />
            )}
          </div>
          <div className="boxName">{photobookData.name}</div>
          <div className="boxDescription">{photobookData.description}</div>
          <div className="boxFunctions">
            <div
              className="functionBox"
              onClick={() => {
                document.body.style.overflow = "hidden";
                setActiveModalAddImagesPhotobook("active");
              }}
            >
              <ViewShow />
            </div>
            <div
              className="functionBox"
              onClick={() => {
                document.body.style.overflow = "hidden";
                setActiveModalUpdatePhotobook("active");
              }}
            >
              <Pencil />
            </div>
            <div
              className="functionBox"
              onClick={() => {
                document.body.style.overflow = "hidden";
                setSharePhotobookModal("active");
                setIdMyPhotobook(photobookData);
              }}
            >
              <ShareAlt />
            </div>
            <div
              className="functionBox"
              onClick={() => {
                document.body.style.overflow = "hidden";
                setModalDeleteActive("active");
              }}
            >
              <Trash />
            </div>
          </div>
          <div className="boxFunctionsMobile">
            <div
              className="functionBox"
              onClick={() => {
                document.body.style.overflow = "hidden";
                setModalEditMobile("active");
              }}
            >
              <BsThreeDotsVertical />
            </div>
          </div>
          <div className="boxFunctionsMobile420">
            <div
              className="functionBox"
              onClick={() => {
                document.body.style.overflow = "hidden";
                setModalEditMobile("active");
              }}
            >
              <DotsThreeHorizontal />
            </div>
          </div>
        </div>
      </S.BoxPhotobookConfigPhotobook>
    </>
  );
}
