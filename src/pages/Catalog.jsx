import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';




const Catalog = () => {

    const {catalogName} = useParams();
    console.log("CatalogName ",catalogName)
    const [catalogPageData, setCatalogPageData] =useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive]= useState(1);


    // console.log("catalogPageData?.selectedCategory?.courses",catalogPageData?.selectedCategory?.courses)
    // console.log("Different category",catalogPageData?.differentCategory?.courses)
    // fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const response = await apiConnector("GET",categories.CATEGORIES_API);
            const category_id = 
              response?.data?.allcategories.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id)
            
        }

        getCategories();
    },[catalogName])

    useEffect(() => {

        if(!categoryId)return;
        const getCategoryDetails = async () => {
            try{
                const response = await getCatalogPageData(categoryId);
                setCatalogPageData(response);
                
            }
            catch(error){
                console.log(error)
            }
        }
        getCategoryDetails();
    },[categoryId])
    console.log("catalogPageData",catalogPageData)

  return (
    <div className='text-white '>
       <div className='bg-richblack-800 px-4 box-content'>
            <div className='mx-auto flex flex-col min-h-[260px] max-w-maxContentTab justify-center gap-4 lg:max-w-maxContent'>
                <p className='text-sm text-richblack-300'>
                    {`Home / Catalog/ `}
                    <span className='text-yellow-25'>
                        {catalogPageData?.selectedCategory?.name}
                    </span>
                </p>
                <p className='text-2xl text-richblack-5'>
                    {catalogPageData?.selectedCategory?.name}
                    </p>
                <p className='max-w-[870px] text-richblack-200'>
                    {catalogPageData?.selectedCategory?.description}
                    </p>
            </div>
       </div>

       <div>
          {/* section 1  */}
           <div className='mx-auto box-content w-full maxContentTab px-4 py-12 lg:max-w-maxContent '>
                <div className='section_heading text-2xl'>Courses to get you started</div>
               <div className='flex my-4 border-b border-b-richblack-600 text-sm'>
                  <p 
                    className={` px-4 py-2 ${
                        active === 1 
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(1)}
                  >
                      Most Popular
                  </p>
                  <p 
                    className={`px-4 py-2 ${
                        active === 2 
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(2)}
                  >
                    New
                    </p>
               </div>
               <div>
                 <CourseSlider courses={catalogPageData?.selectedCategory?.courses}/>
               </div>
           </div>

           {/* section 2  */}
           <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-2 lg:max-w-maxContent'>
              <div className='section_heading text-2xl'>
                Top Courses in  {catalogPageData?.selectedCategory?.name}
              </div>
              <div className='py-8'>
                  <CourseSlider courses={catalogPageData?.differentCategory?.courses}/>
              </div>
           </div>
            
            {/* section 3 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <div className='section_heading text-2xl'>Frequently Bought</div>
                 < div className='py-12'>
                     <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                         {
                            catalogPageData?.mostSellingCourses?.slice(0,4)
                            .map((course)=> (
                                
                                <Course_Card course={course} key={course?._id} height={"h-[400px]"}/>
                            ))

                            
                         }
                     </div>
                 </div>
            </div>
       </div>

       {/* Footer */}
       <Footer/>
    </div>
  )
}

export default Catalog
