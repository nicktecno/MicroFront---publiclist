import * as S from "./styles";

export function ModalWishListTerms({ modalTerms, setModalTerms, terms }) {
  return (
    <S.ModalTerms className={modalTerms}>
      <S.Transparente onClick={() => setModalTerms("inativo")} />

      <S.centroModalTerms>
        <div className="modalTitle">
          <span className="title">{terms.data.title}</span>
          <S.closeButton onClick={() => setModalTerms("inativo")}>
            x
          </S.closeButton>
        </div>
        <div className="caixaLista">{terms.data.description}</div>
        <div className="modalFooter">
          <button onClick={() => setModalTerms("inativo")} className="cancelar">
            VOLTAR
          </button>
        </div>
      </S.centroModalTerms>
    </S.ModalTerms>
  );
}
