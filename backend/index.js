import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import 'dotenv/config'


import { appCode, backend } from './config.js';

import User from './models/User.js';
import printCard from './functions/printCard.js';
import saveFile from './functions/saveFile.js';
import printConfirmation from './functions/printConfirmation.js';
import getToken from './functions/getToken.js';
import getEupId from './functions/getEupId.js';
import createUser from './functions/createUser.js';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('BDO system management application :)');
});

const isAvailableUsername = async username => !!(await User.find({ username })).length;

app.post('/app/:id/signin', async (req, res) => {
    if (req.params.id === appCode) {
        const { username, password } = req.body

        try {
            await mongoose.connect(process.env.DB_CONNECTION)
            console.log('Connected to DB')

            const userData = await User.find({ username })

            if (userData.length) {
                const result = await bcrypt.compare(password, userData[0].password)

                if (result) {
                    const { eupId, companyId } = await getEupId(userData[0])
                    const tokenInfo = await getToken(userData[0].ClientId, userData[0].ClientSecret, eupId)
                    console.log('logged user: ', username)

                    let resInfo = {
                        ...tokenInfo,
                        companyId: companyId,
                    }
                    eupId ? res.json(resInfo) : res.json({ status: 'error' });

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
            console.log('Connected to DB')

            await isAvailableUsername(username) ? res.json({ status: 'error', message: 'User exist' }) : !password ? res.json({ status: 'success' }) : (
                await createUser(req.body),
                res.json({ status: 'success', message: 'User created' })
            )
        } catch (err) { console.log(err.message) }
    } else res.json({ status: 'error', message: 'Connection to API failed' })
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
    } else res.json({ status: 'error', message: 'Connection to API failed' });
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
    } else res.json({ status: 'error', message: 'Connection to API failed' });
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