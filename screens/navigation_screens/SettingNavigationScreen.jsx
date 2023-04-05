// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'
import PasswordInputScreen from "../PasswordInputScreen"
import UserShopInfoOnChangeScreen from "../UserShopInfoOnChangeScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SettingMenuScreen from "../setting_related_screen/SettingMenuScreen"
import PlatformChangeScreen from "../PlatformChangeScreen";
import UserPasswordOnChangeScreen from "../UserPasswordOnChangeScreen"
const Stack = createStackNavigator();
function SettingNavigationScreen({navigation, route}) {

    const {navigatorForInitialScreen} = route.params

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="SettingMenuScreen" screenOptions={{headerShown : false}}>

                <Stack.Screen name="SettingMenuScreen" component={SettingMenuScreen}
                              initialParams ={{navigationScreenNavigator : navigation,
                                  navigatorForInitialScreen : navigatorForInitialScreen}}/>

                <Stack.Screen name="PasswordInputScreen" component={PasswordInputScreen}/>

                <Stack.Screen name="UserPasswordOnChangeScreen" component={UserPasswordOnChangeScreen}/>

                <Stack.Screen name="UserShopInfoOnChangeScreen" component={UserShopInfoOnChangeScreen}/>

                <Stack.Screen name="PlatformChangeScreen" component={PlatformChangeScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}
///
export default SettingNavigationScreen;