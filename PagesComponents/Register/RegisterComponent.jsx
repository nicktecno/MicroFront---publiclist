import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import notification from "../../services/notification";
import InputMask from "react-input-mask";

import * as S from "./style";

import { Eye } from "@styled-icons/ionicons-outline/Eye";
import { EyeOff } from "@styled-icons/ionicons-outline/EyeOff";

function RegisterComponent({
  validaLogin,
  api,
  wishListApi,
  setCartLength,
  mktName,
  headerUrl,
}) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [ie, setIe] = useState("");
  const [mask, setMask] = useState("");
  const [phone, setPhone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [cadastroAndamento, setCadastro] = useState(true);
  const [passwordOculto, setPasswordOculto] = useState(true);
  const [confirmarPasswordOculto, setConfirmarPasswordOculto] = useState(true);
  const history = useRouter();

  const [activeIE, setActiveIE] = useState(false);
  const [oldUrl, setOldUrl] = useState("");
  const [aceito1, setAceito1] = useState(false);
  const [aceito2, setAceito2] = useState(false);

  const [submit, setSubmit] = useState(false);

  async function getUser() {
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

      const { data: response } = await api.get("/customer/get");

      localStorage.setItem(`${mktName}_userId`, response.id);

      localStorage.setItem(`${mktName}_username`, response.name);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  async function handleAddItensCart(token) {
    try {
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Erro ao adicionar itens no carrinho", "error");
        history.push("/profile");
      }

      let carrinhoAnonimo = JSON.parse(sessionStorage.getItem("cart"));

      carrinhoAnonimo.map((lojista) =>
        Object.values(lojista).map((product) =>
          product.map((p) =>
            addItem([
              {
                product: p.product,
                quantity: p.quantity,
                seller_info: {
                  seller_id: p.seller_info.seller_id,
                  offer: p.seller_info.offer,
                  store: p.seller_info.store,
                },
              },
            ])
          )
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      sessionStorage.removeItem("cart");
      history.push("/cart");
    }
  }

  async function addItem(item) {
    try {
      const response = await api.post("/customer/checkout/cart/add", item);

      if (response.data.message === "Products added to cart successfully.") {
      }
    } catch {
      notification("Erro ao adicionar itens no carrinho", "error");
    }
  }

  async function checkShareList() {
    try {
      const dataPhantom = "";
      const { data: responseList } = await wishListApi.post(
        `/wish-list/customer/check-shared-list`,
        dataPhantom,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application / json",
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
    } catch {
      notification("Erro na verificação de listas compartilhadas", "error");
    }
  }

  async function handleLogin() {
    const dataLogin = {
      email: email,
      password: senha,
    };

    try {
      const { data: response } = await api.post("/customer/login", dataLogin);

      if (
        response.message === "Logged in successfully." ||
        response.message === "Conectado com sucesso."
      ) {
        localStorage.setItem(mktName, response.token);

        validaLogin();

        getUser();
        checkShareList();
        handleAddItensCart(response.token);
        const WishListProduct =
          JSON.parse(sessionStorage.getItem("productInfo")) || false;
        if (sessionStorage.getItem("urlantiga")) {
          let antiga = sessionStorage.getItem("urlantiga");
          sessionStorage.removeItem("urlantiga");
          window.location.href = antiga;
        }

        if (WishListProduct) {
          notification(
            "Registrado com sucesso, você voltará a pagina do produto",
            "success"
          );
          history.push(`/product/${WishListProduct.urlKey}`);
          sessionStorage.removeItem("productInfo");
          return;
        } else {
          history.push("/profile");
        }
      } else {
        notification(response.message, "error");
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  async function handleCadastro() {
    setCadastro(false);
    setSubmit(true);
    const dataCadastro = {
      first_name: nome,
      last_name: sobrenome,
      email: email,
      vat_number: cpf.replace("-", "").split(".").join("").replace("/", ""),
      ie_number: ie,
      password: senha,
      password_confirmation: confirmaSenha,
      anonymous: false,
      phone:
        "+55" +
        phone
          .replace("(", "")
          .replace(")", "")
          .replace("-", "")
          .replace(" ", ""),
    };

    if (aceito1 && aceito2) {
      try {
        const { data: response } = await api.post(
          "/customer/register",
          dataCadastro
        );

        localStorage.removeItem(`${mktName}_username`);

        setCadastro(true);

        if (response.message === "Sua conta foi criada com sucesso") {
          //loginUser();

          const WishListProduct =
            JSON.parse(sessionStorage.getItem("productInfo")) || false;
          if (!WishListProduct) {
            notification("Cadastro realizado com sucesso", "success");
          }

          handleLogin();
        } else {
          notification(
            response.message
              .replace("first name", "nome")
              .replace("last name", "sobrenome"),
            "error"
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCadastro(true);
      }
    } else {
      notification(
        "Para prosseguir, aceite os termos de uso e nossa política de privacidade.",
        "error"
      );
      setCadastro(true);
    }
  }

  async function getEmailValid(email) {
    var pattern = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );

    if (!pattern.test(email)) {
      notification("Email inválido", "error");
    }
  }

  const clearSessionStorageItens = () => {
    if (sessionStorage.getItem("urlantiga")) {
      sessionStorage.removeItem("urlantiga");
    }
    if (sessionStorage.getItem("productInfo")) {
      sessionStorage.removeItem("productInfo");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("urlantiga")) {
      setOldUrl(sessionStorage.getItem("urlantiga"));
    }
  }, []);

  return (
    <>
      <S.parte1>
        <S.texto>
          <h1>Registre-se</h1>
          <p>
            caso já tenha uma conta{" "}
            <Link href="/login" passhref="true">
              <span>CLIQUE AQUI </span>
            </Link>
          </p>
        </S.texto>

        <S.form>
          <span>
            <S.inputArea>
              <label>Nome</label>
              <input
                style={{
                  border: submit && nome.length === 0 && "2px solid #ce171f",
                }}
                type="text"
                placeholder="Digite Aqui"
                onChange={(e) => setNome(e.target.value)}
              />
            </S.inputArea>
            <br />
            <S.inputArea>
              <label>Sobrenome</label>
              <input
                style={{
                  border:
                    submit && sobrenome.length === 0 && "2px solid #ce171f",
                }}
                type="text"
                placeholder="Digite Aqui"
                onChange={(e) => setSobrenome(e.target.value)}
              />
            </S.inputArea>
            <br />
            <S.inputArea>
              <label>E-mail</label>
              <input
                style={{
                  border: submit && email.length === 0 && "2px solid #ce171f",
                }}
                type="text"
                placeholder="Digite Aqui"
                onBlur={(e) => getEmailValid(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
              />
            </S.inputArea>
            <br />
            <S.inputArea>
              <label>CPF/CNPJ</label>
              <InputMask
                style={{
                  border: submit && cpf.length === 0 && "2px solid #ce171f",
                }}
                mask={mask}
                placeholder="Digite Aqui (Apenas Números)"
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

                    if (targetEdited.length <= 11) {
                      setIe("");
                      setActiveIE(false);
                    }
                    if (targetEdited.length > 11) {
                      setActiveIE(true);
                    }
                  }
                }}
              />
            </S.inputArea>
            <br />
            {activeIE === true ? (
              <S.inputArea>
                <label>Inscrição Estadual</label>
                <InputMask
                  id="ie"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  step="1"
                  placeholder="Digite Aqui (Apenas Números)"
                  value={ie}
                  onChange={(e) => {
                    setIe(e.target.value);
                  }}
                />

                <br />
              </S.inputArea>
            ) : (
              ""
            )}
            <S.inputArea>
              <label>Telefone</label>
              <InputMask
                style={{
                  border: submit && phone.length === 0 && "2px solid #ce171f",
                }}
                mask="(99) 99999-9999"
                placeholder="Digite Aqui"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </S.inputArea>
            <br />
            <S.inputArea>
              <label>Senha</label>
              <div
                className="containerSenha"
                style={{
                  border: submit && senha.length === 0 && "2px solid #ce171f",
                }}
              >
                <input
                  className="inputSenha"
                  type={passwordOculto ? "password" : "text"}
                  placeholder="Digite Aqui"
                  onChange={(e) => setSenha(e.target.value)}
                />
                <span onClick={() => setPasswordOculto(!passwordOculto)}>
                  {passwordOculto ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </S.inputArea>

            <br />
            <S.inputArea>
              <label>Confirmar Senha</label>
              <div
                className="containerSenha"
                style={{
                  border:
                    submit && confirmaSenha.length === 0 && "2px solid #ce171f",
                }}
              >
                <input
                  className="inputSenha"
                  type={confirmarPasswordOculto ? "password" : "text"}
                  placeholder="Digite Aqui"
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                />
                <span
                  onClick={() =>
                    setConfirmarPasswordOculto(!confirmarPasswordOculto)
                  }
                >
                  {confirmarPasswordOculto ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </S.inputArea>

            <br />

            <S.ContainerTermos>
              <S.termos
                style={{
                  padding: "2px",
                  border: submit && aceito1 === false && "2px solid #ce171f",
                }}
              >
                <input
                  className="check-termos"
                  type="checkbox"
                  onClick={() => setAceito1(aceito1 ? false : true)}
                />
                Eu aceito os&nbsp;
                <span>
                  <Link href="content/termos-de-uso">Termos de Uso</Link>
                </span>
              </S.termos>

              <S.termos
                style={{
                  padding: "2px",
                  border: submit && aceito2 === false && "2px solid #ce171f",
                }}
              >
                <input
                  className="check-termos"
                  type="checkbox"
                  onClick={() => setAceito2(aceito2 ? false : true)}
                />
                Eu aceito as&nbsp;
                <span>
                  <Link href="content/politica-de-privacidade">
                    Políticas de Privacidade
                  </Link>
                </span>
              </S.termos>
            </S.ContainerTermos>
            <div className="containerButton">
              <button
                className="voltar negativeButton"
                onClick={(e) => {
                  e.preventDefault();
                  clearSessionStorageItens();
                  oldUrl ? history.push(`${oldUrl}`) : history.push("/");
                }}
              >
                VOLTAR
              </button>
              {cadastroAndamento ? (
                <button
                  className="login positiveButton"
                  onClick={handleCadastro}
                >
                  CADASTRAR
                </button>
              ) : (
                <img
                  src="/images/loadingIcon.svg"
                  className="loading"
                  alt="carregando"
                />
              )}
            </div>
          </span>
        </S.form>
      </S.parte1>
    </>
  );
}

export default RegisterComponent;
