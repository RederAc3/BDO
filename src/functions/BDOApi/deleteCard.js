import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

export const deleteCard = async KpoId => {
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
        const response = await axios.delete(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/delete`, {data, ...config});
        return response.data
    } catch (err) {
        console.log(`[ deleteCard ] - ${err}`)
    }
}

export default deleteCard;