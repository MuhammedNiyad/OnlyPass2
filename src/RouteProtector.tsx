/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from './Dashboard/Redux/store';
import { Navigate } from 'react-router-dom';

// routeProtector
export const RouteProtector = ({ children }: any) => {
  const state = store.getState();
  const isLoggedIn =
    state.logedUser && state.logedUser.currentUser && state.logedUser.accessToken;

  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/'} />;
  }
};

// loginProtector
export const LoginProtector = ({ children }: any) => {
  const state = store.getState();
  const isLoggedIn =
    state.logedUser && state.logedUser.currentUser && state.logedUser.accessToken;

    if(isLoggedIn){
        return <Navigate to={'/Facilities'} />
    }else{
        return <>{children}</>
    }
    
}
