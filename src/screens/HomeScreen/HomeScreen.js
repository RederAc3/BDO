import React, { useState } from "react";
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Container, Header, LogoutButton, WelcomeText, SettingsButton } from './style'

import HomeItem from "./HomeItem/HomeItem";
import CustomButton from "../../components/CustomButton/CustomButton";

const HomeScreen = ({ navigation }) => {

    const [username, setUsername] = useState('w BDO')

    const onLogoutPress = () => {
        AsyncStorage.setItem('token', '');
        navigation.navigate('Logowanie');
    }

    const onSettingsPress = () => {
        navigation.navigate('Ustawienia')
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
                        <Icon name={'logout'} size={20} solid />
                    </LogoutButton>
                    <WelcomeText>
                        {`Witaj ${username}`}
                    </WelcomeText>
                    <SettingsButton onPress={onSettingsPress}>
                        <Icon name={'settings'} size={20} solid />
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
                <CustomButton style={{ width: '95%' }} title="SKANUJ KWIT WAGOWY" onPress={onScanWeightRecieptPress} />
                <CustomButton style={{ width: '95%' }} title="PRZYJMIJ ZŁOM" onPress={onAcceptScrapPress} />
            </Container>
        </SafeAreaView>
    )
}

export default HomeScreen;