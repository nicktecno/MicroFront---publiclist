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
  border-bottom: 2px solid var(--default-color-hover);
  min-height: auto;
  padding: 10px;

  ${customMedia.lessThan("600px")`
       min-height:auto;
       flex-direction:column;
       padding-bottom:10px;
       
    `}

  .containerLogoName {
    display: flex;
    align-items: center;
    width: 25%;

    ${customMedia.lessThan("1200px")`
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width: 35%;
    `}
    ${customMedia.lessThan("900px")`
         width: 50%;
    `}

${customMedia.lessThan("600px")`
       width:100%;
       margin-top:20px;
       
       `}



    
  
  .containerAssociation {
      display: none;

      ${customMedia.lessThan("900px")`
        display: flex;
        align-items: center;
        margin-top:10px;
       
      
    `}

      ${customMedia.lessThan("600px")`
        
        margin-bottom:15px;
       
      
    `}

  .requestAssociation {
        display: flex;
        width: 150px;
        height: 50px;
        text-align: center;
        justify-content: center;
        align-items: center;
        background: var(--default-color);
        color: var(--title-color);
        font-weight: 600;
        transition: 0.3s;
        cursor: pointer;

        :hover {
          background: var(--default-color-hover);
        }
      }
    }
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

      ${customMedia.lessThan("desktop")`
      margin-top:10px;
      justify-content:center;
      margin-left:0px;
    `}
    }
  }

  .containerSelection {
    display: flex;
    flex: 1;

    ${customMedia.lessThan("900px")`
       justify-content:flex-end;
       margin-right:10px;
       
       
      
    `}

    .boxMultipleSelect {
      display: flex;
      align-items: center;
      width: 50%;

      .containerSelectOptions {
        display: flex;
        flex-direction: column;
      }

      ${customMedia.lessThan("desktop")`
      flex-direction:column;
      justify-content:center;
      align-items:center;
    `}
      ${customMedia.lessThan("900px")`
      width:100%;
       
       
      
    `}

    ${customMedia.lessThan("600px")`
      justify-content:flex-start;
`}
    }
    .containerAssociation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;

      ${customMedia.lessThan("900px")`
      display:none;


    `}
      .requestAssociation {
        display: flex;
        width: 150px;
        height: 50px;
        text-align: center;
        justify-content: center;
        align-items: center;
        background: var(--default-color);
        color: var(--title-color);
        font-weight: 600;
        margin-right: 40px;
        transition: 0.3s;
        cursor: pointer;

        :hover {
          background: var(--default-color-hover);
        }
      }
    }
  }
`;
