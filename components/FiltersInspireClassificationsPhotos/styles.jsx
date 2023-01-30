import styled from "styled-components";

import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const EachClassification = styled.div`
  background: #f4f3f4;
  padding: 10px;
  padding-left: 20px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  ${customMedia.lessThan("tablet")`
      width: 50%;
    `}
  ${customMedia.lessThan("mobile")`
      width: 100%;
    `}

  .containerClassification {
    display: flex;
    justify-content: space-between;

    .name {
      font-family: "Futura Hv BT";
      color: #343a1c;
    }
    .arrow {
      margin-right: 5px;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  margin-left: 10px;
  width: 100%;
  margin-top: 10px;
  animation: 200ms ease-out slideIn;

  @keyframes slideIn {
    0% {
      line-height: 10px;
      opacity: 0;
    }
    100% {
      line-height: 20px;
      opacity: 1;
    }
  }

  .checkBox {
    border: 1px solid black;
    width: 20px;

    &.active {
      background: var(--default-color);
    }
  }

  .optionName {
    margin-left: 10px;
  }
`;
