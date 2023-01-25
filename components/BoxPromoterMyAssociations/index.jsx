import * as S from "./style";

import { User } from "@styled-icons/boxicons-regular/User";

export default function BoxPromoterMyAssociations({ seller }) {
  return (
    <S.BoxSeller>
      <div className="containerLogoName">
        <div className="boxLogo">
          {seller.seller.logo === "" ? (
            <User />
          ) : (
            <img
              src={seller.seller.logo}
              alt={`imagem da logo da empresa ${seller.seller.name}`}
            />
          )}
        </div>
        <div className="boxName">{seller.seller.name}</div>
      </div>
      <div className="containerSelection">
        <div
          className={
            seller.filtering[0].status === "ativo"
              ? "boxStatus active"
              : "boxStatus"
          }
        >
          {seller.filtering[0].status === "ativo" ? "Ativo" : "Pendente"}
        </div>
      </div>
    </S.BoxSeller>
  );
}
