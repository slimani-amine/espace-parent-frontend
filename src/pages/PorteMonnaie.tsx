import { useDispatch, useSelector } from "react-redux";
import HistoryCard from "../features/money/ui/HistoryCard";
import MoneyCard from "../features/money/ui/MoneyCard";
import ServiceCard from "../features/money/ui/ServiceCard";
import { useEffect, useState } from "react";
import { getMe } from "../features/money/reducers/getMeThunk";

export interface Entry {
  id: number;
  code: string;
  mode: string;
  montant: number;
  description: string | null;
  date: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function PorteMonnaie() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe() as any);
  }, [dispatch]);

  const user = useSelector((state: { me: any }) => state.me);

  const [solde, setSolde] = useState<number>(0);
  const [soldeOperation, setSoldeOperation] = useState([]);

  const coupons = user && user[0]?.coupons;

  const calculateTotal = (data: Entry[]) => {
    let solde = 0;

    data.forEach((entry) => {
      if (entry.mode === "add" && entry.status === "success") {
        solde += entry.montant;
      } else if (entry.mode === "transfert" && entry.status === "success") {
        solde -= entry.montant;
      }
    });

    return solde / 10;
  };
  useEffect(() => {
    setSolde(calculateTotal(soldeOperation || []));
    setSoldeOperation(user && user[0]?.solde_operations);
  }, [soldeOperation, user]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-8 max-xl:flex-col">
        <MoneyCard solde={solde} soldeOperation={soldeOperation || []} />
        <ServiceCard
          solde={solde}
          coupons={coupons}
          soldeOperation={soldeOperation || []}
          setSoldeOperation={setSoldeOperation}
        />
      </div>
      <HistoryCard soldeOperation={soldeOperation || []} />
    </div>
  );
}
