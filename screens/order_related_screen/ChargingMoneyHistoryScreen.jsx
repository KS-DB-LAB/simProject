import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView, TextInput
    ,KeyboardAvoidingView, Platform, Modal} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useIsFocused} from "@react-navigation/native";

function ChargingMoneyHistoryScreen ({navigation}){
    isFocused = useIsFocused();
    const [chargingMoneyInteger, setChargingMoneyInteger] = useState(0)
    const [supabaseDataLocal, setSupabaseDataLocal]= useState([])

    const numberThousandFormat = (chargedMoneyString) => {
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


    const makeScrollViewForChargingHistoryList = () => {
        //console.log(supabaseDataLocal)
        return(
            <>
                <View style ={styles.scrollContainerStyle}>
                <ScrollView style={styles.scrollStyle}>
                {supabaseDataLocal.map( chargingHistory => (
                    <View style={{flexDirection: 'row'}}>
                        <View style={[styles.seperateDash,{marginRight:20, width : 100,}]}>
                            <Text>{new Date(chargingHistory.created_at).toLocaleString()}</Text>
                        </View>

                        <View style={[styles.seperateDash,{marginRight:20, width : 150,}]}>
                            <Text>{numberThousandFormat(chargingHistory.requested_charging_money.toString())}원</Text>
                        </View>

                        <View style={[styles.seperateDash, {width : 100,}]}>
                            <Text>{chargingHistory.charged_status}</Text>
                        </View>
                    </View>
                ))}
                </ScrollView>
                </View>
            </>
        )
    }


    const getHistoryOfChargingMoney = async (ownerId) => {
        const {data, error} = await supabase
            .from('order_charging_table')
            .select('*')
            .eq('owner_id',ownerId)
        if (error){
        }
        else {
            setSupabaseDataLocal(data.sort((prev, next) => prev.created_at > next.created_at ? -1 : 1))
        }
    }

    useEffect( () => {
        //console.log('ChargingMoneySCreen - History')
        getData('owner_id').then(ownerId => {
            getHistoryOfChargingMoney(ownerId);
        })

    },[isFocused])


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
                    <Text style ={styles.titleStyle}>금액 충전 기록</Text>
                </View>
            </View>

            {makeScrollViewForChargingHistoryList()}
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
    seperateDash : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#D8D8D8',
        height : 50,
        borderRadius : 7,
        marginBottom : 12,

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
    scrollContainerStyle:{
        flex:0.9,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'black',
        marginTop:120,
    },
    scrollStyle: {
        flex:1,
    },


})

export default ChargingMoneyHistoryScreen;