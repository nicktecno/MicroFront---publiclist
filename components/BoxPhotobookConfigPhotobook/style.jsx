import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
  irico: "414px",
  ipobre: "375px",
  pobre: "330px",
});

export const BoxPhotobookConfigPhotobook = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0px;
  background: unset;
  border-bottom: 2px solid var(--default-color);
  min-height: auto;
  padding: 10px;

  ${customMedia.lessThan("mobile")`
       height:auto;
       flex-direction:column;
       padding-bottom:10px;
    `}
  .containerLogoName {
    display: flex;
    align-items: center;
    width: 100%;

    ${customMedia.lessThan("mobile")`
      flex-direction:column;
      gap:10px;
    `}
    .boxLogo {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 90px;
      width: 90px;
      height: 90px;
      background: #ffffff;
      border: 1px solid #292728;

      img {
        width: auto;
        max-height: 100%;
        height: auto;
        max-width: 100%;
      }

      svg {
        width: 50px;
      }
    }

    .boxName {
      display: flex;
      align-items: center;
      width: 40%;
      min-height: 70px;

      max-height: 70px;
      overflow: auto;
      font-weight: bold;
      color: #000;
      font-size: 20px;
      margin-left: 20px;
      margin-right: 10px;
      line-height: 25px;

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
        background: #c7c7c7;
        border-radius: 5px;
      }

      /* Handle on hover */

      ::-webkit-scrollbar-thumb:hover {
        background: #ccc;
      }

      ${customMedia.lessThan("mobile")`
      justify-content:center;
      margin-left:0px;
      width:90%;
    `}
    }

    .boxDescription {
      display: flex;
      overflow: auto;
      width: 60%;
      max-height: 100px;
      font-size: 17px;

      ${customMedia.lessThan("mobile")`
      text-align:center;
      width:90%;
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
        background: #c7c7c7;
        border-radius: 5px;
      }

      /* Handle on hover */

      ::-webkit-scrollbar-thumb:hover {
        background: #ccc;
      }
    }

    .boxFunctions {
      display: flex;
      width: 50%;
      justify-content: flex-end;
      margin-right: 10px;
      gap: 10px;

      ${customMedia.lessThan("tablet")`
       display:none;
    `}
      .functionBox {
        width: 30px;
        cursor: pointer;

        svg {
          width: 30px;
          transition: 0.3s;

          :hover {
            color: var(--default-color);
          }
        }
      }
    }

    .boxFunctionsMobile {
      display: none;
      width: 10%;
      margin-left: 10px;
      justify-content: flex-end;
      margin-right: 10px;
      gap: 10px;

      ${customMedia.lessThan("tablet")`
       display:flex;
    `}
      ${customMedia.lessThan("mobile")`
       display:none;
    `}
      .functionBox {
        width: 30px;
        cursor: pointer;

        svg {
          width: 30px;
          transition: 0.3s;

          :hover {
            // color: #b9cb96;
          }
        }
      }
    }

    .boxFunctionsMobile420 {
      display: none;
      width: 10%;
      margin-left: 10px;
      justify-content: flex-end;
      margin-right: 10px;
      gap: 10px;

      ${customMedia.lessThan("mobile")`
       display:flex;
    `}
      .functionBox {
        width: 30px;
        cursor: pointer;

        svg {
          width: 30px;
          transition: 0.3s;

          :hover {
            // color: #b9cb96;
          }
        }
      }
    }
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

  &.active {
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

  width: 300px;
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
    background-color: #f4f3f4;
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

      width: 200px;
      padding: 10px 0px 10px 45px;
      margin-bottom: 10px;
      transition: 0.3s;
      font-weight: 600;
      text-transform: uppercase;
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

      font-weight: 600;
      width: 200px;
      padding: 10px 30px 10px 30px;
      margin-bottom: 10px;
      cursor: pointer;

      :hover {
        // background: #ccc;
      }
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
export const Transparent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
