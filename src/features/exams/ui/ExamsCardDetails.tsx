import { Button, Card, message } from "antd";
import DownloawdSvg from "../../dashboard/ui/DownloadSvg";
import { Link } from "react-router-dom";
interface ExamData {
  matiere: string;
  id: string;
  professor: string;
  endDate: string;
  examFileName: string;
  file: string;
  correctionFileName: string;
}
interface ExamsCardDetailsProps {
  data: ExamData;
}
export default function ExamsCardDetails({ data }: ExamsCardDetailsProps) {
  const download = (file: any) => {
    if (file && file.thumbUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = file.thumbUrl;
      downloadLink.download = file.name || "downloaded_file";
      downloadLink.click();
    } else {
      message.error("Download link not available for this file.");
    }
  };
  return (
    <Card className="w-[98%] shadow-lg">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-[#2BA7DF]">Examens</span>
        </div>
        <Link to={``} className="flex items-center gap-2 ">
          <span className="text-[#A2A2A7] hover:text-[#8BB4C6] ">Tous</span>
          <img
            src="../../../public/assets/BottomForward.svg"
            alt="cast"
            className="hover:fill-[#8BB4C6]"
          />
        </Link>
      </div>
      <div className="flex flex-col w-[100%] hover:shadow-lg rounded-lg border-solid border-[2px] border-[#E6E6EE] p-5 gap-2">
        <div className="w-[6rem] h-[2rem] bg-[#2BA7DF] rounded-lg text-white flex items-center justify-center">
          {data.matiere}
        </div>
        <h2 className="text-xl font-bold">Examen n {data.id}</h2>

        <p className="text-xl text-[#A2A2A7]">Par {data.professor}</p>
        <p className="text-xl text-[#C20000]">Date de fin : {data.endDate}</p>
        <h2 className="text-xl font-bold">Examen</h2>

        <div className=" bg-[#DFF1F5] w-full flex justify-between items-center my-2 ">
          <p className="px-4">{data?.examFileName}</p>
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              onClick={() => download(data?.file)}
              icon={<DownloawdSvg />}
              className="bg-[#2BA7DF]  text-white text-lg flex items-center w-[11rem] h-10 justify-center hover:bg-red-400"
            >
              Télécharger
            </Button>
          </div>
        </div>
        <h2 className="text-xl font-bold">Correction générale</h2>

        <div className=" bg-[#DFF1F5] w-full flex justify-between items-center my-2 ">
          <p className="px-4">{data?.correctionFileName}</p>
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              onClick={() => download(data?.file)}
              icon={<DownloawdSvg />}
              className="bg-[#2BA7DF]  text-white text-lg flex items-center w-[11rem] h-10 justify-center hover:bg-red-400"
            >
              Télécharger
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
