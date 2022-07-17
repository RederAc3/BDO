import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserSettingsScreen from '../screens/UserSettingsScreen/UserSettingsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen'

const Stack = createNativeStackNavigator();

const SettingsNavigation = () => {
    
    return (
        <Stack.Navigator screenOptions={() => ({
            headerTitleAlign: "center"
        })}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Ustawienia" component={UserSettingsScreen} />
        </Stack.Navigator>
    )
}

export default SettingsNavigation;