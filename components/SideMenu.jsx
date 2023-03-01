import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
// @ts-ignore
import React from 'react';


import {Pressable, View, Image, Text,StyleSheet} from 'react-native';

import MainScreen from "../screens/MainScreen";
import SalesAndProfitScreen from "../screens/SalesAndProfitScreen";
import OrderScreen from "../screens/OrderScreen";

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
            onPress: () => navigation.navigate('OrderScreen'),
        },

    ]
    return (
        <View style={styles.drawerBackgroundStyle}>
            <View style={styles.upperComponentsContainerStyle}>
                <Pressable onPress={() => navigation.closeDrawer()} style={styles.sideBarCloseIconContainerStyle}>
                    <Image source = {require('../images/sideBarCloseIcon.jpg')} style = {styles.logoImage} />
                </Pressable>

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

function SideMenu(){
    return (
        <NavigationContainer independent={true} >
            <Drawer.Navigator
                initialRouteName="MainScreen"
                screenOptions={{drawerPosition: 'right', headerShown : false}}
                drawerContent={props => <CustomDrawerContent {...props}/>}>
                <Drawer.Screen name="MainScreen" component={MainScreen} />
                <Drawer.Screen name="SalesAndProfitScreen" component={SalesAndProfitScreen} />
                <Drawer.Screen name="OrderScreen" component={OrderScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )

}


const styles = StyleSheet.create({
    upperComponentsContainerStyle:{
        flexDirection : 'row',

        justifyContent : 'flex-end',
        marginTop: 30,
    },
    logoImage: {
        resizeMode : 'contain',
        width:35,
        height:35,

    },
    sideBarCloseIconContainerStyle:{
        marginRight:30,
        marginTop:5,
    },
    drawerBackgroundStyle: {
        flex:1,
        backgroundColor: '#D9D9D9',
        alignItems: 'flex-end',
    },
    drawerButtonsContainerStyle:{
        flex:1,
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
