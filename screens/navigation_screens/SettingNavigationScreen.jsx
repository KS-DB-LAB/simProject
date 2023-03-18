// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SettingMenuScreen from "../setting_related_screen/SettingMenuScreen"

const Stack = createStackNavigator();
function SettingNavigationScreen() {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="SettingMenuScreen" screenOptions={{headerShown : false}}>
                <Stack.Screen name="SettingMenuScreen" component={SettingMenuScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default SettingNavigationScreen;