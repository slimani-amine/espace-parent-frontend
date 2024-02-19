import { Card, Empty } from "antd";
import { Link } from "react-router-dom";
export default function DirectCard({
  childId,
  lives,
}: {
  childId: string;
  lives: any;
}) {
  const convertDate = (date: string) => {
    const dateAConvertir = new Date(date);

    const formatHeure: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    const dateFormatee =
      "Aujourd'hui " +
      " - " +
      dateAConvertir.toLocaleTimeString("fr-FR", formatHeure);

    return dateFormatee;
  };

  const isToday = (date: string) => {
    const liveDate = new Date(date);
    const today = new Date();
    return (
      liveDate.getDate() === today.getDate() &&
      liveDate.getMonth() === today.getMonth() &&
      liveDate.getFullYear() === today.getFullYear()
    );
  };
  let notToday = [] as any[];
  lives.map((live: any) => {
    if (isToday(live.attributes.date)) {
      notToday.push(live);
    }
  });

  return (
    <Card className=" w-[95%] shadow-lg hover:shadow-2xl">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <img
            src="../../../public/assets/Cast.svg"
            alt="cast"
            className="w-[2rem]"
          />
          <span className="text-red-500">Séances en direct d'aujourd'hui</span>
        </div>
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
      <div className="flex flex-col gap-4 ml-3">
        {notToday.length > 0 ? (
          notToday.map((live, index) => (
            <div className="text-lg flex flex-col gap-2" key={live.id}>
              <div className="flex items-center gap-2">
                <img src="../../../public/assets/Time.svg" alt="cast" />
                <span className="text-[#2BA7DF]">
                  {convertDate(live.attributes.date)}
                </span>
              </div>
              <div className="text-[#A2A2A7]">Matière: Mathematique</div>
              <div className="text-[#A2A2A7]">
                Présenté par {live.attributes.prof}
              </div>
              {notToday.length > 1 && index < notToday.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={
                <span>
                  Oops, il n'y a pas de séances en direct pour aujourd'hui.
                </span>
              }
              className="flex flex-col gap-4 justify-center items-center"
            ></Empty>
          </div>
        )}
      </div>
    </Card>
  );
}
