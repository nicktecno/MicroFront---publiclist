import styled from "styled-components";
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

export const ImagePerfil = styled.div`
  img {
    margin-top: 20px;
    width: 120px;
  }
`;

export const parte1 = styled.div`
  padding-top: 70px;
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-content: center;
  align-items: center !important;
`;

export const texto = styled.div`
  text-align: center;

  h1 {
    font-size: 30px;
    color: #282729;
    margin-bottom: 15px;
    font-weight: bold;
    margin-top: 10px;
  }
  span {
    transition: 0.3s;
    cursor: pointer;
    :hover {
      color: var(--default-color);
    }
    font-weight: bold;
  }
  p {
    font-size: 14px;
    color: #282729;
    margin-bottom: 40px;

    a {
      transition: 0.3s;

      :hover {
        color: var(--defaut-color);
      }
    }
  }
`;

export const form = styled.div`
  width: 520px;
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  span label {
    font-size: 18px;
    font-weight: bold;
    align-self: flex-start;
    ${customMedia.lessThan("mobile")`
    width:300px;
        `}
  }

  ${customMedia.lessThan("mobile")`
    width:300px;
        `}
  span input {
    width: 520px;
    margin-top: 5px;
    padding-left: 10px;
    font-size: 14px;

    border: none;
    background-color: #ffffff;
    border-bottom: solid 3px var(--input-border-color);
    padding-bottom: 4px;
    transition: 0.3s;

    ${customMedia.lessThan("mobile")`
      width:300px;
    `}
    :hover {
      border-bottom: solid 3px var(--input-border-color-hover);
    }
  }

  span input::placeholder {
    font-size: 14px;
  }

  .containerSenha {
    width: 520px;
    display: flex;
    background-color: #ffffff;
    border-bottom: solid 3px var(--input-border-color);
    transition: 0.3s;

    ${customMedia.lessThan("mobile")`
      width:300px;
    `}
    :hover {
      border-bottom: solid 3px var(--input-border-color-hover);
    }
    input {
      border: none;

      :hover {
        border: none;
      }
    }
    span {
      display: flex;
      margin-right: 20px;
      width: 30px;
      cursor: pointer;
      svg {
        transition: 0.3s;
        :hover {
          color: var(--default-color);
        }
      }
    }
  }

  .inputSenha {
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    line-height: 18px;
    border: none;
    background-color: #ffffff;
  }

  .check-termos {
    height: initial;
    width: initial;
    margin-right: 10px;
    position: relative;
    top: 2px;
    margin-bottom: 5px;
  }

  .containerButton {
    display: flex;
    margin-bottom: 40px;
    gap: 10px;
    margin-top: 30px;
    justify-content: center;
    width: 500px;
    ${customMedia.lessThan("tablet")`
      flex-direction: column-reverse;
      margin-bottom:200px;
      width: 90%;
    `}
  }

  .voltar {
    transition: 0.3s;
    border: none;
    font-size: 14px;
    font-weight: bold;
    width: 240px;
    height: 50px;
  }

  .login {
    width: 240px;
    transition: 0.3s;
    border: none;
    font-size: 14px;
    font-weight: bold;
    height: 50px;
  }
`;

export const inputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  label {
    text-align: left;
  }
`;

export const ContainerTermos = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const termos = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #282729;
  margin-bottom: 10px;
  padding: 2px;
  border: ${(props) =>
    props.alert ? "2px solid #ce171f" : "2px solid transparent"};

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
    width: 15px;
    height: 15px;
    color: #292728;
    &:before {
      content: "✔️";
      color: #292728;
      display: flex;
      font-size: 12px;
    }
  }

  span {
    font-weight: bold;

    a {
      transition: 0.3s;
    }
  }
`;
