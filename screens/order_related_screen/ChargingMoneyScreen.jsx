import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView, TextInput
,KeyboardAvoidingView, Platform, Modal} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useIsFocused} from "@react-navigation/native";

function ChargingMoneyScreen({navigation}){
    isFocused = useIsFocused();
    const [chargingMoneyInteger, setChargingMoneyInteger] = useState(0)

    useEffect( () => {
        console.log('ChargingMoneySCreen')

    },[isFocused])

    const [chargingMoney, setChargingMoney] = useState('')
    const numberThousandFormat = (chargedMoneyString) => {
        chargedMoneyString = chargedMoneyString.replaceAll(',','')
        if (chargedMoneyString.includes('-')){
            return "마이너스 입력 금지!"
        }
        let tempChargedMoneyString =''
        var i=0
        chargedMoneyString.split('').reverse().map(index => {
            if (i%3==0 && i!=0) {
                tempChargedMoneyString += ','
            }
            tempChargedMoneyString += index
            i++
            // console.log(i + ":" + index + " -> " + tempChargedMoneyString)
        })

        return tempChargedMoneyString.split('').reverse().join("")
    }

    const setChargingMoneyToSupabase = async (ownerId) => {
        await supabase
        .from('order_charging_table')
        .insert([
            {
                owner_id : ownerId,
                requested_charging_money : chargingMoneyInteger,
            }
        ])
    }

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessageModalVisible, setErrorMessageModalVisible] = useState(false)
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Image source = {require('../../images/logo.jpg')} style = {styles.logoImage} />
                    <Pressable onPress={() => drawer.openDrawer()} style={styles.sideBarIconContainerStyle}>
                        <Image source = {require('../../images/sideBarIcon.jpg')} style = {styles.sideBarIconStyle} />
                    </Pressable>
                </View>
                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>발주 금액 기록</Text>
                </View>
            </View>


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#ffffff',
    },
    upperComponentGroupStyle:{
        flex:1,
        top:10,
        position:'absolute',
    },
    upperComponentsContainerStyle: {
        flex:1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop: 30,
    },
    logoImage : {
        resizeMode : 'stretch',
        width: 100,
        height: 80,
        backgroundColor: '#ffffff',
        position : 'absolute',
    },
    sideBarIconContainerStyle:{
        marginTop: -5,
        marginLeft : 300 ,
    },
    sideBarIconStyle: {
        resizeMode : 'contain',
        width:35,
        height:25,
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
    },
    inputText : {
        borderWidth : 1,
        borderColor : 'black',
        width:200,
        borderRadius : 10,
        marginBottom : 10,
        marginRight : 5,
        textAlign: 'center',
    },
    submitButton : {
        backgroundColor : '#D8D8D8',
        width:110,
        height:50,
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'center',
    },
    errorModalMessageContainer: {
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


})

export default ChargingMoneyScreen;