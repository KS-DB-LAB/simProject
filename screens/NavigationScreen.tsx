// @ts-ignore
import React from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./MainScreen";
import LoginScreen from "./LoginScreen";
import SideMenu from "../components/SideMenu"



const Stack = createStackNavigator();
function NavigationScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SideMenu" screenOptions={{headerShown : false}}>
                <Stack.Screen name="MainScreen" component={MainScreen}/>
                <Stack.Screen name="SideMenu" component={SideMenu}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavigationScreen;