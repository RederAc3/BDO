import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CardsTypeScreen from '../screens/CardsTypeScreen/CardsTypeScreen';
import DetailsCardScreen from '../screens/DetailsCardScreen/DetailsCardScreen';
import CardsListScreen from "../screens/CardsListScreen/CardsListScreen";

const Stack = createNativeStackNavigator();

const ReceiverCardsListNavigation = () => {

    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="receiver">
                {(props) => <CardsTypeScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Lista" component={CardsListScreen} options={{ gestureEnabled: true }} />
            <Stack.Screen name="Informacje" component={DetailsCardScreen} options={{ gestureEnabled: true }} />
        </Stack.Navigator>
    )
}

export default ReceiverCardsListNavigation