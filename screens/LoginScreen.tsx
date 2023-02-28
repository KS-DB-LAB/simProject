// @ts-ignore
import React, {useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, Modal, Pressable, KeyboardAvoidingView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
// @ts-ignore
import {SUPABASE_API_KEY, SUPABASE_URL} from "@env"
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);


import SideMenu from "../components/SideMenu";




function LoginScreen() {

    const navigation = useNavigation();
    const drawerNavigation = createDrawerNavigator();

    const [memberId, setMemberId] = useState('');
    const [memberPassword, setMemberPassword] = useState('');

    const handleInputChange = (text) => {
        setMemberId(text);
    }
    const handleInputPasswordChange = (text) => {
        setMemberPassword(text);
    }

    const handleSearch = async () => {
        const { data, error } = await supabase
            .from('member_table')
            .select('*')
            .eq('member_id',memberId)

        if (error || memberId=='') {
            setErrorModalVisible(true);
        } else {
            // @ts-ignore
            data[0].member_password == memberPassword ? navigation.navigate('SideMenu') : setErrorModalVisible(true);
        }
    };


    const [errorModalVisible, setErrorModalVisible] = useState(false);


    return (
    <View style={styles.container}>
        <Modal
            visible={errorModalVisible}
            animationType="slide"
            onRequestClose={() => setErrorModalVisible(false)}>
            <View style={styles.errorModalMessageContainer}>
                <View style={styles.errorModalMessageBox}>
                    <Text style={{marginBottom:30, fontSize:15,}}>아이디나 비밀번호를 잘못 입력하셨습니다.</Text>
                    <Pressable onPress={() => setErrorModalVisible(false)}>
                        <Text style={{fontSize:15,}}>확인</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>
        <View style={styles.container}>
            <Image source = {require('../images/slogan.jpg')} style = {styles.logoImage}  />
        </View>
        <View style={styles.loginSectionContainer}>
            <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
            <View style={styles.container}>
                <TextInput style={styles.accountInputBox} onChangeText={handleInputChange} placeholder="  아이디" />
                <TextInput secureTextEntry={true} style={styles.accountInputBox} onChangeText={handleInputPasswordChange} placeholder="  패스워드" />
            </View>
            <View style={styles.container}>
                <Pressable onPress={handleSearch} style={styles.loginButtonStyle}>
                    <Text>로그인</Text>
                </Pressable>

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
    loginSectionContainer : {
        flex:1.5,
        alignItems:'center',
        width:500,
        height:100,

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
    loginButtonStyle: {
        justifyContent:'center',
        alignItems : 'center',
        width:112,
        height:32,
        borderRadius : 10,
        borderWidth:1,
        borderColor:'black',
        position:'absolute',
    },
    commentForLogin: {
        marginBottom : 20
    },


})
export default LoginScreen;