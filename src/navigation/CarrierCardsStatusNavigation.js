import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CardsTypeScreen from '../screens/CardsTypeScreen/CardsTypeScreen';
import DetailsCardScreen from '../screens/DetailsCardScreen/DetailsCardScreen';
import CardsListScreen from "../screens/CardsListScreen/CardsListScreen";

const Stack = createNativeStackNavigator();

const CarrierCardsListNavigation = () => {

    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="carrier">
                {(props) => <CardsTypeScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Lista" component={CardsListScreen} options={{ gestureEnabled: true }} />
            <Stack.Screen name="Informacje" component={DetailsCardScreen} options={{ gestureEnabled: true }} />
        </Stack.Navigator>
    )
}

export default CarrierCardsListNavigation