import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const printCard = async kpoId => {
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    try {
        const response = await axios.get(`${domain}/api/WasteRegister/DocumentService/v1/kpo/printingpage?KpoId=${kpoId}`, config)
        return response.data
    } catch (err) {
        console.log(`[ printCard ] - ${err}`)
        return err
    }
}

export default printCard;