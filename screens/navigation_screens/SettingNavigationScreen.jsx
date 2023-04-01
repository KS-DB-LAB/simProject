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

    const {navigationScreenNavigator, navigatorForInitialScreen} = route.params

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="SettingMenuScreen" screenOptions={{headerShown : false}}>

                <Stack.Screen name="SettingMenuScreen" component={SettingMenuScreen}
                              initialParams ={{
                                  navigationScreenNavigator : navigationScreenNavigator,
                                  navigatorForInitialScreen : navigatorForInitialScreen}}/>

                <Stack.Screen name="PasswordInputScreen" component={PasswordInputScreen}
                              initialParams ={{navigationScreenNavigator : navigationScreenNavigator}}/>

                <Stack.Screen name="UserPasswordOnChangeScreen" component={UserPasswordOnChangeScreen}
                              initialParams ={{navigationScreenNavigator : navigationScreenNavigator}}/>

                <Stack.Screen name="UserShopInfoOnChangeScreen" component={UserShopInfoOnChangeScreen}
                              initialParams ={{navigationScreenNavigator : navigationScreenNavigator}}/>

                <Stack.Screen name="PlatformChangeScreen" component={PlatformChangeScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}
///
export default SettingNavigationScreen;
