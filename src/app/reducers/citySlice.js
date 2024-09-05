import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching coordinates
export const fetchCoordinates = createAsyncThunk(
  'city/fetchCoordinates',
  async (locationName) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      return { longitude: data[0].lon, latitude: data[0].lat };
    }
    return { longitude: '', latitude: '' };
  }
);

// Async thunk for submitting city data
export const submitCityData = createAsyncThunk(
  'city/submitCityData',
  async (cityData, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://68.183.87.102:8080/addcity&bordingpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(cityData),
    });
    if (!response.ok) {
      return rejectWithValue('Failed to save city data');
    }
    return 'City data saved successfully';
  }
);

// Async thunk for fetching city list
export const fetchCityList = createAsyncThunk(
  'city/fetchCityList',
  async (_, { rejectWithValue }) => {
    const url = 'http://68.183.87.102:8080/getAllCities';
    const token = sessionStorage.getItem('token');
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const citySlice = createSlice({
  name: 'city',
  initialState: {
    cityData: {
      cityname: '',
      longitude: '',
      latitude: '',
      boardingPoints: [{ name: '', longitude: '', latitude: '' }],
    },
    cities: [],
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {
    updateCityData(state, action) {
      state.cityData = { ...state.cityData, ...action.payload };
    },
    updateBoardingPoint(state, action) {
      const { index, data } = action.payload;
      state.cityData.boardingPoints[index] = { ...state.cityData.boardingPoints[index], ...data };
    },
    addBoardingPoint(state) {
      state.cityData.boardingPoints.push({ name: '', longitude: '', latitude: '' });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoordinates.fulfilled, (state, action) => {
        const { longitude, latitude } = action.payload;
        state.cityData = { ...state.cityData, longitude, latitude };
      })
      .addCase(submitCityData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(submitCityData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
        state.cityData = {
          cityname: '',
          longitude: '',
          latitude: '',
          boardingPoints: [{ name: '', longitude: '', latitude: '' }],
        };
      })
      .addCase(submitCityData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCityList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCityList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = action.payload;
      })
      .addCase(fetchCityList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateCityData, updateBoardingPoint, addBoardingPoint } = citySlice.actions;
export default citySlice.reducer;
