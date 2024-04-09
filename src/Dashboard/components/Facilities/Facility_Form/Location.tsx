/* eslint-disable prettier/prettier */
import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { nextButton, prevButton } from '../../../Redux/Features/ButtonSlice';
import { addData } from '../../../Redux/Features/FacilityFeature/FacilititySlice';
import { useAppSelector } from '../../../Redux/hooks';
import './Location.css';
import TimeTable from './TimeTable';

const Location = () => {
  const [pincode, setPincode] = useState('');
  const [pincodeData, setPincodeData] = useState<any>(null);
  const [finalPinData, setFinalPinData] = useState<any>(null);
  

  const dispatch = useDispatch();
  const handleNext = () => {
    console.log('next membership');

    dispatch(nextButton());
  };

  const handlePrevious = () => {
    console.log('basic info');

    dispatch(prevButton());
  };

  const reduxState = useAppSelector((state) => state.facility);
  console.log({ reduxState });
  const [form] = Form.useForm();

  form.setFieldsValue({
    address: reduxState.address,
    pin_code: reduxState.pin_code,
    country: reduxState.country,
    state: reduxState.state,
    latitude_longitude: reduxState.latitude_longitude,
    link: reduxState.link
  });

  const { TextArea } = Input;

  const handleInputChange = (e: any) => {
    // console.log(e.target, "name:", e.target.name, "value:", e.target.value);

    const fieldName = e.target.name;

    const fieldValue = e.target.value;
    // console.log({fieldValue});
    dispatch(addData({ [fieldName]: fieldValue }));
    return;
    // console.log(e.target.value);
  };

  // pincode api fetching :

  const getPincodeInfo = async (pin: number) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);

      const pinData = response?.data;
      setPincodeData(pinData[0].PostOffice);
    } catch (error) {
      console.error('Error fetching pincode information', error);
      setPincodeData(null);
    }
  };

  const handlePincodeChange = (e: any) => {
    const newPincode = e.target.value;
    setPincode(newPincode);

    // Fetch pincode data only if the length is valid (e.g., 6 digits)
    if (newPincode.length === 6) {
      getPincodeInfo(newPincode);
    } else {
      setPincodeData(null);
    }
  };

  const pincodeSelectChange = (value: string) => {
    const filteredData = pincodeData.filter((data: any) => data.Name === value);

    console.log('hello', filteredData[0]);

    setFinalPinData(filteredData[0]);
  };

  console.log('pincode Data:', pincodeData);

  useEffect(() => {
    if (finalPinData) {
      // Update the form fields with the new pincodeData
      form.setFieldsValue({
        address:
          reduxState.address + finalPinData
            ? ', ' + finalPinData?.Name + ', ' + finalPinData?.District
            : '',
        state: finalPinData.State,
        country: finalPinData.Country
      });
    }
  }, [finalPinData, form, reduxState]);

  return (
    <div className="">
      <div className="font-montserrat">
        <Form
          form={form}
          onFinish={handleNext}
          onChange={handleInputChange}
          labelCol={{ span: 7 }}
          colon={false}
          className="text-start">
          <div>
            <div className="font-semibold text-start font-montserrat text-2xl mb-10">
              <h1>Location</h1>
            </div>

            <div>
              {/* Address...........! */}
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat">Address</p>}
                name={'address'}
                className="text-start"
                rules={[{ required: true, message: 'Enter address field' }]}>
                <TextArea rows={3} name="address" className="md:w-[350px] rounded-none" />
              </Form.Item>
              {/* Pin code ...........! */}
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat">Pin-Code</p>}
                name={'pin_code'}
                rules={[
                  { required: true, message: 'Please enter Pin-code' },
                  { pattern: /^[0-9]+$/, message: 'Please enter valid Pin number' },
                  { min: 6, message: 'Pin number must be at least 6 digits' },
                  { max: 6, message: 'Pin number must be at most 6 digits' }
                ]}>
                <div className="flex gap-3 items-center">
                  <Input
                    name={'pin_code'}
                    type="tel"
                    className="w-[100px] rounded-none"
                    maxLength={6}
                    value={pincode}
                    onChange={handlePincodeChange}
                  />
                  <Select
                    defaultValue={{ value: '', label: 'Select Place' }}
                    style={{ width: 235 }}
                    className="font-montserrat"
                    onChange={pincodeSelectChange}
                    options={pincodeData?.map((it: any) => ({
                      value: it.Name,
                      label: it.Name
                    }))}
                  />
                </div>
              </Form.Item>
              {/* State ............! */}
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat">State</p>}
                className=""
                name="state">
                <Input
                  // disabled
                  // defaultValue={pincodeData?.State}
                  name="state"
                  className="md:w-[350px] rounded-none"
                />
              </Form.Item>
              {/* Country ...........! */}
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat">Country</p>}
                className=""
                name="country">
                <Input
                  // disabled
                  // defaultValue={pincodeData?.Country}
                  name="country"
                  className="md:w-[350px] rounded-none"
                />
              </Form.Item>
              {/* Latitude Longitude */}
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat ">Latitude-Longitude</p>}
                name="latitude_longitude"
                rules={[{ required: true, message: 'latitude_longitude ' }]}>
                <div className="flex items-center gap-3">
                  <Input name="latitude_longitude" className="md:w-[300px] rounded-none" />
                  <span>
                    <MdOutlineMyLocation size={20} />
                  </span>
                </div>
              </Form.Item>
              {/* location link */}
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat">Location Link</p>}
                name="link"
                // rules={[{ required: true, message: 'location link ' }]}
              >
                <Input name="link" className="md:w-[350px] rounded-none" />
              </Form.Item>
            </div>
          </div>

          <div>
            <div className="font-semibold text-center font-montserrat text-2xl my-10">
              <h1>Time</h1>
            </div>
            <div className="flex justify-center">
              <TimeTable />
            </div>
          </div>

          <div className="flex gap-3 justify-center ">
            <Button className="bg-white rounded-none font-montserrat" onClick={handlePrevious}>
              Previous
            </Button>
            <Button className="bg-black text-white font-montserrat rounded-none" htmlType="submit">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Location;
