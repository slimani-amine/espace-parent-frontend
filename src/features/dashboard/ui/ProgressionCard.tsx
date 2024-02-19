import { Card, Empty } from "antd";
import { Link } from "react-router-dom";
import SubjectsProgression from "./SubjectsProgression";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSubjectsProgresses } from "../reducers/subjectsThunk";
export default function ProgressionCard({
  childId,
  subjects,
}: {
  childId: string;
  subjects: any;
}) {
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
  return (
    <Card className="w-[95%] shadow-lg  hover:shadow-2xl">
      <div className="flex justify-between items-center mb-5 ">
        <span className="text-[#2BA7DF] text-lg font-semibold">
          Progression
        </span>
      </div>
      {filteredData.length ? (
        <div className="flex flex-col gap-2">
          <SubjectsProgression progress={filteredData} />

          <hr />
          <Link
            to={`/dashboard/${childId}/subject`}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[#A2A2A7]">Voir plus</span>
            <img src="../../../public/assets/BottomForward.svg" alt="cast" />
          </Link>
        </div>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 200 }}
          description={
            <span>Oops, il n'y a pas de progression pour cet enfant.</span>
          }
          className="flex flex-col gap-4 justify-center items-center"
        ></Empty>
      )}
    </Card>
  );
}
