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
    <div>
       <p>Total:</p>
       <p>Rs {total}</p>


       <IconBtn
       text="Buy Now"
       onclick={hanleBuyCourse}
       customClasses={"w-full justify-center"}
       />

    </div>
  )
}

export default RenderTotalAmount
