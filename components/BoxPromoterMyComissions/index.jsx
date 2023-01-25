import * as S from "./style";

export default function BoxPromoterMyComissions({ comission }) {
  return (
    <S.BoxSeller>
      <div className="containerLogoName">
        <div className="boxName">
          <div className="title">Total de comissões</div>
          <div className="info">
            R${" "}
            {comission.total_commission !== 0
              ? comission.total_commission
                  .substring(0, comission.total_commission.length - 2)
                  .replace(".", ",")
              : 0}
          </div>
        </div>
        <div className="boxName">
          <div className="title">Em aberto</div>
          <div className="info">
            R${" "}
            {comission.total_commission_open !== 0
              ? comission.total_commission_open
                  .substring(0, comission.total_commission_open.length - 2)
                  .replace(".", ",")
              : 0}
          </div>
        </div>
        <div className="boxName">
          <div className="title">Pago</div>
          <div className="info">
            R${" "}
            {comission.total_commission_complete !== 0
              ? comission.total_commission_complete
                  .substring(0, comission.total_commission_complete.length - 2)
                  .replace(".", ",")
              : 0}
          </div>
        </div>
      </div>
    </S.BoxSeller>
  );
}
