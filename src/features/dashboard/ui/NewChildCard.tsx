import { Button, Card, Upload, message } from "antd";
import UploadSvg from "./UploadSvg";
import type { UploadFile, UploadProps } from "antd";
import DownloawdSvg from "./DownloadSvg";

const props: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDownload(file) {
    if (file && file.thumbUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = file.thumbUrl;
      downloadLink.download = file.name || "downloaded_file";
      downloadLink.click();
    } else {
      message.error("Download link not available for this file.");
    }
  },
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};
export default function NewChildCard({ children }: any) {
  if (!children) {
    return;
  }
  console.log("🚀 ~ NewChildCard ~ children:", children);
  const customItemRender = (
    originNode: React.ReactNode,
    file: UploadFile<any>,
    fileList: UploadFile<any>[]
  ) => {
    return (
      <div className=" bg-[#DFF1F5] w-1/2 flex justify-between items-center my-2 ">
        <p className="px-4">{file?.name}</p>
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            onClick={() => props.onDownload && props.onDownload(file)}
            icon={<DownloawdSvg />}
            className="bg-[#2BA7DF]  text-white text-lg flex items-center w-[11rem] h-10 justify-center hover:bg-red-400"
          >
            Télécharger
          </Button>
          {/* <Button type="link" onClick={() => props.onRemove(file)}>
            Delete
          </Button> */}
        </div>
      </div>
    );
  };

  return (
    <Card
      title={
        <span className="text-[#2BA7DF] text-2xl ">
          Ajouter l’acte état civil de votre enfant
        </span>
      }
      className="w-[98%] shadow-lg hover:shadow-2xl"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <p className="text-[#A2A2A7] text-lg font-semibold">
            Nom: <span className="  text-black"> {children?.name} </span>
          </p>
          <p className="text-[#A2A2A7] text-lg font-semibold">
            ID: <span className="  text-black"> #{children?.child_id} </span>
          </p>
          <p className="text-[#A2A2A7] text-lg font-semibold">
            Email: <span className="  text-black"> {children?.email} </span>
          </p>
        </div>
        <hr />
        <div className="flex flex-col">
          <p className="text-[#A2A2A7] text-lg font-semibold">
            Classe:{" "}
            <span className="  text-black ">
              {" "}
              {children?.classe?.data?.attributes?.classeName}{" "}
            </span>
          </p>
          {children?.option && (
            <p className="text-[#A2A2A7] text-lg font-semibold">
              Matière à option:{" "}
              <span className="  text-black"> {children.option} </span>
            </p>
          )}
        </div>
        <hr />
        <div className="flex flex-col  ">
          <p className="text-[#A2A2A7] text-lg font-semibold">Pièces jointes</p>
          <Upload
            {...props}
            listType="picture"
            maxCount={4}
            itemRender={customItemRender}
            className="flex flex-col-reverse gap-4"
          >
            <Button
              className="bg-[#2BA7DF] text-white text-lg flex items-center w-[10rem] h-10 justify-center hover:bg-[#DFF1F5]"
              icon={<UploadSvg />}
              type="primary"
            >
              Uploader
            </Button>
          </Upload>
        </div>
        <div className="flex flex-col gap-4 ">
          <p className="text-[#A2A2A7] text-lg font-semibold">
            Status :
            <span className=" text-[#2BA7DF]">
              &nbsp; En train de vérifier les documents
            </span>
          </p>
        </div>
      </div>
      {/* <div className="flex justify-end">
        <Button className="flex bg-[#2BA7DF] text-white text-lg py-6 items-center w-[10rem] h-10 justify-center " >
          Enregistrer
        </Button>
      </div> */}
    </Card>
  );
}
