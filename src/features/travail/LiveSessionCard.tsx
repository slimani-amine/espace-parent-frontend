import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { isThisWeek, startOfWeek, format } from "date-fns";
import { fr } from "date-fns/locale";
import EventModal from "./EventModal";

export default function EmploiDuTemps({ data }: { data: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const joursDeLaSemaine = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const plagesHoraires = Array.from({ length: 17 }, (_, i) => `${i + 8}:00`);

  const renderHourlyDivs = () => {
    const hourlyDivs = [];

    for (let hour = 8; hour <= 23; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;

      const div = (
        <div key={formattedHour} className=" text-[#dfdddd]">
          {formattedHour}:00
        </div>
      );

      hourlyDivs.push(div);
    }

    return hourlyDivs;
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const today = new Date();
  const todayIndex = (today.getDay() - startDate.getDay() + 7) % 7;

  const renderEnTeteDuTableau = () => {
    return (
      <tr>
        {joursDeLaSemaine.map((jour, index) => {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + index);

          const isToday =
            currentDate.getDate() === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          const isThisWeekDay = isThisWeek(currentDate, {
            weekStartsOn: 1,
          });

          return (
            <th
              key={index}
              className={` px-[3.5rem] p-2 border-solid border-[1px] self-start ${
                isToday ? "  border-r-black border-t-black" : ""
              } ${
                todayIndex - 1 === index && isThisWeekDay
                  ? " border-r-black "
                  : ""
              }`}
            >
              <p
                className={`text-xl  ${
                  isToday ? "text-[#4B8AA6]" : "text-[#97C7E1]"
                }`}
              >
                {jour}
              </p>
              <p
                className={`text-sm  ${
                  isToday ? "text-[#8c8c8c]" : "text-[#dfdddd]"
                }`}
              >
                {format(currentDate, "d LLLL", { locale: fr })}
              </p>
            </th>
          );
        })}
      </tr>
    );
  };

  const renderLignesDuTableau = () => {
    const lignesDuTableau = [];

    for (const plageHoraire of plagesHoraires) {
      const ligne = (
        <tr key={plageHoraire}>
          {joursDeLaSemaine.map((jour, index) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + index);

            const isToday =
              currentDate.getDate() === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            const isThisWeekDay = isThisWeek(currentDate, {
              weekStartsOn: 1,
            });

            let matchingEvent;

            for (const event of data) {
              if (
                event.date === format(currentDate, "dd/MM/yyyy") &&
                event.start <= plageHoraire &&
                event.end > plageHoraire
              ) {
                matchingEvent = event;
                break;
              }
            }

            const isTerminate =
              matchingEvent &&
              new Date() <
                new Date(
                  `${format(currentDate, "MM/dd/yyyy")} ${matchingEvent?.end}`
                );

            return (
              <td
                key={index}
                className={`border-solid border-[1px] h-[25px] relative ${
                  isToday ? "border-r-black" : ""
                } ${
                  plageHoraire === "24:00" && isToday ? "border-b-black" : ""
                } ${
                  todayIndex - 1 === index && isThisWeekDay
                    ? "border-r-black"
                    : ""
                }`}
              >
                {matchingEvent && (
                  <div
                    key={matchingEvent.id}
                    onClick={showModal}
                    className={`cursor-pointer border-[1px] p-2 rounded-lg w-full bg-white absolute top-3 left-0 z-10 text-blue-900 hover:shadow-xl ${
                      isTerminate ? "border-[#59EC37]" : "border-[#2BA7DF]"
                    }`}
                  >
                    <p className=" text-lg truncate overflow-hidden whitespace-nowrap w-[100px]">
                      {matchingEvent.subject}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-gray-400 text-sm">{`${matchingEvent.start}-${matchingEvent.end}`}</p>
                      <button
                        className={` text-white px-[5px] rounded-lg ${
                          isTerminate ? "bg-[#59EC37]" : "bg-[#2BA7DF]"
                        } `}
                      >
                        {isTerminate ? "Bientôt" : "Terminer"}
                      </button>
                    </div>
                    <EventModal
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      event={matchingEvent}
                    />
                  </div>
                )}
              </td>
            );
          })}
        </tr>
      );

      lignesDuTableau.push(ligne);
    }

    return lignesDuTableau;
  };

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex items-center justify-center gap-4 text-xl">
        <div
          className="flex items-center gap-1  cursor-pointer"
          onClick={handlePreviousWeek}
        >
          <LeftOutlined style={{ color: "red" }} />
          <p className="text-red-500">Précédent</p>
        </div>
        <h1>
          {`${format(startDate, "d")} - ${format(endDate, "d LLLL yyyy", {
            locale: fr,
          })}`}
        </h1>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleNextWeek}
        >
          <p className="text-red-500">Suivant</p>
          <RightOutlined style={{ color: "red" }} />
        </div>
      </div>

      <div className="flex gap-2">
        <div className=" mt-20 flex flex-col gap-[0.55rem]">
          {renderHourlyDivs()}
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead>{renderEnTeteDuTableau()}</thead>
          <tbody>{renderLignesDuTableau()}</tbody>
        </table>
      </div>
    </div>
  );
}
