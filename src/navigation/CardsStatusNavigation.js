import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SenderCardsStatusNavigation from './SenderCardsStatusNavigation';
import CarrierCardsStatusNavigation from './CarrierCardsStatusNavigation';
import ReceiverCardsStatusNavigation from "./ReceiverCardsStatusNavigation";

const Tab = createMaterialTopTabNavigator();
const CardsStatusNavigation = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Przekazanie" component={SenderCardsStatusNavigation} />
            <Tab.Screen name="Transport" component={CarrierCardsStatusNavigation} />
            <Tab.Screen name="Przejęcie" component={ReceiverCardsStatusNavigation} />
        </Tab.Navigator>
    )
}

export default CardsStatusNavigation