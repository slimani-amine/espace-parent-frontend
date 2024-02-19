import { Table, TableProps } from "antd";
interface DataType {
  key: string;
  date: string;
  name: string;
  subject: string;
  note: number;
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
    title: "Matiére",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
  },
];

const data: DataType[] = [
  {
    key: "1",
    date: "28/01/2022",
    name: "Séance 1",
    subject: "Mathematique",
    note: 2.5,
  },
  {
    key: "2",
    date: "11/01/2022 18:00",
    name: "Séance 2",
    subject: "Physique",
    note: 10,
  },
  {
    key: "3",
    date: "08/01/2022 14:30",
    name: "Séance 3",
    subject: "Francais",
    note: 12,
  },
];

export default function ExamStatisticTable() {
  return (
    <Table
    bordered={true}
      columns={columns}
      dataSource={data}
      pagination={false}
      className="text-black"
    />
  );
}
