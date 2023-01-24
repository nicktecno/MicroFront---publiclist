import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Container, Row, Col } from "react-bootstrap";

import * as S from "./style";

import { CreditCard } from "@styled-icons/icomoon/CreditCard";
import { Trash } from "@styled-icons/ionicons-solid/Trash";
import ReactInputMask from "react-input-mask";

import notification from "../../services/notification";

const AddPaymentMethodComponent = ({
  api,
  setCartLength,
  routeTranslations,
  mktName,
}) => {
  const history = useRouter();
  const [deletar, setDeletar] = useState("inativo");
  const [cartoes, setCartoes] = useState(false);
  const [adicionarCartao, setAdicionarCartao] = useState("inativo");

  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [cpf, setCpf] = useState("");
  const [cvv, setCvv] = useState("");
  const [expira, setExpira] = useState("");
  const [mask, setMask] = useState("");

  const [numerofinal, setNumeroFinal] = useState(0);
  const [cartaoId, setIdCartao] = useState();
  const [loading, setLoading] = useState(true);

  async function deletarCartao() {
    await api.delete(`/customer/cards/${cartaoId}`);
    document.body.style.overflow = "auto";
    setDeletar("inativo");
    getCartoes();
  }

  async function getCartoes() {
    setLoading(true);
    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification(
          routeTranslations.notifications.notificationError01,
          "error"
        );
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.get("/customer/cards");
      setCartoes(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCadastro() {
    setLoading(true);
    const dataEndereco = {
      name: nome,
      number: numero.replace(/\./g, ""),
      cvv: cvv,
      date_expiration: expira.replace("/", ""),
    };

    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification(
          routeTranslations.notifications.notificationError01,
          "error"
        );
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.post(
        "/customer/cards/create",
        dataEndereco
      );

      if (response.message === "Seu cartão foi criado com sucesso") {
        // history.push("/profile/payments");
        document.body.style.overflow = "auto";
        setAdicionarCartao("inativo");
        getCartoes();
      }
      setNome("");
      setNumero("");
      setCpf("");
      setCvv("");
      setExpira("");
      setLoading(false);
      setMask("");
    } catch (err) {
      setLoading(false);
      console.error(err);
    } finally {
    }
  }

  const cardByColumn = (parameter) => {
    const selectByIndex = cartoes.filter((card, index) => {
      return index % 2 === parameter;
    });
    return selectByIndex;
  };

  const positionByCard = (param, index) => {
    const position =
      index === 0 ? param + 1 : param === 0 ? index * 2 + 1 : (index + 1) * 2;
    return position;
  };

  useEffect(() => {
    if (localStorage.getItem(mktName)) {
      const token = localStorage.getItem(mktName);

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification(
          routeTranslations.notifications.notificationError01,
          "error"
        );
        sessionStorage.setItem("urlantiga", window.location.href);

        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      getCartoes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletar]);

  return (
    <>
      <S.ModalAtualizarAdicionar className={adicionarCartao}>
        <S.Transparente
          onClick={() => {
            document.body.style.overflow = "auto";
            setAdicionarCartao("inativo");
          }}
        />
        <S.centroAdicionarCartao>
          <div className="cabecalho">
            {routeTranslations !== false &&
              routeTranslations.labels.labelModal01}
          </div>
          <div className="title">
            <input
              type="text"
              placeholder={
                routeTranslations !== false &&
                routeTranslations.labels.placeholderModal01
              }
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <div className="containerDuplo">
              <ReactInputMask
                className="selectCategory"
                placeholder={
                  routeTranslations !== false &&
                  routeTranslations.labels.placeholdermodal02
                }
                type="text"
                mask="9999.9999.9999.9999"
                value={numero}
                onChange={(event) => {
                  setNumero(event.target.value);
                }}
              />

              <ReactInputMask
                mask={mask}
                placeholder={
                  routeTranslations !== false &&
                  routeTranslations.labels.placeholdermodal03
                }
                alwaysShowMask
                type="text"
                value={cpf}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                  if (cpf.length <= 11) {
                    setMask("999.999.999-99");
                  }
                  if (cpf.length >= 11) {
                    setMask("99.999.999/9999-99");
                  }
                }}
                onBlur={(e) => {
                  if (cpf.length === 0) {
                    setMask("");
                  }
                }}
                onChange={(e) => {
                  {
                    const targetEdited = e.target.value
                      .replace(".", "")
                      .replace(".", "")
                      .replace("-", "")
                      .replace("/", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "")
                      .replace("_", "");

                    setCpf(targetEdited);
                  }
                }}
              />
            </div>

            <div className="containerDuplo">
              <ReactInputMask
                className="selectCategory"
                placeholder={
                  routeTranslations !== false &&
                  routeTranslations.labels.placeholdermodal04
                }
                type="text"
                mask="99/99"
                value={expira}
                onChange={(event) => {
                  setExpira(event.target.value);
                }}
              />

              <input
                type="number"
                placeholder={
                  routeTranslations !== false &&
                  routeTranslations.labels.placeholdermodal05
                }
                value={cvv}
                onChange={(event) => {
                  setCvv(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="containerBotoes">
            <div
              onClick={() => {
                document.body.style.overflow = "auto";
                setAdicionarCartao("inativo");
              }}
              className="botaoNao negativeButton"
            >
              {routeTranslations !== false &&
                routeTranslations.labels.buttonModal01}
            </div>
            {loading && (
              <img
                className="gear"
                src="/images/loadingIcon.svg"
                alt="Carregando"
              />
            )}
            {!loading && (
              <div
                onClick={() => handleCadastro()}
                className="botaoSim positiveButton"
              >
                {routeTranslations !== false &&
                  routeTranslations.labels.buttonModal02}
              </div>
            )}
          </div>
        </S.centroAdicionarCartao>
      </S.ModalAtualizarAdicionar>
      <S.ModalDeletar className={deletar}>
        <S.Transparente
          onClick={() => {
            document.body.style.overflow = "auto";
            setDeletar("inativo");
          }}
        />
        <S.centroAlertaDeletar>
          <div className="cabecalho">Deletar</div>
          <div className="title">
            <h3>
              {routeTranslations !== false &&
                routeTranslations.labels.labelModal02}
              {numerofinal}
              {routeTranslations !== false &&
                routeTranslations.labels.labelModal03}
            </h3>

            <h5>
              {routeTranslations !== false &&
                routeTranslations.labels.labelModal04}
            </h5>
          </div>
          <div className="containerBotoes">
            <div
              onClick={() => {
                document.body.style.overflow = "auto";
                setDeletar("inativo");
              }}
              className="botaoNao negativeButton"
            >
              {routeTranslations !== false &&
                routeTranslations.labels.buttonModal03}
            </div>
            <div onClick={deletarCartao} className="botaoSim positiveButton">
              {routeTranslations !== false &&
                routeTranslations.labels.buttonModal04}
            </div>
          </div>
        </S.centroAlertaDeletar>
      </S.ModalDeletar>

      <S.caminho>
        <Container>
          {routeTranslations !== false && (
            <Row>
              <Col>
                <p>
                  <Link href="/profile">
                    <div className="link">
                      {routeTranslations !== false &&
                        `${routeTranslations.labels.label01} >`}
                    </div>
                  </Link>
                  <Link href="/profile/addpaymentmethod" passhref="true">
                    <span>
                      {routeTranslations !== false &&
                        routeTranslations.labels.label02}
                    </span>
                  </Link>
                </p>
              </Col>
            </Row>
          )}
        </Container>
      </S.caminho>
      <S.pagamentos>
        {loading ? (
          <img
            className="loading"
            src="/images/loadingIcon.svg"
            alt="Carregando"
          />
        ) : (
          <>
            {cartoes && cartoes.length > 0 && (
              <S.ContainerDados>
                <S.ContainerCards>
                  <S.CardColumn>
                    {cardByColumn(0).map((cartao, index) => (
                      <S.boxCartao key={index}>
                        <div className="creditImg">
                          <CreditCard />
                        </div>
                        <S.cartaoTitle>
                          {routeTranslations !== false &&
                            routeTranslations.labels.label03}{" "}
                          {positionByCard(0, index)}
                        </S.cartaoTitle>
                        <S.cartaoNumber>
                          **** **** **** {cartao.last_digits}
                        </S.cartaoNumber>
                        <Row>
                          <Col>
                            <S.deletarCartao
                              onClick={() => {
                                document.body.style.overflow = "hidden";
                                setDeletar("ativo");
                                setNumeroFinal(cartao.last_digits);
                                setIdCartao(cartao.id);
                              }}
                            >
                              <Trash />
                            </S.deletarCartao>
                          </Col>
                        </Row>
                      </S.boxCartao>
                    ))}
                  </S.CardColumn>
                  <S.CardColumn>
                    {cardByColumn(1)?.map((cartao, index) => (
                      <S.boxCartao key={index}>
                        <div className="creditImg">
                          <CreditCard />
                        </div>
                        <S.cartaoTitle>
                          {" "}
                          {routeTranslations !== false &&
                            routeTranslations.labels.label03}{" "}
                          {positionByCard(1, index)}
                        </S.cartaoTitle>
                        <S.cartaoNumber>
                          **** **** **** {cartao.last_digits}
                        </S.cartaoNumber>
                        <Row>
                          <Col>
                            <S.deletarCartao
                              onClick={() => {
                                document.body.style.overflow = "hidden";
                                setDeletar("ativo");
                                setNumeroFinal(cartao.last_digits);
                                setIdCartao(cartao.id);
                              }}
                            >
                              <Trash />
                            </S.deletarCartao>
                          </Col>
                        </Row>
                      </S.boxCartao>
                    ))}
                  </S.CardColumn>
                </S.ContainerCards>

                <S.SmallerCardContainer>
                  {cartoes?.map((cartao, index) => (
                    <S.boxCartao key={index}>
                      <div className="creditImg">
                        <CreditCard />
                      </div>
                      <S.cartaoTitle>
                        {" "}
                        {routeTranslations !== false &&
                          routeTranslations.labels.label03}{" "}
                        {index + 1}
                      </S.cartaoTitle>
                      <S.cartaoNumber>
                        **** **** **** {cartao.last_digits}
                      </S.cartaoNumber>
                      <Row>
                        <Col>
                          <S.deletarCartao
                            onClick={() => {
                              setDeletar("ativo");
                              setNumeroFinal(cartao.last_digits);
                              setIdCartao(cartao.id);
                            }}
                          >
                            <Trash />
                          </S.deletarCartao>
                        </Col>
                      </Row>
                    </S.boxCartao>
                  ))}
                </S.SmallerCardContainer>
                <S.ContainerBotoes>
                  <div
                    onClick={() => history.push("/profile")}
                    className="botaoVoltar negativeButton"
                  >
                    {routeTranslations !== false &&
                      routeTranslations.labels.button01}
                  </div>
                  <div
                    onClick={() => {
                      document.body.style.overflow = "hidden";
                      setAdicionarCartao("ativo");
                    }}
                    className="botaoAdicionar positiveButton"
                  >
                    {routeTranslations !== false &&
                      routeTranslations.labels.button02}
                  </div>
                </S.ContainerBotoes>
              </S.ContainerDados>
            )}
            {cartoes && cartoes.length === 0 && (
              <S.ContainerSemCartao>
                <p>
                  <strong>
                    {routeTranslations !== false &&
                      routeTranslations.labels.label04}
                  </strong>
                </p>
                <S.ContainerBotoes className="botoesSemCartao">
                  <div
                    onClick={() => history.push("/profile")}
                    className="botaoVoltar negativeButton"
                  >
                    {routeTranslations !== false &&
                      routeTranslations.labels.button01}
                  </div>
                  <div
                    onClick={() => {
                      document.body.style.overflow = "hidden";
                      setAdicionarCartao("ativo");
                    }}
                    className="botaoAdicionar positiveButton"
                  >
                    {routeTranslations !== false &&
                      routeTranslations.labels.button02}
                  </div>
                </S.ContainerBotoes>
              </S.ContainerSemCartao>
            )}
          </>
        )}
      </S.pagamentos>
    </>
  );
};

export default AddPaymentMethodComponent;
