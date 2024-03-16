/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Upload, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';

const UpdateAmenities = ({
  amenityData,
  handleUpdateAmenity
}: {
  amenityData: any;
  handleUpdateAmenity: (updatedData: any) => void;
}) => {

  console.log("update:", amenityData);
  
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      status: amenityData.status, // Assuming there is a 'status' property in Amenity
      amenityName: amenityData.name,
      description: amenityData.description,
      icon: amenityData.icon

      // ... other fields
    });
  }, [amenityData, form]);

  const [fileList] = useState<UploadFile[]>(
    amenityData.icon
      ? [
          {
            uid: '1',
            name: amenityData.icon,
            // status: 'done',
            url: amenityData.icon ? `${amenityData.icon}` : ''
          }
        ]
      : []
  );

  return (
    <div className=" ">
      <div className="text-[24px]  mb-10  w-full mt-2">
        <h1 className="font-medium text-[24px] "> Update Amenity</h1>
      </div>
      <Form
        form={form}
        onFinish={(values) => handleUpdateAmenity({ ...values, id: amenityData._id })}
        // onChange={handleInputChange}
        className=""
        labelCol={{ span: 7 }}>
        <div className="">
          <div className="text-start">
            <div className="font-semibold  text-[16px] ">
              <h1>Basic Information</h1>
            </div>

            <div className="font-medium">
              <div className="Status">
                <Form.Item
                  label="Status"
                  className=""
                  name={'status'}
                  // rules={[{ required: true, message: 'Please Select your Category!' }]}
                >
                  <Radio.Group name="" defaultValue="true" className="custom-radio-group">
                    <Radio value="true"> Enable </Radio>
                    <Radio value="false"> Disable </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="AmenityName">
                <Form.Item
                  label="Amenity Name"
                  name={'amenityName'}
                  //   rules={[{ required: true, message: 'Please Enter Plan Name' }]}
                >
                  <Input
                    name="amenityName"
                    //   value={reduxState.facilityName}
                    className="md:w-[300px]"
                    placeholder="Enter Amenity Name"
                  />
                </Form.Item>
              </div>
              <div className="Description">
                <Form.Item
                  label="Description"
                  name={'description'}
                  // rules={[{ min: 10, max: 100, message: 'Description must be at most 100 characters' }]}
                >
                  <TextArea
                    name="description"
                    rows={4}
                    className="w-[300px] text-[14px]"
                    maxLength={150}
                    placeholder="Describe the facility in fewer than 100 characters"
                  />
                </Form.Item>
              </div>
              <div className="Icon">
                <Form.Item label="Icon" name={'icon'} className="text-[14px]">
                  <Upload
                    maxCount={1}
                    onChange={onAmenityChange}
                    listType="picture"
                    beforeUpload={() => {return false}}
                    defaultFileList={[...fileList]}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </div>
              <div className="flex mt-10 justify-center">
                <Form.Item>
                  <Button
                    type="primary"
                    className={`bg-black text-white rounded-none`}
                    htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UpdateAmenities;
