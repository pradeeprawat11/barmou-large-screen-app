import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Check In Local Storage
    cartItems: localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    cartTotalQuantity: 0,
    cartTotalAmout: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].quantity += 1;
            } else {
                const tempItem = {...action.payload, quantity: 1, instruction: ''};
                state.cartItems.push(tempItem);
            }
            // set item to local storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action) {
            const itemToRemove = action.payload
            const updatedCartItems = state.cartItems.filter(
                cartItems => cartItems._id !== itemToRemove
            )
            state.cartItems = updatedCartItems
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        decreaseFromCart(state, action) {
            const itemToDecrease = action.payload
            const itemIndex = state.cartItems.findIndex(
                cartItems => cartItems._id === itemToDecrease
            )

            if(state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1
            } else {
                const updatedCartItems = state.cartItems.filter(
                    cartItems => cartItems._id !== itemToDecrease
                )
                state.cartItems = updatedCartItems
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        addDescrption(state, action) {
            const itemToDescribe = action.payload._id
            const itemIndex = state.cartItems.findIndex(
                cartItems => cartItems.menuId === itemToDescribe
            )

            state.cartItems[itemIndex].instruction = action.payload.instruction
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        getTotal(state, action) {
            let {total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                const { price, quantity} = cartItem;
                const itemTotal = price * quantity;

                cartTotal.total += itemTotal
                cartTotal.quantity += quantity

                return cartTotal
            }, 
            {
                total: 0,
                quantity: 0
            }
          );

          state.cartTotalQuantity = quantity;
          state.cartTotalAmout = total
        }
    },
});

export const {addToCart, removeFromCart, decreaseFromCart, clearCart, getTotal, addDescrption} = cartSlice.actions;
export default cartSlice.reducer;
