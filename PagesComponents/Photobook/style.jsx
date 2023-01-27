import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const GeneralContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  margin-bottom: 100px;
  ${customMedia.lessThan("1016px")`
      margin-bottom:200px;
    `}
  .containerTopo {
    width: 80%;
    max-width: 1640px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    position: relative;

    ${customMedia.lessThan("1016px")`
          width: 100%;
        
      `}
  }
  .customContainerBanner {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 360px;
    img {
      width: 100%;
      height: 360px;
      object-fit: cover;
    }
  }

  .containerBanner {
    width: 100%;
    height: 360px;
    background: url("/images/bannerLojista.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .logoLojista {
    position: absolute;

    left: 1%;
    display: flex;
    bottom: 10%;
    ${customMedia.lessThan("1016px")`
        flex-direction:column;
        left:50%;
        transform: translate(-50%);
        width:auto;
        justify-content:center;
        align-items:center;
        bottom: 27%;

        &.not{
          bottom:4%;
          
        }
        
    `}

    .containerImage {
      border-radius: 60px;
      justify-content: center;
      width: 125px;
      height: 125px;
      display: flex;
      background: white;
      align-items: center;
      bottom: -35%;
      border: 1px solid black;

      img {
        width: 100%;

        border-radius: 60px;
      }

      ${customMedia.lessThan("1016px")`
      margin-bottom:40px;
    
      
      `}
    }

    img {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
    }

    svg {
      display: flex;
      justify-content: center;
      width: 90%;
      color: #292728;
      align-items: center;
    }
  }
  .containerProfileFunctions {
    display: flex;
    width: 100%;
    height: 100px;

    ${customMedia.lessThan("1016px")`
          flex-direction:column;
          height: 250px;
          padding:10px;

          &.not{
            height: 100px;
          }
        
      `}

    .containerDescription {
      display: flex;
      flex-direction: column;
      width: 60%;
      gap: 15px;
      padding-left: 150px;
      padding-top: 10px;
      padding-right: 10px;

      .title {
        font-size: 20px;
        font-weight: bold;
      }

      .description {
        ${customMedia.lessThan("1016px")`
        text-align:center;
        
        `}
      }

      ${customMedia.lessThan("1016px")`
          height:100px;
          align-items:center;
          justify-content:center;
          width:100%;
          padding:0px;
          margin:40px 0px 20px 0px;
        
      `}
    }
    .containerButtons {
      display: flex;
      width: 40%;
      align-items: center;
      gap: 15px;

      ${customMedia.lessThan("1016px")`
      width:100%;
        justify-content:center;
        
      `}

      button {
        font-size: 14px;
        display: flex;
        width: 220px;
        font-weight: bold;
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
  }
`;

export const ContainerPhotobookFunctions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 80%;
  max-width: 1640px;

  ${customMedia.lessThan("900px")`
          width: 90%;
        
      `}

  .containerFunctionButtons {
    display: flex;
    width: 100%;
    border-bottom: 4px solid var(--default-color);

    ${customMedia.lessThan("1016px")`
          flex-direction:column;
        
      `}

    button {
      border: 0px;
      background: white;
      width: 160px;
      padding: 10px 2px;
      transition: 0.3s;
      font-weight: 600;
      border: solid 2px transparent;
      border-bottom: 0px solid transparent !important;
      ${customMedia.lessThan("1016px")`
        width:50%;
        
      `}

      :hover {
        border: solid 2px var(--default-color);
      }

      &.active {
        background: var(--default-color);
        color: var(--title-color);
        font-weight: bold;
      }
    }

    .containerUnlockedButtons {
      display: flex;

      ${customMedia.lessThan("1016px")`
        width:100%;
        
      `}
    }

    .containerFirstButtons {
      display: flex;

      ${customMedia.lessThan("1016px")`
        width:100%;
        
      `}
    }
  }
`;

export const ContainerDataFunctions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  max-height: 65vh;
  overflow: auto;

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
  .title {
    margin-top: 10px;
    font-weight: bold;
    ${customMedia.lessThan("mobile")`
       display:flex;
   
       justify-content:flex-start;
   
       `}
  }
  .containerFilter {
    display: flex;
    margin: 10px 0px;
    width: 100%;

    ${customMedia.lessThan("mobile")`
       flex-direction:column;
       justify-content:flex-start;
       
       `}

    .containerInputs {
      display: flex;

      ${customMedia.lessThan("mobile")`
       width: 100%;
       justify-content:flex-start;
     
       `}
    }

    .until {
      display: flex;
      align-items: center;
      margin: 0 5px;
    }

    input {
      background: #f4f4f5;

      border: 0px;
      height: 40px;
      width: 120px;
      padding-left: 10px;

      ::placeholder {
        color: black;
      }
    }

    button {
      width: 70px;
      height: 40px;
      border: 0px;
      color: var(--title-color);
      background: var(--bt-positive-color);
      margin-left: 10px;
      font-weight: bold;
      transition: 0.3s;

      :hover {
        background: var(--bt-positive-color-hover);
      }

      ${customMedia.lessThan("mobile")`
       width: 100px;
       margin-left:0px;
     margin-top:10px;
       `}
    }
  }

  .boxNothing {
    font-size: 16px;
    display: flex;
    height: 100px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .boxAddNewPhotobook {
    display: flex;
    width: 100%;
    background: unset;
    border: solid 2px transparent;
    border-bottom: solid 2px var(--default-color);
    padding: 20px;
    align-items: center;
    margin-top: 10px;
    gap: 30px;
    font-weight: bold;

    .containerImage {
      display: flex;
      width: 40px;
      cursor: pointer;

      svg {
        width: 100%;
        transition: 0.3s;
        :hover {
          color: #292728;
        }
      }
    }

    :hover {
      transition: 0.3s;
      cursor: pointer;
      background-color: #f7f7f7;
      border: solid 2px var(--default-color);
    }
  }
  .containerBoxPhotobook {
    display: flex;
    flex-direction: column;
    max-height: 500px;
    overflow: auto;
    gap: 10px;
    margin-top: 10px;

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

  .containerBoxLikes {
    display: flex;
    width: 100%;
    max-height: 500px;
    overflow: auto;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;

    ${customMedia.lessThan("1016px")`
        gap: 20px;
        
      `}
    ${customMedia.lessThan("475px")`
        gap: 10px;
        
      `}

    .imageBoxes {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      width: 19%;
      height: 120px;

      ${customMedia.lessThan("1016px")`
        width: 30%;
        
      `}
      ${customMedia.lessThan("475px")`
        width: 47%;
        
      `}

      .boxDislike {
        position: absolute;
        width: 30px;
        bottom: 5px;
        right: 10px;
        cursor: pointer;
        transition: 0.3s;
        background: var(--default-color);
        padding: 5px;

        :hover {
          background: var(--default-color);
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
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

  .boxLoadMore {
    display: flex;
    width: 100%;
    margin-top: 10px;
    justify-content: center;

    button {
      border: 0px;

      font-weight: 600;
      transition: 0.3s;
      padding: 5px 40px;
    }
  }
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

  :hover {
  }
`;

export const Transparent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
