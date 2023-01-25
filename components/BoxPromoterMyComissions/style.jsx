import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
  irico: "414px",
  ipobre: "375px",
  pobre: "330px",
});

export const BoxSeller = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0px;
  background: unset;
  border-bottom: 2px solid var(--default-color);
  min-height: auto;
  padding: 10px;

  ${customMedia.lessThan("mobile")`
            min-height:220px;
      
    `}

  ${customMedia.lessThan("mobile")`
       min-height:auto;
       flex-direction:column;
       padding-bottom:10px; 
      
    `}

    

  .containerLogoName {
    display: flex;
    width: 100%;
    justify-content: space-between;

    ${customMedia.lessThan("mobile")`
        flex-direction:column;
        justify-content:center;
        align-items:center;
         width: 100%;
    `}

    ${customMedia.lessThan("mobile")`
       width:100%;
       margin-top:20px;
       
       `}
    

    .boxName {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      overflow: auto;
      font-weight: bold;
      color: #292728;
      font-size: 14px;
      margin-left: 20px;
      line-height: 25px;
      transition: 0.3s;

      .info {
        font-size: 20px;
      }

      &.a {
        :hover {
          // color: #b9cb96;
        }
      }

      ${customMedia.lessThan("mobile")`
      margin-top:10px;
      justify-content:center;
      margin-left:0px;
      `}
    }
  }
`;
