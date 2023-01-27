import styled from "styled-components";

import { PlusCircle } from "@styled-icons/boxicons-solid/";
import { AlertCircle } from "@styled-icons/evaicons-solid/";
import { Location } from "@styled-icons/evil/";
import { Whatsapp } from "@styled-icons/boxicons-logos/Whatsapp";
import { Email } from "@styled-icons/material-outlined/Email";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  netbook: "830px",
  tablet: "768px",
  mobile: "576px",
  irico: "414px",
  ipobre: "375px",
  pobre: "330px",
});

export const WhatsIcon = styled(Whatsapp)`
  width: 26px;
  height: 26px;
  fill: var(--font-color);
`;

export const EmailIcon = styled(Email)`
  width: 28px;
  height: 28px;
  fill: var(--font-color);
`;

export const termos = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: black;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

  .check-termos {
    all: unset;
    border: 1px solid black;

    width: 15px;
    height: 15px;
    display: inline-block;
    cursor: pointer;
    margin-right: 5px;
  }
  .check-termos:checked {
    background-color: #cca8a8;
    width: 15px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 15px;

    &:before {
      content: "✔️";
      color: black;
      justify-content: center;
      align-items: center;
      display: flex;
      font-size: 12px;
    }
  }

  span {
    font-weight: bold;
    cursor: pointer;

    .termosEntrega {
      transition: 0.3s;
      border: 2px solid transparent;
      transition: 0.3s;

      :hover {
        border-bottom: 1px solid black;
      }
    }
  }
`;

export const closeButton = styled.span`
  font-size: 25px;
  display: flex;
  color: var(--title-color);
  font-weight: 600;
  position: absolute;
  top: 13px;
  right: 25px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("400px")`
        top: 12px;
        right:5px;
        padding:0 10px;
        
    `}

  :hover {
    // color: #778162;
  }
`;

export const centroAlertaWishList = styled.div`
  display: flex;
  width: 500px;
  height: 475px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;
  ${customMedia.lessThan("1400px")`
     top: 15%;
    `}
  ${customMedia.lessThan("mobile")`
     width: 95%;
    `}

  .modalTitle {
    width: 100%;
    position: relative;
    color: var(--title-color);
    background: var(--default-color);
    font-size: 1.125rem;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 50px;
    text-align: center;

    .title {
      font-weight: bold;
      font-size: 16px;
    }
    ${customMedia.lessThan("tablet")`
        margin-bottom: 0px;
    `}
  }

  .caixaShare {
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    .name {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 20px;
    }

    .type {
      font-size: 16px;
    }

    .containerBotoes {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 5px;

      .botao {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
        height: 40px;
        width: 155px;
        margin-top: 10px;
        border: 0px;
        transition: 0.3s;
      }
      .botaoActive {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
        height: 40px;
        width: 155px;
        margin-top: 10px;
        border: 0px;
        transition: 0.3s;
      }
    }

    .containerEmail {
      flex-direction: column;
      display: flex;
      width: 100%;

      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .title {
        font-weight: bold;
        font-size: 16px;
        margin: 10px 0px 0px;
      }

      input {
        width: 300px;

        height: 40px;
        padding-left: 10px;
        font-size: 14px;
        border: none;
        border-bottom: 2px solid var(--input-border-color);
        transition: 0.3s;

        ${customMedia.lessThan("360px")`
     width: 95%;
    `}
        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
        }
      }
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .containerCopyURL {
      display: flex;
      width: 100%;
      justify-content: center;
      flex-direction: column;
      .url {
        display: flex;
        justify-content: center;
        align-items: center;
        ${customMedia.lessThan("360px")`
          width: 95%;
        `}
        .copyButton {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0px;
          border: 0px;
          width: 50px;
          height: 40px;
          margin-left: 10px;
          transition: 0.3s;

          svg {
            width: 30px;
            margin-left: 5px;
          }
        }
      }
      .boxButtons {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        .loading {
          width: 50px;
        }
        button {
          border: 0px;
          width: 50px;
          height: 40px;

          &.adicionar {
            transition: 0.3s;
          }
        }

        a.socialMediaButton {
          width: 50px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;
        }
      }
      input {
        width: 245px;
        display: flex;
        height: 40px;
        padding-left: 10px;
        font-size: 14px;
        justify-content: center;
        border: none;
        border-bottom: 2px solid var(--input-border-color);
        background-color: #f4f4f5;
        transition: 0.3s;

        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
        }
      }
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        padding: 0px;
        border: 0px;
        width: 50px;
        height: 40px;
        transition: 0.3s;

        svg {
          width: 30px;
        }
      }
    }
  }

  .caixaDelete {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 300px;
    padding: 0 20px;
    max-height: 300px;

    .contentDelete {
      font-size: 16px;
    }
  }

  .caixaLista {
    margin-top: 10px;
    height: 300px;
    padding: 0 20px;
    max-height: 300px;
    overflow: auto;

    .loading {
      width: 75px;
      margin-top: 20px;
    }

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .adicionarProjeto {
      display: flex;
      border: 1px solid black;
      min-height: 80px;
      padding: 10px;
      cursor: pointer;
      transition: 0.3s;
      margin-bottom: 10px;

      &.selecionado {
        background: #f4f4f5;

        :hover {
          background: #ccc;
        }
      }

      :hover {
        background: #ccc;
      }

      .containerImage {
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;

        .imageList {
          width: 70px;
        }
        svg {
          width: 70px;
        }
      }
      .containerDados {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        overflow: auto;
        width: 100%;
        margin-left: 10px;
        margin-right: 10px;

        ::-webkit-scrollbar {
          width: 7px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #f4f4f5;
          border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 5px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }

        .titleCard {
          font-weight: bold;
          font-size: 14px;
        }
      }

      .containerEdicao {
        display: flex;
        width: 120px;

        .containerUpdate {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: 30px;
          }
        }
        .containerDeletar {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            width: 30px;
          }
        }
      }
    }

    .formCreate {
      width: 100%;
      .containerInput {
        width: 100%;
        height: 41px;

        margin-bottom: 10px;
        background: #f4f4f5;
        border-bottom: 2px solid var(--input-border-color);
        transition: 0.3s;

        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
        }
        input {
          width: 100%;
          height: 100%;
          padding-left: 10px;
          color: black;

          ::placeholder {
            color: black;
          }

          background: transparent;
          border: 0px;
        }
      }
      textarea {
        width: 100%;
        padding: 10px;
        background: #f4f4f5;
        border: 0px;
        border-bottom: 2px solid var(--input-border-color);
        transition: 0.3s;
        color: black;
        margin-bottom: 10px;

        ::placeholder {
          color: black;
        }
        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
        }
      }
      select {
        width: 100%;

        border: none;
        border-bottom: 2px solid var(--input-border-color);
        margin-bottom: 10px;
        color: black;
        padding: 10px 10px;
        transition: 0.3s;
        cursor: pointer;
        &.selectMaiorMenor {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;

          background: #e9e9e9 url("/images/icon-errow-down.png") 95% center
            no-repeat !important;
        }

        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
        }
      }

      .dadosOpcionais {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 14px;
      }

      .containerImageUpload {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;

        .upload__image-wrapper {
          display: flex;
          width: 100%;
        }
        .buttonAdicionarImagem {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 0px;
          width: 100%;
          padding: 10px;
          transition: 0.3s;

          :hover {
            background: #ccc;
          }
          .containerImage {
            width: 50px;
            margin-top: 5px;
          }
        }
        .image-uploaded {
          display: flex;
          width: 100%;
          justify-content: center;

          .image-item__btn-wrapper {
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: 5px;

            button {
              margin-left: 20px;
              border: 0px;
              padding: 5px 10px;
              transition: 0.3s;
              color: #fff;
              background-color: #292728;
              text-transform: uppercase;
              font-weight: 600;
              :hover {
              }
            }
          }
        }
      }

      .botaoLocalizacao {
        width: 100%;
        padding: 10px 50px 10px 50px;
        background: #dbc79a;
        cursor: pointer;
        transition: 0.3s;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 20px;
          margin-right: 5px;
        }

        :hover {
          background: #cca8a8;
        }
      }
    }
  }

  .modalFooter {
    justify-content: center;
    gap: 10px;
    padding: 5px;
    display: flex;
    bottom: 0px;
    margin-top: 20px;

    .loading {
      width: 50px;
    }

    button {
      padding: 10px 0px;
      border: 0px;
      width: 150px;

      &.adicionarBloqueado {
        transition: 0.3s;
        cursor: not-allowed;
        background-color: var(--default-color);
        :hover {
          background-color: var(--default-color-hover);
        }
      }
    }
  }
`;

export const centroAlertaWishListDelete = styled.div`
  display: flex;
  width: 400px;
  height: 350px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("mobile")`
     width: 95%;
    `}

  .modalTitle {
    width: 100%;
    position: relative;
    color: var(--title-color);
    background: var(--default-color);
    font-size: 1.125rem;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 50px;
    text-align: center;

    .title {
      font-weight: bold;
      font-size: 16px;
    }
    ${customMedia.lessThan("tablet")`
        margin-bottom: 0px;
    `}
  }

  .caixaDelete {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 200px;
    padding: 0 20px;
    max-height: 300px;

    .contentDelete {
      font-size: 16px;
    }
  }
  .modalFooter {
    justify-content: center;
    gap: 20px;
    display: flex;
    bottom: 0px;
    margin-top: 20px;

    button {
      padding: 10px 20px;
      border: 0px;
      font-weight: 600;
      &.cancelar {
        transition: 0.3s;
        color: #fff;
        background: #292728;
      }
      &.adicionar {
        transition: 0.3s;
      }
    }
  }
`;

export const ModalWishList = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000004e;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ModalTerms = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000004e;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const centroModalTerms = styled.div`
  display: flex;
  width: 500px;
  height: 450px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("mobile")`
     width: 95%;
    `}

  .modalTitle {
    width: 100%;
    position: relative;
    color: #292728;
    background: #dbc79a;
    font-size: 1.125rem;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 50px;
    text-align: center;

    .title {
      font-weight: bold;
      font-size: 16px;
    }
    ${customMedia.lessThan("tablet")`
        margin-bottom: 0px;
    `}
  }

  .caixaLista {
    margin-top: 10px;
    height: 300px;
    padding: 0 20px;
    max-height: 300px;
    overflow: auto;
    text-align: initial;

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
  }

  .modalFooter {
    justify-content: center;

    display: flex;
    bottom: 0px;
    margin-top: 20px;

    button {
      padding: 10px 20px;
      border: 0px;
      font-weight: 600;
      color: #fff;
      background: #292728;
      &.cancelar {
        transition: 0.3s;
        :hover {
          // background: #b9cb96;
        }
      }
    }
  }
`;

export const caminho = styled.div`
  width: 100%;
  height: 45px;
  margin-bottom: 40px;
  position: relative;

  padding-top: 20px;
  span {
    font-weight: bold;
  }
  a {
    color: #292728;
    transition: 0.3s;

    :hover {
      color: #292728;
    }
  }
`;

export const ContainerGeral = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  ${customMedia.lessThan("notebook")`
    flex-direction:column-reverse;
    justify-content:center;
  `}

  ${customMedia.lessThan("tablet")`
   margin-bottom:200px;
  `}



  .containerComBotoes {
    display: flex;

    flex-direction: column;
    width: 800px;
    align-items: flex-end;
    ${customMedia.lessThan("notebook")`
    width:100%;
    margin-top: 80px;
    align-items: center;
  `}

    &.removed {
      height: 200px;
      margin-top: 0px;
      align-items: center;
      margin-bottom: 300px;
    }
  }

  .containerListas {
    display: flex;
    height: 700px;
    overflow: auto;
    font-size: 20px;
    &.removed {
      height: 200px;
      margin-top: 100px;
      align-items: center;
      ${customMedia.lessThan("notebook")`
        justify-content:center;
        align-items:center;
      `}
    }
    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    flex-direction: column;
    width: 800px;
    align-items: flex-end;
    ${customMedia.lessThan("notebook")`
    width:100%;
    margin-top: 25px;
    align-items: center;
    height: 300px;
  `}
  }

  .containerCartoes {
    width: 100%;
  }
`;

export const TipoEnderecoContainer = styled.div`
  width: 270px;
  margin-left: 20px;
  display: flex;

  height: 200px;
  flex-direction: column;

  ${customMedia.lessThan("notebook")`
    width: 100%;
    display: flex;
    height: 200px;
    margin-left:0px;
    margin-bottom: 70px;
  `}

  .titulo {
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }

  .bloco {
    height: auto;
    box-shadow: rgb(0 0 0 / 12%) 0px -1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    gap: 10px;
    padding: 15px;
    justify-content: center;
    align-items: center;

    .botao {
      text-align: center;
      display: flex;
      margin-top: 0px;
      width: 90%;
      justify-content: center;
      padding: 15px;
      font-weight: 600;
      transition: 0.3s;
      cursor: pointer;
    }
    .botaoActive {
      text-transform: uppercase;
      text-align: center;
      display: flex;
      margin-top: 0px;
      width: 90%;
      justify-content: center;
      padding: 15px;

      font-weight: 600;
      transition: 0.3s;
      cursor: pointer;
    }
  }

  .botao {
    text-align: center;
    display: flex;
    margin-top: 15px;
    width: 100%;
    justify-content: center;
    padding: 15px;

    font-weight: 600;
    transition: 0.3s;
    cursor: pointer;
  }

  .botaoVoltar {
    text-align: center;
    display: flex;
    margin-top: 15px;
    width: 100%;
    justify-content: center;
    padding: 15px;

    font-weight: 600;
    transition: 0.3s;
    cursor: pointer;
  }
`;

export const boxCartao = styled.div`
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  padding: 15px;

  margin-bottom: 20px;
`;

export const dadosListas = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .containerEsquerda {
    display: flex;
    align-items: center;
    overflow-wrap: break-word;
    overflow: auto;
    min-width: 450px;
    max-width: 450px;

    ${customMedia.lessThan("notebook")`
    min-width: 300px;
    max-width: 300px;
    `}

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    ${customMedia.lessThan("notebook")`
    
    min-width: 100px;
    `}
  }
  .containerImage {
    min-width: 100px;
    margin-right: 30px;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    display: flex;

    ${customMedia.lessThan("mobile")`
    
    min-width: 50px;
    `}

    .imageList {
      width: 100px;
      ${customMedia.lessThan("mobile")`
    
    width: 50px;
    `}
    }

    svg {
      width: 70px;

      ${customMedia.lessThan("mobile")`
    
    width: 50px;
    `}
    }
  }
  .containerDados {
    display: flex;
    flex-direction: column;
    max-width: 450px;
    flex-wrap: wrap;
    overflow: auto;

    ${customMedia.lessThan("notebook")`
    
    max-width: 150px;
    `}

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    ${customMedia.lessThan("mobile")`
    overflow:auto;
    max-width: 170px;
    ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }

    `}
  }

  .containerEdicao {
    display: flex;
  }
`;
export const cartaoTitle = styled.h2`
  font-size: 24px;
  margin: 0px;

  padding: 0px;

  padding: 0px;
  color: #000000;

  display: flex;
`;

export const cartaoNumber = styled.h4`
  width: 100%;
  font-size: 14px;
  margin: 10px 0px;
  max-width: 400px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

export const cadastrarCartao = styled.a`
  background-color: #2d9b01;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  display: block;
  padding: 10px 15px;
  border: 1px solid #2d9b01;
  margin: 5px 0px;
  text-align: center;
  position: fixed;
  bottom: 100px;
  width: 300px;
  left: 50%;
  margin-left: -150px;
  text-transform: uppercase;
  font-weight: 700;
  z-index: 99;
  &:hover {
    text-decoration: none;
    color: #fff;
    opacity: 0.9;
  }
`;

export const Lists = styled.div`
  .containerLoading {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .loading {
    width: 50px;
  }
`;

export const ativado = styled.div`
  display: flex;
  font-weight: bold;

  ${customMedia.lessThan("notebook")`
    display:none;
  `}

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .desativar {
    width: 140px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    animation: fade-in 1s;
  }
  .ativar {
    width: 140px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    animation: fade-in 1s;
    background: var(--default-color);
  }

  .ativado {
    width: 140px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    background: #dbc79a;
  }

  .desativado {
    width: 140px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
  }
`;

export const editarCartao = styled.div`
  width: 30px;
  display: flex;
  margin-left: 10px;
  margin-right: 20px;
  transition: 0.3s;
  cursor: pointer;
  ${customMedia.lessThan("notebook")`
    display:none;
  `}
  &:hover {
    color: var(--default-color);
  }
`;

export const editarMobile = styled.div`
  width: 30px;
  display: none;
  margin-left: 10px;
  margin-right: 20px;
  transition: 0.3s;
  cursor: pointer;
  ${customMedia.lessThan("notebook")`
    display:flex;
  `}
  &:hover {
    // color: #b9cb96ab;
  }
`;

export const ContainerBotoes = styled.div`
  display: flex;
  margin-top: 15px;

  gap: 20px;
  justify-content: flex-end;
  ${customMedia.lessThan("desktop")`
  margin-bottom:20px;`}

  ${customMedia.lessThan("notebook")`
  margin-top:30px;
  margin-bottom:200px;
  justify-content:center;
  align-items:center;
  flex-direction:column-reverse;
    width:100%;
  `};
`;

export const BotaoAdicionar = styled.div`
  display: flex;

  width: 200px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #dbc79a;
  height: 20px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("notebook")`
  width:100%;
  `}

  :hover {
    background: #cca8a8;
  }
`;

export const BotaoVoltar = styled.div`
  display: flex;

  width: 200px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #292728;
  color: #fff;
  height: 20px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("notebook")`
  width:100%;
  `}

  :hover {
    // background: #b9cb96;
  }
`;

export const deletarCartao = styled.div`
  width: 30px;
  display: flex;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.3s;
  ${customMedia.lessThan("notebook")`
    display:none;
  `}
  &:hover {
    // color: #b9cb96ab;
  }
`;

export const ModalDeletar = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000004e;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const ModalEditarMobile = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000004e;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }
  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const centroAlerta = styled.div`
  display: flex;
  width: 500px;
  height: 350px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("notebook")`
    width:300px;
    height:450px;
    
  `}

  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: #dbc79a;
    align-items: center;
    justify-content: center;

    ${customMedia.lessThan("notebook")`
    padding:20px;
    
  `}
  }

  .dadosLocalMobile {
    display: none;
    ${customMedia.lessThan("notebook")`
    margin-top:10px;
    
    flex-direction:column;
    width:90%;
    color:black;
    align-self:center;
    padding:10px;
    background-color:#f4f4f5;
    display: flex;
    justify-content: center;
    align-items: center;
    
  `}
  }
  .ContainerBotoesMobile {
    display: none;
    ${customMedia.lessThan("notebook")`
    margin-top:10px;
    margin-bottom:20px;
    flex-direction:column;
    width:90%;
    color:black;
    align-self:center;
    padding:10px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .botao{
      display:flex;
      background:#dbc79a;
      width:200px;
      padding:10px 30px 10px 30px;
      margin-bottom:10px;
      cursor:pointer !important;
      transition:0.3s;
      :hover {
        background: #cca8a8;
      }

    }

    .botaoVoltar{
      margin-top:20px;
      background:#292728;
      color:#fff;
      width:200px;
      padding:10px 30px 10px 30px;
      margin-bottom:10px;
      cursor:pointer !important;
      :hover {
        // background: #b9cb96;
      }
    }
  `}
  }
  .title {
    width: 100%;
    padding: 40px;

    ${customMedia.lessThan("notebook")`
    display:none;
    
  `}
  }

  h3 {
    font-weight: 600;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    ${customMedia.lessThan("notebook")`
    display:none;
    
  `}

    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #292728;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        // background: #b9cb96;
      }
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #dbc79a;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        background: #cca8a8;
      }
    }
  }
`;

export const centroAlertaModalEditarMobile = styled.div`
  background: white;
  text-align: center;
  color: #000;
  flex-direction: column;
  position: absolute;

  width: 320px;
  height: auto;
  display: flex;

  .transparenteModalEditarMobile {
    display: flex;
  }

  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: var(--default-color);
    color: var(--title-color);
    align-items: center;
    justify-content: center;

    padding: 20px;
  }

  .dadosLocalMobile {
    margin-top: 10px;

    flex-direction: column;
    width: 90%;
    color: black;
    align-self: center;
    padding: 10px;
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 1px, rgb(0 0 0 / 24%) 0px 0px 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ContainerBotoesMobile {
    margin-top: 10px;
    margin-bottom: 20px;
    flex-direction: column;
    width: 90%;
    color: black;
    align-self: center;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .botao {
      display: flex;
      justify-content: center;
      align-items: center;

      font-weight: 600;
      text-transform: uppercase;
      width: 200px;
      padding: 10px 0px 10px 45px;
      margin-bottom: 10px;
      transition: 0.3s;
      cursor: pointer;
      .containerTexto {
        display: flex;
        width: 50%;
        align-items: center;
        justify-content: center;
      }
      .containerView {
        display: flex;
        width: 30%;
        align-items: flex-end;
        justify-content: flex-end;

        svg {
          width: 20px;
        }
      }
    }

    .botaoVoltar {
      margin-top: 20px;

      text-transform: uppercase;
      font-weight: 600;
      width: 200px;
      padding: 10px 30px 10px 30px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
  .title {
  }

  h3 {
    font-weight: 600;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }
`;

export const centroAlertaDeletar = styled.div`
  display: flex;
  width: 500px;
  height: 350px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("notebook")`
    width:300px;
    height:450px;
    
    
  `}

  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: #dbc79a;
    align-items: center;
    justify-content: center;

    ${customMedia.lessThan("notebook")`
    padding:20px;
    
  `}
  }

  .title {
    width: 100%;
    padding: 40px;
  }

  h3 {
    font-weight: 600;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;

    ${customMedia.lessThan("notebook")`
    font-size: 18px;
    
  `}
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    ${customMedia.lessThan("notebook")`
    flex-direction:column;
    
  `}

    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #292728;
      color: #fff;
      font-weight: 600;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.3s;
      cursor: pointer;

      :hover {
      }
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #dbc79a;
      font-weight: 600;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        background: #cca8a8;
      }
    }
  }
`;

export const editIcon = styled(Location)`
  color: #fff;
  height: 18px;
  width: 18px;
  display: inline-block;
  margin: 0px 5px;
  cursor: pointer;
`;

export const addIcon = styled(PlusCircle)`
  color: #fff;
  height: 24px;
  width: 24px;
  display: inline-block;
  margin: 0px 5px;
  cursor: pointer;
`;

export const alertIcon = styled(AlertCircle)`
  color: #fff;
  height: 128px;
  width: 128px;
  display: inline-block;
  margin: 0px 5px 20px;
  cursor: pointer;
`;

export const ContainerSemEndereco = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    margin-bottom: 20px;
  }
`;

export const ModalAtualizarAdicionar = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      margin-top: 90px;
      width: 100%;
      height: 1000vh;
      z-index: 0;
      background: #0000004e;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important ;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${customMedia.lessThan("notebook")`
    width:100%;
    height:80vh;
    position:fixed;
    margin-top:90px;
    
  `}

  @media (min-height: 900px) and  (max-height: 1024px) {
    height: 100vh;
  }
`;

export const Transparente = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const centroAdicionarEndereco = styled.div`
  display: flex;
  width: 700px;
  height: 520px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;
  z-index: 99999;

  .loading {
    width: 50px;
  }

  ${customMedia.lessThan("notebook")`
    width:100%;
    height:100%;
    overflow:auto;
    
    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
      transition: 0.3s;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
    
  `}

  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: #dbc79a;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .title {
    width: 100%;
    padding: 40px;
  }

  h3 {
    font-weight: 600;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }
  .botaoLocalizacao {
    width: 100%;
    padding: 10px 50px 10px 50px;
    background: #dbc79a;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      margin-right: 5px;
    }

    :hover {
      background: #cca8a8;
    }
  }

  .containerDuplo {
    display: flex;
    width: 100%;

    align-items: center;
    gap: 3%;
    ${customMedia.lessThan("notebook")`
    
  
    flex-direction:column;
  `}
  }

  input {
    height: 45px;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    margin-bottom: 10px;
    border: none;
    background-color: #f4f3f4;
    border-bottom: solid 1px var(--input-border-color);
    transition: 0.3s;
  }
  input:hover {
    border-bottom: solid 1px var(--input-border-color-hover);
  }

  input::placeholder {
    font-size: 12px;
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    ${customMedia.lessThan("notebook")`
       padding: 40px;
       padding-top:10px;
       margin-bottom:20px;  
        flex-direction:column-reverse;
    `}

    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #292728;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;
      ${customMedia.lessThan("notebook")`
        width:100%;
      `}
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #dbc79a;
      cursor: pointer;
      font-weight: 600;
      transition: 0.3s;
      ${customMedia.lessThan("notebook")`
        width:100%;
      `}

      :hover {
        background: #cca8a8;
      }
    }
  }
`;
