import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const generateConfirmation = async KpoId => {

    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    let data = {
        KpoId
    }

    try {
        const response = await axios.put(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/generateconfirmation`, data, config);
        return response.data
    } catch (err) {
        console.log(`[ generateConfirmation ] - ${err}`)
    }
}

export default generateConfirmation;