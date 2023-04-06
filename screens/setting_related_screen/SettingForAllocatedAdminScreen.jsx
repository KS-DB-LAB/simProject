import React, {useState} from "react";
import {View, Text, StyleSheet, Image, Button, Pressable, TouchableOpacity, Dimensions, TextInput} from "react-native";
import {getData} from "../../lib/asyncstorage"
import {supabase} from"../../lib/supabase"
function SettingAllocatedAdmin({navigation}){

    const [updatingAllocatedAdmin, setUpdatingAllocateAdmin] = useState('')

    const updateToSupabase = async (ownerId) => {
        //console.log(ownerId)
        await supabase
            .from('shop_owner_table')
            .update({
                member_brands : '',
                allocated_bank_account: {},
                allocated_admin : updatingAllocatedAdmin,
                allocated_status :0,
            })
            .eq('member_id',ownerId)

        navigation.navigate('SettingMenuScreen')
    }

    return(
        <View style ={styles.container}>
            <View style = {styles.titleContainerStyle}>
                <Text style ={styles.titleStyle}>관리자 ID(이메일) 입력</Text>
            </View>

            <View style={styles.PasswordInputContainer}>
                <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
                <TextInput style={styles.accountInputBox} onChangeText = {text => setUpdatingAllocateAdmin(text)} placeholder="  관리자 ID (이메일)" />
            </View>

            <View style = {styles.DialogButtonContainer}>
                <Pressable  style={styles.DialogButtonsStyle} onPress={()=>navigation.navigate('SettingMenuScreen')}>
                    <Text>취소</Text>
                </Pressable>
                <View style={{ width: 16 }} />
                <Pressable onPress={() => {
                    getData('owner_id').then(ownerId => {
                        updateToSupabase(ownerId)
                    })
                }} style={styles.DialogButtonsStyle}>
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
export default SettingAllocatedAdmin;
