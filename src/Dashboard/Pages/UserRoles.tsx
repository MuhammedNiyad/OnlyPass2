/* eslint-disable prettier/prettier */

import PageHeader from "../components/common_components/PageHeader"
import svg1 from '../../../public/svg1-onlypass.svg';
import svg2 from '../../../public/svg2-onlypass.svg';

export const UserRoles = () => {

    const details = [
        {
          icon: svg1,
          head: 'Not described',
          value: '1,280',
          percentage: '16'
        },
        {
          icon: svg2,
          head: 'Not described',
          value: '1,009',
          percentage: '1'
        },
        {
          icon: svg2,
          head: 'Not described',
          value: '91/1039',
          percentage: '39'
        }
      ];

  return (
    <div>
        <div className=" bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
        <PageHeader details={details} name={'User Roles'} 
        // searchFunction={onChangeSearch}
         />

        </div>
    </div>
  )
}
