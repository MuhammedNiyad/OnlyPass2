/* eslint-disable prettier/prettier */
import { Button, Form, Input, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { ApiClientPrivate } from '../../../utils/axios';
import { useMutation } from 'react-query';
import { useState } from 'react';

const AddAmenities = (props:any) => {
  const [newAmenityIcon, setNewAmenityIcon] = useState();

  const addAmenity = (formData: FormData) => {
    console.log({ formData });
    return ApiClientPrivate.post(`/amenities/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  const mutation = useMutation((formData: any) => {
    return addAmenity(formData);
  });

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('status', values.status);
    formData.append('description', values.description);

    if (newAmenityIcon) {
      formData.append('icon', newAmenityIcon);
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
      const iconUrl = info.file;
      //   console.log({ suiii: info });
      console.log('amenity icon url:', iconUrl);

      setNewAmenityIcon(iconUrl);
      // return(<Alert message="Success Text" type="success" />)
    } catch (error) {
      console.error('Error uploading icon:', error);
    }
  };

  return (
    <div className=" ">
      <div className="text-[24px]  mb-10  w-full mt-2">
        <h1 className="font-medium text-[24px] ">Add a new Equipment</h1>
      </div>
      <Form
        // form={form}
        onFinish={onFinish}
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
                  label="Equipment Name"
                  name={'name'}
                  //   rules={[{ required: true, message: 'Please Enter Plan Name' }]}
                >
                  <Input
                    name="name"
                    //   value={reduxState.facilityName}
                    className="md:w-[300px]"
                    placeholder="Enter Equipment Name"
                    // value={newAmenityName}
                    // onChange={(e) => setNewAmenityName(e.target.value)}
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
                    // onChange={(e) => setNewAmenityDescription(e.target.value)}
                    className="w-[300px] text-[14px]"
                    maxLength={150}
                    placeholder="Describe the facility in fewer than 100 characters"
                  />
                </Form.Item>
              </div>
              <div className="Icon">
                <Form.Item label="image" name={'image'} className="text-[14px]">
                <Upload
                      maxCount={1}
                      beforeUpload={() => {
                        return false;
                      }}
                      onChange={onEquipmentImageChange}
                      listType="picture">
                      <div className="flex items-center gap-3">
                        <Button
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

export default AddAmenities;
