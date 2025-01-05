import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI'

const RenderTotalAmount = () => {

    const {total,cart}= useSelector((state)=> state.cart)
    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useDispatch();
    const dispatch = useDispatch();
    

    const hanleBuyCourse = ()=> {
        const courses= cart.map((course)=> course._id);
        buyCourse(token, courses, user, navigate, dispatch );
        console.log("Bought thses course:",courses)

    }
  return (
    <div className='text-white min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
       <p className='mb-1 text-sm font-medium text-richblack-300'>Total:</p>
       <p className='mb-5 tetx-2
        font-medium text-yellow-100'>Rs {total}</p>


       <IconBtn
       text="Buy Now"
       onclick={hanleBuyCourse}
       customClasses={"w-full justify-center"}
       />

    </div>
  )
}

export default RenderTotalAmount
