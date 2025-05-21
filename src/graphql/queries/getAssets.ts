import { gql } from "@apollo/client";

export const GET_ASSETS = gql`
query GetAssets($wid: String!) {
  getAssets(wid: $wid) {
    assetId
    primaryAssetCategory
    wealthAssetType
    balanceCurrent
    nickname
}
}
`;
