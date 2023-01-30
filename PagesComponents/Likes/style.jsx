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

export const caminho = styled.div`
  width: 100%;
  height: 65px;
  margin-bottom: 40px;
  position: relative;

  color: black;
  padding-top: 40px;
  span {
    font-weight: bold;
  }
  a {
    color: #292728;
    transition: 0.3s;
  }
`;

export const GeneralContainer = styled.div`
  min-height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-bottom: 350px;

  .nothing {
    display: flex;
    width: 90%;
    max-width: 1640px;
    justify-content: center;
    align-items: center;
  }

  .boxBack {
    margin-top: 50px;
    button {
      padding: 10px 20px;
      cursor: pointer;
      transition: 0.3s;
      width: 250px;
      border: 0px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  width: 90%;
  max-width: 1640px;
  justify-content: flex-start;
  gap: 10px;
  max-height: 450px;
  overflow: auto;
  flex-wrap: wrap;

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
  .boxImage {
    width: 200px;
    height: 120px;
    position: relative;

    ${customMedia.lessThan("notebook")`
        width:24%;
        
      `}
    ${customMedia.lessThan("tablet")`
        width:32%;
        
      `}
        ${customMedia.lessThan("mobile")`
        width:48%;
        
      `}
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .boxDislike {
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: var(--title-color);
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: var(--default-color);
      transition: 0.3s;

      :hover {
        background: var(--default-color-hover);
      }

      svg {
        width: 80%;
      }
    }
  }
`;
