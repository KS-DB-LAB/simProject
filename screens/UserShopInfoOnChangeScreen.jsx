import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Button, Pressable, TouchableOpacity, Dimensions, TextInput, Modal} from "react-native";
import SettingMenuScreen from "./setting_related_screen/SettingMenuScreen"
import {getData} from "../lib/asyncstorage"
import {supabase} from "../lib/supabase"


function UserShopInfoOnChangeScreen({navigation}){

    const [modalVisible, setModalVisible] = useState(false)
    const [ownerId, setOwnerId] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [bNumber, setBNumber] = useState('')
    const [shopAddress, setShopAddress] = useState('')

    useEffect(() => {
        getData('owner_id')
            .then(owner_id => setOwnerId(owner_id))
    }, []);

    const handleInputName = (text) => {
        setOwnerName(text)
        //console.log(ownerName)
    }

    const handleInputBNumber = (text) => {
        setBNumber(text)
        //console.log(bNumber)
    }

    const handleInputAdress = (text) => {
        setShopAddress(text)
        //console.log(shopAddress)
    }

    const showModal = () => {
        setModalVisible(true)
    }

    const hideModal = () => {
        setModelVisible(false)
    }

    const updateAndNext = async (ownerName, bNumber, shopAddress) => {
        try {
            setModalVisible(false)
            navigation.navigate('SettingMenuScreen')

            await supabase
                .from('shop_owner_table')
                .update({
                    member_name : ownerName,
                    business_number : bNumber,
                    location_address : shopAddress,
                })
                .eq('member_id', ownerId)

        } catch (error) {
            //console.log(error)
        }
    }

    return(
        <View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15,}}>가게 정보를 변경하시겠습니까?</Text>
                        <Pressable onPress={() => updateAndNext(ownerName, bNumber, shopAddress)}>
                            <Text style={{fontSize:15,}}>확인</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>

            <View style = {styles.titleContainerStyle}>
                <Text style ={styles.titleStyle}>가게 정보 변경</Text>
            </View>

            <View style={styles.PasswordInputContainer}>
                <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
                <TextInput style={styles.accountInputBox} onChangeText={handleInputName} placeholder="  이름" />
                <TextInput style={styles.accountInputBox} onChangeText={handleInputBNumber} placeholder="  사업자등록증 번호" />
                <TextInput secureTextEntry={true} style={styles.accountInputBox} onChangeText={handleInputAdress} placeholder="  주소" />
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
///
export default UserShopInfoOnChangeScreen;