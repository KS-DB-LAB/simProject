// @ts-ignore
import React, {useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, Modal, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import { createClient } from '@supabase/supabase-js';

import SideMenu from "../components/SideMenu";




function LoginScreen() {
    const supabaseUrl = 'https://bnllcyoecriysucewobs.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubGxjeW9lY3JpeXN1Y2V3b2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwNTIwMzksImV4cCI6MTk5MjYyODAzOX0.UMWikpFryLUojMWw4d4qBzPN-SGCLv8zSC-k91dkBas'
    const supabase = createClient(supabaseUrl, supabaseKey);

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
        <View style={styles.container}>
            <Text style ={styles.commentForLogin}>서비스를 사용하려면 로그인하세요.</Text>
            <View style={styles.container}>
                <TextInput style={styles.accountInputBox} onChangeText={handleInputChange} placeholder="  아이디" />
                <TextInput secureTextEntry={true} style={styles.accountInputBox} onChangeText={handleInputPasswordChange} placeholder="  패스워드" />
            </View>
            <View style={styles.container}>
                <Pressable onPress={handleSearch}>
                    <View style={styles.loginButtonStyle}>
                        <Text>로그인</Text>
                    </View>
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
        borderColor:'black'

    },
    commentForLogin: {
        marginBottom : 20
    },


})
export default LoginScreen;