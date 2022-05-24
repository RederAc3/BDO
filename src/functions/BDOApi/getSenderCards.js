import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const getSenderCards = async setCards => {

    let data = {
        PaginationParameters: {
            Order: {
                IsAscending: false
            },
            Page: {
                Index: 0,
                Size: 50
            }
        },
        SearchInCarriers: false,
        SearchInReceivers: true,
        TransportDateRange: false,
        ReceiveConfirmationDateRange: false
    };
    
    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
            Authorization: `Bearer ${await getToken()}`
        },
    };

    try {

        const response = await axios.post(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/sender/search`, data, config);
        return setCards(response.data.items)

    } catch (err) {
        console.log(domain)
        console.log(`[ getSenderCards ] - ${err}`);
    }
}

export default getSenderCards;