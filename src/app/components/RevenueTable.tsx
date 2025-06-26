import { useEffect, useRef } from "react";
import {
  Box,
  Button,
  TableContainer,
  Typography,
  Paper,
  Skeleton,
} from "@mui/material";
import dayjs from "dayjs";
import styled from "styled-components";

interface RevenueItem {
  date: string;
  revenue: number;
}

interface Props {
  revenueData: RevenueItem[];
  loading: boolean;
};

const StickyTableCell = styled.td<{ $bg: string }>`
  border: 1px solid #bdbdbd;
  width: 156px;
  min-width: 156px;
  max-width: 156px;
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: ${(props) => props.$bg};
  text-align: left;
`;

const NormalTableCell = styled.td`
  border: 1px solid #bdbdbd;
  text-align: right;
`;

const TableRow = styled.tr<{ $bg: string }>`
  background-color: ${(props) => props.$bg};
`;

const StyledTable = styled.table`
  border: 1px solid #bdbdbd;
  border-collapse: collapse;
  width: 100%;
`;

const RevenueTable = ({ revenueData, loading }: Props) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // 计算年增率
  const getGrowthRates = (data: RevenueItem[]) => {
    return data.map((item, idx) => {
      if (idx === 0) return null;
      const prev = data[idx - 1];
      if (!prev) return null;
      const growth = ((item.revenue - prev.revenue) / prev.revenue) * 100;
      return growth.toFixed(2);
    });
  };

  const growthRates = getGrowthRates(revenueData);

  useEffect(() => {
    if (tableContainerRef.current) {
      const el = tableContainerRef.current;
      el.scrollLeft = el.scrollWidth;
    }
  }, [revenueData]);

  if (loading) {
    return (
      <Box bgcolor="#fff" borderRadius={2} boxShadow={1} p={2} mt={3}>
        <Skeleton variant="rounded" width="100%" height={200} />
      </Box>
    );
  }
  return (
    <Box bgcolor="#fff" borderRadius={2} boxShadow={1} p={2} mt={3}>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        详细数据
      </Button>
      <TableContainer component={Paper} ref={tableContainerRef}>
        <StyledTable>
          <tbody>
            <TableRow $bg="#e0e0e0">
              <StickyTableCell $bg="#e0e0e0">年度月份</StickyTableCell>
              {revenueData.map((row) => (
                <NormalTableCell key={row.date}>
                  {dayjs(row.date).format("YYYY/MM")}
                </NormalTableCell>
              ))}
            </TableRow>
            <TableRow $bg="#fafafa">
              <StickyTableCell $bg="#fafafa">每月营收</StickyTableCell>
              {revenueData.map((row) => (
                <NormalTableCell key={row.date}>
                  {row.revenue.toLocaleString()}
                </NormalTableCell>
              ))}
            </TableRow>
            <TableRow $bg="#e0e0e0">
              <StickyTableCell $bg="#e0e0e0">
                单月营收年增率 (%)
              </StickyTableCell>
              {revenueData.map((row, idx) => (
                <NormalTableCell key={row.date}>
                  {growthRates[idx] ?? "-"}
                </NormalTableCell>
              ))}
            </TableRow>
          </tbody>
        </StyledTable>
      </TableContainer>
      <Box sx={{ width: "100%", textAlign: "right", mt: 2 }}>
        <Typography variant="caption" color="text.secondary" display="block">
          图表单位：千元，数据来自公开资讯观测站
          <br />
          网页图表欢迎转载引用，请注明出处或为财报狗
        </Typography>
      </Box>
    </Box>
  );
};

export default RevenueTable;
