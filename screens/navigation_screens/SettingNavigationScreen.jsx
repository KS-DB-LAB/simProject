// @ts-ignore
import React, {useEffect} from "react";
import 'react-native-gesture-handler'
import PasswordInputScreen from "../setting_related_screen/PasswordInputScreen"
import UserShopInfoOnChangeScreen from "../setting_related_screen/UserShopInfoOnChangeScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SettingMenuScreen from "../setting_related_screen/SettingMenuScreen"
import PlatformChangeScreen from "../setting_related_screen/PlatformChangeScreen";
import UserPasswordOnChangeScreen from "../setting_related_screen/UserPasswordOnChangeScreen"
import SettingForAllocatedAdminScreen from "../setting_related_screen/SettingForAllocatedAdminScreen"

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

                <Stack.Screen name="SettingForAllocatedAdminScreen" component={SettingForAllocatedAdminScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}
///
export default SettingNavigationScreen;