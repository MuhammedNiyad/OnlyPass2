/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Radio, Switch, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import svg2 from '../../../public/svg2-onlypass.svg';
import svg3 from '../../../public/svg3-onlypass.svg';
import svg4 from '../../../public/svg4-onlypass.svg';
import { ApiClientPrivate } from '../../utils/axios';
import PageHeader from '../components/common_components/PageHeader';

interface Tier {
    _id: string;
    tier_name: string;
    description: string;
    status:boolean;
  }

function TierManage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tierData, setTierData] = useState<Tier[]>([]);
  const [filteredData, setFilteredData] = useState<Tier[]>([]);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<Tier | null>();

  const details = [
    {
      icon: svg4,
      head: 'Service in-return',
      value: 'Gold(3)',
      percentage: '16'
    },
    {
      icon: svg3,
      head: 'Average Usage',
      value: '16 d/m',
      percentage: '1'
    },
    {
      icon: svg2,
      head: 'Total Spend',
      value: '8,058.00',
      percentage: '39'
    }
  ];

  const columns = [
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Tier Name</div>,
      //   dataIndex: 'tier_name',
      key: 'tier_name',
      render: (record: any) => (
        <h1
          className="font-medium text-base font-montserrat hover:text-blue-800 hover:underline cursor-pointer"
          onClick={() => {setIsEditModal(true)
          setSelectedData(record)}}>
          {record.tier_name}
        </h1>
      )
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Description</div>,
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Status</div>,
      // dataIndex:'status',
      key: 'status',
      render: (record: any) => (
        <Switch
          size="small"
          defaultChecked={record.status}
          onChange={(value: boolean) => statusChange(value, record._id)}
          className="bg-red-200"
        />
      )
    }
  ];

  //   const tableData = [
  //     {
  //       tier_name: 'Silver',
  //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //       status: true
  //     },
  //     {
  //       tier_name: 'Gold',
  //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //       status: true
  //     },
  //     {
  //       tier_name: 'Platinum',
  //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //       status: false
  //     }
  //   ];

  const fetchTier = () => {
    return ApiClientPrivate.get(`/tier/all-tier`);
    // return response;
  };
  const { data: mainData, refetch } = useQuery('fetchTier', fetchTier);

  // assign fetched data to states
  useEffect(() => {
    setTierData(mainData?.data);
    setFilteredData(mainData?.data);
  }, [mainData, refetch]);

  // this useEffect for if add or update an amenity then refresh the data
  useEffect(() => {
    refetch();
  }, [isModalOpen, refetch]);

    const onChangeSearch = (e:any) => {
      const value = e.target.value;
      const lowerCasedValue = value.toLowerCase();
      const filtered = tierData.filter((item) => item.tier_name.toLowerCase().includes(lowerCasedValue));

      setFilteredData(filtered);
    };

    const tableData = filteredData?.map((It: any, i: number) => ({
      ...It,
      key: i + 1
    }));

  const statusChange = async (value: boolean, id: string) => {
    // console.log(`switch to ${value}`);
    try {
      await ApiClientPrivate.put(`tier/update-tier/${id}`, { status: value });
      refetch();
    } catch (error: any) {
      alert(error.message);
    }
  };

  //   this function is adding tier.
  const addTier = (formData: any) => {
    console.log({ formData });
    return ApiClientPrivate.post(`/tier/create-tier`, {
      tier_name: formData.name,
      status: formData.status,
      description: formData.description
    });
  };

  const mutation = useMutation((formData: any) => {
    return addTier(formData);
  });
  const onFinish = (values: any) => {
    mutation.mutate(values, {
      onError(error) {
        console.log(error);
      },
      onSuccess() {
        setIsModalOpen(false);
      }
    });
  };

  const [form] = Form.useForm();
  form.setFieldsValue({
    status: selectedData?.status,
    name: selectedData?.tier_name,
    description: selectedData?.description
  });

  const onEditFinish = async (value:any) =>{
    try {
        ApiClientPrivate.put(`/tier/update-tier/${selectedData?._id}`,{
            status: value.status,
            tier_name: value.name,
            description: value.description
        })
        setIsEditModal(false);
        window.location.reload();
    } catch (error) {
        alert('something went wrong')
    }
  }

  return (
    <div>
      <div className=" bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
        <PageHeader
          details={details}
          name={'Tier Management'}
             searchFunction={onChangeSearch}
        />
        {/* Table Section */}
        <div className="w-full overflow-x-scroll bg-white p-4 md:p-10 ">
          <div className="mainDev flex md:flex-row flex-col items-center md:justify-between justify-start mb-10 ">
            <div className="section1 flex items-center gap-3 lg:gap-5  px-3 ">
              <div className="heading font-bold  text-[20px] lg:text-[22px]">
                <h1>All Tiers </h1>
              </div>
              <div className="buttonDev">
                <div
                  className="bg-black text-white flex cursor-pointer items-center gap-2 w-[94px] h-[28px] text-[12px]  justify-center font-normal rounded-sm shadow-lg "
                  onClick={() => setIsModalOpen(true)}>
                  <p>Add New</p>
                  <BiPlus />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{ pageSize: 10 }}
              className="font-montserrat"
            />
          </div>
        </div>
      </div>

      {/* Tier adding modal */}
      <Modal
        title=""
        className=""
        width={700}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}>
        {/* <Forms /> */}        <div className=" ">
          <div className="text-[24px]  mb-10  w-full mt-2">
            <h1 className="font-medium text-[24px] font-montserrat ">Add a new Tier</h1>
          </div>
          <Form
            onFinish={onFinish}
            className=""
            labelCol={{ span: 7 }}>
            <div className="">
              <div className="text-start">
                <div className="font-medium">
                  <div className="Status">
                    <Form.Item
                      label={<p className="font-montserrat text-[#7e7e7e]">Status</p>}
                      name={'status'}
                      initialValue={true}
                    >
                      <Radio.Group name="status" defaultValue={true} className="custom-radio-group">
                        <Radio value={true}> Enable </Radio>
                        <Radio value={false}> Disable </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="TierName">
                    <Form.Item
                      label={<p className="font-montserrat text-[#7e7e7e]">Tier Name</p>}
                      name={'name'}
                    >
                      <Input
                        name="name"
                        className="md:w-[300px] rounded-none"
                        placeholder="Enter Tier Name"
                      />
                    </Form.Item>
                  </div>
                  <div className="Description">
                    <Form.Item
                      label={<p className="font-montserrat text-[#7e7e7e]">Description</p>}
                      name={'description'}
                    >
                      <TextArea
                        name="description"
                        rows={4}
                        className="w-[300px] text-[14px] rounded-none"
                        maxLength={150}
                        placeholder="Describe the facility in fewer than 100 characters"
                      />
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
      </Modal>

      {/* Tier editing modal */}
      <Modal
        title=""
        className=""
        width={700}
        open={isEditModal}
        onCancel={() => setIsEditModal(false)}
        footer={false}>
        <div className=" ">
          <div className="text-[24px]  mb-10  w-full mt-2">
            <h1 className="font-medium text-[24px] font-montserrat ">Add a new Tier</h1>
          </div>
          <Form
            form={form}
            onFinish={onEditFinish}
            className=""
            labelCol={{ span: 7 }}>
            <div className="">
              <div className="text-start">
                <div className="font-medium">
                  <div className="Status">
                    <Form.Item
                      label={<p className="font-montserrat text-[#7e7e7e]">Status</p>}
                      name={'status'}
                      initialValue={true}
                    >
                      <Radio.Group name="status" defaultValue={true} className="custom-radio-group">
                        <Radio value={true}> Enable </Radio>
                        <Radio value={false}> Disable </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="TierName">
                    <Form.Item
                      label={<p className="font-montserrat text-[#7e7e7e]">Tier Name</p>}
                      name={'name'}
                    >
                      <Input
                        name="name"
                        //   value={reduxState.facilityName}
                        className="md:w-[300px] rounded-none"
                        placeholder="Enter Tier Name"
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
                Update
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default TierManage;
