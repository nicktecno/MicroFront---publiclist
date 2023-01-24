import styled from "styled-components";
import Link from "next/link";

import { PlusCircle } from "@styled-icons/boxicons-solid/";
import { AlertCircle } from "@styled-icons/evaicons-solid/";
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

export const caminho = styled.div`
  width: 100%;
  height: 65px;
  margin-bottom: 40px;
  position: relative;

  color: black;
  padding-top: 40px;
  span {
    font-weight: bold;
    margin-left: 3px;
  }
  a {
    color: #292728;
    transition: 0.3s;
  }

  p {
    display: flex;

    .link {
      cursor: pointer;
    }
  }
`;

export const boxCartao = styled.div`
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  max-width: 500px;
  width: 100%;

  justify-content: space-between;
  padding: 15px;
  -webkit-box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.31);
  box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.31);
  margin-bottom: 20px;

  ${customMedia.lessThan("mobile")`
  width:90%;
    
  `}

  .creditImg {
    margin-right: 20px;
    ${customMedia.lessThan("mobile")`
  margin-right:10px;
    
  `}
    svg {
      width: 35px;
    }
  }
`;

export const cartaoTitle = styled.h2`
  font-size: 24px;
  width: 180px;

  margin: 0px;
  padding: 0px 10px;
  color: #000000;
`;

export const cartaoNumber = styled.h4`
  font-size: 14px;
  margin: 10px 0px;
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

export const pagamentos = styled.div`
  min-height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading {
    width: 70px;
  }

  ${customMedia.lessThan("tablet")`
     margin-bottom: 150px;

  `}
  ${customMedia.lessThan("irico")`
     margin-bottom: 160px;

  `}
`;

export const ContainerDados = styled.div`
  width: 100%;
  min-height: 600px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerCards = styled.div`
  display: flex !important;
  gap: 15px;
  flex-direction: row;
  ${customMedia.lessThan("notebook")`
   display: none !important;
`}
`;

export const SmallerCardContainer = styled.div`
  display: none !important;
  ${customMedia.lessThan("notebook")`
   display: flex !important;
   align-items: center;
   justify-self: center;
     flex-direction: column;
    width: 100%;
   height: 100%;
`}
`;

export const editarCartao = styled(Link)`
  background-color: #beb1b8;
  border-radius: 20px;
  text-decoration: uppercase;
  color: #fff;
  font-size: 12px;
  display: block;
  padding: 5px 15px;
  border: 1px solid #beb1b8;
  margin: 5px 0px;
  text-align: center;

  &:hover {
    text-decoration: none;
    color: #fff;
    opacity: 0.9;
  }
`;

export const deletarCartao = styled.a`
  text-decoration: uppercase;
  color: #fff;
  font-size: 12px;
  display: block;
  padding: 5px 10px;
  cursor: pointer;

  margin: 5px 0px;
  text-align: center;

  svg {
    width: 30px;
    color: #292728;
    transition: 0.3s;
    &:hover {
      color: var(--default-color-hover);
    }
  }
`;

export const alertaDeletar = styled.div`
  background-color: #ce171f;
  width: 100%;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 9999;
  display: none;
  padding: 15px;

  &.ativo {
    display: table;
  }
`;

export const centroAlerta = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: #fff;

  p {
    font-size: 24px;
    line-height: 32px;
  }
`;

export const btConfirma = styled.div`
  position: fixed;
  bottom: 80px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  text-transform: uppercase;
  z-index: 9;
  border-radius: 30px;
  height: 50px;
  padding-top: 15px;
  width: 100%;
  max-width: 320px;
  left: 50%;
  margin-left: -160px;
  cursor: pointer;
`;

export const btNao = styled.p`
  color: #fff;
  margin: 15px 0px;
  text-align: center;
  font-size: 14px !important;
  font-weight: 700;
  position: fixed;
  bottom: 20px;
  width: 100%;
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

export const ContainerBotoes = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  ${customMedia.lessThan("tablet")`
   
	margin-top: 20px;
			
		`}
  ${customMedia.lessThan("mobile")`
  width:100%;
flex-direction:column-reverse;
    
  `}

  .botaoVoltar {
    text-align: center;
    width: 200px;
    ${customMedia.lessThan("mobile")`
   
width:80%;
    
  `}
    padding: 10px 50px 10px 50px;
    cursor: pointer;
    transition: 0.3s;
    text-transform: uppercase;
  }

  .botaoAdicionar {
    text-align: center;
    width: 200px;
    padding: 12px 50px 12px 50px;
    cursor: pointer;
    transition: 0.3s;

    ${customMedia.lessThan("mobile")`
   
   width:80%;
       
     `}
  }
`;
export const Transparente = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
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

  ${customMedia.lessThan("tablet")`
    width:100%;
    height:80vh;
    position:fixed;
    margin-top:90px;
    
  `}

  @media (min-height: 900px) and  (max-height: 1024px) {
    height: 100vh;
  }
`;

export const centroAdicionarCartao = styled.div`
  display: flex;
  width: 700px;
  height: 400px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;
  z-index: 99999;

  ${customMedia.lessThan("tablet")`
    width:100%;
    height:100%;
    overflow:auto;
    
    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
			border: radius: 5px;
      box-shadow: inset 0 0 5px #f4f4f5;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #cc;
      transition: 0.3s;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
			border: radius: 5px;
        background: #ccc;
    }
    
  `}

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
      background: #b9cb96;
    }
  }

  .containerDuplo {
    display: flex;
    width: 100%;

    align-items: center;
    gap: 3%;
    ${customMedia.lessThan("tablet")`
    
  
    flex-direction:column;
  `}
  }

  input {
    height: 45px;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    // margin-bottom: 10px;
    border: none;
    background-color: #f7f7f79e;
    border-bottom: solid 2px var(--input-border-color);
    transition: 0.3s;
    :hover {
      border-bottom: solid 2px var(--input-border-color-hover);
    }
  }

  input::placeholder {
    font-size: 12px;
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .gear {
      width: 50px;
    }

    ${customMedia.lessThan("tablet")`
       padding: 40px;
       padding-top:10px;
       margin-bottom:20px;
  
    flex-direction:column-reverse;
  `}

    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;

      ${customMedia.lessThan("tablet")`
   width:100%;
  `}
    }

    .botaoSim {
      width: 200px;
      padding: 12px 50px 12px 50px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;
      ${customMedia.lessThan("tablet")`
   width:100%;
   `}
    }
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

  ${customMedia.lessThan("tablet")`
    width:300px;
    height:450px;
    
    
  `}

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

    ${customMedia.lessThan("tablet")`
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

    ${customMedia.lessThan("tablet")`
    font-size: 18px;
    
  `}
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    ${customMedia.lessThan("tablet")`
    flex-direction:column;
    
  `}

    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;

      cursor: pointer;
      transition: 0.3s;
    }

    .botaoSim {
      width: 200px;
      padding: 12px 50px 12px 50px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;
    }
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

export const ContainerSemCartao = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 180px;

  .botoesSemCartao {
    width: 80%;
  }
`;
