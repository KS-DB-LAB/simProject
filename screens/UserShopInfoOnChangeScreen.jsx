import React, {useState} from "react";
import {View, Text, StyleSheet, Image, Button, Pressable, TouchableOpacity, Dimensions, TextInput} from "react-native";


function UserShopInfoOnChangeScreen({navigation}){
    return(
        <View>
            <View style = {styles.titleContainerStyle}>
                <Text style ={styles.titleStyle}>가게 정보 변경</Text>
            </View>

            <View style={styles.PasswordInputContainer}>
                <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
                <TextInput style={styles.accountInputBox}  placeholder="  이름" />
                <TextInput style={styles.accountInputBox}  placeholder="  사업자등록증 번호" />
                <TextInput secureTextEntry={true} style={styles.accountInputBox} placeholder="  주소" />
            </View>

            <View style = {styles.DialogButtonContainer}>
                <Pressable  style={styles.DialogButtonsStyle}>
                    <Text>취소</Text>
                </Pressable>
                <View style={{ width: 16 }} />
                <Pressable onPress={()=>navigation.navigate('JoinScreen')} style={styles.DialogButtonsStyle}>
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
        textAlign:'left',
        left : 50,
        top : 100
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

export default UserShopInfoOnChangeScreen;