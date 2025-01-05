import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogDataEndpoints } from '../apis';

const {CATALOG_PAGEDATA_API} = catalogDataEndpoints;

export const getCatalogPageData = async(categoryId) => {
    let result= [];
    const toastId = toast.loading("Loading");
    try{
        const response = await apiConnector("POST",CATALOG_PAGEDATA_API,{
            categoryId: categoryId
        });
        console.log("CATALOG_PAGEDATA_API RESPONSE....",response);

        if(!response?.data?.success){
            throw new Error("Could not fetch category Page Data");
        }
        // toast.success()
        result = response?.data?.data;
    }
    catch(error){
        console.log("CATALOG_PAGEDATA_API ERROR...",error);
        toast.error(error?.response?.data?.message|| error.message);
    }
    toast.dismiss(toastId);
    return result;
}


