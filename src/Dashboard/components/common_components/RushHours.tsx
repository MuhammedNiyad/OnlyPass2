/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../Redux/hooks';
import { useState } from 'react';
import { IoTimeOutline } from 'react-icons/io5';
import { setRushHours } from '../../Redux/Features/FacilityFeature/FacilititySlice';

const RushHours = () => {
  const { rushHours } = useAppSelector((state) => state.facility);
  const dispatch = useDispatch();

  console.log('rish hours ==', rushHours);

  return (
    <div className="flex gap-[70px] items-center mt-3">
      <p className="text-[#7E7E7E] font-montserrat">Rush Hours</p>
      <div className="flex gap-3">
        <div className="flex flex-col gap-2">
          <TimeMorning data={rushHours} holder={'start'} timeType={'morning'} />
          <TimeMorning data={rushHours} holder={'end'} timeType={'morning'} />
        </div>
        <div className="flex flex-col gap-2">
          <TimeEvening data={rushHours} holder={'start'} timeType={'evening'} />
          <TimeEvening data={rushHours} holder={'end'} timeType={'evening'} />
        </div>
      </div>
    </div>
  );
};

const timeAM = [
  {
    time: '12:00 am'
  },
  {
    time: '12:30 am'
  },
  {
    time: '1:00 am'
  },
  {
    time: '1:30 am'
  },
  {
    time: '2:00 am'
  },
  {
    time: '2:30 am'
  },
  {
    time: '3:00 am'
  },
  {
    time: '3:30 am'
  },
  {
    time: '4:00 am'
  },
  {
    time: '4:30 am'
  },
  {
    time: '5:00 am'
  },
  {
    time: '5:30 am'
  },
  {
    time: '6:00 am'
  },
  {
    time: '6:30 am'
  },
  {
    time: '7:00 am'
  },
  {
    time: '7:30 am'
  },
  {
    time: '8:00 am'
  },
  {
    time: '8:30 am'
  },
  {
    time: '9:00 am'
  },
  {
    time: '9:30 am'
  },
  {
    time: '10:00 am'
  },
  {
    time: '10:30 am'
  },
  {
    time: '11:00 am'
  },
  {
    time: '11:30 am'
  },
  {
    time: '12:00 pm'
  }
];

export const TimeMorning = (props: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const dispatch = useDispatch();
  const handleTimeClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTimeSelect = (value: { time: string; holder: string; timeType: string }) => {
    setSelectedTime(value.time);
    setIsDropdownOpen(false);
    // console.log({ props, value });
    const updatedTimeData = {
      ...props.data,
      [value.timeType]: {
        ...props.data[value.timeType],
        [value.holder]: value.time
      }
    };

    dispatch(setRushHours(updatedTimeData));
  };

  return (
    <div className="relative">
      <IoTimeOutline size={20} className="absolute top-[20%] right-[5px] text-gray-400 fon" />
      <input
        type="text"
        placeholder={props.holder}
        className="md:w-[150px] w-[120px] border rounded-none px-2 py-1 focus:outline outline-blue-400 focus:shadow-md placeholder-gray-300 placeholder:font-light "
        onClick={handleTimeClick}
        value={props.disabled ? '' : selectedTime || props.defValue}
        disabled={props.disabled}
        readOnly
      />
      {isDropdownOpen && (
        <div className="absolute mt-1 bg-white border rounded-none shadow-md z-10 overflow-scroll w-[100px] h-44 overflow-x-hidden md:w-[150px] ">
          {timeAM.map((time) => (
            <div
              key={time.time}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() =>
                handleTimeSelect({
                  time: time.time,
                  holder: props.holder,
                  timeType: props.timeType
                })
              }>
              {time.time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const timePM = [
  {
    time: '12:00 pm'
  },
  {
    time: '12:30 pm'
  },
  {
    time: '1:00 pm'
  },
  {
    time: '1:30 pm'
  },
  {
    time: '2:00 pm'
  },
  {
    time: '2:30 pm'
  },
  {
    time: '3:00 pm'
  },
  {
    time: '3:30 pm'
  },
  {
    time: '4:00 pm'
  },
  {
    time: '4:30 pm'
  },
  {
    time: '5:00 pm'
  },
  {
    time: '5:30 pm'
  },
  {
    time: '6:00 pm'
  },
  {
    time: '6:30 pm'
  },
  {
    time: '7:00 pm'
  },
  {
    time: '7:30 pm'
  },
  {
    time: '8:00 pm'
  },
  {
    time: '8:30 pm'
  },
  {
    time: '9:00pm'
  },
  {
    time: '9:30pm'
  },

  {
    time: '10:00 pm'
  },
  {
    time: '10:30 pm'
  },
  {
    time: '11:00 pm'
  },
  {
    time: '11:30 pm'
  },
  {
    time: '12:00 am'
  }
];

export const TimeEvening = (props: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const dispatch = useDispatch();

  const handleTimeClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTimeSelect = (value: { time: string; holder: string; timeType: string }) => {
    setSelectedTime(value.time);
    setIsDropdownOpen(false);
    // console.log({ value });
    const updatedTimeData = {
      ...props.data,
      [value.timeType]: {
        ...props.data[value.timeType],
        [value.holder]: value.time
      }
    };

    dispatch(setRushHours(updatedTimeData));
  };

  return (
    <div className="relative">
      <IoTimeOutline size={20} className="absolute top-[20%] right-[5px] text-gray-400 fon" />
      <input
        type="text"
        placeholder={props.holder}
        className="md:w-[150px] w-[120px] border rounded-none px-2 py-1 focus:outline outline-blue-400 focus:shadow-md placeholder-gray-300 placeholder:font-light"
        onClick={handleTimeClick}
        value={props.disabled ? '' : selectedTime || props.defValue}
        disabled={props.disabled}
        readOnly
      />
      {isDropdownOpen && (
        <div className="absolute mt-1 bg-white border rounded-none shadow-md z-10 overflow-scroll w-[100px] h-44 overflow-x-hidden md:w-[150px] ">
          {timePM.map((time) => (
            <div
              key={time.time}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() =>
                handleTimeSelect({
                  time: time.time,
                  holder: props.holder,
                  timeType: props.timeType
                })
              }>
              {time.time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RushHours;
