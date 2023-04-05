import React, {useState} from "react";
import {View, Text, StyleSheet, Image, Button, Pressable, TouchableOpacity, Dimensions, TextInput} from "react-native";

function SettingAllocatedAdmin({navigation}){
    return(
        <View>
            <View style = {styles.titleContainerStyle}>
                <Text style ={styles.titleStyle}>관리자 ID(이메일) 입력</Text>
            </View>

            <View style={styles.PasswordInputContainer}>
                <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
                <TextInput secureTextEntry={true} style={styles.accountInputBox} placeholder="  관리자 ID (이메일)" />
            </View>

            <View style = {styles.DialogButtonContainer}>
                <Pressable  style={styles.DialogButtonsStyle} onPress={()=>navigation.navigate('SettingMenuScreen')}>
                    <Text>취소</Text>
                </Pressable>
                <View style={{ width: 16 }} />
                <Pressable onPress={() => console.log('여기서 db에 업데이트')} style={styles.DialogButtonsStyle}>
                    <Text>완료</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#ffffff',
    },

    titleContainerStyle : {
        paddingTop : 40,
        paddingBottom : 20,
        alignSelf:'flex-start',
    },

    titleStyle : {
        fontSize : 18,
        fontWeight : 'bold',

        left : 150,
        top : 200
    },

    DialogButtonContainer : {
        flexDirection: 'row',
    },

    DialogButtonsStyle : {
        top : 450,
        justifyContent:'center',
        left : 95,
        alignItems : 'center',
        //flex : 1,
        borderRadius : 10,
        borderWidth:1,
        borderColor:'black',
        position : 'relative',
        width:100,
        height:36,


    },

    PasswordInputContainer : {
        flex:1,
        alignItems: 'center',
        top : 200


    },
    errorModalMessageContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    errorModalMessageBox:{
        width:300,
        height:200,
        backgroundColor:"#d9d9d9",
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',

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

    commentForLogin: {
        marginBottom : 20
    },
})
///
export default SettingAllocatedAdmin;
