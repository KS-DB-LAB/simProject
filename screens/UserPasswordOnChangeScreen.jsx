import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, Button, Pressable, TouchableOpacity, Dimensions, TextInput, Modal, KeyboardAvoidingView} from "react-native";
import SettingMenuScreen from "./setting_related_screen/SettingMenuScreen"
import {getData} from "../lib/asyncstorage"
import {idContext} from "./PasswordInputScreen"
import {supabase} from "../lib/supabase"
import { Formik } from 'formik';

function UserPasswordOnChangeScreen({navigation}){
    const [modalVisible, setModalVisible] = useState(false)
    const [ownerId, setOwnerId] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reInputPassword, setReInputPassword] = useState('')

    useEffect(() => {
        getData('owner_id')
            .then(owner_id => setOwnerId(owner_id))
    }, []);

    const compareAndChange = async (newPassword, reInputPassword) => {
        if(newPassword==reInputPassword){
                setModalVisible(false)
                navigation.navigate('SettingMenuScreen')

                await supabase
                    .from('shop_owner_table')
                    .update({
                        member_password : newPassword
                    })
                    .eq('member_id', ownerId)
            }
    }

    return(
            <View style = {styles.container}>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.errorModalMessageContainer}>
                        <View style={styles.errorModalMessageBox}>
                            <Text style={{marginBottom:30, fontSize:15,}}>비밀번호를 변경하시겠습니까?</Text>
                            <Pressable onPress={() => compareAndChange(newPassword, reInputPassword)}>
                                <Text style={{fontSize:15,}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>

                </Modal>
                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>비밀번호 변경</Text>
                </View>

                <View style={styles.PasswordInputContainer}>
                    <TextInput secureTextEntry={true} style={styles.accountInputBox} onChangeText={text => setNewPassword(text)} placeholder="  새 비밀번호" />
                    <TextInput secureTextEntry={true} style={styles.accountInputBox} onChangeText={text => setReInputPassword(text)} placeholder="  새 비밀번호 확인" />
                </View>

                <View style = {styles.DialogButtonContainer}>
                    <Pressable  style={styles.DialogButtonsStyle} onPress={()=>navigation.navigate('SettingMenuScreen')} >
                        <Text>취소</Text>
                    </Pressable>
                    <View style={{ width: 16 }} />
                    <Pressable onPress={() => setModalVisible(true)} style={styles.DialogButtonsStyle}>
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
    errorModalMessageContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor :"rgba(0,0,0,0.5)"
    },
    errorModalMessageBox:{
        width:300,
        height:200,
        backgroundColor:"#ffffff",
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',

    },
})
//
export default UserPasswordOnChangeScreen;