import { Badge, Dropdown, MenuProps } from "antd";
import React from "react";
interface MessageProps {
  nbMessage: number;
}

const Message: React.FC<MessageProps> = ({ nbMessage }) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p className=" w-28">Vous n'avez pas aucun message pour le moment !</p>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Badge count={nbMessage} overflowCount={10}>
        <img src="../../../public/assets/Envelop.svg" alt="envelop" />
      </Badge>
    </Dropdown>
  );
};

export default Message;
