import { Card, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import React from "react";
interface DataType {
  key: React.Key;
  date: string;
  name: string;
  duration: string;
  actions: string;
}
interface DirectCardProps {
  data: DataType[];
}
export default function DirectCard({ data }: DirectCardProps) {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Durée",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  return (
    <Card className="w-[98%] shadow-lg">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-[#2BA7DF]">Séances en direct</span>
        </div>
        <Link to={``} className="flex items-center gap-2 ">
          <span className="text-[#A2A2A7] hover:text-[#8BB4C6] ">Tous</span>
          <img
            src="../../../public/assets/Forward.svg"
            alt="cast"
            className="hover:fill-[#8BB4C6]"
          />
        </Link>
      </div>
      <Table
        bordered={true}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={data}
        // scroll={{ y: 300 }}
      />
    </Card>
  );
}
