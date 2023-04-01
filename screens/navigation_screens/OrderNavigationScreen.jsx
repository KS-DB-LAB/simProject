// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrderScreen from "../order_related_screen/OrderScreen";
import OrderSpecificScreen from "../order_related_screen/OrderSpecificScreen";
import OrderSuppliesScreen from "../order_related_screen/OrderSuppliesScreen";
import OrderSubmitScreen from "../order_related_screen/OrderSubmitScreen";
import ChargingMoneyScreen from "../order_related_screen/ChargingMoneyScreen";

const Stack = createStackNavigator();
function OrderNavigationScreen({navigation}) {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="OrderScreen" screenOptions={{headerShown : false}}>
                <Stack.Screen name="OrderScreen" component={OrderScreen} initialParams={{drawer : navigation}}/>
                <Stack.Screen name="OrderSpecificScreen" component={OrderSpecificScreen}/>
                <Stack.Screen name="OrderSuppliesScreen" component={OrderSuppliesScreen}/>
                <Stack.Screen name="OrderSubmitScreen" component={OrderSubmitScreen}/>
                <Stack.Screen name="ChargingMoneyScreen" component={ChargingMoneyScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default OrderNavigationScreen;