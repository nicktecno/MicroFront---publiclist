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

  ${customMedia.lessThan("900px")`
            min-height:220px;
      
    `}

  ${customMedia.lessThan("600px")`
       min-height:auto;
       flex-direction:column;
       padding-bottom:10px; 
      
    `}

    

  .containerLogoName {
    display: flex;
    width: 50%;

    ${customMedia.lessThan("900px")`
        flex-direction:column;
        justify-content:center;
        align-items:center;
         width: 50%;
    `}

    ${customMedia.lessThan("600px")`
       width:100%;
       margin-top:20px;
       
       `}
    
  
 

 
    .boxLogo {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 90px;
      width: 90px;
      height: 90px;
      background: #ffffff;
      border: 1px solid #292728;

      img {
        width: 50px;
      }
      svg {
        width: 50px;
      }
    }
    .boxName {
      display: flex;
      align-items: center;
      width: 100%;
      overflow: auto;
      font-weight: bold;
      color: #292728;
      font-size: 20px;
      margin-left: 20px;
      line-height: 25px;

      ${customMedia.lessThan("900px")`
      margin-top:10px;
      justify-content:center;
      margin-left:0px;
      `}
    }
  }

  .containerSelection {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;

    ${customMedia.lessThan("tablet")`
       
       justify-content: center;
       margin-right:0px;
       margin-top:10px;
       `}

    .boxStatus {
      font-weight: bold;
      border: solid 1px var(--default-color);
      padding: 10px;
      margin-right: 50px;
      text-align: center;
      width: 80px;

      &.active {
        background: var(--default-color);
        color: var(--title-color);
      }

      ${customMedia.lessThan("tablet")`
       
       
       margin-right:0px;
       
       `}
    }
  }
`;
