import React, { useState } from "react";
import { Button, Form, Input, Modal, Tag } from "antd";
import { useDispatch } from "react-redux";
import { insertChildren } from "../reducers/childrensThunk";
import { generateRandomNumber } from "../../../utils & helpers/generateRandomNumber";

type RequiredMark = boolean | "optional" | "customize";

const customizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => (
  <>
    {required ? (
      <Tag color="error">Required</Tag>
    ) : (
      <Tag color="warning">optional</Tag>
    )}
    {label}
  </>
);

type InscriptionProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  childrens: any;
};

const Inscription: React.FC<InscriptionProps> = ({
  isModalOpen,
  setIsModalOpen,
  childrens,
}: InscriptionProps) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");
  const [isYesSelected, setIsYesSelected] = useState(true);

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      await form.validateFields();
      const formValues = form.getFieldsValue();
      const newChild = {
        data: {
          child_id: generateRandomNumber(9),
          name: formValues?.firstName + " " + formValues?.lastName,
          phone: formValues.phone,
          email: formValues.email,
          password: formValues.password,
        },
      };
      const parentId = 1;
      dispatch(insertChildren({ newChild, parentId, childrens }) as any);
      setConfirmLoading(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setConfirmLoading(false);
        form.resetFields();
      }, 2000);
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title={<span className="text-[#2BA7DF]">Ajouter un enfant</span>}
      open={isModalOpen}
      onCancel={handleCancel}
      className="flex justify-center items-center"
      width={1000}
      footer={null}
    >
      <div className="flex flex-col justify-center items-center mt-10 mx-20 ">
        <p className="font-semibold text-lg my-2">
          Votre fils est-il inscrit sur le site ?
        </p>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ requiredMarkValue: requiredMark }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={
            requiredMark === "customize" ? customizeRequiredMark : requiredMark
          }
          onFinish={handleOk}
          className="w-full"
        >
          <Form.Item className="flex justify-center" name="requiredMarkValue">
            <div className="flex">
              <div
                className={`w-20 h-10 p-1 rounded-r-none rounded-lg flex items-center justify-center cursor-pointer ${
                  isYesSelected
                    ? "bg-[#2BA7DF] text-white "
                    : "text-[#2BA7DF] bg-white border-solid border-[1px] border-[#2BA7DF] "
                }`}
                onClick={() => setIsYesSelected(!isYesSelected)}
              >
                <span className="">Oui</span>
              </div>
              <div
                className={`w-20 h-10 p-1 rounded-l-none rounded-lg flex items-center justify-center cursor-pointer ${
                  !isYesSelected
                    ? "bg-[#2BA7DF] text-white "
                    : "text-[#2BA7DF] bg-white border-solid border-[1px] border-[#2BA7DF] "
                }`}
                onClick={() => setIsYesSelected(!isYesSelected)}
              >
                <span className="">Non</span>
              </div>
            </div>
          </Form.Item>

          {isYesSelected ? (
            <Form.Item
              name="id"
              rules={[{ required: true, message: "L'identifiant est requis" }]}
            >
              <Input placeholder="L’identifiant" />
            </Form.Item>
          ) : (
            <Form.Item name="inscription">
              <div className="flex flex-col ">
                <div className="flex flex-row gap-2">
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: "Le nom est requis" }]}
                  >
                    <Input placeholder="Nom" />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    rules={[
                      { required: true, message: "Le prénom est requis" },
                    ]}
                  >
                    <Input placeholder="Prénom" />
                  </Form.Item>
                </div>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "L'email est requis" },
                    { type: "email", message: "Format email invalide" },
                  ]}
                >
                  <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Le téléphone est requis" },
                    {
                      pattern: /^[0-9]*$/,
                      message:
                        "Le téléphone doit contenir uniquement des chiffres",
                    },
                  ]}
                >
                  <Input type="phone" placeholder="Téléphone" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Le mot de passe est requis" },
                  ]}
                >
                  <Input type="password" placeholder="Mot de passe" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["motDePasse"]}
                  rules={[
                    {
                      required: true,
                      message: "La confirmation du mot de passe est requise",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Les deux mots de passe ne correspondent pas"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    type="password"
                    placeholder="Confirmation mot de passe"
                  />
                </Form.Item>
              </div>
            </Form.Item>
          )}
          <Form.Item>
            <div className="flex justify-center gap-2">
              <Button
                key="back"
                onClick={handleCancel}
                className="border-solid border-[1px] border-[#2BA7DF] text-[#2BA7DF] "
              >
                Fermer
              </Button>
              <Button
                key="submit"
                type="default"
                className="bg-[#2BA7DF] text-white"
                loading={confirmLoading}
                onClick={handleOk}
              >
                Ajouter
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default Inscription;
