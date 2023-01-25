import * as S from "./style";

export default function BoxPromoterMySales({ comission }) {
  return (
    <S.BoxSeller>
      <div className="containerLogoName">
        <div className="boxName">Ordem: {comission.order_id}</div>
        <div className="boxName">Loja: {comission.seller_name}</div>
        <div className="boxName">Data: {comission.created_at}</div>
        <div className="boxName">Valor: R$ {comission.total}</div>

        {comission.img_proof !== "" && (
          <a
            className="boxName a"
            href={comission.img_proof}
            target="_blank"
            rel="noreferrer"
          >
            Recibo
          </a>
        )}
      </div>
      <div className="containerSelection">
        <div
          className={
            comission.status === "completo"
              ? "boxStatus active"
              : comission.status === "cancelado"
              ? "boxStatus cancel"
              : comission.status === "aberto"
              ? "boxStatus open"
              : comission.status === "liberado"
              ? "boxStatus unlocked"
              : "boxStatus"
          }
        >
          {comission.status.charAt(0).toUpperCase() + comission.status.slice(1)}
        </div>
      </div>
    </S.BoxSeller>
  );
}
