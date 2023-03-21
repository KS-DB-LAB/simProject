import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
// @ts-ignore
import React from 'react';


import {Pressable, View, Image, Text,StyleSheet} from 'react-native';

import MainScreen from "../screens/MainScreen";
import SalesAndProfitScreen from "../screens/SalesAndProfitScreen";
import OrderNavigationScreen from "../screens/navigation_screens/OrderNavigationScreen";
import PlatformAddScreen from "../screens/PlatformAddScreen";
import SettingNavigationScreen from "../screens/navigation_screens/SettingNavigationScreen";

const Drawer = createDrawerNavigator();


function CustomDrawerContent({navigation}){
    const drawerItems =[
        {
            label  : '메인 홈',
            onPress: () => navigation.navigate('MainScreen'),
        },
        {
            label: '매출/수익',
            onPress: () => navigation.navigate('SalesAndProfitScreen'),
        },
        {
            label: '발주',
            onPress: () => navigation.navigate('OrderNavigationScreen'),
        },
        {
            // Test 용 버튼
            label: 'PlatformAddScreen',
            onPress: () => navigation.navigate('PlatformAddScreen'),
        },
        {
            label: '설정',
            onPress: () => navigation.navigate('SettingNavigationScreen'),
        },

    ]
    return (
        <View style={styles.drawerBackgroundStyle}>
            <View style={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Pressable onPress={() => navigation.closeDrawer()} style={styles.sideBarCloseIconContainerStyle}>
                        <Image source = {require('../images/sideBarCloseIcon.jpg')} style = {styles.logoImage} />
                    </Pressable>
                </View>
            </View>

            <View style ={styles.drawerButtonsContainerStyle}>
                {drawerItems.map((item, index) => (
                    <Pressable key={index} style={styles.drawerButtonStyle} onPress={item.onPress}>
                        <Text style={styles.label}>{item.label}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}

function SideMenu({navigation}){


    return (
        <NavigationContainer independent={true} >
            <Drawer.Navigator
                initialRouteName="MainScreen"
                screenOptions={{drawerPosition: 'right', headerShown : false}}
                drawerContent={props => <CustomDrawerContent {...props}/>}>
                <Drawer.Screen name="MainScreen" component={MainScreen} />
                <Drawer.Screen name="SalesAndProfitScreen" component={SalesAndProfitScreen} />
                <Drawer.Screen name="OrderNavigationScreen" component={OrderNavigationScreen} />
                <Drawer.Screen name="PlatformAddScreen" component={PlatformAddScreen} />
                <Drawer.Screen name="SettingNavigationScreen" component={SettingNavigationScreen}
                               initialParams = {{navigationScreenNavigator : navigation}}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )

}


const styles = StyleSheet.create({
    upperComponentGroupStyle:{
        flex:1,
        top:10,

    },
    upperComponentsContainerStyle:{
        marginTop:15,
        marginLeft:40,
        flexDirection : 'row',
        justifyContent : 'center',

    },
    logoImage: {
        resizeMode : 'contain',
        width:35,
        height:35,

    },
    sideBarCloseIconContainerStyle:{
        marginRight:10,
        marginTop:5,
    },
    drawerBackgroundStyle: {
        flex:1,
        backgroundColor: '#D9D9D9',
        alignItems: 'flex-end',
    },
    drawerButtonsContainerStyle:{
        flex:10,
        backgroundColor: '#D9D9D9',
        alignItems:'center',
        justifyContent:'center',
    },
    drawerButtonStyle:{
        width: 200,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor : '#B3AFAF',
        borderRadius : 10,
        marginTop : 20,
        marginRight: 35,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign : "center",
    },
})


export default SideMenu;
