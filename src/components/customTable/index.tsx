import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import StatusChip from "../statusChip";
import { Issue } from "@/store/IssuesStore";

interface CustomTableProps {
  data: Issue[];
  statusClickable?: boolean;
  assigneeClickable?: boolean;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  data,
  statusClickable = false,
  assigneeClickable = false,
}) => {
  const formatTimestamp = (timestamp: string | undefined) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  return (
    <Box className="overflow-scroll max-w-full pb-[15px]">
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[150px]">{t("machine")}</TableCell>
              <TableCell className="w-[300px]">{t("issue_detail")}</TableCell>
              <TableCell className="w-[300px]">{t("fix_detail")}</TableCell>
              <TableCell className="w-[150px]">{t("assignee")}</TableCell>
              <TableCell className="w-[150px]">{t("status")}</TableCell>
              <TableCell className="w-[120px]">{t("updated_at")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((Issue) => (
              <TableRow key={Issue.issue_id}>
                <TableCell>
                  <Typography variant="body2" color="textPrimary">
                    {Issue.machine_part.name || "N/A"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    #{Issue.machine_id || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {Issue.issue_detail || "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {Issue.tech_detail || "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {Issue.technician_id || t("unassigned")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChip
                    issueId={Issue.issue_id}
                    status={Issue.status}
                    techDetail={Issue.tech_detail || ""}
                    clickable={statusClickable}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {formatTimestamp(Issue.updated_at)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
