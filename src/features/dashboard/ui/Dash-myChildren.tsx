import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Inscription from "./Dash-form";
import { useDispatch, useSelector } from "react-redux";
import { setChildIdToRedux } from "../reducers/childReducer";
import { getChildren } from "../reducers/childrensThunk";
import { Children } from "../reducers/childrensReducer";

interface MyChildrenProps {
  setChildId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function MyChildren({ setChildId }: MyChildrenProps) {
  const parentId = 1;

  const dispatch = useDispatch();
  const childrens = useSelector((state: any) => state.childrens);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const [selectedItem, setSelectedItem] = useState<number | null>(
    childrens[0]?.id
  );

  useEffect(() => {
    dispatch(getChildren(parentId) as any);

    const parts = location.pathname.split("/");
    const desiredValue = parts[2];

    setSelectedItem(desiredValue ? parseInt(desiredValue, 10) : null);
  }, [dispatch, location.pathname, parentId]);

  const handleClick = (childId: number) => {
    setSelectedItem(childId === selectedItem ? null : childId);
    navigate(`/${currentPath}/${childId}`);
    if (typeof setChildId === "function") {
      setChildId(childId);
      dispatch(setChildIdToRedux(childId));
    } else {
      console.error("setChildId is not a function");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-start items-center max-lg:flex-col overflow-auto will-change-scroll">
      <div
        className="bg-white border-solid border-[3px] border-[#2BA7DF] flex justify-center items-center rounded-lg min-w-28 min-h-28 hover:opacity-75 cursor-pointer  hover:shadow-2xl max-lg:w-[90%]"
        onClick={showModal}
      >
        <div className="bg-white border-solid border-[2px] border-[#2BA7DF] rounded-full w-8 h-8  flex justify-center items-center text-[#2BA7DF] ">
          +
        </div>
      </div>

      <Inscription
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        childrens={childrens}
      />

      <div className="flex justify-start items-center max-lg:flex-col max-lg:w-full">
        {childrens &&
          childrens.map((child: Children) => (
            <div
              key={child.id}
              onClick={() => handleClick(child.id)}
              className={`flex gap-5 bg-white items-center rounded-xl w-[15rem] h-28 m-5 px-2 py-2 cursor-pointer max-lg:w-[90%]  hover:shadow-2xl  ${
                child.id === selectedItem
                  ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                  : ""
              }`}
            >
              <div className="rounded-full max-xl:w-[100px]">
                <img
                  src="../../../public/assets/avatar.webp"
                  className="rounded-full"
                  alt="wallet"
                />
              </div>
              <div
                className={`flex flex-col items-start justify-end gap-2  ${
                  child.id === selectedItem ? " text-white" : "text-black"
                }`}
              >
                <p className="font-bold text-xl  truncate overflow-hidden whitespace-nowrap w-[150px]">
                  {child.name}
                </p>
                <p className="text-sm ">id: {child.child_id}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
