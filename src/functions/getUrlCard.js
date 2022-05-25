import axios from 'axios';
import getToken from './BDOApi/getToken';
import { backend } from './BDOApi/config'

const getUrlCard = async kpoId => {

    try {

        const data = {
            token: await getToken()
        }
        const response = await axios.post(`${backend}/app/FPRRMUXZIDKIOKXOPI/save/card/${kpoId}`, data);
        return response.data
    } catch (err) {
        console.log(`[ getUrlCard ] - ${err}`);
        return err;
    }
}

export default getUrlCard;