import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"


export default function Cart(){

const {total,totalItems}= useSelector((state)=> state.cart)


    return (
        <div className="text-white flex flex-col gap-6">
            <h1 className="text-2xl">
                Your Cart
            </h1>
            <p className="text-richblack-300">{totalItems} Courses in Cart</p>

            {total > 0 
            ? (<div>
                <RenderCartCourses/>
                <RenderTotalAmount/>
              </div>)
            : (<p>Your Cart is Empty</p>) } 
            
        </div>
    )
}