import React from 'react';
import {StyleSheet, Text} from "react-native";



function PickedDateStart() {

    const currentDateSet = () => {
        let now = new Date();
        let time = {
            year : now.getFullYear(),
            month : now.getMonth() > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1) ,
            day : now.getDate() > 9 ? now.getDate() : '0' + now.getDate(),
            hours : now.getHours(),
            minutes : now.getMinutes(),
        };

        return `${time.year}.${time.month}.01`;
    }
    if (true){
        return <Text style ={styles.dateTextStyle}>{currentDateSet()}</Text>
    }

}


const styles = StyleSheet.create({
    dateTextStyle : {
        fontSize : 15,
    }
})

export default PickedDateStart;