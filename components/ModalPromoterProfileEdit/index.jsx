import React, { useState, useEffect, useRef } from "react";

import ImageUploading from "react-images-uploading";

import { ImageAdd } from "@styled-icons/boxicons-solid/ImageAdd";

import notification from "../../services/notification";

// Css do componente
import * as S from "./styles";

export default function ModalPromoterProfileEdit({
  photobookProfileModalActive,
  setPhotobookProfileModalActive,
  description,
  setDescription,
  imgProfile,
  setImgProfile,
  cover,
  setCover,
  getProfileData,
  api,
  mktName,
  setCartLength,
}) {
  const [loading, setLoading] = useState(false);

  const maxNumber = 1;

  const onChangeImageProfileUpload = (imageList, addUpdateIndex) => {
    // data for submit

    setImgProfile(imageList);
  };
  const onChangeImageCoverUpload = (imageList, addUpdateIndex) => {
    // data for submit

    setCover(imageList);
  };

  async function updateProfile() {
    setLoading(true);
    const dataPhotobook = new FormData();
    dataPhotobook.append("description", description);
    if (
      imgProfile !== null &&
      imgProfile.length > 0 &&
      imgProfile[0].file !== undefined
    ) {
      dataPhotobook.append("img_profile", imgProfile[0].file);
    }
    if (cover !== null && cover.length > 0 && cover[0].file !== undefined) {
      dataPhotobook.append("cover", cover[0].file);
    }

    try {
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

      const { data: response } = await api.post(
        "/customer/promoter/profile",
        dataPhotobook,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      notification("Perfil atualizado com sucesso", "success");
      setPhotobookProfileModalActive("inactive");
      getProfileData();
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
        setLoading(false);
        notification("Erro ao atualizar Perfil", "error");
      }
    }
  }

  useEffect(() => {
    getProfileData();
    // eslint-disable-next-line
  }, []);

  return (
    <S.ModalPhotobook className={photobookProfileModalActive}>
      <S.Transparente
        onClick={() => {
          document.body.style.overflow = "auto";
          setPhotobookProfileModalActive("inactive");
        }}
      />

      <S.centroAlertaPhotobook>
        <div className="modalTitle">
          <span className="title">Atualizar seu dados como promotor</span>
          <S.closeButton
            onClick={() => {
              document.body.style.overflow = "auto";
              setPhotobookProfileModalActive("inactive");
            }}
          >
            x
          </S.closeButton>
        </div>
        <div className="caixaLista">
          <div className="formCreate">
            <textarea
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              value={description}
              rows="3"
              placeholder="Digite a descrição da lista"
              cols="40"
              maxLength="100"
            />

            <div className="containerImageUpload">
              <ImageUploading
                value={imgProfile}
                onChange={onChangeImageProfileUpload}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                resolutionWidth={180}
                resolutionHeight={180}
                resolutionType="less"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                  errors,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    {errors !== null &&
                      errors.resolution &&
                      notification(
                        "A imagem deve ter a resolução de 180x180",
                        "error"
                      )}
                    {imageList.length === 0 && (
                      <button
                        className="buttonAdicionarImagem negativeButton"
                        style={isDragging ? { color: "#086a68" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <div className="dadosImage">
                          Clique ou arraste sua imagem de Perfil de 180x180
                        </div>
                        <div className="containerImage">
                          <ImageAdd />
                        </div>
                      </button>
                    )}

                    {imageList.map((image, index) => (
                      <div key={index} className="image-uploaded">
                        <div className="containerImageUploaded">
                          <img
                            src={image["data_url"]}
                            alt="imagem carregada"
                            width="100px;"
                          />
                        </div>

                        <div className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>
                            Alterar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
            <div className="containerImageUpload">
              <ImageUploading
                value={cover}
                onChange={onChangeImageCoverUpload}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                resolutionWidth={1640}
                resolutionHeight={360}
                resolutionType="less"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                  errors,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    {errors !== null &&
                      errors.resolution &&
                      notification(
                        "A imagem deve ter a resolução de 1640x360",
                        "error"
                      )}
                    {imageList.length === 0 && (
                      <button
                        className="buttonAdicionarImagem negativeButton"
                        style={isDragging ? { color: "#086a68" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <div className="dadosImage">
                          Clique ou arraste sua imagem de Capa de 1640x360
                        </div>
                        <div className="containerImage">
                          <ImageAdd />
                        </div>
                      </button>
                    )}

                    {imageList.map((image, index) => (
                      <div key={index} className="image-uploaded cover">
                        <div className="containerImageUploaded">
                          <img
                            src={image["data_url"]}
                            alt="imagem carregada"
                            width="200px;"
                            height="50px;"
                          />
                        </div>

                        <div className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>
                            Alterar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>
        </div>

        <div className="modalFooter">
          <button
            onClick={() => {
              document.body.style.overflow = "auto";
              setPhotobookProfileModalActive("inactive");
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
              onClick={updateProfile}
            >
              ATUALIZAR
            </button>
          )}
        </div>
      </S.centroAlertaPhotobook>
    </S.ModalPhotobook>
  );
}
