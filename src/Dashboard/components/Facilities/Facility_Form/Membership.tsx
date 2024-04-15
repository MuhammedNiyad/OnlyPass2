/* eslint-disable prettier/prettier */
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { nextButton, prevButton } from '../../../Redux/Features/ButtonSlice';
import { useEffect, useState } from 'react';
import { addData, setTier } from '../../../Redux/Features/FacilityFeature/FacilititySlice';
import { useAppSelector } from '../../../Redux/hooks';
import { useQuery } from 'react-query';
import { ApiClientPrivate } from '../../../../utils/axios';

// const { TextArea } = Input;
interface CheckedState {
  admission_fee: boolean;
  daily_pass: boolean;
  monthly_pass: boolean;
  threeMonth_pass: boolean;
  sixMonth_pass: boolean;
  annual_pass: boolean;
}

interface TierData {
  tier_name: string;
 }

const Membership = () => {

  const [tierData, setTierData] = useState<TierData[] | undefined>();

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

  const fetchTier = () => {
    return ApiClientPrivate.get(`/tier/all-tier`);
    // return response;
  };
  const { data: mainData } = useQuery('fetchTier', fetchTier);

  useEffect(()=>{
    if (mainData?.data) {
      const filteredData = mainData.data.filter((item:any) => item.status === true);
      setTierData(filteredData);
    }
  },[mainData])

  const reduxState = useAppSelector((state) => state.facility);
  const [checkedState, setCheckedState] = useState<CheckedState>({
    admission_fee: reduxState.admission_fee ? true : false,
    daily_pass: reduxState.daily_pass ? true : false,
    monthly_pass: reduxState.monthly_pass ? true : false,
    threeMonth_pass: reduxState.threeMonth_pass ? true : false,
    sixMonth_pass: reduxState.sixMonth_pass ? true : false,
    annual_pass: reduxState.annual_pass ? true : false
  });
  console.log('tierData', tierData );

  const [form] = Form.useForm();

  form.setFieldsValue({
    admission_fee: reduxState.admission_fee,
    daily_pass: reduxState.daily_pass,
    monthly_pass: reduxState.monthly_pass,
    threeMonth_pass: reduxState.threeMonth_pass,
    sixMonth_pass: reduxState.sixMonth_pass,
    annual_pass: reduxState.annual_pass,
    tier: reduxState.tier ? reduxState.tier : 'Select Tier',
    other: reduxState.other
  });

  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch(nextButton());
  };
  const handlePrevious = () => {
    dispatch(prevButton());
  };

  const handleCheckBox = (e: any) => {
    const { name, checked } = e.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handlePriceChange = (name: string, value: number) => {
    dispatch(addData({ [name]: value }));
  };
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    // console.log("salman :" , { value });
    // dispatch(addData({ tier: value.value }));
    dispatch(setTier(value));
  };

  const handleOtherchange = (e: any) => {
    dispatch(addData({ ['other']: e.target.value }));
  };

  return (
    <div className="max-w-[500px] mx-auto mt-8">
      <Form form={form} onFinish={handleNext} colon={false}>
        <div className="font-semibold text-start font-montserrat text-2xl mb-10">
          <h1>Membership options</h1>
        </div>
        <div>
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-5 mb-3">
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
                  rules={
                    checkedState[item.name as keyof typeof checkedState]
                      ? [
                          {
                            required: true,
                            message: 'Enter price'
                          }
                        ]
                      : undefined // Set to undefined if no rule should be applied
                  }>
                  <Input
                    className="w-20 price rounded-none"
                    name={item.name}
                    type="tel"
                    maxLength={5}
                    onChange={(value) => handlePriceChange(item.name, +value.target.value)}
                  />
                </Form.Item>
              </div>
            </div>
          ))}
        </div>
        <Form.Item
          label={<p className="text-[#7E7E7E] font-montserrat">Other Option</p>}
          labelCol={{ span: 7 }}
          name={'other'}>
          <Input name="other" className="w-52 rounded-none" onChange={handleOtherchange} />
        </Form.Item>

        <Form.Item
          label={<p className="text-[#7E7E7E] font-montserrat">Facility Tier</p>}
          name="tier"
          className="text-start"
          labelCol={{ span: 7 }}>
          <Select
            defaultValue={{ value: '', label: 'Select tier' }}
            style={{ width: 205 }}
            className="font-montserrat"
            onChange={handleChange}
            options={tierData?.map((it: any) => ({
              value: it.tier_name,
              label: it.tier_name
            }))} 
          />
        </Form.Item>
        <div className="flex gap-3 justify-center ">
          <Button className="bg-white rounded-none font-montserrat " onClick={handlePrevious}>
            Previous
          </Button>
          <Button className="bg-black rounded-none font-montserrat text-white " htmlType="submit">
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Membership;
