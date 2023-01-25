import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

import { ImageAdd } from "@styled-icons/boxicons-solid/ImageAdd";

import notification from "../../services/notification";

import * as S from "./styles";
import MultipleSelectCheckmarksPromoterClassifications from "../MultipleSelectCheckmarksPromoterClassifications";
import SelectPromoterClassifications from "../SelectPromoterClassifications";

export default function ModalPhotobookAddImagePhotobook({
  activeNewImageModal,
  setActiveNewImageModal,
  photobookData,
  loadGallery,
  api,
  setCartLength,
  wishListApi,
  headerUrl,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const [classificationId, setClassificationId] = useState([]);
  const [classificationName, setClassificationName] = useState([]);
  const [option, setOption] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [, setStatusUpdate] = useState(false);

  useEffect(() => {
    if (activeNewImageModal === "active") {
      loadClassifications();
    }
  }, [activeNewImageModal]);

  const maxNumber = 1;

  const onChangeImageProfileUpload = (imageList, addUpdateIndex) => {
    // data for submit

    setImage(imageList);
  };

  async function handleAddPhoto() {
    setLoading(true);

    const reduceOption = option
      .map((subOption) => {
        const reduceSubOption = subOption.refineId.map((optionsZ) => optionsZ);
        return reduceSubOption;
      })
      .flat();

    if (
      name === "" ||
      description === "" ||
      reduceOption.length === 0 ||
      image.length === 0
    ) {
      notification("Verifique se todos os campos estão preenchidos", "error");
      setLoading(false);
    } else {
      const data = new FormData();

      data.append("images[0][name]", name);
      data.append("images[0][description]", description);
      data.append("images[0][image]", image[0].file);
      reduceOption.forEach((optionZ, index) =>
        data.append(`images[0][classification][${index}]`, optionZ)
      );

      try {
        await wishListApi.post(
          `/photobook/customer/gallery/${photobookData.id}/image/store`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );
        setName("");
        setDescription("");
        setImage([]);
        setOption([]);
        setClassificationName([]);

        notification("Foto adicionada com sucesso", "success");
        loadGallery();
        setActiveNewImageModal("inactive");
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
        } else if (
          JSON.stringify(e.response?.data) ===
          `{"images.0.classification":"O campo images.0.classification deve conter de 1 a 4 itens."}`
        ) {
          notification("Cada foto deve ter apenas 4 opções no total", "error");

          setLoading(false);
        } else if (
          JSON.stringify(e.response?.data) ===
          `{"images.0.image":"O valor informado para o campo images.0.image não é uma dimensão de imagem válida."}`
        ) {
          notification("A imagem ultrapassou a dimensão limite ", "error");

          setLoading(false);
        } else {
          notification("Erro ao adicionar foto", "error");
          setLoading(false);
        }
      }
    }
  }

  async function loadClassifications() {
    setLoading(true);
    try {
      const { data: responseList } = await wishListApi.get(
        "/photobook/customer/classification",
        {
          headers: {
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );

      setClassifications(responseList.data);
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
        notification("Erro ao carregar as classificações das fotos", "error");
        setLoading(false);
      }
    }
  }

  return (
    <>
      <S.ModalPhotobook className={activeNewImageModal}>
        <S.Transparent
          onClick={() => {
            setName("");
            setDescription("");
            setImage([]);
            setOption([]);
            setClassificationName([]);
            setActiveNewImageModal("inactive");
          }}
        />

        <S.AlertCenterPhotobook>
          <div className="modalTitle">
            <span className="title">Adicionar imagem ao Photobook</span>
            <S.closeButton
              onClick={() => {
                setName("");
                setDescription("");
                setImage([]);
                setOption([]);
                setClassificationName([]);
                setActiveNewImageModal("inactive");
              }}
            >
              x
            </S.closeButton>
          </div>
          <div className="caixaLista">
            <div className="formCreate">
              <div className="containerInput">
                <input
                  type="text"
                  placeholder="Digite o nome da foto"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <textarea
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                rows="3"
                value={description}
                placeholder="Digite a descrição da lista"
                cols="40"
                maxLength="100"
              />

              <div className="containerImageUpload">
                <ImageUploading
                  value={image}
                  onChange={onChangeImageProfileUpload}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
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
                          "A imagem deve ter a resolução de até 2000x2000",
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
                            Clique ou arraste sua imagem de até 2000x2000
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
            </div>
            <div className="boxMultipleSelect">
              <SelectPromoterClassifications
                classifications={classifications}
                classificationId={classificationId}
                setClassificationId={setClassificationId}
                classificationName={classificationName}
                setClassificationName={setClassificationName}
                setStatusUpdate={setStatusUpdate}
              />
              {classificationName.length > 0 && (
                <div className="containerSelectOptions">
                  {classificationName.map(
                    (miniClassificationName, miniClassificationNameIndex) => (
                      <MultipleSelectCheckmarksPromoterClassifications
                        key={miniClassificationNameIndex}
                        classificationName={miniClassificationName}
                        classifications={classifications}
                        option={option}
                        classificationNameFather={classificationName}
                        setOption={setOption}
                        activeNewImageModal={activeNewImageModal}
                        setLoading={setLoading}
                        api={api}
                        setCartLength={setCartLength}
                        wishListApi={wishListApi}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="modalFooter">
            <button
              onClick={() => {
                setName("");
                setDescription("");
                setImage([]);
                setOption([]);
                setClassificationName([]);
                setActiveNewImageModal("inactive");
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
                onClick={handleAddPhoto}
              >
                ADICIONAR
              </button>
            )}
          </div>
        </S.AlertCenterPhotobook>
      </S.ModalPhotobook>
    </>
  );
}
