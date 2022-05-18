import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';
import getCompanyInfo from './getCompanyInfo';

const getCardDetails = async (kpoId, role, status, setDetails, details) => {

    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    let type = '';

    status === 'PLANNED' ? type = 'planned' : type
    status === 'APPROVED' ? type = 'approved' : type
    status === 'WITHDRAWN' ? type = 'withdrawn' : type
    status === 'TRANSPORT_CONFIRMATION' ? type = 'transportconfirmation' : type
    status === 'CONFIRMATION_GENERATED' ? type = 'confirmationgenerated' : type
    status === 'REJECTED' ? type = 'rejected' : type
    status === 'RECEIVE_CONFIRMATION' ? type = 'receiveconfirmed' : type

    try {
        const response = await axios.get(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/${type}/card?KpoId=${kpoId}&CompanyType=${role}`, config);
        const companyInfo = await getCompanyInfo(response.data);

        return setDetails({ ...response.data, ...companyInfo });
    } catch (err) {
        console.log(`[ getCardDetails ] - ${err}`);
    }
}

export default getCardDetails;