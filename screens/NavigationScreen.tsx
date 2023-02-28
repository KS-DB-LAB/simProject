// @ts-ignore
import React from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./MainScreen";
import LoginScreen from "./LoginScreen";
import JoinScreen from "./JoinScreen";
import SideMenu from "../components/SideMenu"
import SalesAndProfitScreen from "./SalesAndProfitScreen";



const Stack = createStackNavigator();
function NavigationScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown : false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="JoinScreen" component={JoinScreen}/>
                <Stack.Screen name="SideMenu" component={SideMenu}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavigationScreen;