"use client";
import FinancialStatements from "./container/financial-statements";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2c7be5",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  spacing: 8,
});

const Page = () => {
  return (
    <ThemeProvider theme={theme}>
      <FinancialStatements />
    </ThemeProvider>
  );
};

export default Page;
