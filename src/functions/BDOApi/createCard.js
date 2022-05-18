import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const createCard = async (selectedCompany, selectedPlace, wasteCodeId, vehicleRegNumber, wasteMass, dateTime) => {
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`,
        },
    };

    let data = {
        carrierCompanyId: "3a4806f6-8144-4bf5-8607-710cd282e821", // COMPANY ID TRANSPORTUJĄCEGO pociągnąc z async storage
        receiverCompanyId: selectedCompany,
        receiverEupId: selectedPlace,
        wasteCodeId: wasteCodeId,
        vehicleRegNumber: vehicleRegNumber,
        wasteMass: parseFloat(wasteMass),
        plannedTransportTime: dateTime,
        certificateNumberAndBoxNumbers: "",
        additionalInfo: "",
        wasteCodeExtended: false,
        wasteCodeExtendedDescription: "",
        hazardousWasteReclassification: false,
        hazardousWasteReclassificationDescription: "",
        isWasteGenerating: false,
    };

    console.log(data)
    try {
        const response = await axios.post(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/create/plannedcard`, data, config)
        return response.data
    } catch (err) {
        console.log(`[ createCard ] - ${err}`)
        return err
    }
}

export default createCard;