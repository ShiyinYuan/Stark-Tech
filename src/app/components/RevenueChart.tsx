import { Box, Button, MenuItem, Select, styled, Popover, FormControl, Typography, SelectChangeEvent } from "@mui/material";
import React from "react";
import ReactECharts from "echarts-for-react";

interface RevenueItem {
  date: string;
  revenue: number;
}

interface Props {
  revenueData: RevenueItem[];
  year: number | 'custom';
  loading: boolean;
  setYear: (year: number | 'custom') => void;
  onYearRangeConfirm: (start: number, end: number) => void;
}

const DarkSelect = styled(Select)({
  background: "#f5f5f5",
  minWidth: 100,
  "& .MuiSelect-select": {
    fontWeight: 700,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});
const DarkMenuItem = styled(MenuItem)(() => ({
  background: "#333",
  color: "#fff",
  "&.Mui-selected": {
    background: "#666",
  },
  "&:hover": {
    background: "#444",
  },
}));

const yearOptions = [
  { label: "近3年", value: 3 },
  { label: "近5年", value: 5 },
  { label: "近8年", value: 8 },
  { label: "自订", value: "custom" },
];

const RevenueChart = ({ revenueData, year, loading, setYear, onYearRangeConfirm }: Props) => {
  const selectRef = React.useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const currentYear = new Date().getFullYear();
  const [customStartYear, setCustomStartYear] = React.useState(2000);
  const [customEndYear, setCustomEndYear] = React.useState(currentYear);
  
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    if (value === 'custom') {
      setYear('custom');
      setAnchorEl(selectRef.current);
    } else {
      setYear(Number(value));
      setAnchorEl(null); // Close popover if open
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  
  const handleConfirm = () => {
    onYearRangeConfirm(customStartYear, customEndYear);
    handlePopoverClose();
  };

  const handleStartYearChange = (event: SelectChangeEvent<number>) => {
    const newStartYear = event.target.value as number;
    setCustomStartYear(newStartYear);
    if (newStartYear > customEndYear) {
      setCustomEndYear(newStartYear);
    }
  };
  
  const handleEndYearChange = (event: SelectChangeEvent<number>) => {
    const newEndYear = event.target.value as number;
    setCustomEndYear(newEndYear);
    if (newEndYear < customStartYear) {
      setCustomStartYear(newEndYear);
    }
  };
  
  const open = Boolean(anchorEl);

  const xData = revenueData.map(item => item.date.slice(0, 7));
  const yData = revenueData.map(item => (item.revenue / 1e8).toFixed(2));
  // 计算年增率
  const growthRates = revenueData.map((item, idx, arr) => {
    if (idx === 0) return null;
    const prev = arr[idx - 1];
    if (!prev) return null;
    return (((item.revenue - prev.revenue) / prev.revenue) * 100).toFixed(2);
  });

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const bar = params.find((p) => p.seriesName === "每月营收");
        const line = params.find((p) => p.seriesName === "单月营收年增率 (%)");
        return `
          ${bar?.axisValue}<br/>
          每月营收: <b>${bar?.data} 亿</b><br/>
          单月营收年增率: <b>${line?.data ?? '-'}%</b>
        `;
      },
    },
    legend: {
      data: ["每月营收", "单月营收年增率 (%)"],
    },
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: [
      {
        type: "value",
        name: "每月营收 (亿)",
        position: "left",
        axisLabel: {
          formatter: (value: number) => `${value} 亿`,
        },
      },
      {
        type: "value",
        name: "单月营收年增率 (%)",
        position: "right",
        axisLabel: {
          formatter: (value: number) => `${value}%`,
        },
      },
    ],
    series: [
      {
        name: "每月营收",
        type: "bar",
        data: yData,
        yAxisIndex: 0,
        itemStyle: { color: "#FFD600" },
      },
      {
        name: "单月营收年增率 (%)",
        type: "line",
        data: growthRates,
        yAxisIndex: 1,
        itemStyle: { color: "#D32F2F" },
        smooth: true,
      },
    ],
  };

  return (
    <Box bgcolor="#fff" borderRadius={2} boxShadow={1} p={2}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Button variant="contained" color="primary">每月营收</Button>
        <Box flex={1} />
        <DarkSelect
          ref={selectRef}
          value={String(year)}
          onChange={handleChange}
          variant="outlined"
          size="small"
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#333",
                color: "#fff",
                "& .MuiMenuItem-root": { color: "#fff" },
              },
            },
          }}
        >
          {yearOptions.map(opt => (
            <DarkMenuItem key={opt.value} value={String(opt.value)}>
              {opt.label}
            </DarkMenuItem>
          ))}
        </DarkSelect>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              bgcolor: '#424242',
              color: 'white',
              p: 2,
              borderRadius: 2,
              mt: 1,
            }
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <Typography sx={{ mr: 2, whiteSpace: 'nowrap' }}>起始年度：</Typography>
            <FormControl size="small">
              <Select
                value={customStartYear}
                onChange={handleStartYearChange}
                sx={{ bgcolor: 'white', color: 'black', minWidth: 100 }}
              >
                {years.map((y) => (
                  y <= customEndYear ? <MenuItem key={y} value={y}>{y}</MenuItem> : null
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography sx={{ mr: 2, whiteSpace: 'nowrap' }}>结束年度：</Typography>
            <FormControl size="small">
              <Select
                value={customEndYear}
                onChange={handleEndYearChange}
                sx={{ bgcolor: 'white', color: 'black', minWidth: 100 }}
              >
                {years.map((y) => (
                  y >= customStartYear ? <MenuItem key={y} value={y}>{y}</MenuItem> : null
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            onClick={handleConfirm}
            fullWidth
            sx={{
              bgcolor: 'white',
              color: '#1976d2',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#e0e0e0' }
            }}
          >
            确定
          </Button>
        </Popover>
      </Box>
      <ReactECharts showLoading={loading} option={option} style={{ height: 300, width: "100%" }} />
    </Box>
  );
};

export default RevenueChart;
