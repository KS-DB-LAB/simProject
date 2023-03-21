// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SettingMenuScreen from "../setting_related_screen/SettingMenuScreen"
import PlatformChangeScreen from "../PlatformChangeScreen";

const Stack = createStackNavigator();
function SettingNavigationScreen({route}) {

    const {navigationScreenNavigator} = route.params

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="SettingMenuScreen" screenOptions={{headerShown : false}}>

                <Stack.Screen name="SettingMenuScreen" component={SettingMenuScreen}
                              initialParams ={{navigationScreenNavigator : navigationScreenNavigator}}/>

                <Stack.Screen name="PlatformChangeScreen" component={PlatformChangeScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default SettingNavigationScreen;