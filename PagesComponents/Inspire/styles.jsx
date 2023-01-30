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
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  background: url("/images/fotooo.jpg");
  max-width: 1640px;
  background-size: cover;
  background-repeat: no-repeat;
  align-items: flex-end;
  padding: 20px;

  span {
    color: #ffffff;
    font-size: 50px;

    margin-left: 100px;
    line-height: 50px;
    text-transform: uppercase;

    ${customMedia.lessThan("mobile")`
      margin-left:0px;
      font-size: 30px;
      line-height: 30px;
    `}
  }
`;

export const GeneralDataContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 90%;
  max-width: 1640px;
  min-height: 50vh;
  justify-content: center;

  ${customMedia.lessThan("tablet")`
     flex-direction:column;
    `}
`;

export const ContainerFilters = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  ${customMedia.lessThan("tablet")`
     width: 100%;
    `}

  .labelFilter {
    width: 100%;
    display: flex;
    background: var(--default-color);
    font-size: 20px;
    padding: 10px;
    color: var(--title-color);
    cursor: pointer;
    text-align: center;
    justify-content: center;
    margin-bottom: 5px;

    :hover {
      background: var(--default-color-hover);
    }
  }

  .containerFiltered {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 5px;

    .boxNameFilter {
      display: flex;
      background: var(--default-color);
      color: var(--title-color);
      align-items: center;
      padding: 2px 7px;
      height: 30px;
      :hover {
        cursor: pointer;
        background: var(--default-color-hover);
      }
      .name {
        margin-right: 5px;
      }
      .excludeButton {
        display: flex;
        width: 20px;

        svg {
          width: 100%;
          transition: 0.3;
          cursor: pointer;
        }
      }
    }
  }
  .filters {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    box-shadow: rgb(134 133 133 / 16%) 3px 3px 80px,
      rgb(92 91 91 / 23%) 0px 0px 3px;

    .title {
      background: #f4f4f5;
      color: #000;
      padding: 10px;
      padding-left: 20px;
    }
    .classifications {
      display: flex;
      flex-direction: column;

      ${customMedia.lessThan("tablet")`
        flex-direction:row;
        flex-wrap:wrap;
    `}
    }
  }
`;

export const ContainerPhotosBoxes = styled.div`
  display: flex;
  width: 70%;
  margin-left: 50px;
  flex-wrap: wrap;
  max-height: 400px;
  height: auto;
  align-content: flex-start;

  gap: 10px;
  overflow: auto;
  position: relative;

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
      :hover {
        // background: #ccc;
      }
    }
  }
  .nothing {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  ${customMedia.lessThan("tablet")`
     width: 100%;
     margin-left:0px;
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
    background: #ccc;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }

  .containerBox {
    display: flex;
    height: 120px;
    width: 180px;
    transition: 0.3s;
    border-bottom: 3px solid var(--input-border-color);
    cursor: pointer;

    :hover {
      border-bottom: solid 3px var(--input-border-color-hover);
    }
    ${customMedia.lessThan("notebook")`
     width:31%;
   
    `}

    ${customMedia.lessThan("tablet")`
     width:32%;
     margin-top:15px;
    `}
    ${customMedia.lessThan("mobile")`
     width:31%;
     margin-top:15px;
    `}
    ${customMedia.lessThan("445px")`
     width:47%;
     margin-top:15px;
    `}

    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;
export const GeneralContainerExternal = styled.div`
  height: 100%;
  min-height: 100vh;
`;
export const ContainerFooter = styled.div`
  display: flex;
  ${customMedia.lessThan("tablet")`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
    `}
`;
