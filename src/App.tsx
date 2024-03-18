/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';
import Sidebar from './Dashboard/components/common_components/Sidebar';

function App() {
  return (
    <div className="flex h-full w-full relative">
      <div className="h-screen sticky z-10 bg-white top-0 left-0 ">
        <Sidebar />
      </div>
      <div className="content h-full w-full  ">
        {/* <Navbar /> */}
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
