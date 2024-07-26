import React, { useEffect } from "react";
import { Issue, useLogsStore } from "@/store/IssuesStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";

interface WorkTableProps {
  onEdit?: (Issue: Issue) => void;
}

export const IssueTable: React.FC<WorkTableProps> = () => {
  const formatTimestamp = (timestamp: string | undefined) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  const { issues, fetchIssues } = useLogsStore();

  useEffect(() => {
    if (issues.length === 0) fetchIssues();
  }, [issues.length, fetchIssues]);

  console.log(issues);

  return (
    <Box className="overflow-scroll max-w-full mb-[15px]">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[150px]">Machine</TableCell>
              <TableCell className="w-[300px]">Issue Details</TableCell>
              <TableCell className="w-[300px]">Fix Details</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell className="w-[150px] text-center">Status</TableCell>
              <TableCell className="w-[120px]">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((Issue) => (
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
                    {Issue.technician_id || "Unassigned"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={Issue.status}
                    color={
                      Issue.status === "PENDING"
                        ? "warning"
                        : Issue.status === "IN PROGRESS"
                        ? "primary"
                        : Issue.status === "COMPLETED"
                        ? "success"
                        : Issue.status === "CANCELED"
                        ? "error"
                        : "default"
                    }
                    variant="outlined"
                    className="w-[120px]"
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
