/* eslint-disable prettier/prettier */
import { Button, Checkbox, Form, Input, Radio, Upload, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { plansBgImage } from '../../../utils/urls';
import { ApiClientPrivate } from '../../../utils/axios';
import { useMutation } from 'react-query';
// import { useParams } from 'react-router-dom';

const ShowModal = (props: any) => {
  //   const { id } = useParams();
  // console.log('dataaaaaaaa: ', props.data);

  // const [bgImage, setBgImage] = useState();
  const createMembershipPlans = (formData: FormData) => {
    return ApiClientPrivate.put(`/membership/membership-plans/update/${props.data._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  const mutation = useMutation((formData: any) => {
    console.log('form daata: ', formData);
    return createMembershipPlans(formData);
  });

  const onFinish = (values: any) => {
    // Create a FormData object
    const formData = new FormData();
    console.log('Values:', values);

    // Append all form values to the FormData object
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }
    // Append the file to the FormData object
    // Assuming the file is stored in a variable called `file`
    // You might need to adjust this based on how you're handling file uploads
    if (values.bg_image?.file) {
      // console.log(">>>>>>",bgImage);

      formData.append('bg_image', values.bg_image?.file.originFileObj);
    }
    console.log(values.bg_image?.file);
    

    mutation.mutate(formData, {
      onError(error) {
        console.log(error);
      },
      onSuccess() {
        props.update.setIsShowModalOpen(false);
        props.update.setIsEdit(false);
      }
    });
  };

  // const uploadBgImg = (value: any) => {
  //   const imgUrl = value.file.originFileObj;
  //   setBgImage(imgUrl);
  //   // console.log(imgUrl);
  // };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      status: props.data.status === true ? 'enable' : 'disable',
      name: props.data.name,
      no_of_days: props.data.no_of_days,
      no_of_access: props.data.no_of_access,
      per_day_access: props.data.per_day_access,
      description: props.data.description,
      feature: props.data.feature,
      amount: props.data.amount,
      offer_amount: props.data.offer_amount,
      help_text: props.data.help_text
      // bg_image: props.data.bg_image
    });
  }, [props.data, form]);
  const [fileList] = useState<UploadFile[]>(
    props.data.bg_image
      ? [
          {
            uid: '1',
            name: props.data.bg_image,
            status: 'done',
            url: props.data.bg_image ? `${plansBgImage}/${props.data.bg_image}` : ''
          }
        ]
      : []
  );

  return (
    <div className=" ">
      <div className="text-[24px]  mb-10  w-full mt-2">
        <h1 className="font-medium text-[24px] ">Add a Plan</h1>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        // onChange={handleInputChange}
        className=""
        labelCol={{ span: 7 }}>
        <div className="px-5">
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
                  rules={[{ required: true, message: 'Please Select your Category!' }]}>
                  <Radio.Group name="" disabled={!props.edit}>
                    <Radio value="enable"> Enable </Radio>
                    <Radio value="disable"> Disable </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="PlanName">
                <Form.Item
                  label="Plan Name"
                  name={'name'}
                  className="text-left"
                  rules={[{ required: true, message: 'Please Enter Plan Name' }]}>
                  <Input
                    name="planName"
                    //   value={reduxState.facilityName}
                    className="md:w-[350px]"
                    placeholder="Enter plan Name"
                    disabled={!props.edit}
                  />
                </Form.Item>
              </div>
              <div className="days">
                <Form.Item
                  label="No.of Days"
                  name={'no_of_days'}
                  // rules={[{ required: true, message: 'Please enter the slogan ' }]}
                  className="text-[14px]">
                  <Input
                    name="days"
                    className="md:w-[350px]"
                    placeholder="Enter the validity of the package in days "
                    disabled={!props.edit}
                  />
                </Form.Item>
              </div>
              <div className="Accesses">
                <Form.Item
                  label="No.of Accesses"
                  name={'no_of_access'}
                  // rules={[{ required: true, message: 'Please enter the slogan ' }]}
                  className="text-[14px]">
                  <Input
                    name="access"
                    className="md:w-[350px]"
                    placeholder="Number of days x number access per day"
                    disabled={!props.edit}
                  />
                </Form.Item>
              </div>
              <div className="AccessPerDay">
                <Form.Item
                  label="No.of Accesses per Day"
                  name={'per_day_access'}
                  // rules={[{ required: true, message: 'Please enter the slogan ' }]}
                  className="text-[14px]">
                  <Input
                    name="accessPerDay"
                    className="md:w-[350px]"
                    placeholder="Enter the validity of the package in days "
                    disabled={!props.edit}
                  />
                </Form.Item>
              </div>
              <div className="Description">
                <Form.Item
                  label="Description"
                  name={'description'}
                  rules={
                    [
                      // { min: 10, max: 100, message: 'Description must be at most 100 characters' }
                    ]
                  }>
                  <TextArea
                    name="description"
                    rows={4}
                    className="w-[350px] text-[14px]"
                    maxLength={150}
                    placeholder="Describe the facility in fewer than 100 characters"
                    disabled={!props.edit}
                  />
                </Form.Item>
              </div>
              <div className="Features">
                <Form.Item
                  label=" Features"
                  className="text-start text-[14px]"
                  name={'feature'}
                  //   rules={[{ required: true, message: '!' }]}
                >
                  <Checkbox.Group name="feture" disabled={!props.edit}>
                    <Checkbox value="hold"> Hold </Checkbox>
                    <Checkbox value="upgrade"> Upgrade </Checkbox>
                    <Checkbox value="payback"> Payback </Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>
              <div className="Amount">
                <Form.Item
                  label="Amount"
                  className="text-[14px]"
                  name={'amount'}
                  rules={[{ required: true, message: 'enter the actual Amount' }]}>
                  <Input
                    name="amount"
                    className="md:w-[350px]"
                    placeholder="Enter the actual Amount"
                    disabled={!props.edit}
                  />
                </Form.Item>
              </div>
              <div className="OfferAmount">
                <Form.Item
                  label="Offer Amount"
                  className="text-[14px]"
                  name={'offer_amount'}
                  rules={[{ required: true, message: 'Enter Offer Amount' }]}>
                  <Input
                    name="offerAmount"
                    className="md:w-[350px]"
                    placeholder="Enter the offer Amount"
                    disabled={!props.edit}
                  />
                </Form.Item>
              </div>
              <div className="HelpText">
                <Form.Item
                  label="Help Text"
                  className="text-[14px]"
                  name={'help_text'}
                  //   rules={[{ required: true, message: 'Please enter the Offer Price!' }]}
                >
                  <Input
                    name="offerPrice"
                    className="md:w-[350px]"
                    placeholder="Need any Help ?"
                    disabled={!props.edit}
                  />
                </Form.Item>
              </div>
              <div className="backgroundImg">
                <Form.Item label="Background Images" name={'bg_Image'} className="text-[14px]">
                  <div className="">
                    <Upload
                      disabled={!props.edit}
                      maxCount={1}
                      // onChange={(value: any) => {
                      //   //uploadBgImg(value);
                      //   console.log({ value });
                      // }}
                      beforeUpload={() => {return false}}
                      listType="picture"
                      action="#"
                      defaultFileList={[...fileList]}>
                      <div className={`flex items-center gap-3 ${!props.edit ? 'hidden' : ''}`}>
                        <Button
                          disabled={!props.edit}
                          // disabled={remove === true}
                          icon={<UploadOutlined />}>
                          Upload
                        </Button>
                        <h1 className="text-[14px] font-normal text-[#7e7e7e]">
                          Accepted Formats - JPG , jpeg , png
                        </h1>
                      </div>
                    </Upload>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          {/* <Button className="bg-white border-black rounded-none">Cancel</Button> */}

          <Button
            type="primary"
            className={`bg-black text-white rounded-none ${!props.edit ? 'hidden' : ''}`}
            htmlType="submit">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ShowModal;
