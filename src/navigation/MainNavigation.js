import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
import ApiKeyRegistrationScreen from '../screens/ApiKeyRegistrationScreen/ApiKeyRegistrationScreen';
import LoadingScreen from "../screens/LoadingScreen/LoadingScreen"
import HomeNavigation from "./HomeNavigation";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    const [isAuthenticate, setAuthenticate] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            AsyncStorage.getItem('token').then(val => {
                val ? (
                    setAuthenticate(!!val),
                    setLoading(false)
                ) : (
                    setAuthenticate(false),
                    setLoading(false)
                )
            }) 
        }, 500)
    }, [])
    return (

        <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
            {
                loading ? (
                    <>
                        <Stack.Screen name="Loading" component={LoadingScreen} options={{ gestureEnabled: false, animationTypeForReplace: 'pop' }} />
                    </>
                ) : (
                    !isAuthenticate ? (
                        <>
                            <Stack.Screen name="Logowanie" component={LoginScreen} options={{ gestureEnabled: false, animationTypeForReplace: 'push' }} />
                            <Stack.Screen name="Rejestracja" component={RegistrationScreen} options={{ gestureEnabled: false }} />
                            <Stack.Screen name="Klucze API" component={ApiKeyRegistrationScreen} options={{ gestureEnabled: true }} />
                            <Stack.Screen name="Home" component={HomeNavigation} options={{ gestureEnabled: false }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={HomeNavigation} options={{ gestureEnabled: false }} />
                            <Stack.Screen name="Logowanie" component={LoginScreen} options={{ gestureEnabled: false }} />
                            <Stack.Screen name="Rejestracja" component={RegistrationScreen} options={{ gestureEnabled: false }} />
                            <Stack.Screen name="Klucze API" component={ApiKeyRegistrationScreen} options={{ gestureEnabled: true }} />
                        </>
                    )
                )}
        </Stack.Navigator>
    )
}

export default MainNavigation