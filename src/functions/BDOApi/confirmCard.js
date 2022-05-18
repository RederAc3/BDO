import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const confirmCard = async KpoId => {

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
        const response = await axios.put(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/approve`, data, config);
        return response.data
    } catch (err) {
        console.log(`[ confirmCard ] - ${err}`)
    }
}

export default confirmCard;