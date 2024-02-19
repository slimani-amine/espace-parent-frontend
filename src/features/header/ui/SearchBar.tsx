import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default function SearchBar() {
  return (
    <Input
      placeholder="Chercher Cours, examens ou exercices ..."
      className="border border-gray-300 rounded-lg outline-none w-[30rem] h-[40px]"
      prefix={<SearchOutlined className=" text-blue-400 " />}
    />
  );
}
