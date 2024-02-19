import { useSidebar } from "../../../hooks/use-sidebar";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  Clickedicon?: string;
  Defaulticon: string;
  label: string;
  href: string;
}

export const SidebarItem = ({ label, href, Defaulticon }: SidebarItemProps) => {
  const { collapsed } = useSidebar((state: any) => state);
  const location = useLocation();

  return (
    <Link
      to={href}
      className={` 
        flex 
        w-[90%] 
        items-center 
        rounded-md 
        h-12 
        ${location.pathname === href ? "bg-white" : ""} 
      `}
    >
      <div className="flex px-4 gap-2">
        <img
          src={Defaulticon}
          alt={label}
          className={` active:fill-[#3870A3] ${
            location.pathname === href ? "fill-[#3870A3]" : ""
          }  `}
        />
        {collapsed ? (
          ""
        ) : (
          <span
            className={` active:text-[#3870A3] font-[400] active:visited:text-[#3870A3] `}
          >
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};
