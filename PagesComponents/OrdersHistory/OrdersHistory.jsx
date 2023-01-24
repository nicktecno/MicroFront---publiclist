import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import currencyFormat from "../../services/currencyFormat";

import { Container, Row, Col } from "react-bootstrap";

import * as S from "./style";

import { Clock } from "@styled-icons/fa-solid/Clock";
import { Cancel } from "@styled-icons/material/Cancel";
import { Check } from "@styled-icons/boxicons-regular/Check";

import Loading from "../../components/Loading";

function OrdersHistoryComponent({ api, routeTranslations, mktName }) {
  const [orders, setOrders] = useState();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState();
  const [nextPageOrders, setNextPageOrders] = useState(1);

  const history = useRouter();

  function handleBack() {
    history.push("/profile");
  }

  async function loadOrders() {
    setLoading(true);
    const { data: response } = await api.get("customer/order/list");
    const ordersList = response.data.map((order) => ({
      ...order,
      price: currencyFormat(order.grand_total),
    }));
    setOrders(ordersList);
    const nextPage = response.links.next;
    let page = false;
    response.links.next && (page = nextPage.split("=").pop());
    setNextPageOrders(page);

    setLoading(false);
  }

  const loadMoreOrders = async () => {
    setLoading(true);

    try {
      const { data: response } = await api.get("customer/order/list", {
        params: { page: nextPageOrders },
      });

      let page = false;

      const nextPage = response.links.next;

      response.links.next && (page = nextPage.split("=").pop());

      const ordersList = response.data.map((order) => ({
        ...order,
        price: currencyFormat(order.grand_total),
      }));
      if (!orders) {
        setOrders(ordersList);
      } else {
        setOrders([...orders, ...ordersList]);
      }

      setNextPageOrders(page);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <S.caminho>
        <Container>
          <Row>
            <Col>
              <p>
                <Link href="/profile">Minha Conta</Link> &#62;{" "}
                <span>Histórico de Pedidos</span>
              </p>
            </Col>
          </Row>
        </Container>
      </S.caminho>

      <S.topicos>
        <Container>
          <Row className={orders ? "rowGeralComPedidos" : "rowGeral"}>
            {orders && orders.length <= 0 ? (
              <Col className="colSemPedidos" xs={12}>
                {" "}
                <strong>Sem pedidos</strong>
              </Col>
            ) : (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {orders && (
                      <S.ContainerTitulos>
                        <div className="pedidos">PEDIDOS</div>
                        <div className="status">STATUS DA COMPRA</div>
                      </S.ContainerTitulos>
                    )}
                    <S.BoxRequests>
                      {orders &&
                        orders.map((order, index) => (
                          <S.ContainerPedido key={index}>
                            <h4>Comprado em {order.created_at}</h4>
                            <S.ContainerDadosStatus>
                              <S.BoxShadow
                                onClick={() =>
                                  history.push(`/profile/orders/${order.id}`)
                                }
                                key={order.id}
                                className="boxBege negativeButton"
                              >
                                <strong> Pedido {order.id} </strong>

                                <strong>{order.price}</strong>
                              </S.BoxShadow>
                              <S.BoxShadow className="statusBox">
                                {order.status === "pending_payment" ? (
                                  <Clock />
                                ) : order.status === "awaiting_confirmation" ? (
                                  <Clock />
                                ) : order.status === "canceled" ? (
                                  <Cancel />
                                ) : (
                                  <Check />
                                )}

                                {order.status_label}
                              </S.BoxShadow>
                            </S.ContainerDadosStatus>
                          </S.ContainerPedido>
                        ))}
                      {nextPageOrders !== 1 && nextPageOrders !== false && (
                        <div className="loadMoreOrders">
                          <button
                            className=" positiveButton"
                            onClick={() => loadMoreOrders()}
                          >
                            Carregar mais pedidos
                          </button>
                        </div>
                      )}
                    </S.BoxRequests>
                  </>
                )}
              </>
            )}
            {loading && (
              <img
                style={{ width: "50px" }}
                src="/images/loadingIcon.svg"
                alt="Carregando"
              />
            )}
            <button className="botaoVoltar negativeButton" onClick={handleBack}>
              Voltar
            </button>
          </Row>
        </Container>
      </S.topicos>
    </>
  );
}

export default OrdersHistoryComponent;
