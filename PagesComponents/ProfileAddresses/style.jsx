import styled from "styled-components";

import { PlusCircle } from "@styled-icons/boxicons-solid/";
import { AlertCircle } from "@styled-icons/evaicons-solid/";
import { Location } from "@styled-icons/evil/";
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
  padding-top: 40px;
  span {
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    :hover {
      // color: #515a2b;
    }
  }
  a {
    color: #000;
    transition: 0.3s;

    :hover {
      // color: #515a2b;
    }
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
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

  .containerEnderecos {
    min-height: 500px;
    max-height: 500px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    width: 800px;
    align-items: flex-end;

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      border-radius: 5px;
      box-shadow: inset 0 0 5px #f4f4f5;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #ccc;
      transition: 0.3s;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
    ${customMedia.lessThan("desktop")`
    width:750px;

  `}
    ${customMedia.lessThan("notebook")`
    width:100%;
    align-items: center;
  `}
  }

  .containerCartoes {
    width: 100%;
  }
`;

export const EnderecoAtivoContainer = styled.div`
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
    width: 100%;
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;

    padding-top: 15px;
    justify-content: center;
    align-items: center;
  }

  .Ativo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10px;
    align-items: center;
    text-align: center;

    strong {
      font-size: 20px;
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
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  }

  .nenhum {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding: 20px;
    font-weight: bold;
    padding-top: 5px;

    ${customMedia.lessThan("notebook")`
    height:150px;
    `}
  }
`;

export const boxCartao = styled.div`
  background-color: #f7f7f7;
  padding: 15px;
  margin-top: 7px;
  box-shadow: rgb(134 133 133 / 16%) 0px 3px 8px,
    rgb(92 91 91 / 23%) 0px 3px 6px;
  margin-bottom: 20px;
`;

export const dadosEndereco = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .containerEsquerda {
    display: flex;
    align-items: center;
    min-width: 300px;
    max-width: 300px;

    ${customMedia.lessThan("notebook")`
    
    min-width: 100px;
    `}
  }
  .containerImage {
    width: 50px;
    margin-right: 30px;
    margin-left: 10px;
    svg {
      width: 50px;
    }
  }
  .containerDados {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    flex-wrap: wrap;

    ${customMedia.lessThan("mobile")`
    overflow:auto;
    max-width: 170px;
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

    `}
  }

  .containerEdicao {
    display: flex;
  }
`;
export const cartaoTitle = styled.h2`
  font-size: 24px;
  margin: 0px;
  overflow-wrap: break-word;
  padding: 0px;
  color: #000;
  max-width: 250px;
  display: flex;
  flex-wrap: wrap;
`;

export const cartaoNumber = styled.h4`
  width: 100%;
  font-size: 14px;
  margin: 10px 0px;
  max-width: 400px;
  flex-wrap: wrap;
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
  font-weight: bold;
  z-index: 99;
  &:hover {
    text-decoration: none;
    color: #fff;
    opacity: 0.9;
  }
`;

export const enderecos = styled.div``;

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
  }

  .ativado {
    width: 140px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
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
    color: var(--default-color-hover);
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
    color: var(--default-color-hover);
  }
`;

export const ContainerBotoes = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
  align-self: ${(props) => (props.position === true ? "flex-end" : "center")};
  ${customMedia.lessThan("desktop")`
margin-bottom:20px;`}

  ${customMedia.lessThan("notebook")`
  margin-top:30px;
  margin-bottom:50px;
  justify-content:center;
  align-items:center;
  flex-direction:column-reverse;
    width:100%;
  `}
`;

export const BotaoAdicionar = styled.div`
  display: flex;

  width: 200px;
  text-align: center;
  justify-content: center;
  align-items: center;

  height: 44px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("notebook")`
  width:100%;
  `}
`;

export const BotaoVoltar = styled.div`
  display: flex;

  width: 200px;
  text-align: center;
  justify-content: center;
  align-items: center;

  height: 44px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("notebook")`
  width:100%;
  `}
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
    color: var(--default-color-hover);
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
    font-weight: bold;
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
      background:#dbc79a;
      width:200px;
			text-transform: uppercase;
			font-weight: 600;
      padding:10px 30px 10px 30px;
      margin-bottom:10px;
      cursor:pointer !important;
      :hover {
        background: #cca8a8;
      }

    }

    .botaoVoltar{
      margin-top:20px;
			background: #292728;
			color: #fff;
			text-transform: uppercase;
			font-weight: 600;
      width:200px;
      padding:10px 30px 10px 30px;
      margin-bottom:10px;
      cursor:pointer !important;
      :hover {

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
    font-weight: bold;
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
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;
      background: #dbc79a;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        background: #dbc79a;
      }
    }
  }
`;

export const centroAlertaModalEditarMobile = styled.div`
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  width: 315px;
  height: auto;
  display: flex;

  .transparenteModalEditarMobile {
    display: flex;
  }

  .cabecalho {
    display: flex;
    font-weight: bold;
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
    box-shadow: rgb(134 133 133 / 16%) 0px 3px 80px,
      rgb(92 91 91 / 23%) 0px 3px 6px;
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
      width: 200px;
      text-transform: uppercase;
      font-weight: 500;
      padding: 10px 30px 10px 30px;
      margin-bottom: 10px;
      cursor: pointer;
    }

    .botaoVoltar {
      margin-top: 20px;

      text-transform: uppercase;
      font-weight: 500;
      width: 200px;
      padding: 10px 30px 10px 30px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

  h3 {
    font-weight: bold;
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
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: var(--default-color);
    color: var(--title-color);
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
    font-weight: bold;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;

    ${customMedia.lessThan("notebook")`
    font-size: 18px;
    
  `}
  }
  h5 {
    font-weight: 500;
  }
  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    ${customMedia.lessThan("notebook")`
    flex-direction:column-reverse;
    
  `}

    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;
      height: 42px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;
      cursor: pointer;
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;
      height: 42px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;
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
  margin-bottom: 400px;

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
    height:100vh;
    position:fixed;
    margin-top:60px;
    
  `}

  ${customMedia.lessThan("tablet")`
    width:100%;
    height:85vh;
    position:fixed;
    margin-top:60px;
    
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
		margin-top:10px;
    overflow:auto;
    
    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
			border-radius: 5px;
      box-shadow: inset 0 0 5px #f4f4f5;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ccc;
			border-radius: 5px;
      transition: 0.3s;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
    
  `}

  ${customMedia.lessThan("tablet")`
margin-top:10px;
`}

  .cabecalho {
    display: flex;
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: var(--default-color);
    color: var(--title-color);
    align-items: center;
    justify-content: center;
    padding: 20px;

    ${customMedia.lessThan("tablet")`
		position: fixed;
		
		`}
  }
  .title {
    width: 100%;
    padding: 40px;
    ${customMedia.lessThan("tablet")`
	 margin-top: 40px;
	 padding: 30px;
		`}
  }

  h3 {
    font-weight: bold;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }
  .botaoLocalizacao {
    width: 100%;
    padding: 10px 50px 10px 50px;

    font-weight: 600;
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

    ${customMedia.lessThan("notebook")`
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
      height: 40px;
      ${customMedia.lessThan("notebook")`
   width:100%;
  `}
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;
      height: 40px;
      cursor: pointer;
      transition: 0.3s;
      ${customMedia.lessThan("notebook")`
   width:100%;
   `}
    }
  }
`;
