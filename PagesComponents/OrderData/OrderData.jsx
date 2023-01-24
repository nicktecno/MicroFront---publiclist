import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import currencyFormat from "../../services/currencyFormat";
import Loading from "../../components/Loading";

import moment from "moment";
// componentes boostrap
import { Container, Row, Col } from "react-bootstrap";

import * as S from "./style";

import { AddressBook } from "@styled-icons/fa-solid/AddressBook";
import { BarcodeBox } from "@styled-icons/remix-fill/BarcodeBox";
import { CreditCard } from "@styled-icons/icomoon/CreditCard";

function OrderDataComponent({ api, mktName, routeTranslations }) {
  const history = useRouter();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const [shipment, setShipment] = useState();
  const [shipmentCompany, setShipmentCompany] = useState();
  const [itens, setItens] = useState([]);
  const [atributos, setAtributos] = useState([]);

  function showValue(produto, atributo) {
    const pegarProduto = itens.find((prod) => prod.name === produto);
    const value = pegarProduto.product.attributes.find(
      (attr) => attr.code === atributo
    );
    if (value && value.value) {
      return value.value;
    } else {
      return false;
    }
  }

  function translateShipmentStatus(status) {
    if (status === "pending_payment") {
      return "Aguardando Pagamento";
    } else if (status === "awaiting_confirmation") {
      return "Aguardando confirmação do Lojista";
    } else if (status === "processing") {
      return "Processando";
    } else if (status === "billed") {
      return "Faturado";
    } else if (status === "shipped") {
      return "Despachado para transportadora";
    } else if (status === "completed") {
      return "Entrege ao Cliente";
    }
  }

  useEffect(() => {
    if (history.isReady) {
      // Code using query

      (async function () {
        setLoading(true);

        try {
          const { data: response } = await api.get(
            `customer/order/list/${history.query.id[0].toString()}`
          );

          const date = response.data[0].shipping_address.created_at.date;
          response.data[0].date = moment(date).format("DD/MM/YYYY");
          setOrder(response.data[0]);
          setItens(response.data[0].items);
          setShipment(response.data[0].shipments_info);
          setShipmentCompany(response.data[0].shipping_company);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [history.isReady]);

  useEffect(() => {
    const filteredItens = itens?.map((item) => {
      const filterAttributes = item.product.attributes
        .map((atributo) => {
          if (atributo.configurable === true) {
            return atributo;
          }
        })
        .filter((filtrado) => filtrado !== undefined);

      return filterAttributes;
    });

    setAtributos(filteredItens);
  }, [itens]);

  return (
    <>
      {loading ? (
        <Container>
          <Row>
            <Col>
              <Loading />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <S.caminho>
            <Container>
              <Row>
                <Col>
                  <p>
                    <Link href="/profile">Minha Conta &#62; </Link>
                    <Link href="/profile/orders" passhref="true">
                      <span>Histórico de Pedidos &#62; #{order.id}</span>
                    </Link>
                  </p>
                </Col>
              </Row>
            </Container>
          </S.caminho>

          <S.produtos>
            <Container>
              <S.topicos>
                {order && (
                  <S.ContainerEsquerdo>
                    <S.ContainerEnderecoPagamento>
                      <S.ContainerEndereco>
                        Endereço de entrega
                        <div className="addressBox">
                          <div className="containerSvg">
                            <AddressBook />
                          </div>
                          <br />
                          <span>
                            {order.billing_address.address} nº{" "}
                            {order.billing_address.number} -{" "}
                            {order.billing_address.complement}
                            <br />
                            {order.billing_address.neighborhood} -{" "}
                            {order.billing_address.city} -{" "}
                            {order.billing_address.state}
                            <br />
                            {order.billing_address.postcode}
                          </span>
                        </div>
                      </S.ContainerEndereco>

                      <S.pagamento>
                        <p>Pagamento Escolhido</p>

                        <S.forma>
                          {order.payment_method === "Boleto" ? (
                            <span>
                              <BarcodeBox />
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={order.boleto_url}
                                className="positiveButton"
                              >
                                Boleto
                              </a>
                            </span>
                          ) : (
                            <span>
                              <CreditCard />
                              <div>Cartão</div>
                            </span>
                          )}
                        </S.forma>
                      </S.pagamento>
                    </S.ContainerEnderecoPagamento>

                    {shipmentCompany.map((company, companyIndex) => (
                      <S.ContainerProduto key={companyIndex}>
                        <S.ContainerProdutoMap>
                          <S.remersa>
                            <h4>Vendido e entregue por: </h4>
                            <span>{shipment[companyIndex].seller_name}</span>
                          </S.remersa>

                          {shipment[companyIndex].itens.map(
                            (item, itemIndex) => (
                              <S.ContainerCaixaItem key={itemIndex}>
                                <S.caixaItem key={item.id}>
                                  <S.imgitemDescricao>
                                    <div className="containerImg">
                                      <img
                                        alt="Imagem do Produto"
                                        src={item.image}
                                      />
                                    </div>
                                    <div className="blocoNome">
                                      <h3>{item.name}</h3>
                                      <div>
                                        {atributos.length > 0 &&
                                          atributos.length == itens.length && (
                                            <ul>
                                              {atributos[itemIndex]?.map(
                                                (atributo, atributoIndex) => (
                                                  <li key={atributoIndex}>
                                                    {atributo.label
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                      atributo.label.substr(1)}
                                                    :{" "}
                                                    <b>
                                                      {atributo.value
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        atributo.value.substr(
                                                          1
                                                        )}
                                                    </b>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                      </div>
                                    </div>
                                  </S.imgitemDescricao>

                                  <S.descritem>
                                    <p className="qtd">
                                      <span>{item.qty_ordered} </span>

                                      {item.qty_ordered > 1
                                        ? "unidades"
                                        : "unidade"}
                                    </p>

                                    <p className="preco">
                                      {currencyFormat(item.base_price)}
                                    </p>
                                  </S.descritem>
                                </S.caixaItem>
                              </S.ContainerCaixaItem>
                            )
                          )}
                          <div className="metodoEnvio">
                            <span className="spanMetodoEnvio">
                              Metodo de Envio:
                            </span>
                            <p>
                              {company.shipping_company ===
                              "Correios - Sedex Contrato (03220)"
                                ? `Correios  R$ ${company.price
                                    .toFixed(2)
                                    .toString()
                                    .replace(".", ",")}`
                                : company.shipping_company ===
                                  "Correios - SEDEX"
                                ? `Correios  R$ ${company.price
                                    .toFixed(2)
                                    .toString()
                                    .replace(".", ",")}`
                                : company.shipping_company +
                                  " " +
                                  `R$ ${company.price
                                    .toFixed(2)
                                    .toString()
                                    .replace(".", ",")}`}
                            </p>
                          </div>
                        </S.ContainerProdutoMap>

                        <S.historico>
                          <h2>Histórico do pedido</h2>
                          <S.DadosHistorico>
                            <strong>Status</strong>
                            {order.status_label}
                            <hr />
                            <strong> Data</strong>
                            {order.date}

                            {order.status_label !== "Cancelado" && (
                              <>
                                <hr />
                                <strong>Código NF:</strong>{" "}
                                {shipment[companyIndex].note_number
                                  ? shipment[companyIndex].note_number
                                  : "Aguardando faturamento"}{" "}
                                <hr />
                                <strong>Chave NF:</strong>{" "}
                                {shipment[companyIndex].note_key
                                  ? shipment[companyIndex].note_key
                                  : "Aguardando faturamento"}{" "}
                                <hr />
                                <strong>Código de Rastreio:</strong>{" "}
                                {shipment[companyIndex].code_tracking
                                  ? shipment[companyIndex].code_tracking
                                  : "Aguardando despacho"}{" "}
                                <hr />
                                <strong> URL de Rastreio:</strong>{" "}
                                <a
                                  target="_new"
                                  href={
                                    shipment[companyIndex].url_tracking
                                      ? shipment[companyIndex].url_tracking
                                      : "#"
                                  }
                                >
                                  {shipment[companyIndex].url_tracking
                                    ? shipment[companyIndex].url_tracking
                                    : "Aguardando despacho"}
                                </a>
                                <hr />
                                <strong>Data do Despacho:</strong>{" "}
                                {shipment[companyIndex].dispatch_date
                                  ? shipment[companyIndex].dispatch_date
                                  : "Aguardando despacho"}{" "}
                                <hr />
                                <strong>Tempo de entrega:</strong>{" "}
                                {shipment[companyIndex].delivery_time
                                  ? shipment[companyIndex].delivery_time +
                                    " Dia(s) Úteis "
                                  : "Aguardando despacho"}{" "}
                                <hr />
                                <strong>Previsão de Entrega:</strong>{" "}
                                {shipment[companyIndex].delivery_forecast
                                  ? shipment[companyIndex].delivery_forecast
                                  : "Aguardando despacho"}{" "}
                              </>
                            )}
                          </S.DadosHistorico>
                        </S.historico>
                      </S.ContainerProduto>
                    ))}
                  </S.ContainerEsquerdo>
                )}
                <S.ContainerDireito>
                  <S.ContainerTotal>
                    <h4>Resumo da Compra</h4>
                    <S.total>
                      <p>
                        Sub Total <span>{currencyFormat(order.sub_total)}</span>
                      </p>
                      {/* <p>
                      Desconto <span>{currencyFormat(order.discount)}</span>
                    </p> */}
                      <p>
                        Envio{" "}
                        <span>{currencyFormat(order.shipping_amount)}</span>
                      </p>
                      <p>
                        Total <span>{currencyFormat(order.grand_total)}</span>
                      </p>
                    </S.total>
                    <button
                      className="buttonVoltar negativeButton"
                      onClick={() => history.push("/profile/orders")}
                    >
                      VOLTAR
                    </button>
                  </S.ContainerTotal>
                </S.ContainerDireito>
              </S.topicos>
            </Container>

            <S.bts>
              <Container>
                <Row>
                  <Col xs={12} md={6} lg={4}>
                    <S.bt>CANCELAR PEDIDO</S.bt>
                  </Col>

                  <Col xs={12} md={6} lg={4}>
                    <S.bt className="cinza">TROCAR PEDIDO</S.bt>
                  </Col>

                  <Col xs={12} md={6} lg={4}>
                    <S.bt className="cinza">DEVOLVER PRODUTO</S.bt>
                  </Col>
                </Row>
              </Container>
            </S.bts>
          </S.produtos>
        </>
      )}
    </>
  );
}

export default OrderDataComponent;
