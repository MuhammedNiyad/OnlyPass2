import { Button, Form, Input, Modal, Table, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { ApiClientPrivate } from '../../utils/axios';
import { store } from '../Redux/store';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../Redux/Features/userSlice';
import { useNavigate } from 'react-router-dom';

interface user {
  _id: string;
  name: string;
  email: string;
  profile: string;
  isAdmin: boolean;
}

const Profile = () => {
  const accessToken = store.getState().logedUser.accessToken;
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<user | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);

  // console.log(accessToken);

  const fetchUser = () => {
    return ApiClientPrivate.get('/user/user-one', {
      headers: {
        token: `Barrior ${accessToken}`
      }
    });
  };

  const { data: userData, refetch: userRefetch } = useQuery('fetchUser', fetchUser);

  useEffect(() => {
    if (userData) {
      setUserDetails(userData?.data);
    }
  }, [userData]);

  const fetchUsers = () => {
    return ApiClientPrivate.get(`/user/all`, {
      headers: {
        token: `Barrior ${accessToken}`
      }
    });
    // return response;
  };
  const { data: usersData, refetch: usersRefetch } = useQuery('fetchUsers', fetchUsers);

  const filteredUsersData = usersData?.data.filter((user: any) => !user.isAdmin);

  // console.log('users:', usersData);

  const columns = [
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Profile</div>,
      key: 'profile',
      render: (record: any) => (
        <img className="w-14 h-14" src={record.profile} alt={record.profile} />
      )
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
      render: (record: any) => (
        <p
          className="text-blue-500 underline cursor-pointer"
          onClick={() => removeUser(record._id)}>
          remove
        </p>
      )
    }
  ];

  const handleProfileUpload = async () => {
    // e.preventDefault();

    console.log('image in upload:', imageFile);

    if (!imageFile) {
      alert('Please select an image for Upload');
      return;
    }

    const formData = new FormData();
    formData.append('profile', imageFile);
    console.log(formData);

    try {
      await ApiClientPrivate.put(`/user/update`, formData, {
        headers: {
          token: `Barrior ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      userRefetch();
      setImageFile(null);
    } catch (error) {
      alert('An error occurred while uploading the image. Please try again.');
    }
  };

  const handleProfileChange = (e: any) => {
    // console.log(e.file);
    const newProfileFile = e.file;
    setImageFile(newProfileFile);
    // console.log('new profile:::', e.file);
    handleProfileUpload();
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate('/');
  };

  const handleFormSubmit = async (value: any) => {
    // console.log(value);

    await ApiClientPrivate.put('/user/update', value, {
      headers: {
        token: `Barrior ${accessToken}`
        // 'Content-Type': 'multipart/form-data'
      }
    });
    // console.log('success');
    setOpenEditModal(false);
    userRefetch();
  };

  const createUser = async (value: any) => {
    console.log(value);
    await ApiClientPrivate.post('user/create', {
      email: value.email,
      password: value.password
    });
    console.log('success');
    setCreateUserModal(false);
    usersRefetch();
    // window.location.reload();
  };

  const removeUser = async (id: string) => {
    console.log(id);
    await ApiClientPrivate.delete(`/user/remove/${id}`, {
      headers: {
        token: `Barrior ${accessToken}`
        // 'Content-Type': 'multipart/form-data'
      }
    });
    usersRefetch();
    console.log('successfully removed');
  };

  return (
    <div>
      <div className="py-10 px-5">
        <div className="text-xl md:text-3xl font-semibold py-4">
          <h1>My Profile</h1>
        </div>
        <div className="flex gap-5">
          <div className="reletive w-40">
            <img src={userDetails?.profile} alt="profile" className=" w-36 h-36 rounded-full" />
            <div className="absolute top-[105px] z-20 left-[440px]">
              <Upload
                maxCount={1}
                beforeUpload={() => {
                  return false;
                }}
                onChange={handleProfileChange}
                showUploadList={false}>
                <button
                  className=""
                  //   disabled={remove === true}
                >
                  <FaEdit size={25} />
                </button>
              </Upload>
            </div>
          </div>
          <div className="text-justify flex flex-col justify-center items-start">
            <h1 className="text-2xl font-medium">{userDetails?.name}</h1>
            <p className="text-sm">{userDetails?.isAdmin === true ? 'Admin' : 'Staff'}</p>
            <button
              className="text-blue-500 text-xs font-semibold underline"
              onClick={handleLogOut}>
              Log out
            </button>
          </div>
        </div>
        <div className="">
          <div>
            <p
              className="flex justify-center items-center cursor-pointer"
              onClick={() => setOpenEditModal((pre) => !pre)}>
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
                <p>{userDetails?.name}</p>
              </div>
            </div>
            <div className="Basic_info_detail mt-3 gap-2 flex items-center m-3 p-1">
              <div className="label w-[150px]">
                <h1>Email</h1>
              </div>
              <div className="input bg-white flex gap-3 items-center font-medium">
                <p>{userDetails?.email}</p>
              </div>
            </div>
            {/* <div className="Basic_info_detail mt-3 gap-2 flex items-center m-3 p-1">
              <div className="label w-[150px]">
                <h1>Password</h1>
              </div>
              <div className="input bg-white flex gap-3 items-center font-medium">
                <p className="font-semibold underline cursor-pointer text-blue-500">
                  Change password
                </p>
              </div>
            </div> */}
          </div>
        </div>
        <div className={`${userDetails?.isAdmin === true ? 'block' : 'hidden'} p-5`}>
          <h1 className="text-xl font-medium py-5">Users Details</h1>
          <p
            className="text-md text-blue-500 underline font-semibold cursor-pointer"
            onClick={() => setCreateUserModal((prev) => !prev)}>
            Create new user
          </p>
          <div className="p-5">
            <Table
              columns={columns}
              dataSource={filteredUsersData}
              pagination={{ pageSize: 10 }}
              className="font-montserrat"
            />
          </div>
        </div>
      </div>
      <Modal
        title=""
        open={openEditModal}
        onCancel={() => {
          setOpenEditModal(false);
        }}
        footer={false}>
        <Form colon={false} onFinish={handleFormSubmit}>
          <div>
            <h1 className="font-montserrat text-[#7e7e7e] font-medium text-xl mb-5">
              Update Details
            </h1>
          </div>
          <Form.Item
            label={<p className="font-montserrat text-[#7e7e7e]">Name</p>}
            name={'name'}
            //   rules={[{ required: true, message: 'Please Enter Plan Name' }]}
          >
            <Input
              name="name"
              //   value={reduxState.facilityName}
              className="md:w-[300px] rounded-none"
              placeholder="Enter Name"
              // value={newAmenityName}
              // onChange={(e) => setNewAmenityName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<p className="font-montserrat text-[#7e7e7e]">Email</p>}
            name={'email'}
            //   rules={[{ required: true, message: 'Please Enter Plan Name' }]}
          >
            <Input
              name="email"
              //   value={reduxState.facilityName}
              className="md:w-[300px] rounded-none"
              placeholder="Enter Email"
              // value={newAmenityName}
              // onChange={(e) => setNewAmenityName(e.target.value)}
            />
          </Form.Item>
          <div className="flex justify-center">
            <Button className="bg-black text-white  rounded-none" htmlType="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Create user modal */}
      <Modal
        title=""
        open={createUserModal}
        onCancel={() => {
          setCreateUserModal(false);
        }}
        footer={false}>
        <Form colon={false} onFinish={createUser} labelCol={{ span: 5 }}>
          <div>
            <h1 className="font-montserrat text-[#7e7e7e] font-medium text-xl mb-5">
              Create New User
            </h1>
          </div>
          <Form.Item
            label={<p className="font-montserrat text-[#7e7e7e]">Email</p>}
            name={'email'}
            //   rules={[{ required: true, message: 'Please Enter Plan Name' }]}
          >
            <Input
              name="email"
              //   value={reduxState.facilityName}
              className="md:w-[300px] rounded-none"
              placeholder="Enter email"
              // value={newAmenityName}
              // onChange={(e) => setNewAmenityName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<p className="font-montserrat text-[#7e7e7e]">Password</p>}
            name={'password'}
            //   rules={[{ required: true, message: 'Please Enter Plan Name' }]}
          >
            <Input
              name="password"
              //   value={reduxState.facilityName}
              className="md:w-[300px] rounded-none"
              placeholder="Enter Password"
              // value={newAmenityName}
              // onChange={(e) => setNewAmenityName(e.target.value)}
            />
          </Form.Item>
          <div className="flex justify-center">
            <Button className="bg-black text-white  rounded-none" htmlType="submit">
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
