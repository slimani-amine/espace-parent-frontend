import { Progress } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubjectsProgresses } from "../../dashboard/reducers/subjectsThunk";

interface Subject {
  id: number;
  icon: string;
  name: string;
  progress: string;
}

export default function Subjects({ childId }: { childId: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubjectsProgresses() as any);
  }, [dispatch, childId]);

  const SubjectsProgresses = useSelector(
    (state: any) => state?.subjectProgression
  );
  const filteredData = SubjectsProgresses.filter((item: any) => {
    return item.attributes.child.data.id == childId;
  });

  const subjects = filteredData.map((item: any) => {
    const subjectData = item.attributes.subject.data.attributes;

    return {
      id: item.attributes.subject.data.id,
      icon: `../../../public/assets/subjects/${subjectData.name}.svg`,
      name: subjectData.name,
      progress: `${item.attributes.progress}%`,
    };
  }) as Subject[];

  return (
    <div className="flex flex-wrap  gap-4">
      {subjects &&
        subjects.map((subject, index) => (
          <Link
            to={`/dashboard/${childId}/subject/${subject.id}`}
            key={index}
            className="flex gap-7 flex-col justify-center shadow-lg bg-white rounded-xl p-5 w-[24%] hover:bg-gradient-to-b hover:from-blue-200 hover:shadow-xl max-2xl:w-[49%] max-xl:w-full"
          >
            <div className="flex justify-center">
              <img
                src={subject.icon}
                alt={`Icon for ${subject.name}`}
                className="w-[20%]"
              />
            </div>
            <div key={1} className="flex flex-col">
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-[#18698D]">{subject.name}</span>
                <span className="text-[#4A3C98]">{subject.progress}</span>
              </div>
              <Progress
                percent={parseInt(subject.progress, 10)}
                showInfo={false}
                className="w-full"
              />
            </div>
          </Link>
        ))}
    </div>
  );
}
