import { URL_BOOKING_STUDIO } from "../../../../../setup/URL";

export const GetWardsList = async  (id:number) => {
    const URL = URL_BOOKING_STUDIO
    let response  = await fetch(`${URL}wards/${id}`);
    let data =await response.json();
    return data 
    
}