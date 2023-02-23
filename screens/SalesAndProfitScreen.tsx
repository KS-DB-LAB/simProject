import React from "react";
import {StyleSheet, View, Text, Image, Pressable} from "react-native";

import PickedDateStart from "../components/PickedDateStart";
import PickedDateEnd from "../components/PickedDateEnd";

import DatePicker from "react-native-date-picker";

function SalesAndProfitScreen(){

    return(
        <View style={styles.container}>
            <Image source = {require('../images/logo.jpg')} style = {styles.logoImage} />

            <View style = {styles.titleContainerStyle}>
                <Text style ={styles.titleStyle}>매출 / 수익</Text>
            </View>

            <View style = {styles.dateSelectBoxContainerStyle}>
                <Pressable style = {styles.selectDateOfSalesStyle}>
                    <PickedDateStart />
                </Pressable>
                <Text style ={styles.salesDateFromAndToSignStyle}>~</Text>
                <Pressable style = {styles.selectDateOfSalesStyle}>
                    <PickedDateEnd />
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems : 'center',
        backgroundColor : '#ffffff',
    },

    logoImage : {
        resizeMode : 'stretch',
        width: 100,
        height: 80,
        backgroundColor: '(0,0,0,0.5)',
    },

    titleContainerStyle : {
        paddingRight : 180,
        paddingTop : 40,
        paddingBottom : 20,
    },

    titleStyle : {
        fontSize : 20,
    },

    dateSelectBoxContainerStyle : {
        width : 300,
        height : 55,
        borderRadius : 10,
        backgroundColor : '#D9D9D9',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
    },

    selectDateOfSalesStyle : {
        width : 100,
        height: 25,
        backgroundColor : "#ffffff",
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'center',
    },

    salesDateFromAndToSignStyle: {
        padding : 15,
    }

})

export default SalesAndProfitScreen;