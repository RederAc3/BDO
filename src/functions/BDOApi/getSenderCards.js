import axios from 'axios';
import { domain } from './config';

import getToken from './getToken';

const getSenderCards = async setCards => {

    let data = {
        PaginationParameters: {
            Order: {
                IsAscending: true,
                OrderColumn: null
            },
            Page: {
                Index: 0,
                Size: 50
            }
        },
        Year: null,
        SearchInCarriers: false,
        SearchInReceivers: true,
        Name: null,
        Locality: null,
        Street: null,
        Nip: null,
        IdentificationNumber: null,
        WasteCodeAndDescription: null,
        CardNumber: null,
        CardStatusCodeNames: null,
        TransportTime: null,
        ReceiveConfirmationTime: null,
        SenderFirstNameAndLastName: null,
        ReceiverFirstNameAndLastName: null,
        VehicleRegNumber: null,
        TransportDateRange: true,
        TransportDateFrom: null,
        TransportDateTo: null,
        ReceiveConfirmationDateRange: true,
        ReceiveConfirmationDateFrom: null,
        ReceiveConfirmationDateTo: null
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