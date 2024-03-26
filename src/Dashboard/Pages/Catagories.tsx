/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Switch, Table } from 'antd';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useQuery } from 'react-query';
import svg2 from '../../../public/svg2-onlypass.svg';
import svg3 from '../../../public/svg3-onlypass.svg';
import svg4 from '../../../public/svg4-onlypass.svg';
import { ApiClientPrivate } from '../../utils/axios';
import PageHeader from '../components/common_components/PageHeader';

import AddCategory from '../components/Category/AddCategory';
import EditCategory from '../components/Category/EditCategory';

interface Categories {
  _id: string;
  category_name: string;
  description: string;
  status: boolean;
  logo: string;
}

function Catagories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryData, setCategoryData] = useState<Categories[]>([]);
  const [filteredData, setFilteredData] = useState<Categories[]>([]);
  const [selectedData, setSelectedData] = useState<Categories | null>(null);

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
      title: () => <div className="font-montserrat text-[#7E7E7E]">Logo</div>,
      key: 'logo',
      render: (record: any) => <img src={record.logo} alt="logo" className="w-[48px] bg-gray-100" />
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Category Name</div>,
      //   dataIndex: 'tier_name',
      key: 'tier_name',
      render: (record: any) => (
        <h1
          className="font-medium text-base font-montserrat hover:text-blue-800 hover:underline cursor-pointer"
          onClick={() => {
            setOpenEditModal(true);
            setSelectedData(record);
          }}>
          {record.category_name}
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

  const fetchCategory = () => {
    return ApiClientPrivate.get('/category/all-category');
    // return response;
  };
  const { data: mainData, refetch } = useQuery('fetchCategory', fetchCategory);

  // assign fetched data to states
  useEffect(() => {
    setCategoryData(mainData?.data);
    setFilteredData(mainData?.data);
  }, [mainData, refetch]);

  // this useEffect for if add or update an amenity then refresh the data
  useEffect(() => {
    refetch();
  }, [isModalOpen, refetch]);

  const onChangeSearch = (e: any) => {
    const value = e.target.value;
    const lowerCasedValue = value.toLowerCase();
    const filtered = categoryData.filter((item) =>
      item.category_name.toLowerCase().includes(lowerCasedValue)
    );

    setFilteredData(filtered);
  };

  const tableData = filteredData?.map((It: any, i: number) => ({
    ...It,
    key: i + 1
  }));

  const statusChange = async (value: boolean, id: string) => {
    // console.log(`switch to ${value}`);
    try {
      await ApiClientPrivate.put(`/category/update/${id}`, { status: value });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className=" bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
        <PageHeader details={details} name={'Categories'} searchFunction={onChangeSearch} />
        {/* Table Section */}
        <div className="w-full overflow-x-scroll bg-white p-4 md:p-10 ">
          <div className="mainDev flex md:flex-row flex-col items-center md:justify-between justify-start mb-10 ">
            <div className="section1 flex items-center gap-3 lg:gap-5  px-3 ">
              <div className="heading font-bold  text-[20px] lg:text-[22px]">
                <h1>Categories </h1>
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

      {/* add category modal */}
      <Modal title="" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false}>
        <AddCategory modalClose={setIsModalOpen} />
      </Modal>

      {/* add category edit modal */}
      <Modal title="" open={openEditModal} onCancel={() => setOpenEditModal(false)} footer={false}>
        <EditCategory data={selectedData} modalClose={setOpenEditModal} />
      </Modal>
    </div>
  );
}

export default Catagories;
