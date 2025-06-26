import { useState, useEffect } from "react";
import SearchBar from "@/app/components/SearchBar";
import RevenueChart from "@/app/components/RevenueChart";
import RevenueTable from "@/app/components/RevenueTable";
import RevenueHeader from "../components/RevenueHeader";
import styled from "styled-components";
import { get } from "@/api/request-methods";
import dayjs from "dayjs";

const FinStatementsWrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  min-height: 100vh;
`;

interface RevenueItem {
  date: string;
  revenue: number;
}

interface OverViewItem {
  industry_category: string;
  stock_id: string;
  stock_name: string;
}

const FinancialStatements = () => {
  const [dataId, setDataId] = useState<string>("2330");
  const [revenueData, setRevenueData] = useState<RevenueItem[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<OverViewItem | null>({
    stock_id: "2330",
    stock_name: "台積電",
    industry_category: "半導體業",
  });
  const [year, setYear] = useState<number | "custom">(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState({
    start: dayjs().subtract(5, "year").format("YYYY-MM-DD"),
    end: dayjs().format("YYYY-MM-DD"),
  });

  const handleYearRangeConfirm = (start: number, end: number) => {
    setDateRange({
      start: `${start}-01-01`,
      end: `${end}-12-31`,
    });
    setYear('custom');
  };

  useEffect(() => {
    if (typeof year === "number") {
      setDateRange({
        start: dayjs().subtract(year, "year").format("YYYY-MM-DD"),
        end: dayjs().format("YYYY-MM-DD"),
      });
    }
  }, [year]);

  useEffect(() => {
    const fetchData = async () => {
      if (!dateRange.start || !dateRange.end) return;
      setLoading(true);
      const res = await get(
        `/api/v4/data?dataset=TaiwanStockMonthRevenue&start_date=${dateRange.start}&end_date=${dateRange.end}&data_id=${dataId}`
      );
      setLoading(false);
      if (res.status === 200 && Array.isArray(res.data)) {
        setRevenueData(res.data as RevenueItem[]);
      }
    };
    fetchData();
  }, [dataId, dateRange]);

  return (
    <FinStatementsWrapper>
      <SearchBar
        handleSetSelectedCompany={setSelectedCompany}
        handleSetDataId={setDataId}
      />
      <RevenueHeader selectedCompany={selectedCompany} />
      <RevenueChart
        loading={loading}
        revenueData={revenueData}
        year={year}
        setYear={setYear}
        onYearRangeConfirm={handleYearRangeConfirm}
      />
      <RevenueTable loading={loading} revenueData={revenueData} />
    </FinStatementsWrapper>
  );
};
export default FinancialStatements;
