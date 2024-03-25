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

import React from 'react'

interface Categories {
    _id: string;
    category_name: string;
    description: string;
    status:boolean;
    logo:string;
  }

function Catagories() {

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
  return (
    <div>
      <div className=" bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
        <PageHeader
          details={details}
          name={'Tier Management'}
            //  searchFunction={onChangeSearch}
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
                //   onClick={() => setIsModalOpen(true)}
                  >
                  <p>Add New</p>
                  <BiPlus />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Table
            //   columns={columns}
            //   dataSource={tableData}
              pagination={{ pageSize: 10 }}
              className="font-montserrat"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catagories