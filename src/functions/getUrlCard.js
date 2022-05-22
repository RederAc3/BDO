import axios from 'axios';
import getToken from './BDOApi/getToken';

const getUrlCard = async kpoId => {

    try {

        const data = {
            token: await getToken()
        }
        const response = await axios.post(`https://bdo.rdnt.pl/app/FPRRMUXZIDKIOKXOPI/save/card/${kpoId}`, data);
        return response.data
    } catch (err) {
        console.log(`[ getUrlCard ] - ${err}`);
        return err;
    }
}

export default getUrlCard;