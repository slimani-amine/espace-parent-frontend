import { Link } from "react-router-dom";

export default function Solde({ NbPoints }: { NbPoints: number }) {
  return (
    <Link to={"/porte-monnaie"} className="flex  gap-2 ">
      <img src="../../../public/assets/Wallet.svg" alt="wallet" />
      <div className=" flex flex-col items-start justify-end gap-1 ">
        <p className="font-bold text-sm text-gray-400">Votre solde</p>
        <p className=" font-bold text-xl text-[#3087B3]">{NbPoints} Pts</p>
      </div>
    </Link>
  );
}
