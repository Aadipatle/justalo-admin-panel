import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    async () => {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://68.183.87.102:8080/getRentdetails', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }); 

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
);

const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default vehicleSlice.reducer;
