import React, {useState} from "react";
import {StyleSheet, View, Text, Image, Pressable, Modal, Alert, ScrollView} from "react-native";

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
                <Pressable style = {[styles.selectDateOfSalesStyle, {marginLeft: 10, width: 50}]}>
                    <Text>확인</Text>
                </Pressable>
            </View>

            <DatePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmStartDate}
                onCancel={hideStartDatePicker}
            />

            <View style ={styles.salesTitleContainerStyle}>
                <View style = {styles.salesTextTitleBoxContainerStyle}>
                    <Text>매출</Text>
                </View>

                <View style = {[styles.salesTextTitleBoxContainerStyle, {marginLeft : 10}]}>
                    <Text>지출</Text>
                </View>

                <View style = {[styles.salesTextTitleBoxContainerStyle, {marginLeft : 10}]}>
                    <Text>수익</Text>
                </View>
            </View>

            <ScrollView>
                <View style ={styles.platformContainerStyle}>
                    <View style = {styles.platformBoxContainerStyle}>
                        <View style={styles.baeminTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>

                    <View style = {[styles.platformBoxContainerStyle, {marginLeft : 10}]}>
                        <View style={styles.baeminTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>

                    <View style = {[styles.platformBoxContainerStyle, {marginLeft : 10}]}>
                        <View style={styles.baeminTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>
                </View>

                <View style ={styles.platformContainerStyle}>
                    <View style = {styles.platformBoxContainerStyle}>
                        <View style={styles.coupangEatsTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>

                    <View style = {[styles.platformBoxContainerStyle, {marginLeft : 10}]}>
                        <View style={styles.coupangEatsTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>

                    <View style = {[styles.platformBoxContainerStyle, {marginLeft : 10}]}>
                        <View style={styles.coupangEatsTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>
                </View>

                <View style ={styles.platformContainerStyle}>
                    <View style = {styles.platformBoxContainerStyle}>
                        <View style={styles.yogiyoTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>

                    <View style = {[styles.platformBoxContainerStyle, {marginLeft : 10}]}>
                        <View style={styles.yogiyoTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>

                    <View style = {[styles.platformBoxContainerStyle, {marginLeft : 10}]}>
                        <View style={styles.yogiyoTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>
                </View>

                <View style ={styles.platformContainerStyle}>
                    <View style = {styles.platformBoxContainerStyle}>
                        <View style={styles.ddangeoyoTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기*/}
                            <Text>0원</Text>
                        </View>
                    </View>

                    <View style = {[styles.platformBoxContainerStyle, {marginLeft : 10}]}>
                        <View style={styles.ddangeoyoTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기 Test*/}
                            <Text>0원</Text>
                        </View>
                    </View>

                    <View style = {[styles.platformBoxContainerStyle, {marginLeft : 10}]}>
                        <View style={styles.ddangeoyoTagColor}></View>
                        <View style={styles.moneyDataBoxStyle}>
                            {/*TODO : 데이터 크롤링으로 가져온 데이터 뿌려주기 */}
                            <Text>0원</Text>
                        </View>
                    </View>
                </View>


            </ScrollView>

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
        paddingRight : 250,
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

    salesTextTitleBoxContainerStyle: {
        width : 110,
        height : 35,
        borderRadius : 10,
        backgroundColor : '#D9D9D9',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 20
    },
    salesTitleContainerStyle: {
        flexDirection : 'row',
    },

    platformContainerStyle: {
        flexDirection : 'row',
    },
    platformBoxContainerStyle: {
        width : 110,
        height : 70,
        borderRadius : 10,
        backgroundColor : '#D9D9D9',
        alignItems : 'flex-start',
        justifyContent : 'flex-start',
        flexDirection : 'row',
        marginTop : 20
    },
    moneyDataBoxStyle : {
        width: 60,
        height: 70,
        alignItems:'flex-end',
        justifyContent: 'center',
    },
    baeminTagColor: {
        width: 40,
        height: 70,
        backgroundColor:'#39C5C4',
        borderRadius : 10,
    },
    yogiyoTagColor: {
        width: 40,
        height: 70,
        backgroundColor:'#FA0050',
        borderRadius : 10,
    },
    coupangEatsTagColor: {
        width: 40,
        height: 70,
        backgroundColor: '#31B4DD',
        borderRadius: 10,
    },
    ddangeoyoTagColor:{
        width: 40,
        height: 70,
        backgroundColor: '#FB521C',
        borderRadius: 10,
    }


})

export default SalesAndProfitScreen;

