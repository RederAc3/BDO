import React, { useState } from "react";
import { Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Header, LogoutButton, WelcomeText, SettingsButton } from './style'

import HomeItem from "./HomeItem/HomeItem";
import CustomButton from "../../components/CustomButtom/CustomButton";

const HomeScreen = ({ navigation }) => {

    const [username, setUsername] = useState('w BDOApp')

    const onLogoutPress = () => {
        AsyncStorage.setItem('token', '');
        navigation.navigate('Logowanie');
    }

    const onSettingsPress = () => {
        console.warn("Ustawienia")
    }
    const onManageBdoPress = () => {
        navigation.navigate('Karty')
    }
    const onManageInvoicePress = () => {
        console.warn("Opcja jeszcze niedostępna");
    }
    const onScanWeightRecieptPress = () => {
        console.warn("Opcja jeszcze niedostępna");
    }
    const onAcceptScrapPress = () => {
        console.warn("Opcja jeszcze niedostępna");
    }

    return (
        <SafeAreaView>
            <Container>
                <Header>
                    <LogoutButton onPress={onLogoutPress}>
                        <Text>{'🔚'}</Text>
                    </LogoutButton>
                    <WelcomeText>
                        {`Witaj ${username}`}
                    </WelcomeText>
                    <SettingsButton onPress={onSettingsPress}>
                        <Text>{'\u2699'}</Text>
                    </SettingsButton>
                </Header>
                <HomeItem
                    title="Zarządzaj BDO"
                    desc='Dodaj, Odrzuć, Wycofaj, Potwierdź'
                    onPress={onManageBdoPress}
                />
                <HomeItem
                    title="Faktury"
                    desc='Wystaw FV, Podgląd, Drukuj'
                    onPress={onManageInvoicePress}
                />
                <CustomButton style={{ width: '95%'}} title="SKANUJ KWIT WAGOWY" onPress={onScanWeightRecieptPress} />
                <CustomButton style={{ width: '95%'}} title="PRZYJMIJ ZŁOM" onPress={onAcceptScrapPress} />
            </Container>
        </SafeAreaView>
    )
}

export default HomeScreen;