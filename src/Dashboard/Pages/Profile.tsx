import { FaEdit } from 'react-icons/fa';
import { store } from '../Redux/store';
import { Table } from 'antd';
import { useQuery } from 'react-query';
import { ApiClientPrivate } from '../../utils/axios';

const Profile = () => {
  const userDetails = store.getState().logedUser.currentUser.userDetails;
  const accessToken = store.getState().logedUser.currentUser.accessToken;

  console.log(accessToken);

  const fetchUsers = () => {
    return ApiClientPrivate.get(`/user/all`, {
      headers: {
        token: `Bearer ${accessToken}`
      }
    });
    // return response;
  };
  const { data: mainData, refetch } = useQuery('fetchUsers', fetchUsers);

  console.log('users:', mainData);

  const columns = [
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Profile</div>,
      key: 'profile',
      render: (record: any) => <img className="w-14" src={record.profile} alt={record.profile} />
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">User name</div>,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Email</div>,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]"></div>,
      key: 'remove',
      render: () => <p className="text-blue-500 underline cursor-pointer">remove</p>
    }
  ];

  return (
    <div>
      <div className="py-10 px-5">
        <div className="text-xl md:text-3xl font-semibold py-4">
          <h1>My Profile</h1>
        </div>
        <div className="flex">
          <div className="reletive w-48">
            <img src={userDetails.profile} alt="profile" className="w-48" />
            <button className="absolute top-[150px] z-20 left-[450px] rounded-full bg-lime-300 p-2">
              <FaEdit />
            </button>
          </div>
          <div className="text-justify flex flex-col justify-center">
            <h1 className="text-2xl font-medium">{userDetails.name}</h1>
            <p className="text-sm">{userDetails.isAdmin === true ? 'Admin' : 'Staff'}</p>
          </div>
        </div>
        <div className="">
          <div>
            <p className="flex justify-center items-center cursor-pointer ">
              <span>
                <FaEdit />
              </span>
              Edit profile
            </p>
            <div className="Basic_info_detail mt-3 gap-2 flex items-center m-3 p-1">
              <div className="label w-[150px]">
                <h1>User name</h1>
              </div>
              <div className="input bg-white flex gap-3 items-center font-medium">
                <p>{userDetails.name}</p>
              </div>
            </div>
            <div className="Basic_info_detail mt-3 gap-2 flex items-center m-3 p-1">
              <div className="label w-[150px]">
                <h1>Email</h1>
              </div>
              <div className="input bg-white flex gap-3 items-center font-medium">
                <p>{userDetails.email}</p>
              </div>
            </div>
            <div className="Basic_info_detail mt-3 gap-2 flex items-center m-3 p-1">
              <div className="label w-[150px]">
                <h1>Password</h1>
              </div>
              <div className="input bg-white flex gap-3 items-center font-medium">
                <p className="font-semibold underline cursor-pointer text-blue-500">
                  Change password
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${userDetails.isAdmin === true ? 'block' : 'hidden'} p-5`}>
          <h1 className="text-xl font-medium py-5">Users Details</h1>
          <div className="p-5">
            <Table
              columns={columns}
              dataSource={mainData?.data}
              pagination={{ pageSize: 10 }}
              className="font-montserrat"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
