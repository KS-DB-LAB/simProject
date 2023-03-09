// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrderScreen from "../order_related_screens/OrderScreen";
import OrderSpecificScreen from "../order_related_screens/OrderSpecificScreen";
import OrderSuppliesScreen from "../order_related_screens/OrderSuppliesScreen";


const Stack = createStackNavigator();
function OrderNavigationScreen({navigation}) {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="OrderScreen" screenOptions={{headerShown : false}}>
                <Stack.Screen name="OrderScreen" component={OrderScreen} initialParams={{drawerNavigation : navigation}}/>
                <Stack.Screen name="OrderSpecificScreen" component={OrderSpecificScreen}/>
                <Stack.Screen name="OrderSuppliesScreen" component={OrderSuppliesScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default OrderNavigationScreen;