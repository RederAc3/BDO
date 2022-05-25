import axios from 'axios';
import getToken from './BDOApi/getToken';
import { backend } from './BDOApi/config';

const getUrlConfirmation = async kpoId => {

    try {

        const data = {
            token: await getToken()
        }
        const response = await axios.post(`${backend}/app/FPRRMUXZIDKIOKXOPI/save/confirmation/${kpoId}`, data);
        return response.data
    } catch (err) {
        console.log(`[ getUrlConfirmation ] - ${err}`);
        return err;
    }
}

export default getUrlConfirmation;