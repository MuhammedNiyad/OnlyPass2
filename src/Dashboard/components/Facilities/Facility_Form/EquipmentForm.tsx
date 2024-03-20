/* eslint-disable prettier/prettier */
import { Checkbox, Modal, message } from 'antd';
import { Button } from 'antd/es/radio';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApiClientPrivate } from '../../../../utils/axios';
import { prevButton } from '../../../Redux/Features/ButtonSlice';
import { setEquipments } from '../../../Redux/Features/FacilityFeature/FacilititySlice';
import { useAppSelector } from '../../../Redux/hooks';
import AddEquipments from '../../Equipments/AddEquipments';
import { useQuery } from 'react-query';

interface Equipment {
  _id: string;
  image: string;
  name: string;
}

const EquipmentForm = () => {
  const [equipmentsData, setEquipmetsData] = useState<Equipment[]>([]);
  const { equipments } = useAppSelector((state) => state.facility);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePrevious = () => {
    dispatch(prevButton());
  };

  // Equipment Data Fatching.......
  const fetchEquipments = () => {
    return ApiClientPrivate.get(`/equipments/all-equipment`);
    // return response;
  };
  const { data: mainData, refetch } = useQuery('fetchEquipments', fetchEquipments);
  console.log('equipments data :', mainData?.data);

  useEffect(()=>{
    setEquipmetsData(mainData?.data);
  },[mainData, refetch])

  useEffect(()=>{
    refetch();
  },[isModalVisible, refetch])

  // const fetchData = async () => {
  //   try {
  //     const res = await ApiClientPrivate.get('/equipments/all-equipment');
  //     // console.log(res.data);
  //     setEquipmetsData(res.data);
  //   } catch (errpr) {
  //     console.log(errpr);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // get data from redux

  const reduxState = useAppSelector((state) => state.facility);

  const handleDone = async () => {
    // console.log('done', reduxState);
    
    try {
      // create Facility
      const response = await ApiClientPrivate.post('facilities/create', reduxState, {
        headers: {
          'Content-Type': 'application/json' // Use 'application/json' for JSON data
        }
      });
      
      if (response) {
        message.success('Processing complete!');
        navigate('/Facilities');
      }
      // console.log('Facility created successfully:', response.data);
    } catch (error) {
      console.error('Error creating facility:', error);
      // Handle error appropriately
    }
  };

  const onChange = (checked: boolean, id: string, name: string, image: string) => {
    console.log('equipment id:', id, { checked });
    dispatch(setEquipments({ equipment_id: id, equipment_name: name, equipment_img: image }));
  };

  return (
    <div>
      <div className="max-w-[500px] mx-auto mt-8">
        <div className="font-semibold flex justify-between text-start font-montserrat text-2xl mb-10">
          <h1>Equipments</h1>
          <button
            className="bg-black font-montserrat text-xs rounded-none px-3 text-white "
            onClick={() => setIsModalVisible(true)}>
            {' '}
            Add
          </button>
        </div>

        <div className="List-Section font-montserrat text-[#7E7E7E]">
          {equipmentsData?.map((item, ind) => (
            <label>
              <div
                key={ind}
                className="object-section border flex items-center justify-between p-2 mb-4 bg-white rounded-md shadow-md">
                <div className="flex items-center gap-3 ">
                  <div className="image-section">
                    <img src={`${item.image}`} alt="image" className="h-16 w-20" />
                  </div>
                  <div className="Name-section">{item.name}</div>
                </div>
                <div className="flex justify-end">
                  <Checkbox
                    checked={
                      equipments.length > 0 &&
                      equipments?.find((it: any) => it.equipment_id === item._id)
                    }
                    onChange={(e) =>
                      onChange(e.target.checked, item._id, item.name, item.image)
                    }></Checkbox>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-center mt-10">
        <Button className="bg-white rounded-none font-montserrat " onClick={handlePrevious}>
          Previous
        </Button>
        <Button
          className="bg-black rounded-none font-montserrat text-white "
          onClick={handleDone}>
          Done
        </Button>
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
    </div>
  );
};

export default EquipmentForm;
