// @ts-ignore
import React, {useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";


import { createClient } from '@supabase/supabase-js';
import { URL } from 'url-parse';




function LoginScreen() {
    const supabaseUrl = 'https://bnllcyoecriysucewobs.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubGxjeW9lY3JpeXN1Y2V3b2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwNTIwMzksImV4cCI6MTk5MjYyODAzOX0.UMWikpFryLUojMWw4d4qBzPN-SGCLv8zSC-k91dkBas'
    const supabase = createClient(supabaseUrl, supabaseKey);

    const navigation = useNavigation();

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
            .insert([
                { id: 2, created_at:new Date().toISOString(), member_name:"장홍준", member_id:'aasdasd',member_password:'asdkasd',member_shops:'밀면제작소',location_address:'기장'}
            ]);

        if (error) {
            console.log("!!")
            console.log(error);
        } else {
            console.log(data);
        }
    };

    // const { data, error } = await supabase
    //     .from('member_table')
    //     .select('*')
    //     .eq('member_name', '장홍준')
    //
    // if (error) {
    //     console.log(error.message);
    //     return;
    // }
    // else {
    //     if (data.length > 0) {
    //         const firstTask = data[0];
    //         console.log('First task by name:', firstTask);
    //     } else {
    //         console.log(memberId);
    //         console.log('No tasks found with name:', data[0]);
    //     }
    // }


    return (
    <View style={styles.container}>
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