import { useContext } from "react";
import { TransactionContext } from "../context/TransactionsContext";

export const useSummary = () => {
  const { transactions } = useContext(TransactionContext);

  const summary = transactions.reduce(
    (acc, transactions) => {
      if (transactions.type === "income") {
        acc.income += transactions.price;
        acc.total += transactions.price;
      } else {
        acc.outcome += transactions.price;
        acc.total -= transactions.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return summary
  
}