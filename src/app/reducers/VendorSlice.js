import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const token = sessionStorage.getItem('token');

export const fetchVendors = createAsyncThunk('vendors/fetchVendors', async () => {
    const response = await fetch('http://68.183.87.102:8080/AllVendor', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
});

export const verifyVendor = createAsyncThunk('vendors/verifyVendor', async ({ id, status }) => {
    const response = await fetch(`http://68.183.87.102:8080/markVerified/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verification_status: status }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { id, verification_status: status };
});

export const fetchDriversByVendor = createAsyncThunk(
    'vendor/fetchDriversByVendor',
    async (vendorId) => {
        const response = await fetch(`http://68.183.87.102:8080/AllDriverByPerticularVendor/${vendorId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
);

export const fetchBusesByVendor = createAsyncThunk(
    'vendor/fetchBusesByVendor',
    async (vendorId) => {
        const response = await fetch(`http://68.183.87.102:8080/getAllBusByPerticularVendor/${vendorId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
);

export const verifyBus = createAsyncThunk(
    'vendors/verifyBus',
    async ({ busId, status }) => {
        const response = await fetch(`http://68.183.87.102:8080/verifiedBus/${busId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verified: status }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
);
export const unverifyBus = createAsyncThunk(
    'vendors/unverifyBus',
    async ({ busId, status }) => {
        const response = await fetch(`http://68.183.87.102:8080/unverifiedBus/${busId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verified: status }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
);

export const verifyDriver = createAsyncThunk(
    'vendors/verifyDriver',
    async ({ driverId, status }) => {
        const response = await fetch(`http://68.183.87.102:8080/verifieddriver/${driverId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verification_status: status }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { driverId, status };
    }
);
export const unverifyDriver = createAsyncThunk(
    'vendors/unverifyDriver',
    async ({ driverId, status }) => {
        const response = await fetch(`http://68.183.87.102:8080/unverifieddriver/${driverId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verification_status: status }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { driverId, status };
    }
);

const vendorsSlice = createSlice({
    name: 'vendors',
    initialState: {
        data: [],
        drivers: [],
        buses: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendors.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVendors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchVendors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(verifyVendor.fulfilled, (state, action) => {
                const { id, verification_status } = action.payload;
                const existingVendor = state.data.find(vendor => vendor.id === id);
                if (existingVendor) {
                    existingVendor.verification_status = verification_status;
                }
            })
            .addCase(fetchDriversByVendor.fulfilled, (state, action) => {
                state.drivers = action.payload;
            })
            .addCase(verifyDriver.fulfilled, (state, action) => {
                const { driverId, status } = action.payload;
                state.drivers = state.drivers.map(driver =>
                    driver.id === driverId ? { ...driver, verification_status: status } : driver
                );
            })
            .addCase(unverifyDriver.fulfilled, (state, action) => {
                const { driverId, status } = action.payload;
                state.drivers = state.drivers.map(driver =>
                    driver.id === driverId ? { ...driver, verification_status: status } : driver
                );
            })
            .addCase(fetchBusesByVendor.fulfilled, (state, action) => {
                state.buses = action.payload;
            })
            .addCase(verifyBus.fulfilled, (state, action) => {
                const updatedBus = action.payload;
                state.buses = state.buses.map(bus =>
                    bus.id === updatedBus.id ? { ...bus, verified: updatedBus.verification_status } : bus
                );
            })
            .addCase(unverifyBus.fulfilled, (state, action) => {
                const updatedBus = action.payload;
                state.buses = state.buses.map(bus =>
                    bus.id === updatedBus.id ? { ...bus, verified: updatedBus.verification_status } : bus
                );
            });
    },
});

export default vendorsSlice.reducer;
