// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import JoinScreen from "./JoinScreen";
import SideMenu from "../components/SideMenu"

import AsyncStorage from "@react-native-async-storage/async-storage";

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