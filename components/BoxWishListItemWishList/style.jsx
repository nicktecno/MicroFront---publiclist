import styled from "styled-components";
import { generateMedia } from "styled-media-query";

// Refatorar esta merda de nomenclatura seguindo padrão de %
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

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 50px;
  }
`;

export const ContainerGeral = styled.div`
  width: 100%;
  display: flex;
  box-shadow: rgb(159 159 159) 0px 0px 7px;
  margin: 10px 0;

  ${customMedia.lessThan("notebook")`
    flex-direction:column;
    `}
`;

export const boxComments = styled.div`
  width: 30%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  justify-content: center;

  .bubble {
    margin: 0;
    padding: 0;
    position: relative;
  }

  .bubble:before {
    color: #f6f6f6;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0px;
    border-bottom: 14px solid white;
    border-bottom-color: inherit;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }

  ${customMedia.lessThan("notebook")`
    width:100%;
    margin-left:0px;
    `}
  .containerEdicao {
    display: none;
    ${customMedia.lessThan("notebook")`
    margin-top:15px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
  
  `}
  }

  .containerButtonComment {
    display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: column;
    align-items: center;

    background: #f6f6f6;

    gap: 10px;
    justify-content: center;

    .containerLinhaAcima {
      display: flex;
      width: 100%;
      justify-content: space-between;

      ${customMedia.lessThan("notebook")`
       background: #f6f6f6;
          justify-content: start;
      flex-direction:row;
      gap:50px;
`}

      ${customMedia.lessThan("350px")`
flex-direction:column;
gap:10px;
`}
    }

    .total {
      display: flex;
    }

    button {
      height: 45px;
      width: 150px;

      border: 0px;
      transition: 0.3s;
      background-color: #dbc79a;

      :hover {
        background-color: #cca8a8;
      }
    }

    ${customMedia.lessThan("tablet")` 
  padding: 5px 10px 15px 10px;
      `}
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    background-color: #f6f6f6;
    border: 0px;

    ::placeholder {
      color: black;
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
  }
`;
export const boxCartao = styled.div`
  padding: 15px 0;
  width: 70%;

  align-items: center;
  display: flex;
  justify-content: space-between;

  ${customMedia.lessThan("notebook")`
    width:100%;
    `}
`;

export const cartaoNumber = styled.h4`
  width: 100%;
  font-size: 13px;
  margin: 5px 0px;
  max-width: 400px;
  flex-wrap: wrap;
  padding: 0px;
  li {
    font-size: 13px;
  }
  ul {
    padding: 0px;
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

  backdrop-filter: blur(6px) contrast(0.8) !important;
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

export const Transparente = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const centroAlertaWishList = styled.div`
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

    ${customMedia.lessThan("notebook")`
        margin-bottom: 0px;
    `}
  }

  .caixaAdicionarCarrinho {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    .boxImage {
      width: 100px;

      img {
        width: 100px;
      }
    }

    .boxData {
      strong {
        font-size: 16px;
      }

      margin-top: 10px;

      ul {
        margin-top: 10px;
        padding: 0px;
      }
    }
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
      margin-bottom: 20px;

      .botao {
        height: 30px;
        width: 150px;
        margin-top: 20px;
        border: 0px;
        transition: 0.3s;
        // background-color: #dbc79a;
        // :hover {
        //   background-color: #cca8a8;
        // }
      }

      .botaoActive {
        height: 30px;
        width: 150px;
        margin-top: 20px;
        border: 0px;
        transition: 0.3s;
        // background-color: #cca8a8;
        // :hover {
        //   background-color: #cca8a8;
        // }
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
        margin-bottom: 20px;
      }

      input {
        width: 300px;

        height: 40px;
        padding-left: 10px;
        font-size: 14px;

        border: none;
        border-bottom: 2px solid var(--input-border-color);
        background-color: #f4f4f5;
        transition: 0.3s;

        :hover {
          border-bottom: solid 2px var(--input-border-color-hover);
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

    .nothing {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }

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
      border: 1px solid var(--default-color);
      min-height: 80px;
      padding: 10px;
      cursor: pointer;
      transition: 0.3s;
      margin-bottom: 10px;

      &.selecionado {
        background: #dedede;

        :hover {
          background: #f4f4f5;
        }
      }

      :hover {
        background: #f4f4f5;
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

          :hover {
            color: #292728;
          }

          svg {
            width: 30px;
          }
        }

        .containerDeletar {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          :hover {
            color: #292728;
          }

          svg {
            width: 30px;
          }
        }

        ${customMedia.lessThan("tablet")`  
        
        width:100%
        
        `}
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
          border-bottom: solid 2px var(--input-border-color-hover);
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
          border-bottom: solid 2px var(--input-border-color-hover);
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

          background: url("/images/icon-errow-down.png") 95% center no-repeat !important;
        }

        :hover {
          border-bottom: solid 2px var(--input-border-color-hover);
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
      font-weight: 600;
      text-transform: uppercase;

      &.adicionarBloqueado {
        transition: 0.3s;
        cursor: not-allowed;
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

    ${customMedia.lessThan("notebook")`
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
      }

      &.adicionar {
        transition: 0.3s;
      }
    }
  }
`;

export const centroAlertaWishListEdit = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("mobile")`
     width: 95%;
    `}
  ${customMedia.lessThan("450px")`
      height: 550px;
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

    ${customMedia.lessThan("notebook")`
        margin-bottom: 0px;
    `}
  }

  .caixaEdit {
    display: flex;
    flex-direction: column;

    align-items: center;
    margin-top: 10px;
    height: 300px;
    padding: 0 20px;
    max-height: 300px;

    .containerInput {
      width: 100%;
      height: 41px;
      margin-bottom: 10px;
      background: #fff;

      transition: 0.3s;

      input {
        width: 100%;
        height: 100%;
        padding-left: 10px;
        color: black;
        border: 0px;
        border-bottom: solid 2px var(--input-border-color);
        ::placeholder {
          color: black;
        }

        background: transparent;
        :hover {
          border-bottom: solid 2px var(--input-border-color-hover);
        }
      }
    }

    strong {
      margin: 10px 0px;
      align-self: flex-start;
    }

    textarea {
      width: 100%;
      padding: 10px;
      background: #fff;
      box-shadow: rgb(0 0 0 / 12%) 0px 0px 0px, rgb(0 0 0 / 20%) 0px 1px 2px;
      border: 0px;
      border-bottom: solid 2px var(--input-border-color);
      transition: 0.3s;
      color: black;
      margin-bottom: 10px;

      ::placeholder {
        color: black;
      }
      :hover {
        border-bottom: solid 2px var(--input-border-color-hover);
      }
    }

    select {
      width: 100%;
      box-shadow: rgb(0 0 0 / 12%) 0px 1px 1px, rgb(0 0 0 / 24%) 0px 1px 1px;
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
        background: #fff url("/images/icon-errow-down.png") 95% center no-repeat !important;
      }

      :hover {
        border-bottom: solid 2px var(--input-border-color-hover);
      }
    }
  }

  .modalFooter {
    justify-content: center;
    gap: 20px;
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    bottom: 0px;
    margin-top: 40px;

    ${customMedia.lessThan("450px")`
       flex-direction:column;
			 margin-top: 20px;
			 gap: 11px;
    `}
    button {
      padding: 10px 30px;
      border: 0px;

      font-weight: 600;

      ${customMedia.lessThan("450px")`
      width:90%;
    `}
      &.cancelar {
        height: 40px;
        transition: 0.3s;
      }

      &.adicionar {
        height: 40px;
        transition: 0.3s;
      }
    }
  }
`;

export const closeButton = styled.span`
  font-size: 25px;
  display: flex;

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

export const cartaoTitle = styled.h2`
  font-size: 16px;
  margin: 0px;

  padding: 0px;

  padding: 0px;
  color: #000000;

  display: flex;
`;

export const dadosListas = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  ${customMedia.lessThan("notebook")`
	justify-content: space-around;
	flex-direction: column;
	`}
  ${customMedia.lessThan("tablet")`
    flex-direction: column;
`}
  ${customMedia.lessThan("mobile")`
    flex-direction:column;
    `}
  .containerValores {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    width: 100%;
    min-width: 130px;
    font-weight: bold;
    gap: 5px;
    margin: 0px 5px;
    align-self: center;
    justify-content: space-around;

    section {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    ${customMedia.lessThan("notebook")`
  flex-direction: row;
 `}
  }

  .containerEsquerda {
    display: flex;
    align-items: center;
    overflow-wrap: break-word;
    overflow: auto;
    min-width: 350px;
    max-width: 350px;

    ${customMedia.lessThan("notebook")`
    	max-width: 100%;
    	width:95%;
		background-color: #f4f4f5;
		margin-bottom:10px;
    `}
    ${customMedia.lessThan("notebook")`
		max-width: 100%;
		background-color: #f4f4f5;
		margin-bottom:10px;
 `}
    ${customMedia.lessThan("mobile")`
    min-width: 100%;
    max-width: 100%;
  
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
  }

  .containerImage {
    min-width: 100px;
    margin-right: 20px;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    display: flex;

    ${customMedia.lessThan("mobile")`
		margin-right: 10px;
    min-width: 50px;
    `}
    .imageList {
      width: 100px;
      ${customMedia.lessThan("mobile")`
    
    width: 70px;
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
    max-width: 400px;
    flex-wrap: wrap;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
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

    ${customMedia.lessThan("notebook")`
    padding:  10px  10px 0 10px;
 
    `}
  }

  .containerEdicao {
    display: flex;
    width: 200px;
    padding: 0 5px;
    justify-content: center;
    gap: 10px;

    ${customMedia.lessThan("notebook")` 
		display: none;
		
		`}
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

  backdrop-filter: blur(6px) contrast(0.8) !important;
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

export const centroAlertaModalEditarMobile = styled.div`
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  width: 320px;
  height: auto;
  display: flex;

  .boxImage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;

    .imageList {
      width: 60px;
    }
  }

  .transparenteModalEditarMobile {
    display: flex;
  }

  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    color: var(--title-color);
    background: var(--default-color);
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
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 0px, rgb(0 0 0 / 20%) 0px 1px 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    strong {
      margin-top: 5px;
    }
  }

  .ContainerBotoesMobile {
    margin-bottom: 20px;
    flex-direction: column;
    width: 90%;
    color: black;
    align-self: center;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;

    .botao {
      display: flex;
      justify-content: center;
      align-items: center;

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

      width: 200px;
      padding: 10px 30px 10px 30px;
      margin-bottom: 10px;
      cursor: pointer;

      ${customMedia.lessThan("450px")` 
			
			margin-top: 0px;
			`}
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

export const deletarCartao = styled.div`
  width: 30px;
  display: flex;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    // color: #b9cb96ab;
  }
`;

export const editarCartao = styled.div`
  width: 50px;
  display: flex;

  transition: 0.3s;
  cursor: pointer;

  ${customMedia.lessThan("notebook")`
    display:none;

    &.mobile{
      display:flex;
    }
      &.dots{
    position:absolute;
    right:45px;
  
     width: 33px;
    }
  `}
  ${customMedia.lessThan("tablet")`
    display:none;
    
    &.mobile{
      display:flex;
    }
    
  `}
  &.addCart {
    text-align: center;
    padding: 10px;
    align-items: center;
    justify-content: center;
    width: 180px;

    &.mobile {
      width: 55%;
      padding: 12px 10px;
      ${customMedia.lessThan("420px")` 
      
      font-size: 12px;
      `}

      ${customMedia.lessThan("375px")` 
      width: 58%;
      font-size: 11px;
      `}
    }
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
