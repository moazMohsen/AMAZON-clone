import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    userInfo: null
};

export const amazonSlice = createSlice({
    name: "amazon",
    initialState,
    reducers: {
        // product
        addToCart: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        incrementQuantity: (state, action) => {
            let item = state.products.find(item => item.id === action.payload.id);
            item.quantity++;
        },
        decrisingQuantity: (state, action) => {
            let item = state.products.find(item => item.id === action.payload.id);
            item.quantity === 1 && item.quantity--;
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
        },
        resetProduct: (state) => {
            state.products = [];
        },

        // user
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
        , signOutUser: (state) => {
            state.userInfo = null;
        }

    }
});

export const { addToCart, deleteProduct, resetProduct, incrementQuantity, decrisingQuantity, setUserInfo, signOutUser } = amazonSlice.actions;
export default amazonSlice.reducer;