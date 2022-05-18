import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const withdrawCard = async (KpoId, Remarks) => {

    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    let data = {
        KpoId,
        Remarks
    }

    try {
        const response = await axios.put(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/withdrawn`, data, config);
        return response.data
    } catch (err) {
        console.log(`[ withdrawCard ] - ${err}`)
    }
}

export default withdrawCard;