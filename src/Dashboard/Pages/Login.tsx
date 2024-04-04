/* eslint-disable prettier/prettier */

import { useState } from 'react';
import { LuUserCircle } from 'react-icons/lu';
import { MdLockOpen, MdLockOutline } from 'react-icons/md';
import { ApiClientPrivate } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/Features/userSlice';
import { useNavigate } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginData[]>([]);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setShowError(false);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await ApiClientPrivate.post('/user/login', formData);
      console.log({ 'user loged:': res.data });
      dispatch(setCurrentUser(res.data))
      navigate('/Facilities');
    } catch (error: any) {
      console.log({ message: error.message });
      setShowError(true);
    }
  };

  console.log({ FormData: formData });

  return (
    <div>
      <div className="bg-slate-100 w-1/2 m-auto mt-32 py-20 px-16 md:px-36 relative">
        <h3 className="font-montserrat text-xl text-center uppercase">Login in</h3>
        {showError === true ? (
          <p className="text-center text-red-700">Incorrect username or password</p>
        ) : null}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col justify-center items-center mt-3">
          {/* User name */}
          <div className="input-box relative w-full h-[50px] border-b-2 border-black my-[10px]">
            <span className="icon absolute top-4 right-1 text-[1.5em]">
              <LuUserCircle />
            </span>
            <input
              type="email"
              required
              // defaultValue={showError === true ? "": ''}
              className="h-16 text-xl w-[250px] sm:w=[300px] md:w-[350px] bg-transparent border-none outline-none pl-2"
              id="email"
              onChange={handleChange}
            />
            <label className="absolute top-2 left-[2px] -translate-y-1/2 duration-300">
              Email:
            </label>
          </div>
          {/* Password */}
          <div className="input-box relative w-full h-[50px] border-b-2 border-black my-[10px]">
            <span
              className="icon absolute cursor-pointer top-4 right-1 text-[1.5em]"
              onClick={() => setShowPassword((prevState) => !prevState)}>
              {showPassword === false ? <MdLockOutline /> : <MdLockOpen />}
            </span>
            <input
              type={showPassword === false ? 'password' : 'text'}
              required
              className="h-16 text-xl w-[250px] sm:w=[300px] md:w-[350px] bg-transparent border-none outline-none pl-2"
              id="password"
              onChange={handleChange}
            />
            <label className="absolute -top-2 left-[2px] translate-y-1">Password:</label>
          </div>
          <button type="submit" className="btn uppercase cursor-pointer mt-3 py-2 px-5 bg-black text-white ">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
