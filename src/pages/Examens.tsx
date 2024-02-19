import { useDispatch, useSelector } from "react-redux";
import ExamsCard from "../features/exams/ui/ExamsCard";
import { useEffect } from "react";
import { getOneChildren } from "../features/dashboard/reducers/oneChildThunk";
import NewChildCard from "../features/dashboard/ui/NewChildCard";
interface ExamData {
  matiere: string;
  id: number;
  professor: string;
  endDate: string;
}
export default function Examens({ childId }: { childId: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneChildren(childId) as any);
  }, [dispatch, childId]);

  const oneChildren = useSelector((state: any) => state?.oneChildren);
  console.log("🚀 ~ Dashboard ~ oneChildren:", oneChildren);

  const dummyData: ExamData[] = [
    {
      matiere: "Mathematics",
      id: 1,
      professor: "Professeur A",
      endDate: "30/11/2021 20:30",
    },
    {
      matiere: "Physics",
      id: 2,
      professor: "Professeur B",
      endDate: "30/11/2021 21:00",
    },
    {
      matiere: "Chemistry",
      id: 3,
      professor: "Professeur C",
      endDate: "30/11/2021 22:00",
    },
    {
      matiere: "Biology",
      id: 4,
      professor: "Professeur D",
      endDate: "30/11/2021 23:00",
    },
  ];
  return (
    <>
      {oneChildren && oneChildren?.attributes?.status === "accepted" ? (
        <ExamsCard data={dummyData} childId={childId} />
      ) : (
        <NewChildCard children={oneChildren?.attributes} />
      )}
    </>
  );
}
