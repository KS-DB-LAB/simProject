import React, {useState, useEffect, createContext} from "react";
import {View, Text, StyleSheet, Image, Button, Pressable, TouchableOpacity, Dimensions, TextInput, Modal} from "react-native";
import SettingMenuScreen from "./setting_related_screen/SettingMenuScreen"
import UserPasswordOnChangeScreen from "./UserPasswordOnChangeScreen"
import {supabase} from "../lib/supabase"
import {getData} from "../lib/asyncstorage"

export const idContext = createContext();

function PasswordInputScreen({navigation, route}){

    const [inputPassword, setInputPassword] = useState('')
    const [ownerId, setOwnerId] = useState('')


    const handleTextInput = (text) => {
        setInputPassword(text)
    }

    useEffect(() => {
        getData('owner_id')
            .then(owner_id => setOwnerId(owner_id))
    }, []);

    const {redirectScreen} = route.params
    // console.log(redirectScreen)

    async function getPassword(owner_id) {

        const {data, error} =
            await supabase
                .from('shop_owner_table')
                .select('*')
                .eq('member_id', owner_id)
        // console.log(data[0].member_password)
        data[0].member_password == inputPassword ?
            navigation.navigate(redirectScreen) : setErrorModalVisible(true)
    }

    const [errorModalVisible, setErrorModalVisible] = useState(false)
    return(

        <View style = {styles.container}>

            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisible(false)}>
                <View style={styles.errorModalContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            비밀번호가 틀립니다.
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={() => {
                                setErrorModalVisible(false)
                            }}>
                                <Text style={{fontSize:15,}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>

            <View style = {styles.titleContainerStyle}>
                <Text style ={styles.titleStyle}>비밀번호 입력</Text>
            </View>

            <View style={styles.PasswordInputContainer}>
                <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
                <TextInput secureTextEntry={true} style={styles.accountInputBox} placeholder="  비밀번호" onChangeText={(text) => handleTextInput(text)}/>
            </View>

            <View style = {styles.DialogButtonContainer}>
                <Pressable  style={styles.DialogButtonsStyle} onPress={()=>navigation.navigate('SettingMenuScreen')}>
                    <Text>취소</Text>
                </Pressable>
                <View style={{ width: 16 }} />
                <Pressable onPress={() => getPassword(ownerId)} style={styles.DialogButtonsStyle}>
                    <Text>완료</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    errorModalContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor :"rgba(0,0,0,0.5)"
    },
    errorModalMessageBox:{
        width:350,
        height:200,
        backgroundColor:"#ffffff",
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',

    },
    container :{
        flex:1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#ffffff',
    },

    titleContainerStyle : {
        paddingTop : 40,
        paddingBottom : 20,

    },

    titleStyle : {
        fontSize : 18,
        fontWeight : 'bold',


    },

    DialogButtonContainer : {
        marginTop:20,
        flexDirection: 'row',
    },

    DialogButtonsStyle : {

        justifyContent:'center',

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
        alignItems: 'center',
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
export default PasswordInputScreen;