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

export const closeButton = styled.span`
  font-size: 25px;
  display: flex;
  color: var(--title-color);
  font-weight: 700;
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
`;

export const Transparente = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
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
      margin-bottom: 20px;
      .botao {
        height: 30px;
        width: 160px;
        margin-top: 10px;
        border: 2px solid transparent;
        transition: 0.3s;
        text-transform: uppercase;
        :hover {
          background-color: var(--default-color);
        }
      }
      .botaoActive {
        height: 30px;
        width: 160px;
        margin-top: 10px;
        border: 2px solid var(--default-color-hover);
        transition: 0.3s;
      }

      ${customMedia.lessThan("tablet")` 
      button{
        font-size: 13px;
        width: 155px;
      }
      `}
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
        margin-bottom: 10px;
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
      flex-direction: column;
      justify-content: center;
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
        }

        a.socialMediaButton {
          width: 50px;
          height: 40px;
          display: flex;
          justify-content: space-around;
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
        transition: 0.3s;

        :hover {
          border-bottom: 2px solid var(--input-border-color-hover);
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
    button {
      padding: 10px 0px;
      border: 0px;
      width: 150px;
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
    background-color: #b9cb96b5;
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

export const caminho = styled.div`
  width: 100%;
  height: 65px;

  position: relative;

  padding-top: 40px;

  span {
    font-weight: bold;
  }

  a {
    color: #000;
    transition: 0.3s;
  }
`;

export const DadosSeller = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;

  margin-top: 20px;

  h2 {
    color: #000;
    font-weight: bold;

    ${customMedia.lessThan("tablet")`
        font-size:20px;
        
    `}
  }
`;

export const vendidopor = styled.div`
  margin-bottom: 10px;

  .containerTopo {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .containerBanner {
    width: 100%;
    height: 170px;
    background: url("/images/bannerLojista.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .coberturaVerde {
    position: absolute;
    width: 100%;
    height: 170px;
  }

  .boxShareButton {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    ${customMedia.lessThan("tablet")`
      width:100%;
      justify-content:center;
      `}

    button {
      font-size: 14px;
      display: flex;
      width: 200px;
      border: 0px;
      height: 50px;
      justify-content: center;
      align-items: center;
      transition: 0.3s;
      cursor: pointer;

      span {
        width: 25px;
        margin-left: 10px;
        svg {
          width: 25px;
        }
      }
    }
  }
`;

export const ContainerGeral = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .containerComBotoes {
    display: flex;

    flex-direction: column;
    width: 100%;
    align-items: flex-end;
    ${customMedia.lessThan("notebook")`
    width:100%;
    
    align-items: center;
  `}
  }

  .containerListas {
    display: flex;
    height: auto;

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
    width: 100%;
    align-items: flex-end;
  }

  .containerCartoes {
    flex-direction: column;
    display: flex;
    width: 100%;
  }
`;

export const Lists = styled.div`
  .containerLoading {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  ${customMedia.lessThan("desktop")`
.container{
max-width: 1050px;
}
`}
  ${customMedia.lessThan("notebook")`
.container{
max-width: unset;
}

`}
  .loading {
    width: 50px;
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
  margin-bottom:20px;
  justify-content:center;
  align-items:center;
  flex-direction:column-reverse;
    width:100%;
  `};

  .containerLoading {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .loading {
    width: 50px;
  }
`;

export const BotaoAdicionar = styled.div`
  display: flex;
  background-color: var(--bt-purchase-color) !important;
  color: var(--bt-purchase-text-color) !important;
  :hover {
    background-color: var(--bt-purchase-color-hover) !important;
    color: var(--bt-purchase-text-color-hover) !important;
  }

  width: 200px;
  text-align: center;
  justify-content: center;
  align-items: center;

  height: 50px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("899px")`
  width:60%;
  border-radius: 5px;
  `}

  ${customMedia.lessThan("tablet")`
  width:70%;
  `}
`;

export const BotaoVoltar = styled.div`
  display: flex;

  width: 200px;
  text-align: center;
  justify-content: center;
  align-items: center;

  height: 50px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("notebook")`
  width:100%;
  `}
  :hover {
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
  margin-bottom: 150px;

  strong {
    margin-bottom: 20px;
  }
`;
