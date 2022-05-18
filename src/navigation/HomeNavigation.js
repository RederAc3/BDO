import React from "react";
import { Text } from "react-native"
import styled from "styled-components";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen/HomeScreen'
import CardsTypeNavigation from "./CardsTypeNavigation";
import CreateCardNavigation from "./CreateCardNavigation";

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: () => <Text>{route.name}</Text>,
                tabBarIcon: ({ focused }) => <Icon focused={focused}></Icon>,
                headerShown: false,
            })}>
            <Tab.Screen name="Główna" component={HomeScreen} />
            <Tab.Screen name="Dodaj" component={CreateCardNavigation} />
            <Tab.Screen name="Karty" component={CardsTypeNavigation} />
        </Tab.Navigator>
    )
}

const Icon = styled.View`
    width: 10px;
    height: 10px;
    background-color: #0010CF;
    opacity: ${({focused}) => focused ? 1.0 : 0.4};
`;

export default HomeNavigation