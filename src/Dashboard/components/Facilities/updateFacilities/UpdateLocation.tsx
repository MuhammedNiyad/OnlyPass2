/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { ApiClientPrivate } from '../../../../utils/axios';
import { setLocationUpdateBtn } from '../../../Redux/Features/updateFacilityBtn';
import { useAppDispatch } from '../../../Redux/hooks';

const UpdateLocation = (props: any) => {
  const [pincodeData, setPincodeData] = useState<any>(null);
  const [finalPinData, setFinalPinData] = useState<any>(null);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields(); // validate the form fields

      // Assuming you have an API endpoint for updating facilities, adjust the URL accordingly
      const id = props.facilityData._id; // Replace 'id' with the actual identifier for your facility
      await ApiClientPrivate.put(`facilities/update/${id}`, values);
      // You may want to handle success, close modal, or update the Redux state accordingly
      props.cancel();
      dispatch(setLocationUpdateBtn(true));
    } catch (error) {
      console.error('Error updating facility:', error);
      // Handle error appropriately
    }
  };
  // form.setFieldsValue({
  //   address: props.facilityData.address,
  //   pin_code: props.facilityData.pin_code,
  //   state: props.facilityData.state,
  //   country: props.facilityData.country,
  //   latitude_longitude: props.facilityData.latitude_longitude,
  //   link: props.facilityData.link
  // });

  const handlePincodeChange = async (e: any) => {
    const newPincode = e.target.value;
    // dispatch(addData({ ['pin_code']: e.target.value }));

    // Fetch pincode data only if the length is valid (e.g., 6 digits)
    if (newPincode.length === 6) {
      // getPincodeInfo(newPincode);
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${newPincode}`);

        const pinData = response?.data;
        setPincodeData(pinData[0].PostOffice);
      } catch (error) {
        console.error('Error fetching pincode information', error);
        setPincodeData(null);
      }
    } else {
      setPincodeData(null);
    }
  };

  const pincodeSelectChange = (value: string) => {
    const filteredData = pincodeData.filter((data: any) => data.Name === value);
    if (filteredData.length > 0) {
      setFinalPinData(filteredData[0]);

      // Update the form field with the new address
      form.setFieldsValue({
        address: filteredData[0].Name + ', ' + filteredData[0].District,
        state: finalPinData.State,
        country: finalPinData.Country
      });
    }
  };

  return (
    <div>
      <div className="font-semibold  ">
        <Form
          form={form}
          onFinish={(values) => console.log({ values })}
          //   onChange={handleInputChange}
          labelCol={{ span: 7 }}
          initialValues={{
            address: props.facilityData.address,
            pin_code: props.facilityData.pin_code,
            state: props.facilityData.state,
            country: props.facilityData.country,
            latitude_longitude: props.facilityData.latitude_longitude,
            link: props.facilityData.link
          }}
          className="text-start">
          <div>
            <div className="font-semibold text-center text-2xl mb-10">
              <h1>Location</h1>
            </div>

            <div>
              {/* Pin code ...........! */}
              <div className="reletive">
                <Form.Item
                  label={<p className="text-[#7E7E7E] font-montserrat">Pin-Code</p>}
                  name={'pin_code'}
                  rules={[
                    { required: true, message: 'Please enter Pin-code' },
                    { pattern: /^[0-9]+$/, message: 'Please enter valid Pin number' },
                    { min: 6, message: 'Pin number must be at least 6 digits' },
                    { max: 6, message: 'Pin number must be at most 6 digits' }
                  ]}>
                  <Input
                    name={'pin_code'}
                    type="tel"
                    className="w-[100px] rounded-none"
                    maxLength={6}
                    // value={pincode}
                    onChange={handlePincodeChange}
                  />
                </Form.Item>
                <Select
                  defaultValue="Select Place"
                  style={{ width: 235 }}
                  className="font-montserrat absolute right-[15px] top-[93px] z-10"
                  onChange={pincodeSelectChange}
                  options={pincodeData?.map((it: any) => ({
                    value: it.Name,
                    label: it.Name
                  }))}
                />
              </div>
              {/* Address...........! */}
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat">Address</p>}
                name={'address'}
                className="text-start"
                rules={[{ required: true, message: 'Enter address field' }]}>
                <TextArea rows={3} name="address" className="md:w-[350px] rounded-none" />
              </Form.Item>
              {/* State ............! */}
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat">State</p>}
                className=""
                name="state">
                <Input
                  disabled
                  // value={'Kerala'}
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
                  disabled
                  // value="India"
                  name="country"
                  className="md:w-[350px] rounded-none"
                />
              </Form.Item>
              {/* Latitude Longitude */}
              <div className="reletive">
                <Form.Item
                  label={<p className="text-[#7E7E7E] font-montserrat ">Lat-Long</p>}
                  name="latitude_longitude"
                  rules={[{ required: true, message: 'latitude_longitude ' }]}>
                  <Input
                    name="latitude_longitude"
                    className="md:w-[300px] rounded-none"
                    // onChange={handleLatLong}
                  />
                </Form.Item>
                <span className="absolute right-[30px] top-[365px]">
                  <MdOutlineMyLocation size={20} />
                </span>
              </div>
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
          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black rounded-none"
              onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateLocation;
