/* eslint-disable prettier/prettier */
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { ApiClientPrivate } from '../../../../utils/axios';
import { setMembershipUpdateBtn } from '../../../Redux/Features/updateFacilityBtn';
import { useAppDispatch } from '../../../Redux/hooks';
import { useQuery } from 'react-query';

interface CheckedState {
  admission_fee: boolean;
  daily_pass: boolean;
  monthly_pass: boolean;
  threeMonth_pass: boolean;
  sixMonth_pass: boolean;
  annual_pass: boolean;
}
export const UpdateMembership = (props: any) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [tierData, setTierData] = useState<any>();

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields(); // validate the form fields

      // Assuming you have an API endpoint for updating facilities, adjust the URL accordingly
      const id = props.facilityData._id; // Replace 'id' with the actual identifier for your facility
      await ApiClientPrivate.put(`facilities/update/${id}`, values);
      // You may want to handle success, close modal, or update the Redux state accordingly
      props.cancel();
      dispatch(setMembershipUpdateBtn(true));
    } catch (error) {
      console.error('Error updating facility:', error);
      // Handle error appropriately
    }
  };

  const [checkedState, setCheckedState] = useState<CheckedState>({
    admission_fee: props.facilityData.admission_fee !== 0 || null ? true : false,
    daily_pass: props.facilityData.daily_pass !== 0 || null ? true : false,
    monthly_pass: props.facilityData.monthly_pass !== 0 || null ? true : false,
    threeMonth_pass: props.facilityData.threeMonth_pass !== 0 || null ? true : false,
    sixMonth_pass: props.facilityData.sixMonth_pass !== 0 || null ? true : false,
    annual_pass: props.facilityData.annual_pass !== 0 || null ? true : false
  });

  console.log(checkedState);

  const data = [
    {
      id: 1,
      label: 'Admission fee (one-time)',
      name: 'admission_fee'
    },
    {
      id: 2,
      label: 'Daily Pass',
      name: 'daily_pass'
    },
    {
      id: 3,
      label: 'Monthly Pass',
      name: 'monthly_pass'
    },
    {
      id: 4,
      label: '3 Month Pass',
      name: 'threeMonth_pass'
    },
    {
      id: 5,
      label: '6 Month Pass',
      name: 'sixMonth_pass'
    },
    {
      id: 6,
      label: 'Annual Pass',
      name: 'annual_pass'
    }
  ];

  const handleCheckBox = (e: any) => {
    const { name, checked } = e.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: checked
    }));
    if (checked === false) {
      console.log({ name });

      // form.setFieldsValue({
      //   admission_fee: name === 'admission_fee' ? null : props.facilityData.admission_fee,
      //   daily_pass: name === 'daily_pass' ? null : props.facilityData.daily_pass,
      //   monthly_pass: name === 'monthly_pass' ? null : props.facilityData.monthly_pass,
      //   threeMonth_pass: name === 'threeMonth_pass' ? null : props.facilityData.threeMonth_pass,
      //   sixMonth_pass: name === 'sixMonth_pass' ? null : props.facilityData.sixMonth_pass,
      //   annual_pass: name === 'annual_pass' ? null : props.facilityData.annual_pass
      // });
    }
    console.log(form.getFieldValue('admission_fee'));
  };

  useEffect(() => {
    form.setFieldsValue({
      admission_fee: props.facilityData.admission_fee,
      daily_pass: props.facilityData.daily_pass,
      monthly_pass: props.facilityData.monthly_pass,
      threeMonth_pass: props.facilityData.threeMonth_pass,
      sixMonth_pass: props.facilityData.sixMonth_pass,
      annual_pass: props.facilityData.annual_pass,
      tier: props.facilityData.tier ? props.facilityData.tier : 'Select Tier',
      other: props.facilityData.other
    });
  }, [props]);

  const fetchTier = () => {
    return ApiClientPrivate.get(`/tier/all-tier`);
    // return response;
  };
  const { data: mainData } = useQuery('fetchTier', fetchTier);

  useEffect(() => {
    if (mainData?.data) {
      const filteredData = mainData.data.filter((item: any) => item.status === true);
      setTierData(filteredData);
    }
  }, [mainData]);

  return (
    <div>
      <div className="font-semibold  ">
        <Form form={form} onFinish={handleUpdate}>
          <div className="font-semibold font-montserrat text-2xl mb-10">
            <h1>Membership options</h1>
          </div>
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-5 mb-3 ">
              <Form.Item
                name={item.name}
                valuePropName="checked"
                // wrapperCol={{ span: 30 }}
              >
                <div className=" w-[150px] md:w-[200px]  flex justify-between font-montserrat text-[#7E7E7E] gap-3">
                  {item.label}

                  <Checkbox
                    name={item.name}
                    checked={checkedState[item.name as keyof typeof checkedState]}
                    onChange={handleCheckBox}>
                    {' '}
                  </Checkbox>
                </div>
              </Form.Item>

              <div className="flex gap-1 w-40">
                <Form.Item
                  label={<p className="text-[#7E7E7E] font-montserrat">Price</p>}
                  name={item.name}
                  hidden={!checkedState[item.name as keyof typeof checkedState]}
                  wrapperCol={{ span: 6 }}>
                  <InputNumber
                    className="w-20 price rounded-none"
                    name={item.name}
                    type="number"
                    //   onChange={(value:any) =>
                    //     handlePriceChange(item.name, value as number)

                    //   }
                  />
                </Form.Item>
              </div>
            </div>
          ))}

          <Form.Item
            label={<p className="text-[#7E7E7E] font-montserrat">Other Option</p>}
            labelCol={{ span: 7 }}
            name={'other'}>
            <Input
              name="other"
              className="w-52 rounded-none"
              //    onChange={handleOtherchange}
            />
          </Form.Item>

          <Form.Item
            label={<p className="text-[#7E7E7E] font-montserrat">Facility Tier</p>}
            name="tier"
            className="text-start"
            rules={[{ required: true, message: 'Please Select your Tier!' }]}
            labelCol={{ span: 7 }}>
            <Select
              defaultValue={{ value: '', label: 'Select tier' }}
              style={{ width: 205 }}
              className="font-montserrat"
              // onChange={handleChange}
              options={tierData?.map((it: any) => ({
                value: it.tier_name,
                label: it.tier_name
              }))}
            />
          </Form.Item>
          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black rounded-none"
              onClick={handleUpdate}>
              update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
