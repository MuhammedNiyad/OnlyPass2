/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { ApiClientPrivate } from '../../../../utils/axios';

// interface paymentInfo ={
//     paymentType: string;

// }

export const PaymentInfo = ({ mainData }: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<any>([]);

  //   const paymentInfo = mainData?.data?.paymentInfo;
  console.log('MainData', paymentInfo);

  useEffect(() => {
    if (mainData?.data?.paymentInfo.length > 0) {
      setPaymentInfo(mainData?.data?.paymentInfo[0]);
    }
  }, [mainData]);

  const handleOnFinish = async (value: any) => {
    console.log({ value });
    try {
      const id = mainData?.data?._id;
      await ApiClientPrivate.put(`facilities/update/${id}`, {
        paymentInfo: [{ paymentType: value.paymentType, value: value.value, code: value.code }]
      });
      setIsOpenModal(false);
    } catch (error) {
      alert('something went wrong');
    }
  };

  const [form] = Form.useForm();
  //   form.setFieldsValue({
  //     paymentType:paymentInfo[0]?.paymentType,
  //     value:paymentInfo[0]?.value,
  //     code:paymentInfo[0]?.code
  //   })

  return (
    <div>
      <div className="">
        <div className=" flex justify-between items-center font-semibold ">
          <div>
            <h1>Payment information</h1>
          </div>
          <div
            onClick={() => setIsOpenModal(true)}
            className="flex items-center gap-1 cursor-pointer bg-[#F2F2F2] w-[84px] h-[24px] px-2 justify-center">
            <FaEdit />
            <p>Edit</p>
          </div>
        </div>
        {paymentInfo && (
          <div className="mt-3 gap-5 items-center m-3 p-1">
            <div className="flex gap-5 py-2">
              <div className="label w-[150px]">
                <h1>Payment Type </h1>
              </div>
              <div className="input bg-white flex gap-3 items-center font-medium">
                <p>{paymentInfo.paymentType ? paymentInfo?.paymentType : 'Not added '}</p>
              </div>
            </div>
            <div className="flex gap-10 py-2">
              <div className="label w-[150px]">
                <h1 className="text-nowrap">Account No./UPI ID </h1>
              </div>
              <div className="input bg-white flex gap-3 items-center font-medium">
                <p>{paymentInfo?.value ? paymentInfo?.value : 'Not added'}</p>
              </div>
            </div>
            <div className="flex gap-5 py-2">
              <div className="label w-[150px]">
                <h1>IFC code</h1>
              </div>
              <div className="input bg-white flex gap-3 items-center font-medium">
                <p>{paymentInfo?.code ? paymentInfo?.code : 'Not added'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal title="" open={isOpenModal} onCancel={() => setIsOpenModal(false)} footer={false}>
        <div className="m-3">
          <div className=" flex justify-between font-montserrat mb-5 items-center text-base font-semibold ">
            <h1>Payment Information</h1>
          </div>
          <Form colon={false} labelCol={{ span: 7 }} onFinish={handleOnFinish} form={form}>
            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Payment Type</p>}
              name={'paymentType'}>
              <Select
                defaultValue={{ label: 'Select payment Type' }}
                value={paymentInfo.paymentType}
                style={{ width: 205 }}
                //   onChange={handleChange}
                options={[
                  {
                    value: 'UPI Transaction',
                    label: 'UPI Transaction'
                  },
                  {
                    value: 'Bank Transaction',
                    label: 'Bank Transaction'
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Acc No./UPI ID</p>}
              name={'value'}
              className="text-left">
              <Input name="value" className="md:w-[300px] rounded-none" />
            </Form.Item>
            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">IFC code</p>}
              name={'code'}
              className="text-left">
              <Input name="ifc-code" className="md:w-[300px] rounded-none" />
            </Form.Item>
            <div className="flex justify-center">
              <Button
                htmlType="submit"
                className="bg-black text-white font-montserrat rounded-none">
                Update
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
