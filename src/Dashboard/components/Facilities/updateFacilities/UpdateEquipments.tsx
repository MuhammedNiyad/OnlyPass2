/* eslint-disable prettier/prettier */
import { Button, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { ApiClientPrivate } from '../../../../utils/axios';
import { setEquipmentUpdateBtn } from '../../../Redux/Features/updateFacilityBtn';
import { useAppDispatch } from '../../../Redux/hooks';

interface Equipment {
  _id: string;
  name: string;
  image: string;
  checked: boolean;
}

const UpdateEquipments = (props: any) => {
  const [equipmentsData, setEquipmentsData] = useState<Equipment[]>([]);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      const res = await ApiClientPrivate.get('/equipments/all-equipment');
      console.log({ res, props });
      const eqips = res.data.map((it: any) => {
        return {
          ...it,
          checked: props.facilityData.equipments.map((eq: any) => eq.name).includes(it.name)
            ? true
            : false
        };
      });
      // console.log({ eqips });
      const filteredData = eqips.filter((item:any) => item.status === true);
      setEquipmentsData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedEquipments, setSelectedEquipments] = useState<
    { image: string; name: string; _id: string }[]
  >(props.facilityData.equipments);
  const onChange = (checked: boolean, name: string, image: string, _id: string) => {
    if (checked) {
      // If checked, add the equipment to the selectedEquipments
      setSelectedEquipments((prev) => [...prev, { image, name, _id }]);
    } else {
      // If unchecked, remove the equipment from the selectedEquipments
      setSelectedEquipments((prev) => prev.filter((eq) => eq._id !== _id));
    }
  };

  const handleUpdate = async () => {
    try {
      // console.log(selectedEquipments)

      const id = props.facilityData._id;
      await ApiClientPrivate.put(`facilities/update/${id}`, { equipments: selectedEquipments });

      props.cancel();
      dispatch(setEquipmentUpdateBtn(true));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="">
      <div className="p-10">
        {equipmentsData.map((item, ind) => (
          <div
            key={ind}
            className="object-section border flex items-center justify-between p-2 mb-4 bg-white rounded-md shadow-md">
            <div className="flex items-center gap-3">
              <div className="image-section">
                <img src={`${item.image}`} alt="image" className="h-20 w-24" />
              </div>
              <div className="Name-section">{item.name}</div>
            </div>
            <div className="flex justify-end">
              <Checkbox
                defaultChecked={item.checked}
                // checked={selectedEquipments.includes(item._id)}
                onChange={(e) => onChange(e.target.checked, item.name, item.image, item._id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          htmlType="submit"
          className="bg-black text-white font-montserrat rounded-none"
          onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateEquipments;
