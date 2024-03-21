/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Modal, Switch, Table } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
// import { FaEdit } from 'react-icons/fa';
// import { MdDeleteForever } from 'react-icons/md';
import { useQuery } from 'react-query';
import svg2 from '../../../public/svg2-onlypass.svg';
import svg3 from '../../../public/svg3-onlypass.svg';
import svg4 from '../../../public/svg4-onlypass.svg';
import { ApiClientPrivate } from '../../utils/axios';
import AddAmenities from '../components/Amenities/AddAmenities';
import UpdateAmenities from '../components/Amenities/UpdateAmenities';
import PageHeader from '../components/common_components/PageHeader';
interface Amenity {
  key: string;
  name: string;
  description: string;
}

const Amenities: React.FC = () => {
  const [amentyData, setAmentyData] = useState<Amenity[]>([]);
  const [filteredData, setFilteredData] = useState<Amenity[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState<boolean>(false);
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

  // Amenities Data Fatching.......
  const fetchAmenity = () => {
    return ApiClientPrivate.get(`/amenities`);
    // return response;
  };
  const { data: mainData, refetch } = useQuery('fetchAmenity', fetchAmenity);
  // console.log('equipments data :', mainData?.data);

  // assign fetched data to states
  useEffect(() => {
    setAmentyData(mainData?.data);
    setFilteredData(mainData?.data);
  }, [mainData, refetch]);

  // this useEffect for if add or update an amenity then refresh the data
  useEffect(() => {
    refetch();
  }, [isModalVisible, isUpdateModalOpen, refetch]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lowerCasedValue = value.toLowerCase();
    const filtered = amentyData.filter((item) => item.name.toLowerCase().includes(lowerCasedValue));

    setFilteredData(filtered);
  };

  const tableData = filteredData?.map((It: any, i: number) => ({
    ...It,
    key: i + 1
  }));

  const statusChange = async (value: boolean, id: string) => {
    // console.log(`switch to ${value}`);
    try {
      await ApiClientPrivate.put(`/amenities/update-amenities/${id}`, { status: value });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const details = [
    {
      icon: svg4,
      head: 'Total Customer',
      value: '5,423',
      percentage: '16'
    },
    {
      icon: svg3,
      head: 'Membership Sold',
      value: '1893',
      percentage: '1'
    },
    {
      icon: svg2,
      head: 'Active Now',
      value: '189',
      percentage: '39'
    }
  ];

  const columns = [
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Icon</div>,
      // dataIndex: 'key',
      key: 'Image',
      render: (record: any) => (
        <img src={`${record.icon} `} alt="icon" className="w-[48px] bg-gray-100" />
      )
      // width: 100
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Name</div>,
      // dataIndex: 'name',
      key: 'name',
      // width: 250,
      render: (record: any) => (
        <h1
          className="font-medium text-base font-montserrat hover:text-blue-800 hover:underline cursor-pointer"
          onClick={() => {
            setisUpdateModalOpen(true);
            setSelectedAmenity(record);
          }}>
          {record.name}
        </h1>
      )
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Description</div>,
      // dataIndex: 'descriptions',
      key: 'descriptions',
      render: (record: any) => (
        <p className="font-montserrat">
          {record.description !== 'undefined' ? record.description : ''}
        </p>
      ),
      // width: 250,
      ellipsis: { showTitle: false }
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Status</div>,
      key: 'action',
      render: (record: any) => (
        <Switch
          size="small"
          defaultChecked={record.status}
          onChange={(value: boolean) => statusChange(value, record._id)}
          className="bg-red-200"
        />
      )
    }
    // {
    //   title: 'Options',
    //   key: 'action',
    //   render: (record: any) => (
    //     <div
    //       className=" text-blue-500 underline cursor-pointer  "
    //       onClick={() => handleEditClick(record)}>
    //       Edit
    //     </div>
    //   )
    // },
    // {
    //   // title: 'Enable/ Disable',
    //   key: 'action',
    //   render: (record: any) => (
    //     <p
    //       className="text-blue-500 underline cursor-pointer"
    //       onClick={() => {
    //         deleteAmenities(record._id);
    //       }}>
    //       Delete
    //     </p>
    //   )
    // }
  ];

  // this function for delete amenities
  // const deleteAmenities = async (id: string) => {
  //   // console.log('mm', id);

  //   try {
  //     const res = await ApiClientPrivate.delete(`/amenities/remove/${id}`);
  //     if (res) {
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     alert('cannot delete amenities ');
  //   }
  // };

  return (
    <div className="bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
      <PageHeader details={details} name={'Amenities'} searchFunction={onChangeSearch} />
      {/* table-Secion */}
      <div className="w-full overflow-x-scroll bg-white p-4 md:p-10">
        <div className="section1 flex items-center gap-1 lg:gap-5 h-[70px] py-16 px-3   ">
          <div className="heading font-bold  text-[20px] lg:text-[22px]">
            <h1>Amenities List </h1>
          </div>
          <div className="buttonDev">
            <div
              className="bg-black cursor-pointer text-white flex items-center gap-2 w-[94px] h-[28px] text-[12px]  justify-center font-normal rounded-sm shadow-lg "
              onClick={() => setIsModalVisible(true)}>
              <p>Add New</p>
              <BiPlus />
            </div>
          </div>
        </div>
        <div className="p-5">
          <Table
            columns={columns}
            dataSource={tableData} // Use filteredData instead of amentyData
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      {/* Add modal */}
      <Modal
        title=""
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={false}>
        <AddAmenities modalClose={setIsModalVisible} />
      </Modal>

      {/* edit modal */}
      <Modal
        title=""
        open={isUpdateModalOpen}
        onCancel={() => setisUpdateModalOpen(false)}
        footer={false}>
        <UpdateAmenities data={selectedAmenity} modalClose={setisUpdateModalOpen} />
      </Modal>
    </div>
  );
};

export default Amenities;
