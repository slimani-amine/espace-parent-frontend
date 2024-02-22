import React from "react";
import { Button, Modal, message } from "antd";
import DownloawdSvg from "../../dashboard/ui/DownloadSvg";

type EventModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: any;
};

const EventModal: React.FC<EventModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  event,
}: EventModalProps) => {
  const handleCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

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
    <Modal
      title={<span className="text-[#2BA7DF]">Travail à faire</span>}
      open={isModalOpen}
      onCancel={handleCancel}
      className="flex justify-center items-center"
      footer={null}
    >
      <div className="w-[50rem] flex flex-col gap-4">
        <div className="w-[8rem] h-[2rem] bg-[#2BA7DF] rounded-lg text-white flex items-center justify-center">
          {event.subject}
        </div>
        <h2 className="text-xl font-bold"> {event.title}</h2>

        <p className="text-lg text-[#A2A2A7]">
          Professeur:{" "}
          <span className="text-[#2BA7DF] text-xl"> {event.prof}</span>{" "}
        </p>
        <p className="text-lg text-[#A2A2A7] ">
          Heure: <span className="text-[#2BA7DF] text-xl"> {event.start}</span>{" "}
        </p>

        {event?.attachements &&
          event?.attachements.map((file: any) => (
            <div
              className="bg-[#DFF1F5] w-full flex justify-between items-center my-2"
              key={file?.name}
            >
              <p className="px-4">{file?.name}</p>
              <div className="flex items-center gap-2">
                <Button
                  type="primary"
                  onClick={() => download(file.url)}
                  icon={<DownloawdSvg />}
                  className="bg-[#2BA7DF] text-white text-lg flex items-center w-[11rem] h-10 justify-center hover:bg-red-400"
                >
                  Télécharger
                </Button>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default EventModal;
