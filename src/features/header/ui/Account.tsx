import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
interface AccountProps {
  name: string;
  section: string;
  image: string;
}
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/profile">Profile</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "2",
    danger: true,
    label: "Deconnection",
    icon: <LogoutOutlined />,
  },
];
const Account: React.FC<AccountProps> = (props) => {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space className="flex gap-6">
          <div className="flex gap-2 items-center">
            <div className="w-14 h-14 object-cover rounded-full overflow-hidden ">
              <img
                className="object-cover w-full h-full "
                src={props.image || "../../../../public/assets/profile.jpg"}
                alt="Avatar"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[#3AA0FF] font-roboto font-bold text-lg">
                {props.name}
              </p>
              <p className="text-gray-500 opacity-70 text-[12px]">
                {props.section}
              </p>
            </div>
          </div>
          <DownOutlined className="text-[#3AA0FF]" />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Account;
