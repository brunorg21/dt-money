import { ThemeProvider } from "styled-components";
import { Transactions } from "./pages/Transactions/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { TransactionsProvider } from "./context/TransactionsContext";

export function App() {
  return (
    <TransactionsProvider>
      <ThemeProvider theme={defaultTheme}>
        <Transactions />
        <GlobalStyle />
      </ThemeProvider>
    </TransactionsProvider>
  );
}
