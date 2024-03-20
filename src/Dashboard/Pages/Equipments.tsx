/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Modal, Switch, Table } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import svg2 from '../../../public/svg2-onlypass.svg';
import svg3 from '../../../public/svg3-onlypass.svg';
import svg4 from '../../../public/svg4-onlypass.svg';
import { ApiClientPrivate } from '../../utils/axios';
import AddEquipments from '../components/Equipments/AddEquipments';
import PageHeader from '../components/common_components/PageHeader';
import { useQuery } from 'react-query';
import UpdateEquipment from '../components/Equipments/UpdateEquipment';

interface Equipment {
  key: string;
  name: string;
  _id: string;
  image: string;
}
const Equipments: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);
  const [propsData, setPropsData] = useState();
  const [equipmentsData, setEquipmetsData] = useState([]);
  const [filteredData, setFilteredData] = useState<Equipment[]>([]);

  // Equipment Data Fatching.......
  const fetchEquipments = () => {
    return ApiClientPrivate.get(`/equipments/all-equipment`);
    // return response;
  };
  const { data: mainData, refetch } = useQuery('fetchEquipments', fetchEquipments);
  // console.log('equipments data :', mainData?.data);

  // assign fetched data to states
  useEffect(() => {
    setEquipmetsData(mainData?.data);
    setFilteredData(mainData?.data);
  }, [mainData, refetch]);

  console.log({ mainData });

  // this useEffect for if add or update an equipment then refresh the data
  useEffect(() => {
    refetch();
  }, [isModalVisible, isUpdateModal, refetch]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lowerCasedValue = value.toLowerCase();
    const filtered = equipmentsData.filter((item: any) =>
      item.name.toLowerCase().includes(lowerCasedValue)
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
      await ApiClientPrivate.put(`/equipments//update-equipment/${id}`, { status: value });
      refetch();
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
      title: 'Image',
      key: 'Image',
      render: (record: any) => (
        <img src={`${record.image} `} alt="image" className="w-[48px] bg-gray-100" />
      )
      // width: 100
    },
    {
      title: 'Name',
      key: 'name',
      // width: 250,
      render: (record: any) => (
        <h1
          className="font-medium text-base hover:text-blue-800 hover:underline cursor-pointer"
          onClick={() => {
            setIsUpdateModal(true);
            setPropsData(record);
          }}>
          {record.name}
        </h1>
      )
    },
    {
      title: 'Descriptions',
      // dataIndex: 'descriptions',
      key: 'descriptions',
      render: (record: any) => (
        <p>{record.description !== 'undefined' ? record.description : ''}</p>
      ),
      // width: 250,
      ellipsis: { showTitle: false }
    },
    {
      title: 'Status',
      key: 'action',
      render: (record: any) => {
        console.log({ record });

        return (
          <Switch
            size="small"
            defaultChecked={record.status}
            onChange={(value: boolean) => statusChange(value, record._id)}
            className="bg-red-200"
          />
        );
      }
    }
    // {
    //   title: 'Options',
    //   key: 'action',
    //   render: (record: any) => (
    //     <div
    //       className=" text-blue-500 underline cursor-pointer  "
    //       // onClick={() => handleEditClick(record)}
    //     >
    //       Edit
    //     </div>
    //   )
    // }
    // {
    //   // title: 'Enable/ Disable',
    //   key: 'action',
    //   render: (record: any) => (
    //     <p
    //       className="text-blue-500 underline cursor-pointer"
    //       onClick={() => deleteEquipment(record._id)}>
    //       Delete
    //     </p>
    //   )
    // }
  ];

  // this function for delete equipment
  // const deleteEquipment = async (id: string) => {
  //   try {
  //     const res = await ApiClientPrivate.delete(`/equipments/delete-equipment/${id}`);
  //     if (res) {
  //       refetch();
  //     }
  //   } catch (error) {
  //     alert('cannot delete amenities ');
  //   }
  // };

  return (
    <div className=" bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
      <PageHeader details={details} name={'Equipments'} searchFunction={onChangeSearch} />
      {/* table-Secion */}
      <div className="w-full overflow-x-scroll bg-white p-4 md:p-10 ">
        <div className="section1 flex items-center gap-1 lg:gap-5 h-[70px] py-16 px-3   ">
          <div className="heading font-bold  text-[20px] lg:text-[22px]">
            <h1>Equipment List </h1>
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

      {/* this modal for add equipment */}
      <Modal
        title=""
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={false}>
        <AddEquipments modalClose={setIsModalVisible} />
      </Modal>

      {/* this modal for update equipment */}
      <Modal
        title=""
        open={isUpdateModal}
        onCancel={() => {
          setIsUpdateModal(false);
        }}
        footer={false}>
        <UpdateEquipment data={propsData} modalClose={setIsUpdateModal} />
      </Modal>
    </div>
  );
};

export default Equipments;
