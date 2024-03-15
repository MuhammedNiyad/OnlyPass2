/* eslint-disable prettier/prettier */
import { Form, Modal, Select, Switch, Table } from 'antd';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import svg2 from '../../../public/svg2-onlypass.svg';
import svg3 from '../../../public/svg3-onlypass.svg';
import svg4 from '../../../public/svg4-onlypass.svg';
import '../../App.css';
import AddPlans from '../components/Membership/AddPlans';
import PageHeader from '../components/common_components/PageHeader';
import { useQuery } from 'react-query';
import { ApiClientPrivate } from '../../utils/axios';
import { useParams } from 'react-router-dom';
import ShowModal from '../components/Membership/showModal';

const Plans = () => {
  const { id } = useParams();
  const fetchMembershipPlans = () => {
    return ApiClientPrivate.get(`/membership/package/plans/${id}`);
    // return response;
  };
  const { data: mainData, refetch } = useQuery('fetchMembershipPlans', fetchMembershipPlans);

  console.log('000', mainData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  console.log('edit >>>>', isEdit);

  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    if (isModalOpen === false) {
      refetch();
    }
  }, [isModalOpen]);

  const statusChange = async (value: boolean, id: string) => {
    // console.log('hello=', value, id);
    try {
      await ApiClientPrivate.put(`/membership/membership-plans/update/${id}`, { status: value });
      refetch();
    } catch (error: any) {
      alert(error.message);
    }
  };
  const pauseChange = async (value: boolean, id: string) => {
    // console.log('hello pause =', value, id);
    try {
      await ApiClientPrivate.put(`/membership/membership-plans/update/${id}`, { pause: value });
      refetch();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const details = [
    {
      icon: svg4,
      head: 'No. of Plans ',
      value: `${mainData?.data.length}`,
      percentage: '16'
    },
    {
      icon: svg3,
      head: 'Total Amount paid',
      value: '18,950.00',
      percentage: '1'
    },
    {
      icon: svg2,
      head: 'Package Status',
      value: `${mainData?.data[0]?.membership_id?.status}`,
      percentage: '18'
    }
  ];

  const columns = [
    {
      title: 'Plan Name',
      // dataIndex: 'name',
      key: 'planName',
      render: (record: any) => (
        <p
          onClick={() => {
            setIsShowModalOpen(true);
            setSelectedItem(record);
          }}
          className="cursor-pointer hover:text-blue-500">
          {record.name}
        </p>
      )
    },
    {
      title: 'No.of days',
      dataIndex: 'no_of_days',
      key: 'days'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 150,
      ellipsis: { showTitle: false }
    },
    {
      title: 'Pause',
      key: 'pause',
      render: (record: any) => (
        <Switch
          className="bg-red-100"
          defaultChecked={record.pause}
          onChange={(value: boolean) => {
            pauseChange(value, record._id);
          }}
        />
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Offer Amount',
      dataIndex: 'offer_amount',
      key: 'offerAmount'
    },
    {
      title: 'Status',
      key: 'sts',
      render: (record: any) => (
        <Switch
          defaultChecked={record?.status}
          className="bg-red-200"
          onChange={(value: boolean) => {
            statusChange(value, record._id);
          }}
        />
      )
    },
    {
      title: '',
      key: 'edit',
      width: 70,
      render: (record: any) => (
        <p
          onClick={() => {
            setIsShowModalOpen(true);
            setIsEdit(true);
            setSelectedItem(record);
          }}
          className="text-blue-500 underline cursor-pointer">
          Edit
        </p>
      )
    }
  ];

  return (
    <div>
      <div className=" bg-[#F2F2F2] px-2 sm:px-10 md:px-16 pb-10 ">
        <PageHeader details={details} name={mainData?.data[0]?.membership_id?.name} />
        {/* Table Section */}
        <div className="w-fit sm:w-auto bg-white p-10 mb-8">
          <div className="flex items-center justify-between pb-5   ">
            {/* <div className='flex items-center pb-5 justify-between bg-green-200 '> */}
            <div className="font-bold   flex  items-center gap-5">
              <h1 className="text-[22px]">Plans </h1>
              <div
                className="bg-black text-white flex items-center gap-2 w-[94px] h-[28px] text-[12px]  justify-center font-normal rounded-sm shadow-lg cursor-pointer"
                onClick={() => setIsModalOpen(true)}>
                <p>Add New</p>
                <BiPlus />
              </div>
            </div>

            <div className="flex items-center  gap-3 mx-5">
              <div className="flex font-medium items-center gap-2">
                <h1 className="text-[16px]">Original Price</h1>
                <div className="bg-[#f2f2f2] shadow-sm rounded-sm flex items-center justify-center w-[96px] h-[38px]">
                  <h1>{mainData?.data[0]?.membership_id?.originalPrice}</h1>
                </div>
              </div>

              <div className="flex font-medium items-center gap-2">
                <h1 className="text-[16px]">Offer Price</h1>
                <div className="bg-[#f2f2f2] shadow-sm rounded-sm flex items-center justify-center w-[96px] h-[38px]">
                  <h1>{mainData?.data[0]?.membership_id?.effectiveAmount}</h1>
                </div>
              </div>

              {/* <div className="flex font-medium items-center rounded-sm gap-2 bg-[#19191966] h-[38px] w-[54px] justify-center ">
                  <h1 className="text-[12px] text-white">Save</h1>
                </div> */}
            </div>

            {/* </div> */}
            <div className="flex items-center mt-5">
              <Form>
                <Form.Item label="" name="sort" className="text-start" labelCol={{ span: 7 }}>
                  <Select
                    style={{ width: 154, height: 38, color: 'black' }}
                    defaultValue={{
                      value: '',
                      label: ' Sort by:Default'
                      // ${(<span className='font-bold'>Latest</span>)}
                    }}
                    // onChange={handleChange}
                    options={[
                      {
                        value: 'Latest',
                        label: 'latest',
                        name: 'latest'
                      },
                      {
                        value: 'Last month',
                        label: 'lastMonth',
                        name: 'lastMonth'
                      },
                      {
                        value: 'Earliest',
                        label: 'earliest',
                        name: 'earliest'
                      }
                    ]}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="">
            <Table
              columns={columns}
              dataSource={mainData?.data}
              //   dataSource={tableData}
              pagination={{ pageSize: 10 }}
              // scroll={{ x: 1500, y: 300 }}
              className=""
            />
          </div>
        </div>
      </div>
      {/* <<<<<<<< ADD PLANS >>>>>>> */}
      <Modal
        title=" "
        width={700}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}>
        <AddPlans save={setIsModalOpen} data={selectedItem} />
      </Modal>
      {/* <<<<<<<<< SHOW OR EDIT PLANS >>>>>>>>>> */}
      <Modal
        title=" "
        width={700}
        open={isShowModalOpen}
        onCancel={() => {
          setIsShowModalOpen(false);
          setIsEdit(false);
        }}
        footer={false}>
      <ShowModal data={selectedItem} edit={isEdit} update={{setIsShowModalOpen,setIsEdit}} />
      </Modal>
    </div>
  );
};

export default Plans;
