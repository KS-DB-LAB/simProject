import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView, TextInput
    ,KeyboardAvoidingView, Platform, Modal} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useIsFocused} from "@react-navigation/native";

function OrderHistoryScreen ({navigation}){
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

    const setForItemCountExtra = (itemCountForExtra) => {
        if (itemCountForExtra ==0 ) {
            return ''
        }
        else {
            return ' 외 ' + itemCountForExtra.toString() +'개'
        }
    }

    const makeScrollViewForOrderHistoryList = () => {
        return(
            <>
                <View style ={styles.scrollContainerStyle}>
                    <ScrollView style={styles.scrollStyle}>
                        <View style={{alignItems:'center',}}>
                        {supabaseDataLocal.map( orderHistory => (
                            //console.log(orderHistory.member_order_list[0]),

                            <View style={{flexDirection: 'row'}}>
                                <View style={[styles.seperateDash,{marginRight:10, width:'25%'}]}>
                                    <Text style={{fontSize: 10, padding:10}}>{new Date(orderHistory.created_at).toLocaleString()}</Text>
                                </View>


                                <Pressable onPress = {() => {
                                    setModalInnerComponents(orderHistory)
                                    setErrorModalVisible(true)
                                }}
                                   style={[styles.seperateDash,{flexDirection:'row', marginRight:10,width:'49%',}]}>
                                    <Text style={{fontSize: 10}}>{orderHistory.member_order_list[0].itemName}</Text>
                                    <Text style={{fontSize : 10}}>{setForItemCountExtra((orderHistory.member_order_list.length)-1)}</Text>
                                </Pressable>

                                <View style={[styles.seperateDash,{width:'20%',}]}>
                                    <Text style={{fontSize: 10}}>{orderHistory.order_status}</Text>
                                </View>
                            </View>
                        ))}
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }


    const getHistoryOfChargingMoney = async (ownerId) => {
        const {data, error} = await supabase
            .from('order_history_table')
            .select('*')
            .eq('owner_id',ownerId)
        if (error){
        }
        else {
            setSupabaseDataLocal(data.sort((prev, next) => prev.created_at > next.created_at ? -1 : 1))
        }
    }

    useEffect( () => {
        // console.log('ChargingMoneySCreen - History')
        getData('owner_id').then(ownerId => {
            getHistoryOfChargingMoney(ownerId);
        })

    },[isFocused])

    const [createdAtForModal,setCreatedAtForModal] = useState('')
    const [memberLocationAddressForModal,setMemberLocationAddressForModal] = useState('')
    const [memberNameForModal,setMemberNameForModal] = useState('')
    const [memberOrderList,setMemberOrderList] = useState([])
    const [buyingTotalPrice, setBuyingTotalPrice] = useState(0)

    const setModalInnerComponents = (orderHistory) => {
        // console.log(orderHistory)
        // {"created_at": "2023-04-02T08:32:32.677543+00:00", "id": 117, "member_location_address": "기장", "member_name": "장홍준", "member_order_list": [{"itemBuyingCount": 1, "itemName":
        //  "비빔양념 1kg", "itemPrice": "8000"}], "member_order_total_price": 8000, "order_status": "발주 준비 중", "owner_id": "admin"}

        setCreatedAtForModal(new Date(orderHistory.created_at).toLocaleString())
        setMemberLocationAddressForModal(orderHistory.member_location_address)
        setMemberNameForModal(orderHistory.member_name)

        setMemberOrderList(orderHistory.member_order_list)

        let tempBuyingTotalPrice = 0
        orderHistory.member_order_list.map( orderInfo => {
            tempBuyingTotalPrice += (orderInfo.itemPrice * orderInfo.itemBuyingCount)
        })
        setBuyingTotalPrice(tempBuyingTotalPrice)

    }

    const modalInnerComponents = () => {
        return (
            <>
                <View style={{marginTop: 20,marginBottom:30, position:'absolute',top:0}}>
                    <Text style={{fontWeight:'bold', }}>발주 기록</Text>
                </View>

                <View style={{position:'absolute',top:60, alignItems:'flex-start'}}>

                    <View style={{width : '100%'}}>

                        <Text style={{fontSize:10, fontWeight:'bold', marginBottom:5}}>발주 날짜 : {createdAtForModal}</Text>
                        <Text style={{fontSize:10, fontWeight:'bold', marginBottom:5}}>위치 : {memberLocationAddressForModal}</Text>
                        <Text style={{fontSize:10, fontWeight:'bold', marginBottom:5}}>이름 : {memberNameForModal}</Text>
                    </View>
                </View>
                <View style={{width:'90%',height:'50%',top:40,alignItems:'flex-end'}}>
                <ScrollView horizontal={true}>
                <ScrollView>
                    <View style={{ alignItems:'flex-end'}}>
                    {memberOrderList.map(order => {
                        return (
                        <View style={{flexDirection: 'row',marginBottom:20,}}>
                            <Text style={{marginRight:20,}}>{order.itemName}</Text>
                            <Text style={{marginRight:20,}}>{order.itemBuyingCount}개</Text>
                            <Text style={{marginRight:20,}}>{order.itemPrice}원</Text>
                            <Text style={{marginRight:20,fontWeight: 'bold'}}>{order.itemPrice * order.itemBuyingCount}원</Text>
                        </View>
                        )
                    })}
                    </View>
                </ScrollView>
                </ScrollView>
                </View>
            </>
        )
    }

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        {modalInnerComponents()}

                        <View style={{width : '80%', alignItems:'flex-end',top:55}}>
                            <Text style={{fontSize:15, fontWeight: 'bold'}}>총 금액 : {buyingTotalPrice}원</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={() => {
                                setErrorModalVisible(false)}}>
                                <Text style={{fontSize:15,top:65}}>확인</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>

            </Modal>

            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Image source = {require('../../images/logo.jpg')} style = {styles.logoImage} />
                    <Pressable onPress={() => navigation.openDrawer()} style={styles.sideBarIconContainerStyle}>
                        <Image source = {require('../../images/sideBarIcon.jpg')} style = {styles.sideBarIconStyle} />
                    </Pressable>
                </View>
                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>발주 기록</Text>
                </View>
            </View>

            {makeScrollViewForOrderHistoryList()}
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
        height:500,
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
        width:'95%'
    },
    scrollStyle: {
        flex:1,
    },


})

export default OrderHistoryScreen;