import React, { useEffect, useState } from "react";

import notification from "../../services/notification";

import * as S from "./styles";
import MultipleSelectCheckmarksPromoterClassifications from "../MultipleSelectCheckmarksPromoterClassifications";
import SelectPromoterClassifications from "../SelectPromoterClassifications";

export default function ModalPhotobookUpdateImagePhotobook({
  activeUpdateImageModal,
  setActiveUpdateImageModal,
  photobookData,
  loadGallery,
  selectImage,
  setCartLength,
  wishListApi,
  api,
  headerUrl,
}) {
  const [namePhoto, setNamePhoto] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);

  const [classificationId, setClassificationId] = useState([]);
  const [classificationName, setClassificationName] = useState([]);
  const [option, setOption] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [localUpdateModalOption, setLocalUpdateModalOption] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState([]);

  useEffect(() => {
    if (activeUpdateImageModal === "active") {
      loadClassifications();
      setNamePhoto(selectImage.name);
      setDescription(selectImage.description);
    }
  }, [activeUpdateImageModal]);

  async function handleUpdatePhoto() {
    setLoading(true);

    const reduceOption = option
      .map((subOption) => {
        const reduceSubOption = subOption.refineId.map((optionsZ) => optionsZ);
        return reduceSubOption;
      })
      .flat();

    if (namePhoto === "" || description === "" || reduceOption.length === 0) {
      notification("Verifique se todos os campos estão preenchidos", "error");
      setLoading(false);
    } else {
      const data = {
        name: namePhoto,
        description: description,
        classification: reduceOption,
      };
      try {
        await wishListApi.put(
          `/photobook/customer/gallery/${photobookData.id}/image/update/${selectImage.id}`,
          data,
          {
            headers: {
              Type: "customer",
              "Url-Store": headerUrl,
            },
          }
        );

        notification("Foto Atualizada com sucesso", "success");
        setClassificationName([]);
        loadGallery();
        setActiveUpdateImageModal("inactive");
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
        } else {
          notification("Erro ao atualizar foto", "error");
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

      const classImage = selectImage.classifications.map((opt) => opt.id);
      if (classImage.length > 0) {
        loadMyClassifications(responseList.data);
      } else {
        setLoading(false);
      }
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

  async function loadMyClassifications(responseList) {
    setLoading(true);
    const mapAllClassifications = await Promise.all(
      responseList.map(async function (classif) {
        const map = await mapApi(classif);
        return map;
      })
    );

    const mapClassificationOptions = mapAllClassifications
      .map((classif) => {
        const MyOpts = selectImage.classifications
          .map((myopt) => {
            const filter = classif.data.options.filter(
              (classZ) => classZ.id === myopt.id
            );
            if (filter.length > 0) {
              return {
                classification: {
                  id: classif.data.id,
                  name: classif.data.name,
                },
                option: myopt,
              };
            } else {
              return false;
            }
          })
          .filter((filt) => filt !== false);
        return MyOpts;
      })
      .flat();

    const classificationsFinal = mapClassificationOptions
      .map((classif) => classif.classification.name)
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      });

    setClassificationName(classificationsFinal);
    setStatusUpdate(true);

    const optionsFinal = mapClassificationOptions
      .map((classif) => classif.option.name)
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      });

    setLocalUpdateModalOption(optionsFinal);
    setLoading(false);
  }

  async function mapApi(classif) {
    const { data: dataList } = await wishListApi.get(
      `/photobook/customer/classification/${classif.id}`,
      {
        headers: {
          Type: "customer",
          "Url-Store": headerUrl,
        },
      }
    );
    return dataList;
  }

  return (
    <>
      <S.ModalPhotobook className={activeUpdateImageModal}>
        <S.Transparent
          onClick={() => {
            setClassificationName([]);
            setActiveUpdateImageModal("inactive");
          }}
        />

        <S.AlertCenterPhotobook>
          <div className="modalTitle">
            <span className="title">Atualizar imagem {selectImage.name}</span>
            <S.closeButton
              onClick={() => {
                setClassificationName([]);
                setActiveUpdateImageModal("inactive");
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
                  value={namePhoto}
                  onChange={(event) => {
                    setNamePhoto(event.target.value);
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
                        setOption={setOption}
                        classificationNameFather={classificationName}
                        activeNewImageModal={activeUpdateImageModal}
                        activeUpdateImageModal={activeUpdateImageModal}
                        localUpdateModalOption={localUpdateModalOption}
                        statusUpdate={statusUpdate}
                        setLoading={setLoading}
                        api={api}
                        setCartLength={setCartLength}
                        wishListApi={wishListApi}
                        headerUrl={headerUrl}
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
                setClassificationName([]);
                setActiveUpdateImageModal("inactive");
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
                onClick={handleUpdatePhoto}
              >
                ATUALIZAR
              </button>
            )}
          </div>
        </S.AlertCenterPhotobook>
      </S.ModalPhotobook>
    </>
  );
}
