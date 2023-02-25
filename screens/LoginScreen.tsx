// @ts-ignore
import React from "react";
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";



function LoginScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image source = {require('../images/slogan.jpg')} style = {styles.logoImage}  />
            </View>
            <View style={styles.container}>
                        <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
                        <View style={styles.container}>
                            <TextInput style={styles.accountInputBox}>  아이디</TextInput>
                            <TextInput style={styles.accountInputBox}>  패스워드</TextInput>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.loginButtonStyle}>
                        <Pressable onPress={() => { // @ts-ignore
                            navigation.navigate('MainScreen');}}><Text>로그인</Text></Pressable>
                    </View>
                </View>
                <View style={styles.container}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor : '#ffffff',
    },

    logoImage : {
        resizeMode : 'stretch',
        width: 344,
        height: 185,
    },
    accountInputBox: {
        width:192,
        height:36,
        borderRadius: 10,
        borderWidth:1,
        borderColor:'black',
        marginBottom: 10,
        color : 'gray',

    },
    loginButtonStyle: {
        justifyContent:'center',
        alignItems : 'center',
        width:112,
        height:32,
        borderRadius : 10,
        borderWidth:1,
        borderColor:'black'

    },
    commentForLogin: {
        marginBottom : 20
    }

})
export default LoginScreen;