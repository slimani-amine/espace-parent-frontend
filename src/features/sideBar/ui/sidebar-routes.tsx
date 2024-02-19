import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ListRouting = ({
  childId,
  isOpen,
}: {
  childId: number | null;
  isOpen: boolean;
}) => {
  console.log("🚀 ~ childId1:", childId);

  if (childId === null) {
    childId = 1;
  }
  console.log("🚀 ~ childId2:", childId);
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<string | any>(
    location.pathname.split("/")[1]
  );

  useEffect(() => {
    setSelectedItem(location.pathname.split("/")[1]);
  }, [location.pathname]);

  const handleClick = (href: string) => {
    setSelectedItem(href.split("/")[1]);
  };

  const listItems = [
    {
      nom: "Accueil",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M2 9.88014C2 8.92659 2.45332 8.02983 3.22115 7.46442L12 1L20.7788 7.46443C21.5467 8.02983 22 8.92659 22 9.88014V20.5C22 21.8807 20.8807 23 19.5 23H16C15.4477 23 15 22.5523 15 22V16C15 15.7239 14.7761 15.5 14.5 15.5H9.5C9.22386 15.5 9 15.7239 9 16V22C9 22.5523 8.55228 23 8 23H4.5C3.11929 23 2 21.8807 2 20.5V9.88014Z"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: `/dashboard/${childId}`,
    },
    {
      nom: "En direct ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4.86667 6H14.1333C15.1643 6 16 6.76751 16 7.71429V10.2L21 7V17L16 13.8V16.2857C16 17.2325 15.1643 18 14.1333 18H4.86667C3.83574 18 3 17.2325 3 16.2857V7.71429C3 6.76751 3.83574 6 4.86667 6Z"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 6V18" stroke="" strokeWidth="2" />
        </svg>
      ),
      href: `/direct/${childId}`,
    },
    {
      nom: "Travail à faire",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M10 5H22"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 12H22"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="3" cy="12" r="2" fill="white" />
          <circle cx="3" cy="5" r="2" fill="white" />
          <circle cx="3" cy="19" r="2" fill="white" />
          <path
            d="M10 19H22"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: `/travail-a-faire/${childId}`,
    },
    {
      nom: "Examens",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 4C4 2.89543 4.89543 2 6 2H9.42105C11.0779 2 12.4211 3.34315 12.4211 5V7.5C12.4211 8.88071 13.5403 10 14.9211 10H17C18.6569 10 20 11.3431 20 13V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z"
            stroke=""
            strokeWidth="2"
          />
          <path
            d="M4 4C4 2.89543 4.89543 2 6 2H9.23393C11.5937 2 13.8332 3.04186 15.3532 4.84691L18.1193 8.13163C19.3339 9.57399 20 11.399 20 13.2847V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z"
            stroke=""
            strokeWidth="2"
          />
        </svg>
      ),
      href: `/examens/${childId}`,
    },
    {
      nom: "Porte monnaie",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="2"
            y="5"
            width="20"
            height="15"
            rx="2"
            stroke=""
            strokeWidth="2"
          />
          <path d="M1 10H23" stroke="" strokeWidth="2" />
        </svg>
      ),
      href: "/porte-monnaie",
    },
  ];
  return (
    <ul
      className={`${
        isOpen
          ? "pl-6   gap-1 transition-all duration-300 "
          : " justify-center items-center transition-all duration-300"
      } flex flex-col`}
    >
      {listItems.map((item, index) => (
        <Link
          to={item.href}
          key={index}
          onClick={() => handleClick(item.href)}
          className={` ${
            isOpen
              ? " w-[90%] h-6 p-6 "
              : " flex-col items-center gap-2 w-[80%] p-3"
          } flex  gap-2   items-center cursor-pointer rounded-lg  ${
            selectedItem === item.href.split("/")[1]
              ? "bg-white transition-all duration-300  text-[#3870A3]"
              : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={
              selectedItem === item.href.split("/")[1] ? "#3870A3" : "white"
            }
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {item.icon.props.children}
          </svg>
          <span
            className={`font-roboto font-semi-bold text-15 whitespace-nowrap ${
              selectedItem === item.href.split("/")[1]
                ? "text-[#3870A3]"
                : "text-white"
            }`}
          >
            {item.nom}
          </span>
        </Link>
      ))}
    </ul>
  );
};

export default ListRouting;
