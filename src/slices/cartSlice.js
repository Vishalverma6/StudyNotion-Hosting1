import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState= {
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")) :[],
    total:localStorage.getItem("total") ?JSON.parse(localStorage.getItem("total")):0,
    totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0,
    isAddedTocart:localStorage.getItem("isAddedToCart") ? JSON.parse(localStorage.getItem("isAddedTocart")): false,
};

const cartSlice= createSlice({
    name:"cart",
    initialState,
    // add to cart
    reducers:{
        addToCart:(state,action) => {
            const course= action.payload   // jab dispatch karenge whi value payload mein aa jayyegi
            // agar course cart mein add karenge tb pahle ye pta 
            // lagayege ki kahi ye course pahle se add toh nhi hai 
            const index= state.cart.findIndex((Item)=> Item._id===course._id)


            // if the course is already in the cart 
                // findIndex() return postive index (mtlab koi na koi position bataga ki coures kaun se number par hai)

                // agar koi course add nhi hai to  function retun negative value
                
            if(index >=0){
                toast.error("Course already in Cart")
                return
            }
            // if the course is not in the cart ,add it to the cart
            state.cart.push(course)

            // update the total quantity and price 
            state.totalItems++
            state.total+=course.price

            // update to localstorage
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            // show toast
            toast.success("Course added to Cart")

        },

        // remove from cart
        removeFromCart:(state,action)=> {
            const courseId = action.payload
            const index= state.cart.findIndex((item)=> item._id===courseId )

            if(index >=0){
                state.totalItems--
                state.total -=state.cart[index].price
                state.cart.splice(index,1)

                // Update the localstorage

                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

                // show toast
                toast.success("Course removed from Cart")
            }
        },

        // reset the cart
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
          },
    },
});
export const {addToCart,removeFromCart,resetCart}= cartSlice.actions;
export default cartSlice.reducer;