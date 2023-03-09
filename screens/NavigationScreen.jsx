// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";``
import JoinScreen from "./JoinScreen";
import PlatformAddScreen from "./PlatformAddScreen";
import SideMenu from "../components/SideMenu"

import {getData} from "../lib/asyncstorage";

const Stack = createStackNavigator();
function NavigationScreen() {
    const navigationRef = React.useRef(null);

    useEffect(() => {
        try{
            getData('loginStatus').then(res => {res == 'true' && navigationRef.current
                ? navigationRef.current.navigate('SideMenu') : navigationRef.current.navigate('LoginScreen')})
        }
        catch{
        }

    }, [])


    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown : false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="JoinScreen" component={JoinScreen}/>
                <Stack.Screen name="PlatformAddScreen" component={PlatformAddScreen}/>
                <Stack.Screen name="SideMenu" component={SideMenu}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavigationScreen;