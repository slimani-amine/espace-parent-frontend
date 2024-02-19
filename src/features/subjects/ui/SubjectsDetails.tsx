import { Progress } from "antd";
import { Link } from "react-router-dom";

interface Subjects {
  id: number;
  icon: string;
  name: string;
  progress: string;
}

interface Chapters {
  name: string;
  numVideos: number;
  profs: string[];
  progress: number;
}

interface Subject {
  icon: string;
  name: string;
  progress: string;
  chapters: Chapters[];
  numVideos: number;
}

export default function SubjectsDetails({
  childId,
  subject,
  otherSubjects,
}: {
  childId: string;
  subject: Subject;
  otherSubjects: Subjects[];
}) {
  return (
    <div className="w-full h-full flex gap-5 max-xl:flex-col">
      <div className=" flex flex-col bg-white rounded-md w-[25%] max-xl:w-full h-full shadow-lg p-4 gap-4">
        <div className="flex items-center justify-start gap-4">
          <img
            src={subject.icon}
            alt={`Icon for ${subject.name}`}
            className="w-[20%]"
          />
          <h1 className="text-[##8BB4C6] text-2xl ">{subject.name}</h1>
        </div>
        <div key={2} className="flex flex-col gap-5">
          <div className="flex items-center w-full justify-between">
            <h1 className="text-[##4A3C98] text-2xl ">Progression</h1>
            <span className="text-[#4A3C98]">{subject.progress}%</span>
          </div>
          <Progress
            percent={parseInt(subject.progress, 10)}
            showInfo={false}
            className="w-full"
          />
        </div>
        <div className="text-sm">
          <p className="text-[#A2A2A7]">
            Nombre de chapitres :{" "}
            <span className="text-[#4A3C98]">
              {subject.chapters.length} chappitres
            </span>
          </p>
          <p className="text-[#A2A2A7]">
            Nombre de videos :{" "}
            <span className=" text-[#4A3C98]">{subject.numVideos} videos</span>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-[#2BA7DF] text-lg ">Autres matiéres</h2>
          <div className="flex flex-col gap-4">
            {otherSubjects &&
              otherSubjects.slice(0, 4).map((otherSubject) => {
                return (
                  <Link
                    to={`/dashboard/${childId}/subject/${otherSubject.id}`}
                    className="flex flex-col justify-start gap-2 px-5 hover:opacity-80 "
                  >
                    <div className="flex justify-between items-center ">
                      <div className="flex gap-4 items-center">
                        <img
                          src={otherSubject.icon}
                          alt={`Icon for ${otherSubject.name}`}
                          className="w-[50%]"
                        />
                        <h1 className="text-[##8BB4C6] ">
                          {otherSubject.name}
                        </h1>
                      </div>
                      <span className="text-[#4A3C98]">
                        {otherSubject.progress}
                      </span>
                    </div>
                    <Progress
                      percent={parseInt(otherSubject.progress, 10)}
                      showInfo={false}
                      className=" w-[80%]"
                    />
                    <hr />
                  </Link>
                );
              })}
            <Link
              to={`/dashboard/${childId}/subject`}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[#A2A2A7]">Voir plus</span>
              <img src="../../../public/assets/BottomForward.svg" alt="cast" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md w-[72%] max-xl:w-full shadow-lg flex flex-col gap-8 p-6 h-[48.8rem] ">
        <ul className="flex cursor-pointer gap-4 ">
          <li className=" text-[#23698D] pb-1 border-b-2 border-[#23698D]  text-xl ">
            Cours
          </li>
          <p className="text-[#A5CBDE] hover:text-[#23698D] pb-1 hover:border-b-2 hover:border-[#23698D] text-xl cursor-not-allowed">
            Examens
          </p>
          <p className="text-[#A5CBDE] hover:text-[#23698D] pb-1 hover:border-b-2 hover:border-[#23698D] text-xl cursor-not-allowed">
            Enregistrement
          </p>
        </ul>
        <div className="overflow-auto flex flex-col gap-10">
          {subject.chapters.map((chapter, index) => {
            return (
              <div className=" w-full border-solid rounded-xl border-[3px] border-[#A5CBDE] flex gap-10 p-5">
                <h1 className="text-[3rem] text-red-500">0{index + 1}</h1>
                <div className="w-full flex flex-col gap-5">
                  <div className=" flex flex-col gap-1">
                    <h2 className="text-2xl text-[#23698D]">{chapter.name}</h2>
                    <div className="flex justify-between text-gray-400 text-xs">
                      <p>
                        Par{" "}
                        {chapter.profs.map((prof) => {
                          return <span key={prof}>Mr(s) {prof} </span>;
                        })}
                      </p>
                      <p>{chapter.numVideos} videos</p>
                    </div>
                  </div>
                  <Progress percent={chapter.progress} className=" w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
