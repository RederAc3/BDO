import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import HomeScreen from '../screens/HomeScreen/HomeScreen'
import CardsTypeNavigation from "./CardsTypeNavigation";
import CreateCardNavigation from "./CreateCardNavigation";
import SettingsNavigation from "./SettingsNavigation";

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#0010CF',
                tabBarInactiveTintColor: '#000',
                headerShown: false,
            })}>
            <Tab.Screen name="Główna" component={SettingsNavigation} options={{
                tabBarIcon: ({ color }) => {
                    return <Icon name={'home'} color={color} size={20}/>
                }
            }}
            />
            <Tab.Screen name="Dodaj" component={CreateCardNavigation} options={{
                tabBarIcon: ({ color }) => {
                    return <Icon name={'plus'} color={color} size={30}/>
                }
            }}
            />
            <Tab.Screen name="Karty" component={CardsTypeNavigation} options={{
                tabBarIcon: ({ color }) => {
                    return <Icon name={'file1'} color={color} size={20}/>
                }
            }}
            />
        </Tab.Navigator>
    )
}

export default HomeNavigation