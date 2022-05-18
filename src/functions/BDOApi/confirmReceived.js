import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const confirmReceived = async (kpoId, correctedWasteMass, remarks) => {
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    let data = {
        kpoId,
        correctedWasteMass,
        remarks
    }

    try {
        const response = await axios.put(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/assign/receiveconfirmation`, data, config);
        return response.data
    } catch (err) {
        console.log(`[ confirmReceived ] - ${err}`)
    }
}

export default confirmReceived;