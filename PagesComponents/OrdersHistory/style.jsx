import styled, { css } from "styled-components";
import { generateMedia } from "styled-media-query";
import { darken } from "polished";

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
  padding-top: 40px;
  span {
    font-weight: bold;
  }
  a {
    color: #292728;
    transition: 0.3s;

    :hover {
      // color: #515a2b;
    }
  }
`;

export const BoxShadow = styled.div`
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  padding: 17px;
  margin: 8px 0;
  margin-bottom: 20px;

  background: #fff;

  ${(props) =>
    props.bgColor &&
    css`
      background: ${props.bgColor};
    `}

  ${(props) =>
    props.maxWidth &&
    css`
      max-width: ${props.maxWidth}px;
      margin: 0 auto;
    `}

  ${(props) => props.noPadding && "padding: 17px 0"}
  ${(props) => props.noPaddingAll && "padding: 0px"}
  ${(props) => props.newPadding && `padding: ${props.newPadding};`}
`;

export const ButtonFloat = styled.button`
  background: #ce171f;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.15);
  border: 0;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bolder;
  color: #fff;
  font-size: 15px;
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  bottom: 3rem;
  left: 50%;
  width: auto;
  white-space: nowrap;
  height: 38px;
  transform: translate(-50%, -50%);
  transition: 0.3s;

  &:hover {
    background: ${darken(0.2, "#ce171f")};
    color: #fff;
  }

  ${(props) =>
    props.bgColor &&
    css`
      background: var(--${props.bgColor});
    `}

  ${(props) =>
    props.notFloat &&
    css`
      transform: initial;
      position: unset;
    `}

  ${(props) =>
    props.block &&
    css`
      pointer-events: none;
    `}


  a {
    color: #fff;
  }

  svg {
    font-size: 22px;
    width: 22px;
    margin-right: 0.5rem;
  }

  .person-icon {
    color: var(--green);
    background: #fff;
    border-radius: inherit;
    padding: 3px;
  }
`;

export const topicos = styled.div`
  position: relative;
  margin-bottom: 60px;

  ${customMedia.lessThan("tablet")`
    bottom: 20px;    
    `}

  .rowGeral {
    display: flex;
    justify-content: center;
  }

  .rowGeralComPedidos {
    display: flex;

    align-items: center;
    ${customMedia.lessThan("mobile")`
    justify-content:center;
    
    `}
  }

  .colSemPedidos {
    display: flex;
    text-align: center;
    justify-content: center;
  }

  .botaoVoltar {
    font-weight: 600;
    text-transform: uppercase;
    align-self: center;
    justify-self: center;
    display: flex;
    margin-top: 20px;
    border: 0px;
    padding: 10px 100px;
    transition: 0.3s;

    :hover {
      // background: #;
    }
  }

  .colButtonVejaMais {
    padding: 0px !important;

    ${customMedia.lessThan("mobile")`
    display:flex;
    justify-content:center;
    align-items:center;
    `}
  }

  .buttonVejaMais {
    border-radius: 0px;
    color: black;
    font-weight: 500;
    transition: 0.3s;
    width: 235px;
    margin-top: 20px !important;
  }

  ${customMedia.lessThan("mobile")`
    
    
    `}
`;

export const ContainerTitulos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  ${customMedia.lessThan("mobile")`
    display:none;
    
    `}

  .pedidos {
    width: 50%;
    font-weight: bold;
  }

  .status {
    font-weight: bold;
    padding: 0px 20px;
    width: 270px;
    text-align: center;

    ${customMedia.lessThan("tablet")`
    width:250px;
    
    `}
  }
`;

export const ContainerDadosStatus = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${customMedia.lessThan("mobile")`
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-bottom:20px;
    `}

  .statusBox {
    padding: 0px 17px;
    text-align: center;
    background: #f4f3f4;
    margin: 8px 0 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 270px;
    font-weight: 500;
    ${customMedia.lessThan("tablet")`
    width:250px;
    
    `}
    ${customMedia.lessThan("mobile")`
    padding:17px;
    width:90%;
    
    `}

    svg {
      color: black;
      width: 20px;
      margin-right: 10px;
    }
  }
`;

export const BoxRequests = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

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

  .loadMoreOrders {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    button {
      border: 0px;
      transition: 0.3s;
      cursor: pointer;
      font-weight: bold;
      padding: 11px 30px;
      margin-bottom: 10px;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
    }
  }
`;

export const ContainerPedido = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${customMedia.lessThan("mobile")`
    justify-content:center;
    align-items:center;
    
    
    `}

  h4 {
    font-size: 14px;
    font-weight: bold;
  }

  .boxBege {
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: space-between;
    transition: 0.3s;
    cursor: pointer;
    text-transform: capitalize;
    border-radius: 2px;
    ${customMedia.lessThan("notebook")`
  width:55%;
  `}
    ${customMedia.lessThan("tablet")`
  width:50%;
  `}

    ${customMedia.lessThan("mobile")`
  width:90%;
  `}

	// :hover {
  //     background-color: var(--default-color);
  //   }
  }
`;

export const edit = styled.div`
  font-size: 14px;
  color: #000;
  padding-top: 10px;
  font-weight: bold;

  span {
    font-size: 10px;
    text-align: right;
    font-weight: bold;
  }
`;
