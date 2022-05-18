import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const rejectCard = async (kpoId, remarks) => {
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    let data = {
        kpoId,
        remarks
    }

    try {
        const response = await axios.put(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/reject`, data, config);
        return response.data
    } catch (err) {
        console.log(`[ rejectCard ] - ${err}`)
    }
}

export default rejectCard;