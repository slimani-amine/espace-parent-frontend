import { Empty, Progress } from "antd";
export default function SubjectsProgression({ progress }: { progress: any }) {
  return (
    <>
      {progress.length ? (
        progress.slice(0, 3).map((item: any, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-5">
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center w-full gap-2">
                  <img
                    src={`../../../../public/assets/subjects/${item.attributes.subject.data.attributes.name}.svg`}
                    alt="cast"
                  />
                  <span className="text-[#18698D]">
                    {item.attributes.subject.data.attributes.name}
                  </span>
                </div>
                <span className="text-[#4A3C98]">
                  {item.attributes.progress}%
                </span>
              </div>
              <Progress
                percent={item.attributes.progress}
                showInfo={false}
                className="w-full"
                status="exception"
              />
            </div>
          );
        })
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 100 }}
          description={
            <span>Oops, il n'y a pas de progression pour cet enfant.</span>
          }
          className="flex flex-col gap-4 justify-center items-center"
        ></Empty>
      )}
    </>
  );
}
