// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'
import {useIsFocused} from "@react-navigation/native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrderScreen from "../order_related_screen/OrderScreen";
import OrderSpecificScreen from "../order_related_screen/OrderSpecificScreen";
import OrderSuppliesScreen from "../order_related_screen/OrderSuppliesScreen";
import OrderSubmitScreen from "../order_related_screen/OrderSubmitScreen";
import ChargingMoneyScreen from "../order_related_screen/ChargingMoneyScreen";
import ChargingMoneyHistoryScreen from "../order_related_screen/ChargingMoneyHistoryScreen";
import LoadingForReRenderScreen from "../order_related_screen/LoadingForReRenderScreen";

const Stack = createStackNavigator();
function OrderNavigationScreen({navigation}) {

    const isFocused = useIsFocused()
    const navigationRef = React.useRef(null);

    useEffect(() => {
        //console.log('open')
        navigationRef.current.navigate('LoadingForReRenderScreen')
    },[isFocused])

    return (
        <NavigationContainer ref={navigationRef} independent={true}>
            <Stack.Navigator initialRouteName="OrderScreen" screenOptions={{headerShown : false}}>
                <Stack.Screen name="OrderScreen" component={OrderScreen} initialParams={{drawer : navigation}}/>
                <Stack.Screen name="OrderSpecificScreen" component={OrderSpecificScreen}/>
                <Stack.Screen name="OrderSuppliesScreen" component={OrderSuppliesScreen}/>
                <Stack.Screen name="OrderSubmitScreen" component={OrderSubmitScreen}/>
                <Stack.Screen name="ChargingMoneyScreen" component={ChargingMoneyScreen}/>
                <Stack.Screen name="ChargingMoneyHistoryScreen" component={ChargingMoneyHistoryScreen}/>
                <Stack.Screen name="LoadingForReRenderScreen" component={LoadingForReRenderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default OrderNavigationScreen;