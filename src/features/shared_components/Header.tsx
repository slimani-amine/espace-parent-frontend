import React, { useEffect, useState } from "react";
import Message from "../header/ui/Message";
import Account from "../header/ui/Account";
import Solde from "../header/ui/Solde";
import Logo from "../header/ui/Logo";
import SearchBar from "../header/ui/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { User, getMe } from "../money/reducers/getMeThunk";
import { Entry } from "../../pages/PorteMonnaie";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  childId: string;
}
const Header: React.FC<HeaderProps> = ({
  collapsed,
  setCollapsed,
  childId,
}: HeaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe() as any);
  }, [dispatch]);

  const user = useSelector((state: any) => state.me);

  const [solde, setSolde] = useState<number>(0);
  const soldeOperation = user && user[0]?.solde_operations;

  const calculateTotal = (data: Entry[]) => {
    let solde = 0;

    data.forEach((entry) => {
      if (entry.mode === "add" && entry.status === "success") {
        solde += entry.montant;
      } else if (entry.mode === "transfert" && entry.status === "success") {
        solde -= entry.montant;
      }
    });

    return solde / 10;
  };
  useEffect(() => {
    setSolde(calculateTotal(soldeOperation || []));
  }, [soldeOperation]);

  const userName = user && user[0]?.username;
  const email = user && user[0]?.email;
  const picture = user && user[0]?.picture?.formats.thumbnail.url;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full shadow-md ">
      <div className="mx-auto flex flex-wrap items-center justify-between p-3 w-full border-b">
        <div className="flex space-x-8 items-center max-xl:space-x-4">
          <img
            src="../../public/assets/menu.png"
            className="w-[40px] h-[40px] cursor-pointer"
            alt="menu"
            onClick={() => setCollapsed(!collapsed)}
          />
          <Logo childId={childId} />
        </div>
        <div className=" max-xl:hidden">
          <SearchBar />
        </div>
        <div className="flex items-center space-x-6 gap-10 max-xl:space-x-2 max-xl:gap-5">
          <Solde NbPoints={solde} />
          <Message nbMessage={0} />
          <Account
            name={userName}
            section={email}
            image={`http://localhost:1337${picture}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
