import { Card } from "antd";
import { Link } from "react-router-dom";
interface ExamData {
  matiere: string;
  id: number;
  professor: string;
  endDate: string;
}
interface ExamsCardProps {
  data: ExamData[];
  childId: string;
}
export default function ExamsCard({ data, childId }: ExamsCardProps) {
  return (
    <Card className="w-[98%] shadow-lg">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-[#2BA7DF]">Examens</span>
        </div>
        <Link to={``} className="flex items-center gap-2 ">
          <span className="text-[#A2A2A7] hover:text-[#8BB4C6] ">Tous</span>
          <img
            src="../../../public/assets/BottomForward.svg"
            alt="cast"
            className="hover:fill-[#8BB4C6]"
          />
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 max-lg:flex-col">
        {data &&
          data.map((exam, index) => (
            <div
              key={index}
              className="flex flex-col w-[49%]  hover:shadow-lg rounded-lg border-solid border-[2px] border-[#E6E6EE] p-5 gap-1 max-xl:w-[100%]"
            >
              <div className="w-[6rem] h-[2rem] bg-[#2BA7DF] rounded-lg text-white flex items-center justify-center">
                {exam.matiere}
              </div>
              <h2 className="text-xl font-bold">Examen n {exam.id}</h2>
              <div className="flex justify-between">
                <p className="text-xl text-[#A2A2A7]">Par {exam.professor}</p>
                <p className="text-xl text-[#C20000]">
                  Date de fin : {exam.endDate}
                </p>
              </div>
              <div className="flex justify-end">
                <Link
                  to={`/examens/${childId}/examen/${exam.id}`}
                  className="bg-[#2BA7DF] text-white rounded-lg text-lg py-5 flex items-center w-[10rem] h-6 justify-center hover:text-black"
                >
                  Voir détails
                </Link>
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
}
