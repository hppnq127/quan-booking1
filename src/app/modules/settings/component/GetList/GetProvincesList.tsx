import { URL_BOOKING_STUDIO } from "../../../../../setup/URL";

export const GetProvincesList = async  () => {
    const URL = URL_BOOKING_STUDIO
    let response  = await fetch(`${URL}provinces`);
    let data =await response.json();
    return data 
    
}
