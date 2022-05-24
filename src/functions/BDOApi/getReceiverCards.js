import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const getReceiverCards = async setCards => {

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
        SearchInSenders: true,
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
        const response = await axios.post(`${domain}/api/WasteRegister/WasteTransferCard/v1/Kpo/receiver/search`, data, config);
        return setCards(response.data.items)

    } catch (err) {
        console.log(`[ getReceiverCards ] - ${err}`);
    }
}

export default getReceiverCards;