import { URL_BOOKING_STUDIO } from "../../../../../setup/URL";

export const GetDistrictsList = async  (id:number) => {
    const URL = URL_BOOKING_STUDIO
    let response  = await fetch(`${URL}districts/${id}`);
    let data =await response.json();
    return data 
    
}
