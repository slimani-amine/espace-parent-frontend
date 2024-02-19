import { Table, TableProps } from "antd";
interface DataType {
  key: string;
  date: string;
  name: string;
  duration: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <a>{text}</a>,
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
];

const data: DataType[] = [
  {
    key: "1",
    date: "28/01/2022 16:00",
    name: "Séance 1",
    duration: "01:55:05",
  },
  {
    key: "2",
    date: "11/01/2022 18:00",
    name: "Séance 2",
    duration: "Absent",
  },
  {
    key: "3",
    date: "08/01/2022 14:30",
    name: "Séance 3",
    duration: "01:45:37",
  },
];

export default function StatisticTable() {
  return <Table bordered={true} columns={columns} dataSource={data} pagination={false}  />;
}
