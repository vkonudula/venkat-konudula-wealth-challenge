import { IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

export default function AssetTableRow({
  node,
  level,
  onRowClick,
}: {
  node: any;
  level: number;
  onRowClick: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <TableRow>
        <TableCell
          component="td"
          sx={{ pl: `${level * 20}px`, width: 10 }}
          colSpan={2}
        >
          {hasChildren && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell
          component="td"
          onClick={hasChildren ? undefined : () => onRowClick(node.id)}
        >
          {node.name}
        </TableCell>
        <TableCell component="td">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(node.balanceCurrent)}
        </TableCell>
      </TableRow>
      {hasChildren &&
        open &&
        node.children.map((child: any) => (
          <AssetTableRow
            key={child.id}
            node={child}
            level={level + 1}
            onRowClick={onRowClick}
          />
        ))}
    </>
  );
}
