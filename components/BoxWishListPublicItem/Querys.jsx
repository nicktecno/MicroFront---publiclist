import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: Int!, $offer_id: Int!) {
    children(url_key: "", id: $id) {
      id
      name
      status
      images {
        path
      }
      attributes {
        id
        value
        text_value
        configurable
        attribute {
          code
          admin_name
          options {
            id
            code
            admin_name
            url_image
          }
        }
      }

      offers(offer_id: $offer_id) {
        id
        sku_vendor
        price
        stock
        status
        marketplace_seller_id
        company_id
        distance
        marketplace_seller {
          shop_title
          url
        }
      }
    }
  }
`;
