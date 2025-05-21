import { useEffect, useMemo, useState } from "react";
import {
  transformAssetsToTree,
  groupAssetsDataIntoCategoryAndSubCategories,
  getAssetById,
} from "./helpers";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogContent,
  Skeleton,
} from "@mui/material";
import AssetTableRow from "./AssetTableRow";
import { grey } from "@mui/material/colors";
import { useQuery } from "@apollo/client";
import { GET_ASSETS } from "../../graphql/queries/getAssets";

export default function AssetsTable() {
  const [dialogDetailsId, setDialogDetailsId] = useState("");
  const [dialogDetails, setDialogDetails] = useState();

  const { data, loading } = useQuery(GET_ASSETS, {
    variables: {
      wid: "ae0df17e-514e-4f52-a0b5-5bfb1adf84c9",
    },
  });

  const modifiedData = useMemo(() => {
    if (!data) return [];
    return transformAssetsToTree(
      groupAssetsDataIntoCategoryAndSubCategories(data.getAssets)
    );
  }, [data]);

  useEffect(() => {
    setDialogDetails(getAssetById(data?.getAssets ?? [], dialogDetailsId));
  }, [data, dialogDetailsId]);

  function onRowClick(assetId: string) {
    setDialogDetailsId(assetId);
  }

  if (loading) return <Skeleton height={500} />;

  return (
    <>
      <Paper>
        <Table padding="normal">
          <TableHead sx={{ background: grey["300"] }}>
            <TableRow>
              <TableCell component="th" colSpan={2}>
                Category / Subcategory/ Asset
              </TableCell>
              <TableCell />
              <TableCell component="th">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modifiedData.map((node) => (
              <AssetTableRow
                key={node.id}
                node={node}
                level={0}
                onRowClick={onRowClick}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog
        open={!!dialogDetails}
        onClose={() => {
          setDialogDetailsId("");
        }}
      >
        <DialogContent>{JSON.stringify(dialogDetails)}</DialogContent>
      </Dialog>
    </>
  );
}
