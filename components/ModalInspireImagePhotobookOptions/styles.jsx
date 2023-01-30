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

export const ModalImagePhotobookOptions = styled.div`
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

export const centerModalImagePhotobookOptions = styled.div`
  display: flex;
  align-content: flex-start;
  width: 800px;
  height: 525px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;

  ${customMedia.lessThan("notebook")`
       width: 95%;
    `}
  ${customMedia.lessThan("tablet")`
  margin-top:0px;
     width: 100%;
     height:70vh;
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
    min-height: 50px;
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

  .boxData {
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 0 15px 0px 0px;

    gap: 10px;

    ${customMedia.lessThan("tablet")` 
    padding:5px;
    overflow:auto;
    
    
    `}
    .boxImage {
      display: flex;
      position: relative;
      width: 70%;
      height: 100%;
      max-height: 475px;

      ${customMedia.lessThan("tablet")`
        width:100%;
        height: auto;
        max-height:60%;
        justify-content: center;
        
    `}
      .add {
        position: absolute;
        padding: 10px 20px;
        border: 0px;
        display: flex;
        width: 150px;
        bottom: 5px;
        right: 10px;
        cursor: pointer;
        transition: 0.3s;
        color: var(--title-color);
        background-color: var(--default-color);
        align-items: center;
        justify-content: center;
        gap: 5px;

        &.liked {
          background-color: var(--default-color-hover);
        }

        .like {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        svg {
          width: 20px;
        }

        :hover {
          background-color: var(--default-color-hover);
        }

        ${customMedia.lessThan("tablet")` 
        
        
        
        `}
      }
    }

    ${customMedia.lessThan("tablet")`
        flex-direction:column;
        
    `}
    .add {
      padding: 10px 20px;
      border: 0px;
      display: flex;
      width: 100%;
      cursor: pointer;
      transition: 0.3s;
      background-color: #dbc79a;
      align-items: center;
      justify-content: center;
      gap: 5px;

      :hover {
        background-color: #cca8a8;
      }
    }

    img {
      width: 100%;
      height: 100%;

      object-fit: cover;
      margin-bottom: 10px;
      ${customMedia.lessThan("tablet")`
        height:auto;
         width: auto;
         max-width:100%;
         max-height:100%;
         padding:5px;
            margin-bottom: 0px;
        
    `}
    }

    .containerData {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
      margin-top: 10px;
      flex: 1;
      max-height: 450px;
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

      ${customMedia.lessThan("tablet")`
       max-height: auto;
      width:100%;
       align-items:center;
       overflow: unset;
       margin-bottom:5px;
       max-height:unset;
        
    `}
    }

    .data {
      color: #000;
      width: 100%;
      display: flex;
      padding: 10px;
      flex-direction: column;
      flex-wrap: wrap;
      height: auto;
      width: 100%;
      max-width: 100%;
      background: #f6f6f6;

      &.name {
        background: #f6f6f6;
        justify-content: center;

        transition: 0.3s;
        cursor: pointer;

        :hover {
          // background: #b9cb96;
        }
      }

      ${customMedia.lessThan("tablet")`
      flex-direction: column;
      
      width:100%;
       align-items:center;
        
    `}
      span {
        display: flex;

        &.name {
          justify-content: center;
        }

        ${customMedia.lessThan("tablet")`
        justify-content:center;
    `}
      }

      strong {
        display: flex;
        width: 100%;
        max-width: 100%;
        flex-wrap: wrap;
        justify-content: flex-start;
        text-align: start;

        &.name {
          font-size: 20px;
          margin: 10px 0px;
          text-align: center;
          justify-content: center;
        }

        ${customMedia.lessThan("tablet")`
        justify-content:center;
        text-align:center;
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
    }
  }

  .modalFooter {
    justify-content: center;
    flex: 1;
    gap: 7px;
    align-items: center;
    display: flex;
    width: 100%;
    padding: 0 20px;
    flex-direction: column;
    bottom: 0px;
  }
`;

export const Transparent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
