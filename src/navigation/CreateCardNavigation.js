import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateCard from '../screens/CreateCard/CreateCard';

const Stack = createNativeStackNavigator();

const CreateCardNavigation = () => {
    
    return (
        <Stack.Navigator screenOptions={() => ({
            headerTitleAlign: "center"
        })}>
            <Stack.Screen name="Dodaj kartę" component={CreateCard} />
        </Stack.Navigator>
    )
}

export default CreateCardNavigation;