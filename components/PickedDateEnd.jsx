import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";



function PickedDateEnd({dateString}) {
    return (
        <View>
            <Text style={styles.dateTextStyle}>{dateString}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    dateTextStyle : {
        fontSize : 15,
    },
    selectDateOfSalesStyle : {
        width : 100,
        height: 25,
        backgroundColor : "#ffffff",
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'center',
    },

})

export default PickedDateEnd;