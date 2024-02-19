import { useLocation } from "react-router-dom";
import SubjectsDetails from "../features/subjects/ui/SubjectsDetails";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSubject } from "../features/subjects/reducers/oneSubjectThunk";
import Loading from "../features/shared_components/Loading";
import { getSubjectsProgresses } from "../features/dashboard/reducers/subjectsThunk";

interface Chapters {
  name: string;
  numVideos: number;
  profs: string[];
  progress: number;
}

interface Subject {
  id: number;
  icon: string;
  name: string;
  progress: string;
  chapters: Chapters[];
  numVideos: number;
}

export default function DashboardSubject() {
  const location = useLocation();
  const childId = location.pathname.split("/")[2];
  const subjectId = location.pathname.split("/")[4];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSubject(subjectId) as any);
  }, [dispatch, subjectId]);

  const oneSubject = useSelector((state: any) => state?.oneSubject);
  console.log("🚀 ~ DashboardSubject ~ oneSubject:", oneSubject);

  useEffect(() => {
    dispatch(getSubjectsProgresses() as any);
  }, [dispatch, childId]);

  const SubjectsProgresses = useSelector(
    (state: any) => state?.subjectProgression
  );

  if (
    !oneSubject ||
    Object.keys(oneSubject).length === 0 ||
    !SubjectsProgresses ||
    SubjectsProgresses.length === 0
  ) {
    return <Loading />;
  }

  const calculatedProgress =
    oneSubject?.attributes.chapitres.data.reduce(
      (total: number, chapitre: any) => total + chapitre.attributes.progress,
      0
    ) / oneSubject?.attributes.chapitres.data.length;

  const subject: Subject = {
    id: oneSubject?.id,
    icon: `../../../public/assets/subjects/${oneSubject?.attributes.name}.svg`,
    name: oneSubject?.attributes?.name,
    progress: `${Math.round(calculatedProgress)}%`,
    chapters: oneSubject?.attributes.chapitres.data.map((chapitre: any) => ({
      name: chapitre.attributes.name,
      numVideos: chapitre.attributes.vidreoNumbers,
      profs: [chapitre.attributes.prof],
      progress: chapitre.attributes.progress,
    })),
    numVideos: oneSubject?.attributes.chapitres.data.reduce(
      (total: number, chapitre: any) =>
        total + chapitre.attributes.vidreoNumbers,
      0
    ),
  };

  const filteredData = SubjectsProgresses?.filter((item: any) => {
    return item?.attributes?.child?.data?.id == childId;
  });

  const otherSubjects = (filteredData || [])
    .filter((item: any) => item?.attributes?.subject?.data?.id !== subject.id)
    .map((item: any) => ({
      id: item?.attributes?.subject?.data?.id,
      icon: `../../../public/assets/subjects/${item?.attributes?.subject?.data?.attributes?.name.toLowerCase()}.svg`,
      name: item?.attributes?.subject?.data.attributes.name,
      progress: `${item?.attributes.progress}%`,
    }));

  const thisSubjects = (filteredData || []).filter(
    (item: any) => item?.attributes?.subject?.data?.id === subject.id
  );

  subject.progress = thisSubjects[0]?.attributes?.progress;
  return (
    <div className="flex flex-col justify-start w-full gap-4 m-1">
      <h1 className="text-[#2BA7DF] text-2xl font-bold w-full">Matieres</h1>
      <SubjectsDetails
        subject={subject}
        otherSubjects={otherSubjects}
        childId={childId}
      />
    </div>
  );
}
