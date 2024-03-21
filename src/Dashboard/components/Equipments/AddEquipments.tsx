/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Form, Input, Radio, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { ApiClientPrivate } from '../../../utils/axios';

function AddEquipments(props: any) {
  const [newEquipmentImg, setNewEquipmentImg] = useState();

  const addEquipment = (formData: FormData) => {
    console.log({ formData });
    return ApiClientPrivate.post(`/equipments/create-equipments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  const mutation = useMutation((formData: any) => {
    return addEquipment(formData);
  });

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('status', values.status);
    formData.append('description', values.description);

    if (newEquipmentImg) {
      formData.append('image', newEquipmentImg);
    }

    mutation.mutate(formData, {
      onError(error) {
        console.log(error);
      },
      onSuccess() {
        props.modalClose(false);
      }
    });
  };

  const onEquipmentImageChange = (info: any) => {
    try {
      const imageUrl = info.file;
      //   console.log({ suiii: info });
      console.log('equipment image url:', imageUrl);

      setNewEquipmentImg(imageUrl);
      // return(<Alert message="Success Text" type="success" />)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className=" ">
      <div className="text-[24px] font-montserrat mb-10  w-full mt-2">
        <h1 className="font-medium text-[24px] ">Add a new Equipment</h1>
      </div>
      <Form
        // form={form}
        onFinish={onFinish}
        // onChange={handleInputChange}
        className=""
        colon={false}
        labelCol={{ span: 7 }}>
        <div className="">
          <div className="text-start">
            <div className="font-semibold mb-4 font-montserrat text-[16px] ">
              <h1>Basic Information</h1>
            </div>

            <div className="font-medium">
              <div className="Status">
                <Form.Item
                  label={<p className="font-montserrat text-[#7E7E7E]">Status</p>}
                  className=""
                  name={'status'}
                  initialValue={true}
                  // rules={[{ required: true, message: 'Please Select your Category!' }]}
                >
                  <Radio.Group name="status" defaultValue={true} className="custom-radio-group">
                    <Radio value={true}> Enable </Radio>
                    <Radio value={false}> Disable </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="EquipmentName">
                <Form.Item
                  label={<p className="font-montserrat text-[#7e7e7e]">Equipment Name</p>}
                  name={'name'}
                  //   rules={[{ required: true, message: 'Please Enter Plan Name' }]}
                >
                  <Input
                    name="name"
                    //   value={reduxState.facilityName}
                    className="md:w-[300px] rounded-none"
                    placeholder="Enter Equipment Name"
                    // value={newAmenityName}
                    // onChange={(e) => setNewAmenityName(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="Description">
                <Form.Item
                  label={<p className="font-montserrat text-[#7e7e7e]">Description</p>}
                  name={'description'}

                  // rules={[{ min: 10, max: 100, message: 'Description must be at most 100 characters' }]}
                >
                  <TextArea
                    name="description"
                    rows={4}
                    // onChange={(e) => setNewAmenityDescription(e.target.value)}
                    className="w-[300px] text-[14px] rounded-none"
                    maxLength={150}
                    placeholder="Describe the facility in fewer than 100 characters"
                  />
                </Form.Item>
              </div>
              <div className="Icon">
                <Form.Item
                  label={<p className="font-montserrat text-[#7e7e7e]">Image</p>}
                  name={'image'}
                  className="text-[14px]">
                  <Upload
                    maxCount={1}
                    beforeUpload={() => {
                      return false;
                    }}
                    onChange={onEquipmentImageChange}
                    listType="picture">
                    <div className="flex items-center gap-3">
                      <Button
                        className="rounded-none"
                        //   disabled={remove === true}
                        icon={<UploadOutlined />}>
                        Upload
                      </Button>
                      <h1 className="text-[14px] font-normal text-[#7e7e7e]">
                        Accepted Formats - JPG , jpeg , png
                      </h1>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          {/* <Button
            //   onClick={handleCancel()}
            className="bg-white border-black rounded-none">
            Cancel
          </Button> */}

          <Button className="bg-black text-white  rounded-none" htmlType="submit">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddEquipments;
