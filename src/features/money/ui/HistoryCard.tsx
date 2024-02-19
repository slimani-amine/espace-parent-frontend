import { Card } from "antd";
import { Table, TableProps } from "antd";
interface DataType {
  id: string;
  code: string;
  paimenyType: string;
  montant: string;
  description: string;
  date: string;
  status: string;
}
function formatDate(utcDateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(utcDateString);
  return date.toLocaleString("en-US", options);
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Mode de paiement",
    dataIndex: "mode",
    key: "mode",
  },
  {
    title: "Montant en dinars",
    dataIndex: "montant",
    key: "montant",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => formatDate(date),
  },
  {
    title: "Statut",
    dataIndex: "status",
    key: "status",
  },
];

export default function HistoryCard({
  soldeOperation,
}: {
  soldeOperation: DataType[];
}) {
  return (
    <Card className=" shadow-lg hover:shadow-2xl w-full">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span className="text-[#2BA7DF] ">Historique des points</span>
        </div>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={soldeOperation}
        pagination={false}
      />
    </Card>
  );
}
