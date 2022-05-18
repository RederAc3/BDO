import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardsStatusNavigation from './CardsStatusNavigation';

const Stack = createNativeStackNavigator();

const CardsTypeNavigation = () => {

    return (
        <Stack.Navigator screenOptions={() => ({
            headerTitleAlign: "center"
        })}>
            <Stack.Screen name="Rodzaje kart" component={CardsStatusNavigation} options={{ title: 'Karty przekazania odpadów' }} />
        </Stack.Navigator>
    )
}

export default CardsTypeNavigation