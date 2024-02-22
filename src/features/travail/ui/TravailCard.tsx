import { Card, Empty } from "antd";
import { Link, useLocation } from "react-router-dom";
import LiveSessionCard from "./LiveSessionCard";
import Loading from "../../shared_components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getOneClasse } from "../../dashboard/reducers/classesThunk";
import { useEffect } from "react";
import { getOneChildren } from "../../dashboard/reducers/oneChildThunk";
interface HomeworkItem {
  id: number;
  attributes: {
    prof: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    start: string;
    end: string;
    title: string;
  };
}

interface TranslatedDataItem {
  id: number;
  title: string;
  subject: string;
  date: string;
  start: string;
  end: string;
  prof: string;
  attachements: any[];
}

export default function TravailCard() {
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
  const homeworks: HomeworkItem[] = classe?.attributes?.homework?.data;

  const data: TranslatedDataItem[] = homeworks.map((item) => ({
    id: item.id,
    title: item.attributes.title,
    subject: item.attributes.title.split(" ")[3],
    date: item.attributes.date.split("-").reverse().join("/"),
    start: item.attributes.start.slice(0, 5),
    end: item.attributes.end.slice(0, 5),
    prof: item.attributes.prof,
    attachements: [
      {
        name: item.attributes.title.split(" ").join("_").toLowerCase() + ".pdf",
        url: "",
      },
    ],
  }));

  return (
    <Card className="w-[98%] shadow-lg hover:shadow-2xl">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-[#2BA7DF]">Travail à faire</span>
        </div>
        <Link to={``} className="flex items-center gap-1 ">
          <span className="text-[#A2A2A7] hover:text-[#8BB4C6] ">Tous</span>
          <img
            src="../../../public/assets/BottomForward.svg"
            alt="cast"
            className="hover:fill-[#8BB4C6]"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        {data.length > 0 ? (
          <LiveSessionCard data={data} />
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
              <span>Oops, il n'y a pas de travail à faire pour le moment.</span>
            }
            className="flex flex-col gap-4 justify-center items-center"
          ></Empty>
        )}
      </div>
    </Card>
  );
}
