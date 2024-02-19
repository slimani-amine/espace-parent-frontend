import { Card } from "antd";
import { Link } from "react-router-dom";
import StatisticTable from "./StatisticTable";
export default function DirectStatisticCard({ childId }: { childId: string }) {
  return (
    <Card className=" w-[95%] shadow-lg hover:shadow-2xl">
      <div className="flex justify-between items-center mb-5 ">
        <span className="text-[#2BA7DF] text-lg font-semibold  border-solid border-b-[2px] border-[#2BA7DF]">
          Séances en direct statistiques
        </span>
        <Link to={`/direct/${childId}`} className="flex items-center gap-2 ">
          <span className="text-[#A2A2A7] hover:text-[#8BB4C6] ">
            Voir plus
          </span>
          <img
            src="../../../public/assets/Forward.svg"
            alt="cast"
            className="hover:fill-[#8BB4C6]"
          />
        </Link>
      </div>
      <StatisticTable />
    </Card>
  );
}
