import React, {useState} from 'react';
import {StyleSheet, Text} from "react-native";



function PickedDateEnd() {

    const currentDateSet = () => {
        let now = new Date();
        let time = {
            year : now.getFullYear(),
            month : now.getMonth() > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1) ,
            day : now.getDate() > 9 ? now.getDate() : '0' + now.getDate(),
            hours : now.getHours(),
            minutes : now.getMinutes(),
        };

        let monthEndDate = {
            '01' : 31 , '02' : 29, '03' : 31, '04' : 30, '05' : 31, '06' : 30, '07' : 31,
            '08' : 30, '09' : 31, '10' : 30, '11' : 31, '12' : 30,
        }

        return `${time.year}.${time.month}.${monthEndDate[time.month]}`;
    }


    return <Text style ={styles.dateTextStyle}>{currentDateSet()}</Text>
}


const styles = StyleSheet.create({
    dateTextStyle : {
        fontSize : 15,
    }
})

export default PickedDateEnd;