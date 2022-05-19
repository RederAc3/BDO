const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
require('dotenv/config');

const User = require('./models/User');

app.use(bodyParser.json());

const domain = 'https://test-bdo.mos.gov.pl';
const appCode = 'FPRRMUXZIDKIOKXOPI';

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
        let status = { eupId: response.data.items[0].eupId }
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
                    const { eupId } = await getEupId(userData[0])
                    eupId ? res.json(await getToken(userData[0].ClientId, userData[0].ClientSecret, eupId)) : res.json({status: 'error'});
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
            await isAvailableUsername(username) ? res.json({ status: 'error', message: 'User exist' }) : !password ? res.json({status: 'success'}) : (
                await createUser(req.body),
                res.json({ status: 'success', message: 'User created' })
            )
        } catch (err) { console.log(err.message) } 
    } else res.json('Failed link to API!')
});

app.all('*', (req, res) => {
    res.redirect('/')
  });

app.listen(3000);