import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const confirmTransport = async (kpoId) => {
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    let data = {
        kpoId
    }

    try {
        const response = await axios.put(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/status/transportconfirmation`, data, config);
        return response.data
    } catch (err) {
        console.log(`[ confirmTransport ] - ${err}`)
    }
}

export default confirmTransport;