import { Copy } from "@styled-icons/evaicons-solid/Copy";
import * as S from "./styles";

export default function ModalSharePubliclist({
  sharePublicListModal,
  setSharePublicListModal,
  detailList,
  copyText,
  mktName,
  appUrl,
}) {
  return (
    <S.ModalPhotobook className={sharePublicListModal}>
      <S.Transparent
        onClick={() => {
          document.body.style.overflow = "auto";
          setSharePublicListModal("inactive");
        }}
      />

      <S.AlertCenterPhotobook>
        <div className="modalTitle">
          <span className="title">Compartilhar Perfil</span>
          <S.closeButton
            onClick={() => {
              document.body.style.overflow = "auto";
              setSharePublicListModal("inactive");
            }}
          >
            x
          </S.closeButton>
        </div>
        <div className="caixaShare">
          <div className="title">Link de compartilhamento</div>
          <div className="containerCopyURL">
            <div className="url">
              <input
                readOnly
                type="text"
                value={`${appUrl}/publiclist/${detailList.code}`}
              />
              <button
                className="copyButton"
                onClick={() =>
                  copyText(`${appUrl}/publiclist/${detailList.code}`)
                }
              >
                <Copy />
              </button>
            </div>
            <div className="boxButtons">
              {typeof window !== "undefined" && localStorage.getItem("nome") ? (
                <a
                  rel="noreferrer"
                  className="socialMediaButton positiveButton"
                  href={
                    detailList
                      ? `https://api.whatsapp.com/send?text= Olá, ${localStorage.getItem(
                          "nome"
                        )} acaba de te enviar o link de uma lista no ${mktName}. Clique no link abaixo para acessá-lo. ${appUrl}/publiclist/${
                          detailList.code
                        }`
                      : ""
                  }
                  target="_blank"
                >
                  Compartilhar
                  <S.WhatsIcon />
                </a>
              ) : (
                <a
                  rel="noreferrer"
                  className="socialMediaButton positiveButton"
                  href={
                    detailList
                      ? `https://api.whatsapp.com/send?text= Olá, acabo de te enviar o link de uma lista no ${mktName}. Clique no link abaixo para acessá-lo. ${appUrl}/publiclist/${detailList.code}`
                      : ""
                  }
                  target="_blank"
                >
                  Compartilhar
                  <S.WhatsIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </S.AlertCenterPhotobook>
    </S.ModalPhotobook>
  );
}
