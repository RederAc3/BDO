import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const correctCard = async (kpoId, correctWasteMass, wasteCodeId) => {
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    let data = {
        kpoId,
        wasteCodeId,
        WasteMass: parseFloat(correctWasteMass),
        WasteCodeExtended: false,
        WasteCodeExtendedDescription: "",
        HazardousWasteReclassification: false,
        HazardousWasteReclassificationDescription: ""
      }

    try {
        const response = await axios.put(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/revise`, data, config);
        return response.data
    } catch (err) {
        console.log(`[ correctCard ] - ${err}`)
    }
}

export default correctCard;