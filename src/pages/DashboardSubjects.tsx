import { useLocation } from "react-router-dom";
import Subjects from "../features/subjects/ui/Subjects";

function DashboardSubjects() {
  const location = useLocation();
  const childId = location.pathname.split("/")[2];
  return (
    <div className="flex flex-col justify-start w-full gap-4">
      <h1 className="text-[#2BA7DF] text-2xl font-bold w-full">Matieres</h1>
      <div>
        <Subjects childId={childId} />
      </div>
    </div>
  );
}

export default DashboardSubjects;
