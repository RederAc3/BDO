import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import 'dotenv/config'

const app = express();

import { domain, appCode, backend } from './config.js';

import User from './models/User.js';
import printCard from './functions/printCard.js';
import saveFile from './functions/saveFile.js';
import printConfirmation from './functions/printConfirmation.js';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('BDO system management application :)');
});

const getToken = async (ClientId, ClientSecret, EupId) => {

    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
        }
    }
    const data = {
        ClientId,
        ClientSecret,
        EupId
    }
    try {
        const response = await axios.post(`${domain}/api/WasteRegister/v1/Auth/generateEupAccessToken`, data, config)
        console.log(response.data);
        let status = { status: 'success', token: response.data }
        return status
    } catch (err) {

        console.log(`[ generateToken ] - ${err}`)
        return { success: 'error', error: err.message }
    }
}

const getEupId = async ({ ClientId, ClientSecret }) => {

    let config = {
        headers: {
            accept: "application/json",
            ContentType: "application/json",
        }
    }
    const data = {
        ClientId,
        ClientSecret,
        PaginationParameters: {
            Order: {
                IsAscending: true,
            },
            Page: {
                Index: 0,
                Size: 50
            }
        }
    }

    try {
        const response = await axios.post(`${domain}/api/WasteRegister/v1/Auth/getEupList`, data, config)
        console.log(response.data);
        let status = {
            eupId: response.data.items[0].eupId,
            companyId: response.data.items[0].companyId
        }
        return status
    } catch (err) {

        console.log(`[ getEupId ] - ${err}`)
    }
}

const isAvailableUsername = async username => await !!(await User.find({ username })).length;

const createUser = async ({ username, password, ClientId, ClientSecret }) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password, salt);

        await new User({ username, password: hash, ClientId, ClientSecret }).save()
    } catch (err) {
        console.error(err.message)
        return err.message
    }
}

app.post('/app/:id/signin', async (req, res) => {
    if (req.params.id === appCode) {
        const { username, password } = req.body
        console.log('login: ', username, 'password: ', password)
        try {
            await mongoose.connect(process.env.DB_CONNECTION)
            console.log('Connected to DB')

            const userData = await User.find({ username })

            if (userData.length) {
                const result = await bcrypt.compare(password, userData[0].password)

                if (result) {
                    const { eupId, companyId } = await getEupId(userData[0])
                    const tokenInfo = await getToken(userData[0].ClientId, userData[0].ClientSecret, eupId)
                    
                    let resInfo = {
                        ...tokenInfo,
                        companyId: companyId,
                    }
                    eupId ? res.json(resInfo) : res.json({ status: 'error' });
                    // const mergeResponse = tokenInfo + companyId;
                } else res.json({ status: 'error', message: 'Dane nie pasują do żadnego użytkownika!' })
            } else res.json({ status: 'error', message: 'Dane nie pasują do żadnego użytkownika!' })

        } catch (err) { console.log(err) }
    } else res.json({ status: 'error', message: 'Connection to API failed' })
});

app.post('/app/:id/signup', async (req, res) => {
    if (req.params.id === appCode) {
        const { username, password } = req.body

        try {
            await mongoose.connect(process.env.DB_CONNECTION)
            await isAvailableUsername(username) ? res.json({ status: 'error', message: 'User exist' }) : !password ? res.json({ status: 'success' }) : (
                await createUser(req.body),
                res.json({ status: 'success', message: 'User created' })
            )
        } catch (err) { console.log(err.message) }
    } else res.json('Failed link to API!')
});

app.post('/app/:id/save/card/:kpoId', async (req, res) => {
    if (req.params.id === appCode) {
        const token = req.body.token;
        const kpoId = req.params.kpoId;

        try {
            const data = await printCard(kpoId, token);
            await saveFile(data, 'cards', kpoId);

            res.json({ url: `${backend}/pdf/card/${kpoId}` });
        } catch (err) {
            console.log(`[ saveCard ] - ${err}`);
        }
    } else res.json('Failed link to API!');
});

app.post('/app/:id/save/confirmation/:kpoId', async (req, res) => {
    if (req.params.id === appCode) {
        const token = req.body.token;
        const kpoId = req.params.kpoId;

        try {
            const data = await printConfirmation(kpoId, token);
            await saveFile(data, 'confirmations', kpoId);

            res.json({ url: `${backend}/pdf/confirmation/${kpoId}` })
        } catch (err) {
            console.log(`[ saveConfirmation ] - ${err}`);
        }
    } else res.json('Failed link to API!');
});

app.get('/pdf/confirmation/:kpoId', (req, res) => {
    res.sendFile(`pdf/confirmations/${req.params.kpoId}.pdf`, { root: '.' });
});

app.get('/pdf/card/:kpoId', (req, res) => {
    res.sendFile(`pdf/cards/${req.params.kpoId}.pdf`, { root: '.' });
});

app.all('*', (req, res) => {
    res.redirect('/')
});

app.listen(3000);