/* eslint-disable prettier/prettier */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Input, Modal, Switch, Table, Upload } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { PiPlusCircle } from 'react-icons/pi';
import { ApiClientPrivate } from '../../utils/axios';
import { imaageURL } from '../../utils/urls';
import { RiSearchLine } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import PageHeader from '../components/common_components/PageHeader';
import svg2 from '../../../public/svg2-onlypass.svg';
import svg3 from '../../../public/svg3-onlypass.svg';
import svg4 from '../../../public/svg4-onlypass.svg';
import { BiPlus } from 'react-icons/bi';
import AddEquipments from '../components/Equipments/AddEquipments';

interface Equipment {
  key: string;
  name: string;
  _id: string;
  image: string;
}
const { Meta } = Card;
const Equipments: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newEquipmentName, setNewEquipmentName] = useState<string>('');
  const [newEquipmentImage, setNewEquipmentImage] = useState<File | null>(null);
  const [equipmentsData, setEquipmetsData] = useState([]);
  const [filteredData, setFilteredData] = useState<Equipment[]>([]);
  const fetchData = async () => {
    try {
      const res = await ApiClientPrivate.get('/equipments/all-equipment');
      console.log(res.data);
      setEquipmetsData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log('equi' , equipmentsData);
  // const onChange = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleAddEquipment = async () => {
    try {
      // console.log("fiii",{newEquipmentImage});
      const formData = new FormData();
      formData.append('name', newEquipmentName);
      formData.append('image', newEquipmentImage as File);

      await ApiClientPrivate.post('/equipments/create-equipments', formData, {
        headers: {
          'Content-Type': 'form-data'
        }
      });
      // Fetch updated data from the server after adding a new equipment
      fetchData();
      console.log('Equipment added:', newEquipmentName, newEquipmentImage);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onEquipmentNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEquipmentName(e.target.value);
  };
  const onEquipmentImageChange = (info: any) => {
    try {
      const imageUrl = info.file;
      console.log({ suiii: info });

      setNewEquipmentImage(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
      // dataIndex: 'key',
      key: 'Image',
      render: (record: any) => (
        <img src={`${record.icon} `} alt="icon" className="w-[48px] bg-gray-100" />
      ),
      width: 100
    },
    {
      title: 'Name',
      // dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (record: any) => <h1 className="font-medium text-base">{record.name}</h1>
    },
    {
      title: 'Descriptions',
      // dataIndex: 'descriptions',
      key: 'descriptions',
      render: (record: any) => <p>{record.description}</p>,
      width: 250,
      ellipsis: { showTitle: false }
    },
    {
      title: 'Status',
      key: 'action',
      render: (record: any) => (
        <Switch
          size="small"
          defaultChecked={record.status}
          // onChange={(value: boolean) => statusChange(value, record._id)}
          className="bg-red-200"
        />
      )
    },
    {
      title: 'Options',
      key: 'action',
      render: (record: any) => (
        <div
          className=" text-blue-500 underline cursor-pointer  "
          // onClick={() => handleEditClick(record)}
        >
          Edit
        </div>
      )
    }
    // {
    //   // title: 'Enable/ Disable',
    //   key: 'action',
    //   render: (record: any) => (
    //     <MdDeleteForever
    //       size={20}
    //       className="hover:text-red-300 scale-100 hover:scale-110 duration-200"
    //       onClick={() => deleteEquipment(record._id)}
    //     />
    //   )
    // }
  ];

  // const deleteEquipment = async (id: string) => {
  //   try {
  //     const res = await ApiClientPrivate.delete(`/equipments/delete-equipment/${id}`);
  //     if (res) {
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     alert('cannot delete amenities ');
  //   }
  // };

  return (
    <div className=" bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
      <PageHeader details={details} name={'Equipments'} searchFunction={onChangeSearch} />
      {/* table-Secion */}
      <div className="bg-white">
        <div className="section1 flex items-center gap-1 lg:gap-5 h-[70px] py-16 px-3   ">
          <div className="heading font-bold  text-[20px] lg:text-[22px]">
            <h1>Equipment List </h1>
          </div>
          <div className="buttonDev">
            <div
              className="bg-black text-white flex items-center gap-2 w-[94px] h-[28px] text-[12px]  justify-center font-normal rounded-sm shadow-lg "
              onClick={showModal}>
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

      <Modal title="" open={isModalVisible} onCancel={handleCancel} footer={false}>
        <AddEquipments isModalVisible={setIsModalVisible} />
      </Modal>
    </div>
  );
};

export default Equipments;
