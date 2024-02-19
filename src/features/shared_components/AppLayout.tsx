import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectChildId } from "../dashboard/reducers/childReducer";
import MyChildren from "../dashboard/ui/Dash-myChildren";
export default function AppLayout({ childId, setChildId }: any) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { pathname } = useLocation();
  childId = useSelector(selectChildId);

  return (
    <div
      className={`grid grid-rows-[75px,1fr]  transition-all duration-300 grid-cols-[350px,1fr]  ${
        collapsed && "grid-cols-[140px,1fr]"
      }`}
    >
      <div className=" col-span-2">
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          childId={childId}
        />
      </div>
      <div className=" row-span-2">
        <SideBar childId={childId} isOpen={!collapsed} />
      </div>
      <main
        className={
          !collapsed
            ? "max:md:pl-[260px] transition-all duration-500 p-6 bg-[#f1f1f1] w-full overflow-auto h-screen pb-28"
            : "p-6 transition-all duration-500 bg-[#f1f1f1] w-full  overflow-auto h-screen pb-28"
        }
      >
        {pathname !== "/porte-monnaie" && pathname !== "/profile" && (
          <>
            <h1 className="text-[#2BA7DF] text-2xl font-bold w-full mb-1">
              Mes Enfants
            </h1>
            <MyChildren setChildId={setChildId} />
          </>
        )}
        <Outlet />
      </main>
    </div>
  );
}
