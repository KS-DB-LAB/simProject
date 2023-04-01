import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useIsFocused} from "@react-navigation/native";

function ChargingMoneyScreen({navigation}){
    isFocused = useIsFocused();
    const [chargedMoney, setChargedMoney] = useState(0)

    useEffect( () => {
        console.log('ChargingMoneySCreen')

    },[isFocused])

    return (
        <View style={styles.container}>
            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Image source = {require('../../images/logo.jpg')} style = {styles.logoImage} />
                    <Pressable onPress={() => drawer.openDrawer()} style={styles.sideBarIconContainerStyle}>
                        <Image source = {require('../../images/sideBarIcon.jpg')} style = {styles.sideBarIconStyle} />
                    </Pressable>
                </View>
                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>발주 금액 충전하기</Text>
                </View>
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
    seperateDash : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#D8D8D8',
        width : 350,
        height : 60,
        borderRadius : 7,
        marginBottom : 12,

    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign : "center",
    },
    scrollContainerStyle:{
        flex:0.5,
        alignItems:'center',
        justifyContent:'center',
    },
    scrollStyle: {
        flex:0.5,
    },
    containerForChargedMoneyStyle:{
        top:'78%',
        position:'absolute',
        alignItems : 'flex-end'
    },
    itemBuyingCount : {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        height:30,
        width:'50%',
        marginBottom:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius : 10,

    },
    underPopUpBarForNavigatingSubmitScreen:{
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        bottom:0,
        width:'100%',
        height:70,
        backgroundColor:'#D8D8D8',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    }
})

export default ChargingMoneyScreen;