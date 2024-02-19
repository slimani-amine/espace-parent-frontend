import { useDispatch, useSelector } from "react-redux";
import DirectCard from "../features/direct/ui/DirectCard";
import NewChildCard from "../features/dashboard/ui/NewChildCard";
import { useEffect } from "react";
import { getOneChildren } from "../features/dashboard/reducers/oneChildThunk";
interface DataType {
  key: React.Key;
  date: string;
  name: string;
  duration: string;
  actions: string;
}
export default function Direct({ childId }: { childId: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneChildren(childId) as any);
  }, [dispatch, childId]);

  const oneChildren = useSelector((state: any) => state?.oneChildren);
  console.log("🚀 ~ Dashboard ~ oneChildren:", oneChildren);

  // get directs by childId

  const dummyData: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    dummyData.push({
      key: i,
      date: `28/01/2022 16:00`,
      name: ` Séance ${i}`,
      duration: "01:55:05",
      actions: `New York No. 1 Lake Park`,
    });
  }
  return (
    <>
      {oneChildren && oneChildren?.attributes?.status === "accepted" ? (
        <DirectCard data={dummyData} />
      ) : (
        <NewChildCard children={oneChildren?.attributes} />
      )}
    </>
  );
}
