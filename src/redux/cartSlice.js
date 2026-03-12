import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartApi from '../services/cartApi';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
    try {
        const data = await cartApi.getCart();
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
});

export const addItemToCart = createAsyncThunk('cart/add', async ({ productId: product_id, quantity }, { dispatch, rejectWithValue }) => {
    try {
        const data = await cartApi.addToCart(product_id, quantity);
        dispatch(fetchCart());
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
});

export const updateItemInCart = createAsyncThunk('cart/update', async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
        const data = await cartApi.updateCartItem(productId, quantity);
        dispatch(fetchCart());
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update item in cart');
    }
});

export const removeItemFromCart = createAsyncThunk('cart/remove', async (cartId, { dispatch, rejectWithValue }) => {
    try {
        const data = await cartApi.removeFromCart(cartId);
        dispatch(fetchCart());
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,
        totalQty: 0,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalQty = 0;
        }
    },
    extraReducers: (builder) => {
        // We can handle state updates similarly for most actions since API returns updated cart
        const handleFulfilled = (state, action) => {
            state.isLoading = false;
            state.items = action.payload.items || [];
            state.totalPrice = action.payload.totalPrice || 0;
            state.totalQty = state.items.reduce((sum, item) => sum + item.quantity, 0);
        };

        const handlePending = (state) => {
            state.isLoading = true;
            state.error = null;
        };

        const handleRejected = (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        };

        builder
            .addCase(fetchCart.pending, handlePending)
            .addCase(fetchCart.fulfilled, handleFulfilled)
            .addCase(fetchCart.rejected, handleRejected)

            // For add, update, remove: just set loading state while they run.
            // fetchCart will populate the data once they succeed.
            .addCase(addItemToCart.pending, handlePending)
            .addCase(addItemToCart.rejected, handleRejected)

            .addCase(updateItemInCart.pending, handlePending)
            .addCase(updateItemInCart.rejected, handleRejected)

            .addCase(removeItemFromCart.pending, handlePending)
            .addCase(removeItemFromCart.rejected, handleRejected);
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
