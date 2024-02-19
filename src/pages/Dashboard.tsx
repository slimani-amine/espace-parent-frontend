import { useLocation } from "react-router-dom";
import DirectCard from "../features/dashboard/ui/DirectCard";
import DirectStatisticCard from "../features/dashboard/ui/DirectStatisticCard";
import ExamsStatisticCard from "../features/dashboard/ui/ExamsStatisticCard";
import ProgressionCard from "../features/dashboard/ui/ProgressionCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneChildren } from "../features/dashboard/reducers/oneChildThunk";
import { getOneClasse } from "../features/dashboard/reducers/classesThunk";
import NewChildCard from "../features/dashboard/ui/NewChildCard";
import Loading from "../features/shared_components/Loading";

function Dashboard() {
  const location = useLocation();
  const childId = location.pathname.split("/")[2];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneChildren(childId) as any);
  }, [dispatch, childId]);

  const oneChildren = useSelector((state: any) => state?.oneChildren);

  const classesId = oneChildren?.attributes?.classe?.data?.id || 0;

  useEffect(() => {
    dispatch(getOneClasse(classesId) as any);
  }, [dispatch, classesId, oneChildren, childId]);

  const classe = useSelector((state: any) => state?.classe);

  if (classe?.length === 0 || !classe) {
    return <Loading />;
  }
  const lives = classe?.attributes?.lives?.data;
  // const exams = classes?.attributes?.exams?.data;
  const subjects = classe?.attributes?.subjects?.data;

  return (
    <>
      {oneChildren && oneChildren?.attributes?.status === "accepted" ? (
        <div className="flex flex-col justify-start w-full m-1 ">
          <div className="flex w-full max-xl:flex-col">
            <div className="flex flex-col gap-5 w-full">
              <DirectCard childId={childId} lives={lives} />
              <DirectStatisticCard childId={childId} />
            </div>
            <div className="flex flex-col gap-5 w-full">
              <ProgressionCard childId={childId} subjects={subjects} />
              <ExamsStatisticCard childId={childId} />
            </div>
          </div>
        </div>
      ) : (
        <NewChildCard children={oneChildren?.attributes} />
      )}
    </>
  );
}

export default Dashboard;
