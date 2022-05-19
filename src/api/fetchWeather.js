import axios from 'axios';

const URL= 'https://api.openweathermap.org/data/2.5/weather';
const API_Key = '8bc099afc6f4cb3a2157c66c2db2b449';

export const fetchWeather = async (query) =>{
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'imperial',
            APPID: API_Key,  
        }
        
    });

    return data;
}
