import React, {useState} from "react";
import {StyleSheet, View, Text, Image, Pressable, Modal, Alert} from "react-native";

import PickedDateStart from "../components/PickedDateStart";
import PickedDateEnd from "../components/PickedDateEnd";

import DatePickerModal from "react-native-modal-datetime-picker";



function SalesAndProfitScreen(){



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


    const currentStartDateSet = () => {
        return `${time.year}.${time.month}.01`;
    }

    const currentEndDateSet = () => {
        return `${time.year}.${time.month}.${monthEndDate[time.month]}`;
    }

    const [selectedDateStartString, setSelectedDateStartString] = useState(currentStartDateSet());
    const [selectedDateEndString, setSelectedDateEndString] = useState(currentEndDateSet());
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const [selectedStartOrEnd, setSelectedStartOrEnd] = useState('start');

    const showDatePicker = (selectStartOrEnd) => {
        setSelectedStartOrEnd(selectStartOrEnd == 'start' ? 'start' : 'end');
        setIsDatePickerVisible(true);
    }

    const hideStartDatePicker = () => {
        setIsDatePickerVisible(false);
    }

    const handleConfirmStartDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth()>  9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ;
        const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        const temporaryDateString = `${year}.${month}.${day}`
        selectedStartOrEnd == 'start' ? setSelectedDateStartString(temporaryDateString) : setSelectedDateEndString(temporaryDateString)
        hideStartDatePicker();
    }


    return(
        <View style={styles.container}>
            <Image source = {require('../images/logo.jpg')} style = {styles.logoImage} />

            <View style = {styles.titleContainerStyle}>
                <Text style ={styles.titleStyle}>매출 / 수익</Text>
            </View>

            <View style = {styles.dateSelectBoxContainerStyle}>
                <Pressable onPress={() => showDatePicker('start')} style = {styles.selectDateOfSalesStyle}>
                    <PickedDateStart dateString={selectedDateStartString}/>
                </Pressable>
                <Text style ={styles.salesDateFromAndToSignStyle}>~</Text>
                <Pressable onPress={() => showDatePicker('end')} style = {styles.selectDateOfSalesStyle}>
                    <PickedDateEnd dateString={selectedDateEndString}/>
                </Pressable>
            </View>

            <DatePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmStartDate}
                onCancel={hideStartDatePicker}
            />
            
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
        width : 350,
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
    },

})

export default SalesAndProfitScreen;

