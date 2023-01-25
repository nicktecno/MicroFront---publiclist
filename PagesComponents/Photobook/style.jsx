import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const caminho = styled.div`
  width: 100%;
  height: 65px;
  margin-bottom: 40px;
  position: relative;
  color: #292728;
  padding-top: 40px;
  span {
    font-weight: bold;
  }
  a {
    color: #292728;
    transition: 0.3s;
  }
`;

export const topicos = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;

  ${customMedia.lessThan("notebook")`
    flex-direction:column;
    justify-content:center;
`}
`;

export const ContainerEsquerdo = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  ${customMedia.lessThan("notebook")`
  width:100%;
`}
`;

export const ContainerEnderecoPagamento = styled.div`
  display: flex;
  justify-content: space-between;

  ${customMedia.lessThan("tablet")`
  
  flex-direction:column;

`}
`;

export const ContainerEndereco = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 18px;
  width: 300px;
  color: var(--font-color);

  ${customMedia.lessThan("tablet")`
  width:100%;
  margin-bottom:30px;
  
`}

  div.addressBox {
    font-size: 14px;
    padding: 15px 25px;
    display: flex;
    color: black;
    background: #f4f4f5;
    box-shadow: rgb(134 133 133 / 16%) 1px 1px 5px,
      rgb(92 91 91 / 23%) 0px 0px 0px;
    margin-top: 10px !important;
    margin: 0px;
    min-height: 140px;
    font-weight: 500;
    ${customMedia.lessThan("tablet")`
      display:flex;
      align-items:center;
    `}

    .containerSvg {
      display: flex;
      align-items: center;
    }

    svg {
      width: 50px;
      margin-right: 20px;
    }
  }
`;

export const pagamento = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;

  ${customMedia.lessThan("tablet")`
  width:100%;
  margin-bottom:30px;
  
`}

  p {
    font-size: 18px;
    color: var(--font-color);
    font-weight: bold;
    margin: 0px;
  }
`;

export const forma = styled.div`
  padding: 15px 25px;
  display: flex;
  color: black;
  background: #f4f4f5;
  min-height: 140px;
  margin-top: 10px !important;
  margin: 0px;
  justify-content: center;
  box-shadow: rgb(134 133 133 / 16%) 1px 1px 5px,
    rgb(92 91 91 / 23%) 0px 0px 0px;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 50px;
    margin-right: 20px;
  }
  a {
    border: 0px;
    font-weight: bold;
    padding: 10px 20px;
    background: var(--default-color);
    color: var(--title-color);
    transition: 0.3s;
  }
  div {
    font-weight: bold;
    border: 0px;
    padding: 10px 20px;
  }
`;

export const historico = styled.div`
  margin-top: 15px;
  h2 {
    color: #292728;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const DadosHistorico = styled.div`
  display: flex;
  flex-direction: column;
  background: #f4f4f5;
  box-shadow: rgb(134 133 133 / 16%) 1px 1px 5px,
    rgb(92 91 91 / 23%) 0px 0px 0px;
  padding: 20px 25px;
`;

export const ContainerProduto = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;
  flex-direction: column;
`;

export const ContainerProdutoMap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const remersa = styled.div`
  margin: 10px 0px 10px 0px;

  h4 {
    display: flex;
    font-size: 18px;
    color: #292728;
    font-weight: bold;
    justify-content: space-between;

    span {
      display: flex;
      text-align: end;
      margin-left: 10px;
      font-weight: bold;
    }
  }
`;

export const ContainerCaixaItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .spanMetodoEnvio {
    align-self: flex-end;
  }
`;

export const caixaItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  background: #f4f4f5;
  box-shadow: rgb(134 133 133 / 16%) 1px 1px 5px,
    rgb(92 91 91 / 23%) 0px 0px 0px;

  padding: 20px 30px;
  align-items: center;
  justify-content: space-between;

  ${customMedia.lessThan("450px")`
  flex-direction:column;
  justify-content:center;
  gap:10px;
`}
`;

export const imgitemDescricao = styled.div`
  display: flex;
  height: auto;
  width: 700px;
  align-items: center;

  ${customMedia.lessThan("450px")`
  width: 300px;
 
`}
  ${customMedia.lessThan("360px")`
  width: 150px;
 
`}
  ${customMedia.lessThan("360px")`
  
  flex-direction:column;
  justify-content:center;
`}

  .containerImg {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;

    ${customMedia.lessThan("360px")`
    margin-bottom:20px;
    width:70px;
    height:70px;
`}

    img {
      width: 100px;
      height: 100px;
      ${customMedia.lessThan("360px")`
  width:70px;
  height:70px;
`}
    }
  }

  .blocoNome {
    margin: 0 10px 0 20px;
    max-width: 200px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${customMedia.lessThan("tablet")`
    margin: 0 20px 0 20px;
`}
    ${customMedia.lessThan("450px")`
    margin: 0 0px 0 20px;
`}
 ${customMedia.lessThan("360px")`
      
      margin:0px;
     `}
 

    

    h3 {
      display: flex;
      width: 100%;
      height: auto;
      font-size: 15px;

      font-weight: bold;
      overflow: auto;
      ${customMedia.lessThan("360px")`
      
  justify-content: center;
  align-items:center;
  text-align:center;
`}

      ::-webkit-scrollbar {
        width: 7px;
        height: 6px;
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
        transition: 0.3s;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #ccc;
      }
    }

    ul {
      display: flex;
      width: 100%;
      height: auto;
      font-size: 15px;
      flex-direction: column;
      overflow: auto;
      padding: 0px;
      li {
        margin-bottom: 5px;
        display: flex;
        flex-wrap: wrap;
        ${customMedia.lessThan("360px")`
      
      justify-content: center;
      align-items:center;
      text-align:center;
    `}
      }
    }
    h4 {
      display: flex;
      font-size: 12px;
      color: black;
    }
    p {
      display: flex;
      font-size: 18px;
      color: black;
    }
    .circulo {
      margin: initial;
      margin-top: 5px;
    }
    .circulo img {
      margin-right: 5px;
    }
    .circulo span {
      position: relative;
      bottom: 3px;
    }
    span {
      font-size: 12px;
      color: black;
      font-weight: bold;
    }
  }
`;

export const descritem = styled.div`
  display: flex;
  margin-left: 10px;
  padding-top: 5px;
  margin-bottom: 20px;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;

  ${customMedia.lessThan("mobile")`
  flex-direction:column;
  justify-content:center;
`}

  ${customMedia.lessThan("450px")`
  margin-bottom:0px;
`}



  .qtd {
    margin-bottom: 0px !important;
    span {
      font-weight: bold;
    }
  }

  .preco {
    font-weight: bold;
    margin: 0px;
  }
`;

export const produtos = styled.div`
  position: relative;
`;
export const ContainerTotal = styled.div`
  display: flex;
  flex-direction: column;
  right: 13%;
  position: fixed;

  ${customMedia.lessThan("1450px")`
  right: 8%;
`}
  ${customMedia.lessThan("1150px")`
  right: 5%;
`}

  ${customMedia.lessThan("notebook")`
   position: unset;
   width:100%;
`}

  h4 {
    font-size: 18px;
    color: var(--font-color);
    font-weight: 700;
  }

  .buttonVoltar {
    border: 0px;
    padding: 10px;
    margin-top: 10px;
    transition: 0.3s;

    ${customMedia.lessThan("notebook")`
  margin-top:20px;
  margin-bottom:20px;
`}

    ${customMedia.lessThan("tablet")`
  
  margin-bottom:140px;
`}

${customMedia.lessThan("mobile")`
  
  margin-bottom:170px;
`}

    :hover {
      /* background: #b9cb96; */
    }
  }
`;

export const ContainerDireito = styled.div`
  display: flex;
  ${customMedia.lessThan("notebook")`
  margin-top:30px;
  width:100%;
`}
`;

export const total = styled.div`
  background: #f4f4f5;
  box-shadow: rgb(134 133 133 / 16%) 3px 3px 80px,
    rgb(92 91 91 / 23%) 0px 0px 3px;
  width: 250px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  min-height: 250px;

  ${customMedia.lessThan("notebook")`
  width:100%;
`}

  p {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    color: #000;
    margin: 15px 0;

    span {
      font-size: 18px;
      margin-top: 10px;
      font-weight: bold;
      position: relative;
    }
  }
`;

export const bts = styled.div`
  display: none;
  .cinza {
    background-color: #7f7f7f;
  }
`;

export const bt = styled.div`
  width: 200px;
  height: 50px;
  background-color: #ce171f;
  color: #fff;
  font-size: 14px;
  padding-top: 15px;
  border-radius: 50px;
  text-align: center;
  margin: 15px 0;
  ${customMedia.lessThan("tablet")`
    position: relative;
    margin: 15px auto;  
    `}
`;
