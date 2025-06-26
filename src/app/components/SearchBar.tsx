import React, { useState, useEffect } from "react";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useDebounceFn } from "ahooks";
import { get } from "@/api/request-methods";

interface Props {
  handleSetDataId: (arg: string) => void;
  handleSetSelectedCompany: (arg: OverViewItem | null) => void;
};

interface OverViewItem {
  industry_category: string;
  stock_id: string;
  stock_name: string;
}

const SearchBar = ({ handleSetDataId, handleSetSelectedCompany }: Props) => {
  const debounce = useDebounceFn(handleSetDataId, { wait: 400 });
  const [overViewList, setOverViewList] = useState<OverViewItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await get(`/api/v4/data?dataset=TaiwanStockInfo`);
      if (res.status === 200) {
        setOverViewList(res.data as OverViewItem[]);
      }
    };
    fetchData();
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Autocomplete
        options={overViewList}
        getOptionLabel={(option) => `${option.stock_id}${option.stock_name}`}
        renderOption={(props, option, { index }) => (
          <li
            {...props}
            key={`${option.stock_id}${option.stock_name}-${index}`}
          >
            {option.stock_name}
          </li>
        )}
        sx={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="输入台/美股代号，查看公司价值"
            size="small"
          />
        )}
        isOptionEqualToValue={(option, value) =>
          option.stock_id === value.stock_id
        }
        onChange={(e, option: OverViewItem | null) => {
          if (option) {
            handleSetSelectedCompany(option);
            debounce.run(option?.stock_id);
          }
        }}
      />
    </Box>
  );
};

export default SearchBar;
