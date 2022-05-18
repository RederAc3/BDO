import axios from 'axios';
import { domain } from './config';

const isKeysCorrect = async (publicKey, secureKey) => {

    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
        }
    }

    let data = {
        ClientId: publicKey,
        ClientSecret: secureKey,
        PaginationParameters: {
            Order: {
                IsAscending: true
            },
            Page: {
                Index: 0,
                Size: 0
            }
        }
    }

    try {
        const response = await axios.post(`${domain}/api/WasteRegister/v1/Auth/getEupList`, data, config)

        return response.data;
    } catch (err) {
        console.log(`[ isKeyCorrect ] - ${err}`)
        return 0;
    }
};

export default isKeysCorrect;