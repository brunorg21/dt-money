import { useContext } from "react";
import { Header } from "../../components/Header/Header";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { Summary } from "../../components/Summary/Summary";
import {
  PriceHightLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { TransactionContext } from "../../context/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const { transactions } = useContext(TransactionContext);

  console.log(transactions);
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transactions) => {
              return (
                <tr key={transactions.id}>
                  <td width="40%">{transactions.description}</td>
                  <td>
                    <PriceHightLight variant={transactions.type}>
                      {transactions.type === "outcome" && "- "}
                      {priceFormatter.format(transactions.price)}
                    </PriceHightLight>
                  </td>
                  <td>{transactions.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transactions.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
