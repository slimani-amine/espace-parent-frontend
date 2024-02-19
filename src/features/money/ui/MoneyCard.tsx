import { Card } from "antd";
import Bank from "./Bank";
import { useState } from "react";
import TransferPoints from "./TransferPoints";
export default function MoneyCard({
  solde,
  soldeOperation,
}: {
  solde: number;
  soldeOperation: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <Card className="w-[49%] shadow-lg hover:shadow-2xl max-xl:w-full">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-[#2BA7DF] ">Porte monnaie</span>
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex flex-col gap-4 w-[70%]">
          <Bank
            name={"Banque zitouna"}
            account="TakiAcademy"
            rib="12 132 0000000132251 86"
          />
          <Bank
            name={"Banque zitouna"}
            account="TakiAcademy"
            rib="12 132 0000000132251 86"
          />
          <Bank name={"Banque zitouna"} account="TakiAcademy" />
        </div>
        <div className="flex flex-col gap-8 items-center justify-around ">
          <div className="flex flex-col gap-4 items-center">
            <h1 className=" pb-3 border-b-2 border-solid text-xl font-semibold text-[#3870A3]">
              Mon Solde :{" "}
            </h1>
            <h1 className="text-red-500 text-2xl font-bold ">{solde} Pts</h1>
          </div>
          <div
            className="bg-[#E8EAFC] rounded-2xl flex justify-center gap-4 items-center p-3 w-[80%] h-16 cursor-pointer "
            onClick={showModal}
          >
            <img
              src="../../../public/assets/addMoney.png"
              alt="solde"
              className="w-10"
            />
            <h2 className=" font-bold  text-lg "> Transferer des points</h2>
          </div>
          <TransferPoints
            solde={solde}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            soldeOperation={soldeOperation}
          />
        </div>
      </div>
    </Card>
  );
}
