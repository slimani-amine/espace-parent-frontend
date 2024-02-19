import { Card } from "antd";
import { useState } from "react";
import AddPoints from "./AddPoints";

export default function ServiceCard({
  solde,
  coupons,
  soldeOperation,
  setSoldeOperation,
}: {
  solde: number;
  coupons: any;
  soldeOperation: any;
  setSoldeOperation: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <Card className="w-[49%] shadow-lg hover:shadow-2xl max-xl:w-full">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-[#2BA7DF] ">Services</span>
        </div>
      </div>
      <div className="flex flex-col w-full justify-start gap-[1.6rem] ">
        <h1 className=" text-xl font-semibold text-[#3870A3]">
          Charger mon compte{" "}
        </h1>
        <div className="w-full flex gap-4 justify-center">
          <div className="flex flex-col items-center   w-[25%] gap-1">
            <div className="bg-[#FDEAEA] hover:bg-[#E8EAFC] cursor-pointer p-5 rounded-2xl">
              <img
                src="../../../public/assets/bancaire.svg"
                alt="Versement bancaire icon"
                className="w-20 h-20"
              />
            </div>

            <p className=" font-bold text-lg w-2/3 flex text-center">
              Versement bancaire
            </p>
          </div>
          <div className="flex flex-col items-center   w-[25%] gap-1">
            <div className="border-[1px] hover:bg-[#E8EAFC] cursor-pointer border-solid border-[] p-5 rounded-2xl">
              <img
                src="../../../public/assets/logod17.png"
                alt="D17 logo"
                className="w-20 h-20"
              />
            </div>

            <p className=" font-bold text-lg  px-6 flex text-center">D17</p>
          </div>
          <div className="flex flex-col items-center justify-center   w-[25%] gap-1 ">
            <div className="bg-[#FBEADF] hover:bg-[#E8EAFC] cursor-pointer p-5 rounded-2xl">
              <img
                src="../../../public/assets/online.svg"
                alt="Paiement en ligne icon"
                className="w-20 h-20"
              />
            </div>

            <p className=" font-bold text-lg w-2/3 flex text-center">
              Paiement en ligne
            </p>
          </div>
        </div>
        <div
          className="bg-[#E8EAFC] rounded-2xl h-16 flex justify-center gap-3 items-center p-3 w-full cursor-pointer"
          onClick={showModal}
        >
          <img
            src="../../../public/assets/addMoney.png"
            alt="solde"
            className="w-10"
          />
          <h2 className=" font-bold text-lg "> Ajouter des points</h2>
        </div>
        <AddPoints
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          solde={solde}
          coupons={coupons}
          soldeOperation={soldeOperation || []}
          setSoldeOperation={setSoldeOperation}
        />
      </div>
    </Card>
  );
}
