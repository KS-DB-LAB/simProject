
import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, Modal, Pressable,
    KeyboardAvoidingView, Platform, StatusBar, BackHandler, Alert } from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import 'react-native-url-polyfill/auto';
import {supabase} from "../../lib/supabase";
import {storeData} from "../../lib/asyncstorage"

import {decode} from "../../lib/cryptofunction";

// import SideMenu from "../components/SideMenu";
// import JoinScreen from "../screens/JoinScreen";

function LoginScreen({navigation}) {


    const drawerNavigation = createDrawerNavigator();

    const [memberId, setMemberId] = useState('');
    const [memberPassword, setMemberPassword] = useState('');

    const handleInputChange = (text) => {
        setMemberId(text);
    }
    const handleInputPasswordChange = (text) => {
        setMemberPassword(text);
    }

    const checkForAvailable = (data) => {
        decode(data[0].member_password) === memberPassword ? ifLoginSucceededFunction(data) : setErrorModalVisible(true)
    }

    const handleSearch = async () => {
        const { data, error } = await supabase
            .from('shop_owner_table')
            .select('*')
            .eq('member_id',memberId)

        if (error || memberId=='') {
            setErrorModalVisible(true);
        } else {
            data.length == 0 ? setErrorModalVisible(true) : checkForAvailable(data)
        }
    };

    const ifLoginSucceededFunction = (data) => {

        storeData('loginStatus', 'true')
        storeData('owner_name', data[0]["member_name"])
        storeData('owner_id', data[0]["member_id"])
        storeData('owner_brands', data[0]["member_brands"])
        storeData('owner_location_address',data[0]["location_address"])
        storeData('allocated_admin',data[0]["allocated_admin"])


        setMemberId('')
        setMemberPassword('')

        navigation.navigate('SideMenu',{navigatorForInitialScreen : navigation})
    }

    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                '종료',
                '앱을 종료하시겠습니까?',
                [
                    {
                        text: '취소',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: '확인', onPress: () => BackHandler.exitApp() },
                ],
                { cancelable: false }
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    },[])

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
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
                <Image source = {require('../../images/slogan.jpg')} style = {styles.logoImage}  />
            </View>

            <View style={styles.loginSectionContainer}>
                <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
                <TextInput style={styles.accountInputBox} onChangeText={handleInputChange} placeholder="  아이디" >
                    {memberId}
                </TextInput>
                <TextInput secureTextEntry={true} style={styles.accountInputBox} onChangeText={handleInputPasswordChange} placeholder="  패스워드" >
                    {memberPassword}
                </TextInput>
                <Pressable onPress={handleSearch} style={styles.loginButtonStyle}>
                    <Text>로그인</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('JoinScreen')} style={styles.loginButtonStyle}>
                    <Text>회원가입</Text>
                </Pressable>
            </View>

        </KeyboardAvoidingView>

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
        flex:1,
        alignItems:'center',

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
    loginButtonsContainerStyle:{
        flex:1,
    },
    loginButtonBoxStyle:{
        flex:0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    loginButtonStyle: {
        justifyContent:'center',
        alignItems : 'center',
        width:112,
        height:32,
        borderRadius : 10,
        borderWidth:1,
        borderColor:'black',
        position : 'relative',
        marginTop:10,
    },
    commentForLogin: {
        marginBottom : 20
    },


})
export default LoginScreen;