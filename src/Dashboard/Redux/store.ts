/* eslint-disable prettier/prettier */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import buttonReducer from '../Redux/Features/ButtonSlice';
import facilityReducer from '../Redux/Features/FacilityFeature/FacilititySlice';
import updateBtnReducer from './Features/updateFacilityBtn';
import userDetailsReducer from './Features/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['logedUser']
};

const rootReducer = combineReducers({
  button: buttonReducer,
  facility: facilityReducer,
  updateFacilities: updateBtnReducer,
  logedUser: userDetailsReducer
});
// Create a persisted reducer
const persistedReducer = persistReducer( persistConfig, rootReducer )

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
