import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import notification from "../../services/notification";
import axios from "axios";

import { Container, Row, Col } from "react-bootstrap";

import * as S from "./style";

//imagens
import { AddressBook } from "@styled-icons/fa-solid/AddressBook";
import { Gear } from "@styled-icons/octicons/Gear";
import { Trash } from "@styled-icons/ionicons-solid/Trash";
import { DotsVerticalRounded } from "@styled-icons/boxicons-regular/DotsVerticalRounded";
import { Location } from "@styled-icons/fluentui-system-filled/Location";

import ReactInputMask from "react-input-mask";

import Geocode from "react-geocode";
import { ToastContainer } from "react-toastify";

const ProfileAddressesComponent = ({
  setCartLength,
  AtualizarModalPagina,
  setAtualizarModalPagina,
  msLocation,
  api,
  googleApiKey,
  routeTranslations,
  mktName,
}) => {
  const history = useRouter();
  const [deletar, setDeletar] = useState("inativo");
  const [enderecos, setEnderecos] = useState([]);
  const [nomeDeletar, setNomeDeletar] = useState("");
  const [id, setId] = useState(0);
  const [mouseOverAtivado, setMouseOverAtivado] = useState(false);
  const [enderecoAtivoTrue, setEnderecoAtivoTrue] = useState(false);
  const [enderecoModalMobile, setEnderecoModalMobile] = useState("");

  const [adicionarEndereco, setAdicionarEndereco] = useState("inativo");
  const [atualizarEndereco, setAtualizarEndereco] = useState("inativo");
  const [modalEdicaoMobile, setModalEdicaoMobile] = useState("inativo");

  //estados para formulário
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [padrao, setDefault] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [pais, setPais] = useState("BR");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  async function getPlacesCreate() {
    try {
      const { data: response } = await axios.get(
        `https://viacep.com.br/ws/${cep}/json`
      );
      Geocode.setApiKey(googleApiKey);

      Geocode.setLanguage("pt-br");

      Geocode.setRegion("br");
      const GeoCodeComplete = await Geocode.fromAddress(
        `${response.logradouro}, ${response.bairro}, ${response.complemento}, ${response.localidade}, ${response.uf}`
      ).then(
        (response) => {
          return response;
        },
        (error) => {
          console.error(error);
        }
      );
      const morphLocation = {
        postalcode: response.cep.replace("-", ""),
        neighborhood: response.bairro,
        city: response.localidade,
        state: response.uf,
        street: response.logradouro,
        country: "Brasil",
        formatted_address: `${response.logradouro}, ${response.bairro}, ${response.localidade}, ${response.cep}, ${response.uf}`,
        coordinates: [
          {
            lat: String(GeoCodeComplete.results[0].geometry.location.lat),
            lng: String(GeoCodeComplete.results[0].geometry.location.lng),
          },
        ],
      };

      await msLocation.post(`location/auto-complete`, morphLocation);

      setCidade(response.localidade);
      setPais("Brasil");
      setEstado(response.uf);
      setBairro(response.bairro);
      setEndereco(response.logradouro);
    } catch (e) {
      notification("Cep Inválido", "error");
    } finally {
    }
  }

  async function deleteAddress() {
    await api.delete(`/customer/addresses/${id}`);
    document.body.style.overflow = "auto";
    setDeletar("inativo");
    setAtualizarModalPagina(!AtualizarModalPagina);
    setEnderecos([]);
    if (nomeDeletar.default) {
      setEnderecoAtivoTrue(false);
    }
  }

  async function getEnderecos() {
    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);

        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.get("/customer/addresses");
      setEnderecos(response.data);
      const enderecoAtivo = response.data.map((endereco) => endereco.default);

      if (enderecoAtivo.includes(true) === true) {
        setEnderecoAtivoTrue(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  useEffect(() => {
    if (localStorage.getItem(mktName)) {
      getEnderecos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletar, AtualizarModalPagina]);

  const handleCadastrarLocalizacaoAtual = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const { data: response } = await msLocation.post(
        "/location/geolocation",
        {
          latitude: JSON.stringify(latitude),
          longitude: JSON.stringify(longitude),
        }
      );
      setCep(response.zipcode);
      setBairro(response.neighborhood);
      setEstado(response.state);
      setCidade(response.city);
      setEndereco(response.address);
    });
    setLoading(false);
  };

  async function handleAtivado(endereco, enderecoPadrao) {
    const dataEndereco = {
      name: endereco.name,
      postcode: endereco.postcode,
      address: endereco.address,
      number: endereco.number,
      complement: endereco.complement,
      neighborhood: endereco.neighborhood,
      country: endereco.country,
      state: endereco.state,
      city: endereco.city,
      phone: endereco.phone,
      default_address: enderecoPadrao,
    };

    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.put(
        `/customer/addresses/${endereco.id}`,
        dataEndereco
      );

      if (response.message === "Your address has been updated successfully.") {
        setAtualizarModalPagina(!AtualizarModalPagina);
        setModalEdicaoMobile(dataEndereco);
        document.body.style.overflow = "auto";
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  async function handleDesativado(endereco, enderecoPadrao) {
    setEnderecoAtivoTrue(false);
    handleAtivado(endereco, enderecoPadrao);
  }

  async function getCep() {
    const dataCep = {
      zipcode: cep.replace("-", ""),
    };
    try {
      const { data: response } = await msLocation.post(
        "/location/cep/search",
        dataCep
      );

      if (response.message === "CEP inválido ou ausente") {
        notification(response.message, "error");
        return false;
      }

      setCidade(response.city);
      setPais("BR");
      setEstado(response.state);
      setBairro(response.neighborhood);
      setEndereco(response.address);
    } catch (err) {
      getPlacesCreate();
      console.error(err);
    } finally {
    }
  }

  async function handleCadastro() {
    const dataEndereco = {
      name: nome,
      postcode: cep.replace("-", ""),
      address: endereco,
      number: numero,
      complement: complemento,
      neighborhood: bairro,

      country: pais,
      state: estado,
      city: cidade,
      phone:
        "+55" +
        telefone
          .replace("(", "")
          .replace(")", "")
          .replace(" ", "")
          .replace("-", ""),
      default_address: true,
    };

    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.post(
        "/customer/addresses/create",
        dataEndereco
      );

      if (response.message === "Your address has been created successfully.") {
        //history.push("/profile/addresses");

        document.body.style.overflow = "auto";
        setAdicionarEndereco("inativo");
        setCidade("");
        setPais("BR");
        setEstado("");
        setBairro("");
        setEndereco("");
        setCep("");
        setNome("");
        setNumero("");
        setComplemento("");
        setTelefone("");

        setAtualizarModalPagina(!AtualizarModalPagina);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  function atualizandoEndereco(endereco) {
    setNome(endereco.name);
    setCep(endereco.postcode);
    setEndereco(endereco.address);
    setNumero(endereco.number);
    setComplemento(endereco.complement);
    setBairro(endereco.neighborhood);
    setPais("BR");
    setEstado(endereco.state);
    setCidade(endereco.city);
    setTelefone(endereco.phone);
    setDefault(endereco.default);
    setId(endereco.id);
    document.body.style.overflow = "hidden";
    setAtualizarEndereco("ativo");
  }

  function fecharAtualizandoEndereco() {
    setNome("");
    setCep("");
    setEndereco("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setPais("BR");
    setEstado("");
    setCidade("");
    setTelefone("");
    document.body.style.overflow = "auto";
    setAtualizarEndereco("inativo");
  }

  async function handleEditar() {
    const dataEndereco = {
      name: nome,
      postcode: cep,
      address: endereco,
      number: numero,
      complement: complemento,
      neighborhood: bairro,
      country: pais,
      state: estado,
      city: cidade,
      phone: telefone,
      default_address: padrao,
    };

    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.put(
        `/customer/addresses/${id}`,
        dataEndereco
      );

      if (response.message === "Your address has been updated successfully.") {
        document.body.style.overflow = "auto";
        setAtualizarEndereco("inativo");
        setCidade("");
        setPais("BR");
        setEstado("");
        setBairro("");
        setEndereco("");
        setCep("");
        setNome("");
        setNumero("");
        setComplemento("");
        setTelefone("");
        setAtualizarModalPagina(!AtualizarModalPagina);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  return (
    <>
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
              Você deseja deletar o Endereço <strong>{nomeDeletar.name}</strong>
              da sua conta?
            </h3>

            <h5>
              Esta é uma ação que não terá como desfazer. Por favor confirme
              primeiro que você tem certeza que quer prosseguir com esta ação.
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
              NÃO
            </div>
            <div onClick={deleteAddress} className="botaoSim positiveButton">
              SIM
            </div>
          </div>
        </S.centroAlertaDeletar>
      </S.ModalDeletar>

      <S.ModalEditarMobile className={modalEdicaoMobile}>
        <S.Transparente
          className="transparenteModalEditarMobile"
          onClick={() => {
            document.body.style.overflow = "auto";
            setModalEdicaoMobile("inativo");
            setEnderecoModalMobile("");
          }}
        />
        <S.centroAlertaModalEditarMobile>
          <div className="cabecalho">Sobre o endereço</div>
          <div className="dadosLocalMobile">
            <strong>{enderecoModalMobile.name}</strong>{" "}
            {enderecoModalMobile.address} nº {enderecoModalMobile.number}
            <br />
            {enderecoModalMobile.complement && (
              <>
                {enderecoModalMobile.complement} <br />
              </>
            )}
            <br />
            {enderecoModalMobile.neighborhood}
            <br />
            {enderecoModalMobile.city} - {enderecoModalMobile.state}
            <br />
            {enderecoModalMobile.postcode}
          </div>
          <div className="ContainerBotoesMobile">
            {enderecoModalMobile.default ? (
              <div
                onClick={() =>
                  handleDesativado(
                    enderecoModalMobile,
                    !enderecoModalMobile.default
                  )
                }
                className="botao positiveButton"
              >
                Desativar
              </div>
            ) : (
              <div
                onClick={() =>
                  handleAtivado(
                    enderecoModalMobile,
                    !enderecoModalMobile.default
                  )
                }
                className="botao positiveButton"
              >
                Ativar
              </div>
            )}
            <div
              onClick={() => {
                document.body.style.overflow = "auto";
                setModalEdicaoMobile("inativo");
                atualizandoEndereco(enderecoModalMobile);
              }}
              className="botao positiveButton"
            >
              Editar
            </div>
            <div
              onClick={() => {
                setModalEdicaoMobile("inativo");
                setDeletar("ativo");
                setId(enderecoModalMobile.id);

                setNomeDeletar(enderecoModalMobile);
              }}
              className="botao positiveButton"
            >
              Apagar
            </div>
            <div
              onClick={() => {
                document.body.style.overflow = "auto";
                setModalEdicaoMobile("inativo");
                setEnderecoModalMobile("");
              }}
              className="botaoVoltar  negativeButton"
            >
              Voltar
            </div>
          </div>
        </S.centroAlertaModalEditarMobile>
      </S.ModalEditarMobile>

      <S.ModalAtualizarAdicionar className={adicionarEndereco}>
        <S.Transparente
          onClick={() => {
            document.body.style.overflow = "auto";
            setAdicionarEndereco("inativo");
          }}
        />
        <S.centroAdicionarEndereco>
          <div className="cabecalho">Adicionar Endereço</div>
          <div className="title">
            {loading && (
              <img
                className="loading"
                src="/images/loadingIcon.svg"
                alt="Carregando"
              />
            )}
            {!loading && (
              <div
                onClick={() => handleCadastrarLocalizacaoAtual()}
                className="botaoLocalizacao"
              >
                <Location />
                USAR LOCALIZAÇÃO ATUAL
              </div>
            )}
            <div className="containerDuplo">
              <ReactInputMask
                onBlur={() => getCep()}
                placeholder="Digite o cep"
                type="text"
                mask="99999-999"
                value={cep}
                onChange={(event) => {
                  setCep(event.target.value);
                }}
              />
              <input
                type="text"
                maxLength="15"
                placeholder="Digite o apelido do endereço"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <input
              type="text"
              maxLength="50"
              placeholder="Rua, Avenida, Etc"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <div className="containerDuplo">
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Nº"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="containerDuplo">
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Bairo"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
              <input
                maxLength="20"
                type="text"
                placeholder="Digite a Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="containerDuplo">
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
              <ReactInputMask
                mask="(99) 9999-99999"
                placeholder="Telefone/Celular"
                type="text"
                value={telefone.replace("+55", "")}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
          </div>
          <div className="containerBotoes">
            <div
              onClick={() => {
                document.body.style.overflow = "auto";
                setAdicionarEndereco("inativo");
              }}
              className="botaoNao negativeButton"
            >
              CANCELAR
            </div>
            <div
              onClick={() => handleCadastro()}
              className="botaoSim positiveButton"
            >
              ADICIONAR
            </div>
          </div>
        </S.centroAdicionarEndereco>
      </S.ModalAtualizarAdicionar>

      <S.ModalAtualizarAdicionar className={atualizarEndereco}>
        <S.Transparente onClick={() => fecharAtualizandoEndereco()} />
        <S.centroAdicionarEndereco>
          <div className="cabecalho">Atualizar Endereço</div>
          <div className="title">
            {loading && (
              <img
                className="loading"
                src="/images/loadingIcon.svg"
                alt="Carregando"
              />
            )}
            {!loading && (
              <div
                onClick={() => handleCadastrarLocalizacaoAtual()}
                className="botaoLocalizacao negativeButton"
              >
                <Location />
                USAR LOCALIZAÇÃO ATUAL
              </div>
            )}
            <div className="containerDuplo">
              <ReactInputMask
                onBlur={() => getCep()}
                placeholder="Digite o cep"
                type="text"
                mask="99999-999"
                value={cep}
                onChange={(event) => {
                  setCep(event.target.value);
                }}
              />
              <input
                maxLength="15"
                type="text"
                placeholder="Digite o apelido do endereço"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <input
              maxLength="50"
              type="text"
              placeholder="Rua, Avenida, Etc"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <div className="containerDuplo">
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Nº"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="containerDuplo">
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Bairo"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
              <input
                maxLength="20"
                type="text"
                placeholder="Digite a Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="containerDuplo">
              <input
                maxLength="20"
                type="text"
                placeholder="Digite o Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
              <ReactInputMask
                mask="(99) 9999-99999"
                placeholder="Telefone/Celular"
                type="text"
                value={telefone.replace("+55", "")}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
          </div>
          <div className="containerBotoes">
            <div
              onClick={() => fecharAtualizandoEndereco()}
              className="botaoNao negativeButton"
            >
              CANCELAR
            </div>
            <div
              onClick={() => handleEditar()}
              className="botaoSim positiveButton"
            >
              SALVAR
            </div>
          </div>
        </S.centroAdicionarEndereco>
      </S.ModalAtualizarAdicionar>

      <S.caminho>
        <Container>
          <Row>
            <Col>
              <p>
                <Link href="/profile">Minha Conta &#62; </Link>

                <Link href="/profile/addresses" passhref="true">
                  <span>Endereços para Entrega</span>
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </S.caminho>

      <S.enderecos>
        <Container>
          {enderecos.length > 0 ? (
            <S.ContainerGeral>
              <S.SectionContainer>
                <div className="containerEnderecos">
                  {enderecos.map((endereco, index) => (
                    <div
                      className="containerCartoes"
                      key={index}
                      xs={12}
                      md={6}
                    >
                      <S.boxCartao>
                        <S.dadosEndereco>
                          <div className="containerEsquerda">
                            <div className="containerImage">
                              <AddressBook />
                            </div>
                            <div className="containerDados">
                              <S.cartaoTitle>{endereco.name}</S.cartaoTitle>
                              <S.cartaoNumber>
                                {endereco.address} nº {endereco.number}
                                <br />
                                {endereco.complement && (
                                  <>
                                    {endereco.complement} <br />
                                  </>
                                )}
                                <br />
                                {endereco.neighborhood}
                                <br />
                                {endereco.city} - {endereco.state}
                                <br />
                                {endereco.postcode}
                              </S.cartaoNumber>
                            </div>
                          </div>

                          <S.ativado
                            onMouseOver={() => setMouseOverAtivado(index)}
                            onMouseLeave={() => setMouseOverAtivado(false)}
                          >
                            {mouseOverAtivado === index ? (
                              endereco.default ? (
                                <div
                                  onClick={() =>
                                    handleDesativado(
                                      endereco,
                                      !endereco.default
                                    )
                                  }
                                  className="desativar negativeButton"
                                >
                                  DESATIVAR
                                </div>
                              ) : (
                                <div
                                  onClick={() =>
                                    handleAtivado(endereco, !endereco.default)
                                  }
                                  className="ativar positiveButton"
                                >
                                  ATIVAR
                                </div>
                              )
                            ) : endereco.default ? (
                              <div className="ativado positiveButton">
                                ATIVADO
                              </div>
                            ) : (
                              <div className="desativado negativeButton">
                                DESATIVADO
                              </div>
                            )}
                          </S.ativado>

                          <div className="containerEdicao">
                            <S.editarMobile
                              onClick={() => {
                                setModalEdicaoMobile("ativo");
                                document.body.style.overflow = "hidden";
                                setEnderecoModalMobile(endereco);
                              }}
                            >
                              <DotsVerticalRounded />
                            </S.editarMobile>
                            <S.editarCartao
                              onClick={() => atualizandoEndereco(endereco)}
                            >
                              <Gear />
                            </S.editarCartao>
                            <S.deletarCartao
                              id={endereco.id}
                              onClick={() => {
                                setId(endereco.id);
                                document.body.style.overflow = "hidden";
                                setDeletar("ativo");
                                setNomeDeletar(endereco);
                              }}
                            >
                              <Trash />
                            </S.deletarCartao>
                          </div>
                        </S.dadosEndereco>
                      </S.boxCartao>
                    </div>
                  ))}
                </div>

                <S.ContainerBotoes position={true}>
                  <S.BotaoVoltar
                    className="negativeButton"
                    onClick={() => history.push("/profile")}
                  >
                    VOLTAR
                  </S.BotaoVoltar>
                  <S.BotaoAdicionar
                    className="positiveButton"
                    onClick={() => {
                      document.body.style.overflow = "hidden";
                      setAdicionarEndereco("ativo");
                    }}
                  >
                    ADICIONAR
                  </S.BotaoAdicionar>
                </S.ContainerBotoes>
              </S.SectionContainer>

              <S.EnderecoAtivoContainer>
                <h4 className="titulo">ENDEREÇO ATIVO NO MOMENTO</h4>
                <div className="bloco">
                  {enderecoAtivoTrue ? (
                    enderecos.map((endereco, index) => {
                      return (
                        <div className="AtivoBloco" key={endereco.id}>
                          {endereco.default && (
                            <>
                              <div className="Ativo">
                                <strong>{endereco.name}</strong>
                                <br /> {endereco.address} nº {endereco.number}
                                <br />
                                {endereco.complement && (
                                  <>
                                    {endereco.complement} <br />
                                  </>
                                )}
                                <br />
                                {endereco.neighborhood}
                                <br />
                                {endereco.city} - {endereco.state}
                                <br />
                                {endereco.postcode}
                              </div>
                              <div
                                onClick={() =>
                                  handleDesativado(endereco, !endereco.default)
                                }
                                className="botao negativeButton"
                              >
                                DESATIVAR LOCAL
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="nenhum">
                      Nenhum endereço ativo no momento
                      <br /> Por favor escolha ou adicione um
                    </div>
                  )}
                </div>
              </S.EnderecoAtivoContainer>
            </S.ContainerGeral>
          ) : (
            <S.ContainerSemEndereco>
              <strong>Nenhum endereço cadastrado</strong>
              <S.ContainerBotoes>
                <S.BotaoVoltar
                  className="negativeButton"
                  onClick={() => history.push("/profile")}
                >
                  VOLTAR
                </S.BotaoVoltar>
                <S.BotaoAdicionar
                  className="positiveButton"
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setAdicionarEndereco("ativo");
                  }}
                >
                  ADICIONAR
                </S.BotaoAdicionar>
              </S.ContainerBotoes>
            </S.ContainerSemEndereco>
          )}
        </Container>
      </S.enderecos>
      <ToastContainer />
    </>
  );
};

export default ProfileAddressesComponent;
