import React, { useState } from "react";
import { View, Text, Switch, In } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ButtonSwitch } from './style';

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";


const UserSettingsScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const IconPressed = () => {
        console.warn('qrcode-scan')
    }
    return (
        <>
            <ButtonSwitch>
                <Text>Zdalne drukowanie</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#767577' }}
                    thumbColor={isEnabled ? '#0010CF' : '#f4f3f4'}
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </ButtonSwitch>
            {
                isEnabled ?
                    <>
                        <CustomInput
                            placeholder='Wpisz kod parowania lub zeskanuj kod QR'
                            icon={<Icon name={'qrcode-scan'} size={20} solid />}
                            onPressIcon={IconPressed}
                        />
                        <CustomButton
                            title='POŁĄCZ'

                        />
                    </>
                    : null
            }
        </>
    )
}

export default UserSettingsScreen;