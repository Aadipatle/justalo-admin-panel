import { configureStore } from '@reduxjs/toolkit';
import vendorsReducer from '../reducers/VendorSlice';
import vehicleReducer from '../reducers/vehicleSlice';
import cityReducer from '../reducers/citySlice';

export const store = configureStore({
    reducer: {
        vehicles: vehicleReducer,
        vendors: vendorsReducer,
        city: cityReducer,
    },
});
