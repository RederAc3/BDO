import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const printConfirmation = async kpoId => {
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    try {
        const response = await axios.get(`${domain}/api/WasteRegister/DocumentService/v1/kpo/confirmation?KpoId=${kpoId}`, config)
        return response.data
    } catch (err) {
        console.log(`[ printConfirmation ] - ${err}`)
        return err
    }
}

export default printConfirmation;