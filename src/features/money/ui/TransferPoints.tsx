import React from "react";
import { Button, Form, Input, Modal, message } from "antd";

type TranferPointsProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  solde: number;
  soldeOperation: any;
};

const TranferPoints: React.FC<TranferPointsProps> = ({
  isModalOpen,
  setIsModalOpen,
  solde,
  soldeOperation,
}: TranferPointsProps) => {
  const [form] = Form.useForm();

  const handleOk = async (values: any) => {
    console.log("Form values:", values);

    const amount = parseInt(values.amount, 10);
    if (amount > solde * 10) {
      message.error(`solde insufisant`);
      return;
    }
    if (isNaN(amount) || amount < 10 || amount > 3000) {
      message.error(`Montant invalide. Il doit être compris entre 10 et 3000.`);
      return;
    }
    const operation = {
      code: ``,
      mode: "transfer",
      montant: amount,
      description: values.description,
      date: new Date(),
    };
    console.log("🚀 ~ handleOk ~ operation:", operation);

    // setIsModalOpen(false);
    // form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={<span className="text-[#2BA7DF]"> Transférer des points</span>}
      open={isModalOpen}
      onCancel={handleCancel}
      className="flex justify-center items-center"
      width={1000}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleOk}>
        <div className="w-[30rem] flex flex-col mt-10">
          <Form.Item
            name="code"
            rules={[
              { required: true, message: "Identifiant requis" },
              {
                pattern: /^\d{9}$/,
                message:
                  "Format d'identifiant invalide. Il doit contenir 9 chiffres.",
              },
            ]}
          >
            <Input placeholder="Identifiant du bénificiaire" />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Montant requis" }]}
          >
            <Input type="number" placeholder="Montant en dinar" />
          </Form.Item>
          <Form.Item name="description">
            <Input type="text" placeholder="Description" />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#2BA7DF] text-white"
            >
              Transférer des points
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default TranferPoints;
