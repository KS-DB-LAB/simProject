import React from "react";
import {View, Text, StyleSheet,Image, Pressable} from "react-native";
import {getData, storeData} from "../../lib/asyncstorage"
import PasswordInputScreen from "../PasswordInputScreen"
import UserShopInfoOnChange from "../UserShopInfoOnChangeScreen"
const SettingMenuScreen = ({navigation, route}) => {

    const {navigatorForInitialScreen} = route.params

    const handleLogout = () => {
        storeData('loginStatus', 'false')
        storeData('owner_name', '')
        storeData('owner_id', '')
        storeData('owner_brands', '')

        navigationScreenNavigator.navigate('LoginScreen')
    }

    return (
        <View style={styles.container}>

            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <View style = {styles.logoImage} />
                    <View style={styles.sideBarIconContainerStyle}>
                        <View style = {styles.sideBarIconStyle} />
                    </View>
                </View>

                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>설정</Text>
                </View>
            </View>

            <View style ={styles.downerComponentGroupStyle}>
                <Pressable style = {styles.menuSelectingOptionTitleStyle} onPress={() => navigation.navigate("PasswordInputScreen", {redirectScreen:"UserPasswordOnChangeScreen"}) }>
                    <Text style ={styles.titleStyle}>비밀번호 변경</Text>
                </Pressable>

                <Pressable style = {styles.menuSelectingOptionTitleStyle} onPress={() => navigation.navigate("PasswordInputScreen", {redirectScreen:"UserShopInfoOnChangeScreen"})}>
                    <Text style ={styles.titleStyle}>가게 정보 변경</Text>
                </Pressable>

                <Pressable style = {styles.menuSelectingOptionTitleStyle} onPress={() => navigation.navigate("PasswordInputScreen", {redirectScreen:"PlatformChangeScreen"})}>
                    <Text style ={styles.titleStyle}>배달 플랫폼 계정 정보 변경</Text>
                </Pressable>

                <Pressable style = {styles.menuSelectingOptionTitleStyle}>
                    <Text style ={styles.titleStyle}>게시판</Text>
                </Pressable>

                <Pressable style = {styles.menuSelectingOptionTitleStyle}>
                    <Text style ={styles.titleStyle}>고객센터</Text>
                </Pressable>

                <Pressable onPress = {() => handleLogout()} style = {styles.menuSelectingOptionTitleStyle}>
                    <Text style ={styles.titleStyle}>로그아웃</Text>
                </Pressable>

            </View>


        </View>
    )

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#ffffff',
    },
    upperComponentGroupStyle:{
        flex:1,
        top:10,
        position:'absolute',
    },
    upperComponentsContainerStyle: {
        flex:1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop: 30,
    },
    logoImage : {
        resizeMode : 'stretch',
        width: 100,
        height: 80,
        backgroundColor: '#ffffff',
        position : 'absolute',
    },
    sideBarIconContainerStyle:{
        marginTop: -5,
        marginLeft : 300 ,
    },
    sideBarIconStyle: {
        resizeMode : 'contain',
        width:35,
        height:25,
    },
    titleContainerStyle : {
        paddingTop : 40,
        paddingBottom : 20,
        alignSelf:'flex-start',
    },

    titleStyle : {
        fontSize : 18,
        fontWeight : 'bold',
        textAlign:'left',
    },

    menuOptionStyle : {
        fontSize : 18,
        fontWeight : 'bold',
        textAlign:'left',
        paddingBottom : 20,
    },

    downerComponentGroupStyle : {
        flex:1,
        justifyContent : 'center',
        alignSelf:'flex-start'
    },
    menuSelectingOptionTitleStyle : {
        paddingLeft : 38,
        paddingBottom : 25
    }
})
///
export default SettingMenuScreen;
