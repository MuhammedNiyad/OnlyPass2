/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Select, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import svg1 from '../../../public/svg1-onlypass.svg';
import svg2 from '../../../public/svg2-onlypass.svg';
import { ApiClientPrivate } from '../../utils/axios';
import PageHeader from '../components/common_components/PageHeader';
import { BiPlus } from 'react-icons/bi';
import Forms from './Forms';

interface FacilityData {
  key: string;
  _id: string;
  facilityName: string;
  address: string;
}

const Facilities: React.FC = () => {
  const [facilityData, setFacilityData] = useState<FacilityData[]>([]);
  const [filteredData, setFilteredData] = useState<FacilityData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data fetching.....!
  const fetchFacility = async () => {
    try {
      const res = await ApiClientPrivate.get('/facilities');
      setFacilityData(res.data);
      setFilteredData(res.data);
    } catch (error: any) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchFacility();
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lowerCasedValue = value.toLowerCase();
    const filtered = facilityData.filter(
      (item) =>
        item.facilityName.toLowerCase().includes(lowerCasedValue) ||
        item.address.toLowerCase().includes(lowerCasedValue)
    );
    setFilteredData(filtered);
  };
  const tableData = filteredData?.map((It: any, i: number) => ({
    ...It,
    key: i + 1
  }));

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const columns = [
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Logo</div>,
      key: 'logo',
      render: (record: any) => {
        // console.log(record);

        return <img src={`${record.logoUrl}`} alt="logo" className="w-10" />;
      }
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Facility Name</div>,
      key: 'facilityName',
      render: (record: any) => (
        <Link
          to={`/Facilities/FacilitiesDetails/${record._id}`}
          className="font-medium font-montserrat">
          {record.facilityName}
        </Link>
      )
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Address</div>,
      key: 'address',
      render: (record: any) => <p className="font-montserrat">{record.address}</p>
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Phone No.</div>,
      key: 'phoneNumber',
      render: (record: any) => (
        <p className="font-montserrat text-nowrap">+91 {record.phoneNumber}</p>
      )
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">OnlyPass</div>,
      key: 'action',
      render: () => <Switch defaultChecked onChange={onChange} size="small" />
    },

    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">JustGym</div>,
      key: 'action',
      render: () => <Switch defaultChecked onChange={onChange} size="small" />
    }
  ];

  const details = [
    {
      icon: svg1,
      head: 'Total no.of Facilities',
      value: '1,280',
      percentage: '16'
    },
    {
      icon: svg2,
      head: 'Live with Onlypass',
      value: '1,009',
      percentage: '1'
    },
    {
      icon: svg2,
      head: 'Coverage (kerala)',
      value: '91/1039',
      percentage: '39'
    }
  ];
  return (
    <div>
      <div className=" bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
        <PageHeader details={details} name={'Facilities'} searchFunction={onChangeSearch} />
        {/* Table Section */}
        <div className="w-full overflow-x-scroll bg-white p-4 md:p-10 ">
          <div className="mainDev flex md:flex-row flex-col items-center md:justify-between justify-start ">
            <div className="section1 flex items-center gap-3 lg:gap-5  px-3 ">
              <div className="heading font-bold  text-[20px] lg:text-[22px]">
                <h1>All Facilities </h1>
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

            <div className="section1 flex h-[70px]  ">
              <div className="dropDown font-bold  text-lg flex  items-center justify-between h-full w-full">
                <Form className=" h-full flex  gap-5 lg:gap-10 justify-end w-full ">
                  <Form.Item label="" name="filter" className="flex items-center  h-full ">
                    <Select
                      style={{ width: 154, height: 38, color: 'black' }}
                      defaultValue={{ value: '', label: 'Advance Filter' }}
                      className="font-montserrat"
                      // onChange={handleChange}

                      options={[
                        {
                          value: 'All',
                          label: 'All',
                          name: 'All'
                        },
                        {
                          value: 'Onlypass',
                          label: 'Onlypass',
                          name: 'Onlypass'
                        },
                        {
                          value: 'JustGym',
                          label: 'JustGym',
                          name: 'JustGym'
                        }
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="" name="sort" className="text-start h-full flex items-center">
                    <Select
                      style={{ width: 154, height: 38, color: 'black' }}
                      defaultValue={{
                        value: '',
                        label: ' Sort by:Default'
                        // ${(<span className='font-bold'>Latest</span>)}
                      }}
                      className="font-montserrat"
                      // onChange={handleChange}
                      options={[
                        {
                          value: 'Popular',
                          label: 'popular',
                          name: 'popular'
                        },
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
      <Modal
        title=""
        className=""
        width={700}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}>
        <Forms />
      </Modal>
    </div>
  );
};

export default Facilities;
