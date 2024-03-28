/* eslint-disable prettier/prettier */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Radio, Space, Upload, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useDebounce } from '../../../../Hook/CustomHook';
import { ApiClientPrivate } from '../../../../utils/axios';
import { setBasicUpdateBtn } from '../../../Redux/Features/updateFacilityBtn';
import { useAppDispatch } from '../../../Redux/hooks';

export default function UpdateBasicInfo(props: any) {
  const [facilityImages, setFacilityImages] = useState(props.facilityData.images);
  // console.log("log images:", facilityImages);

  const [remove, setRemove] = useState(props.facilityData.logoUrl ? true : false);
  const [fileList, setFileList] = useState<UploadFile[]>(
    props.facilityData.logoUrl
      ? [
          {
            uid: '1',
            name: props.facilityData.logoUrl,
            // status: 'done',
            url: props.facilityData.logoUrl ? `${props.facilityData.logoUrl}` : ''
          }
        ]
      : []
  );
  const [imgFileList] = useState<UploadFile[]>(
    facilityImages.length > 0
      ? props.facilityData.images.map((it: any, ind: number) => ({
          uid: ind.toString(),
          name: it,
          // status: 'done',
          url: props.facilityData.images ? `${it}` : ''
        }))
      : []
  );
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  // console.log("fadRfdf:", );
  form.setFieldsValue({
    facility_type: props.facilityData.facility_type,
    gender: props.facilityData.gender,
    facilityName: props.facilityData.facilityName,
    emailAddress: props.facilityData.emailAddress,
    contactPerson: props.facilityData.contactPerson,
    phoneNumber: props.facilityData.phoneNumber,
    websiteURL: props.facilityData.websiteURL,
    logo: props.facilityData.logoUrl,
    description: props.facilityData.description,
    images: props.facilityData.Facilityimages
  });

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      // validate the form fields

      values.images = facilityImages;

      // Assuming you have an API endpoint for updating facilities, adjust the URL accordingly
      const id = props.facilityData._id; // Replace 'id' with the actual identifier for your facility
      await ApiClientPrivate.put(`facilities/update/${id}`, values);
      // You may want to handle success, close modal, or update the Redux state accordingly
      props.cancel();
      dispatch(setBasicUpdateBtn(true));

      // props.refetch();
    } catch (error) {
      console.error('Error updating facility:', error);
      // Handle error appropriately
    }
  };

  const normFileLogo = async (e: any) => {
    try {
      // Assuming ApiClientPrivate is an Axios instance
      const formData = new FormData();
      formData.append('logo', e.file);
      console.log('logooooooooo', e.file);

      // Make the POST request to upload the logo
      if (remove !== true) {
        const response = await ApiClientPrivate.post('/images/upload-logo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const id = props.facilityData._id; // Replace 'id' with the actual identifier for your facility
        await ApiClientPrivate.put(`facilities/update/${id}`, {
          logoUrl: response.data
        });
      }
      setRemove(true);
      // Return the file list (or any other value you need)
      return e.fileList;
    } catch (error) {
      // Handle errors during logo upload
      console.error('Logo upload error:', error);

      // Return the file list or handle errors based on your requirements
      return e.fileList;
    }
  };
  const normFileImages: UploadProps['onChange'] = async (info, createing?: string) => {
    try {
      console.log('Uploading............', info, createing);

      const formData = new FormData();

      info.fileList.forEach((file: any) => {
        formData.append('facility_images', file.originFileObj);
        console.log('file obj:', file.orginalFileObj);
      });

      const response = await ApiClientPrivate.post('/images/upload-img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const updatedImagesArray = [
        ...props.facilityData.images,
        ...response.data.map((item: any) => item)
      ];
      console.log('Updated images array:', updatedImagesArray);
      setFacilityImages(updatedImagesArray);
    } catch (error: any) {
      // Handle errors
      console.error('Image upload error:', error);
    }
  };

  const debouncedNormFileLogo = useDebounce(normFileLogo, 500);
  const debouncedNormFileImages = useDebounce((e) => normFileImages(e), 500);

  const handleLogoRemove = () => {
    // dispatch(addData({ logoUrl: "" }));

    setFileList([]);
    // console.log("salman");
    setRemove(false);
  };
  const handleImgsRemove = (file: UploadFile) => {
    console.log('Removing...........');

    const newImgFileList = facilityImages.filter((item: any) => item !== file.name);
    setFacilityImages(newImgFileList);
    // Also remove the image from the backend, if necessary
  };

  return (
    <div className="font-semibold  ">
      <Form
        form={form}
        // onFinish={onFinish}
        // onChange={handleInputChange}
        className=""
        labelCol={{ span: 7 }}
      >
        <div>
          <div className="text-start">
          <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Facility Type</p>}
              className="text-left"
              name={'facility_type'}
              rules={[{ required: true, message: 'Please Select your Type!' }]}>
              <Radio.Group
                name="facility_type"
                defaultValue="access"
                className="custom-radio-group">
                <Radio value="access"> Access </Radio>
                <Radio value="pass"> Pass </Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="">
          <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Gender</p>}
              className="text-start "
              name={'gender'}
              rules={[{ required: true, message: 'Please Select your Type!' }]}>
              <div className="flex w-[350px]">
                <Col span={8}>
                  <Checkbox value="gents" name={'gender'}> Gents </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="ladies"  name={'gender'}> Ladies </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="unisex" className="text-nowrap" name={'gender'}>
                    Unisex (mixed)
                  </Checkbox>
                </Col>
              </div>
            </Form.Item>
          </div>
        </div>

        <div>
          <div>
            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Facility Name</p>}
              name={'facilityName'}
              className="text-left"
              rules={[{ required: true, message: 'Please Enter Facilicty name' }]}
            >
              <Input
                name="facilityName"
                value={props.facilityData.facilityName}
                className="md:w-[350px] rounded-none"
              />
            </Form.Item>
            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Email</p>}
              name={'emailAddress'}
              rules={[{ required: true, message: 'Please Enter Email Address' }]}
              className=""
            >
              <Input name="emailAddress" className="md:w-[350px] rounded-none" />
            </Form.Item>
            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Contact Person</p>}
              name={'contactPerson'}
              rules={[{ required: true, message: 'Please Enter Contact person name' }]}
            >
              <Input name="contactPerson" className="md:w-[350px] rounded-none" />
            </Form.Item>
            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Phone No.</p>}
              name={'phoneNumber'}
              rules={[
                { required: true, message: 'Please enter phone number' },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Please enter valid phone number'
                },
                { min: 10, message: 'Phone number must be at least 10 digits' },
                { max: 10, message: 'Phone number must be at most 10 digits' }
              ]}
              className="text-left"
            >
              <Space.Compact className="md:w-[350px] rounded-none gap-5">
                <Input
                  type="tel"
                  name="phonCode"
                  className="w-[15%] rounded-none"
                  defaultValue={'+91'}
                  disabled
                />
                <Input
                  type="tel"
                  name="phoneNumber"
                  className="w-[80%] rounded-none"
                  defaultValue={props.facilityData.phoneNumber}
                  maxLength={10}
                />
              </Space.Compact>
            </Form.Item>

            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Website URL</p>}
              className="" name={'websiteURL'}>
              <Input name="websiteURL" className="md:w-[350px] rounded-none" />
            </Form.Item>

            <Form.Item
            label={<p className="text-[#7E7E7E] font-montserrat">Logo</p>}
            name={'logo'}>
              <div className="w-[200px]">
                <Upload
                  maxCount={1}
                  onChange={(e) => {
                    if (remove === false) debouncedNormFileLogo(e);
                  }}
                  // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture"
                  onRemove={handleLogoRemove}
                  beforeUpload={() => {
                    return false;
                  }}
                  // fileList={fileList}

                  defaultFileList={[...fileList]}
                >
                  <Button className='rounded-none font-montserrat' disabled={remove === true} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </div>
            </Form.Item>

            <Form.Item
              label={<p className="text-[#7E7E7E] font-montserrat">Description</p>}
              name={'description'}>
              <TextArea name="description" rows={4} className="w-[350px] rounded-none" />
            </Form.Item>

            <div className=" ">
              <Form.Item
                label={<p className="text-[#7E7E7E] font-montserrat">Images</p>}
                getValueFromEvent={debouncedNormFileImages}
                valuePropName="fileList"
                name={'images'}
              >
                <Upload
                  // {...props}
                  // onChange={
                  // }
                  multiple
                  listType="picture"
                  onRemove={handleImgsRemove}
                  beforeUpload={() => {
                    return false;
                  }}
                  defaultFileList={imgFileList}
                >
                  <Button className='rounded-none font-montserrat' icon={<UploadOutlined />}>Click to Upload</Button>
                  <h1 className="text-black opacity-50">(preview size is 16:9)</h1>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button htmlType="submit" className="bg-black text-white font-montserrat rounded-none" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}
