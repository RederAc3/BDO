import React, { useEffect, useState } from "react";
import { Text, Switch, ActivityIndicator } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ButtonSwitch, Info } from './style';

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import getCompanyId from "../../functions/getCompanyId";

const UserSettingsScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [switchs, setSwitchs] = useState({});
    const [qrCodeInputValue, setQrCodeInputValue] = useState('')
    const [printers, getPrinters] = useState([]);
    
    const url = 'https://bdo.rdnt.pl'
    const appCode = 'FPRRMUXZIDKIOKXOPI'

    const getSwitchsStatus = async setSwitchs => {
        try {
            const response = await axios.post(`${url}/app/${appCode}/switchs/status`, { userId: await getCompanyId() });
            setIsLoading(false);
            return setSwitchs(response.data);

        } catch (err) {
            console.log(`[ getSwitchsStatus ] - ${err}`);
        }
    }

    const getPrintersList = async () => {
        try {
            const response = await axios.post(`${url}/app/${appCode}/printers/list`, { userId: await getCompanyId() });
            getPrinters(response.data.printers);

        } catch (err) {
            console.log(`[ getPrintersList ] - ${err}`);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getPrintersList()
        getSwitchsStatus(setSwitchs);
    }, [])

    const toggleSwitch = async () => {
        const data = {
            userId: await getCompanyId(),
            remotePrinting: !switchs.remotePrinting
        }
        try {
            const response = await axios.post(`${url}/app/${appCode}/settings/printer`, { ...data });
            const { status, message, remotePrinting } = response.data;

            console.log('response', response.data);
            if (status === 'success') {
                setSwitchs({ remotePrinting: !!remotePrinting });
                return;
            }
            console.warn('Wystąpił błąd: ' + message)

        } catch (err) {
            console.log(`[ toggleSwitch ] - ${err}`);
        }

    }

    const qrScanPressed = () => {
        console.warn('Funkcja niedostępna')
    }

    const removePrinter = async (socketId) => {

        const data = {
            userId: await getCompanyId(),
            socketId
        }

        try {
            const response = await axios.post(`${url}/app/${appCode}/settings/printer/remove`, { ...data });
            const { status, message } = response.data;
            if (status === 'success') {
                await getPrintersList();
                console.warn('Druakrka została usunięta')
                return;
            }
            console.warn('Wystąpił błąd usunięcia: ' + message)

        } catch (err) {
            console.log(`[ removePrinter ] - ${err}`);
        }
    }

    const connectButtonPressed = async () => {
        let data = {
            code: qrCodeInputValue.toUpperCase().trim(),
            userId: await getCompanyId()
        }

        if (qrCodeInputValue.length === 0) {
            console.warn('Wprowadź kod połączenia z drukarką')
            return;
        }

        try {
            const response = await axios.post(`${url}/app/${appCode}/settings/printer/config`, data);
            const { status } = response.data;

            if (status === 'success') {
                getPrintersList();
                setQrCodeInputValue('');
                return;
            }

        } catch (err) {
            console.log(`[ configPrinter ] - ${err}`);
        }
    }
    return (

        !isLoading ? <>
            <ButtonSwitch>
                <Text>Zdalne drukowanie</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#767577' }}
                    thumbColor={switchs.remotePrinting ? '#0010CF' : '#f4f3f4'}
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleSwitch}
                    value={switchs.remotePrinting}
                />
            </ButtonSwitch>
            {
                switchs.remotePrinting ?
                    <>
                        {printers.length ? (printers.map(({ socketId, name}) => (

                            <CustomInput
                                key={socketId}
                                value={name}
                                icon={<Icon name={'trash-can'} size={20} solid />}
                                onPressIcon={() => removePrinter(socketId)}
                            />
                        ))) : (<>
                            <Info>Brak podłączonych drukarek</Info>

                            <CustomInput
                                placeholder='Wpisz kod parowania lub zeskanuj QR'
                                value={qrCodeInputValue}
                                onChangeText={setQrCodeInputValue}
                                icon={<Icon name={'qrcode-scan'} size={20} solid />}
                                onPressIcon={qrScanPressed}
                            />

                            <CustomButton
                                title='POŁĄCZ'
                                onPress={connectButtonPressed}
                            />
                        </>)}
                    </>
                    : null
            }
        </> : <ActivityIndicator />
    )
}

export default UserSettingsScreen;