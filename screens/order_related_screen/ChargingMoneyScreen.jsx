import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView, TextInput
    ,KeyboardAvoidingView, Platform, Modal} from "react-native";
// @ts-ignore
import {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useIsFocused} from "@react-navigation/native";

function ChargingMoneyScreen ({navigation}){
    isFocused = useIsFocused();
    const [chargingMoneyInteger, setChargingMoneyInteger] = useState(0)


    const [chargingMoney, setChargingMoney] = useState('100,000')
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
            .from('charging_history_table')
            .insert([
                {
                    owner_id : ownerId,
                    requested_charging_money : chargingMoneyInteger,
                }
            ])
    }

    const [chargingBankAccount, setChargingBankAccout] = useState('')
    const getBankAccountFromSupabase = async (ownerId) => {
        const {data, error} = await supabase
            .from('shop_owner_table')
            .select('allocated_bank_account')
            .eq('member_id',ownerId)
        if(error){
        }
        else{
            setChargingBankAccout(data[0].allocated_bank_account["account_number"] + " " + data[0].allocated_bank_account["bank"])
        }
    }


    const getBankAccountComponent = () => {
        getData('owner_id').then(ownerId => {
            //console.log(ownerId)
            getBankAccountFromSupabase(ownerId)
        })
    }

    useEffect(() => {
        getBankAccountComponent()
    },[isFocused])

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessageModalVisible, setErrorMessageModalVisible] = useState(false)
    const [confirmMessageModalVisible, setConfirmMessageModalVisible] = useState(false)
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Modal
                visible={errorMessageModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorMessageModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, marginBottom:10, textAlign:'center'}}>
                            충전 금액을 입력해주세요!
                        </Text>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            (숫자 외에 다른 문자가 들어가면 안됩니다!)
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={() => {
                                setErrorMessageModalVisible(false)
                            }}>
                                <Text style={{fontSize:15,}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>


            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            충전을 요청하시겠습니까?
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable style={{marginRight : 40}}
                                       onPress={() => setErrorModalVisible(false)}>
                                <Text style={{fontSize:15,}}>취소</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                getData('owner_id').then(ownerId => {
                                    setChargingMoneyToSupabase(ownerId)
                                })
                                setErrorModalVisible(false)
                                setConfirmMessageModalVisible(true)
                            }}>
                                <Text style={{fontSize:15,}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>

            <Modal
                visible={confirmMessageModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setConfirmMessageModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            충전 요청이 완료되었습니다.
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={() => {
                                setChargingMoney('100,000')
                                setConfirmMessageModalVisible(false)
                                navigation.navigate('OrderScreen')
                            }}>
                                <Text style={{fontSize:15,}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>


            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <View style = {styles.logoImage} />
                    <View style={styles.sideBarIconContainerStyle}>
                        <View style = {styles.sideBarIconStyle} />
                    </View>
                </View>
                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>발주 금액 충전하기</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', }}>
                <TextInput onChangeText={(text) => {
                    setChargingMoneyInteger(Number(text.replaceAll(',','')))
                    setChargingMoney(numberThousandFormat(text))
                }} style={styles.inputText} keyboardType = "number-pad">
                    {chargingMoney}
                </TextInput>
                <Text>원</Text>
            </View>


            <View style={{flexDirection: 'row',marginTop : 20,}}>
                <Pressable onPress={() => {
                    //console.log('Pressed History')
                    navigation.navigate('ChargingMoneyHistoryScreen')
                }}
                           style={[styles.submitButton, {marginRight:5,}]}>
                    <Text>충전 요청기록</Text>
                </Pressable>

                <Pressable onPress={() => {
                    //console.log('Pressed')
                    //console.log(chargingMoney=='')
                    //console.log(chargingMoneyInteger == 0)
                    if (chargingMoney=='' || chargingMoneyInteger == 0 || isNaN(chargingMoneyInteger)){
                        setErrorMessageModalVisible(true)
                    }
                    else {
                        setErrorModalVisible(true)
                    }

                }}
                           style={styles.submitButton}>
                    <Text>충전 요청하기</Text>
                </Pressable>

            </View>

            <Text style={{fontSize:15, marginTop:20, }}>입금 계좌 : {chargingBankAccount}</Text>
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