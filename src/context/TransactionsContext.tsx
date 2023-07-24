import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../api/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransactions: (data: CreateTransactionsInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface CreateTransactionsInput {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(response.data);
  }

  async function createTransactions(data: CreateTransactionsInput) {
    const { category, description, price, type } = data;

    const response = await api.post("transactions", {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
