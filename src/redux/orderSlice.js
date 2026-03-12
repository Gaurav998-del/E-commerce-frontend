import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as orderApi from '../services/orderApi';

export const placeOrder = createAsyncThunk('orders/place', async (orderData, { rejectWithValue }) => {
    console.log("ORDER DATA", orderData);
    
    try {
        const data = await orderApi.createOrder(orderData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to place order');
    }
});

// Used for fetching order history or single order if needed, assuming simple order creation for now

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        currentOrder: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentOrder = action.payload.order || action.payload;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
