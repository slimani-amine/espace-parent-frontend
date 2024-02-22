import React, { useEffect } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { addOperation } from "../reducers/operationsThunk";
import { useDispatch } from "react-redux";
import { getMe } from "../reducers/getMeThunk";
import { generateRandomNumber } from "../../../utils & helpers/generateRandomNumber";

type AddPointsProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  solde: number;
  coupons: any;
  soldeOperation: any;
  setSoldeOperation: any;
};

const AddPoints: React.FC<AddPointsProps> = ({
  isModalOpen,
  setIsModalOpen,
  coupons,
  soldeOperation,
}: AddPointsProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe() as any);
  }, [soldeOperation, dispatch]);

  const handleOk = async (values: any) => {
    const amount = parseInt(values.amount, 10);
    if (isNaN(amount) || amount < 10 || amount > 3000) {
      message.error(`Montant invalide. Il doit être compris entre 10 et 3000.`);
      return;
    }
    const codeCoupon = values.codeCoupon;
    let isValid = false;
    let couponIndex = -1;

    const updatedCoupons = [...coupons];

    for (let index = 0; index < updatedCoupons.length; index++) {
      if (
        codeCoupon === updatedCoupons[index].code &&
        amount === updatedCoupons[index].value
      ) {
        isValid = true;
        couponIndex = index;
        break;
      }
    }

    if (isValid) {
      updatedCoupons.splice(couponIndex, 1);
    }

    if (!isValid) {
      message.error(`Code invalide or montant ne considere pas a cet code`);
      return;
    }

    const operation = {
      code: `TT${generateRandomNumber(7)}`,
      mode: "add",
      montant: amount,
      description: values.description,
      date: new Date(),
    };

    dispatch(
      addOperation({
        newOperation: { data: operation },
        parentId: 1,
        lastOperations: soldeOperation,
        newCoupons: updatedCoupons,
      }) as any
    );

    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={<span className="text-[#2BA7DF]"> Ajouter des points</span>}
      open={isModalOpen}
      onCancel={handleCancel}
      className="flex justify-center items-center"
      width={1000}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleOk}>
        <div className="w-[30rem] flex flex-col mt-10">
          <Form.Item
            name="codeCoupon"
            rules={[
              { required: true, message: "Code requis" },
              {
                pattern: /^\d{9}$/,
                message:
                  "Format de code invalide. Il doit contenir 9 chiffres.",
              },
            ]}
          >
            <Input placeholder="Entrer votre code" />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Montant requis" }]}
          >
            <Input type="number" placeholder="Montant en dinar" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#2BA7DF] text-white"
            >
              Ajouter des points
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPoints;
