import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const getCompanyInfo = async details => {
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    const { senderCompanyId, carrierCompanyId, receiverCompanyId } = details;

    try {
        const senderResponse = await axios.get(`${domain}/api/WasteRegister/v1/Search/getcompanybyid?companyId=${senderCompanyId}`, config);
        const carrierResponse = await axios.get(`${domain}/api/WasteRegister/v1/Search/getcompanybyid?companyId=${carrierCompanyId}`, config);
        const receiverResponse = await axios.get(`${domain}/api/WasteRegister/v1/Search/getcompanybyid?companyId=${receiverCompanyId}`, config);

        const companyInfo = {
            senderCompanyInfo: senderResponse.data,
            carrierCompanyInfo: carrierResponse.data,
            receiverCompanyInfo: receiverResponse.data
        }

        return companyInfo;
    } catch (err) {
        console.log(`[ getCompanyInfo ] - ${err}`);
    }
};

export default getCompanyInfo;