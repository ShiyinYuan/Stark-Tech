import { Box } from "@mui/material";

interface Props {
  selectedCompany: {
    industry_category: string;
    stock_id: string;
    stock_name: string;
  } | null;
}

const RevenueHeader = ({ selectedCompany }: Props) => {
  return (
    <Box borderRadius={2} boxShadow={1} p={2} mb={3}>
      {
        !!selectedCompany ? <div>{`${selectedCompany?.stock_name}(${selectedCompany?.stock_id})`}</div> : 
        <div>请选择公司</div>
      }
    </Box>
  );
};

export default RevenueHeader;
