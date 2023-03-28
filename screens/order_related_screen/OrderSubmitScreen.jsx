import {Modal,BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useNavigation} from "@react-navigation/native";

function OrderSubmitScreen({navigation}){

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorModalVisibleForResultShow, setErrorModalVisibleForResultShow] = useState(false);

    const [ownerIdLocal,setOwnerIdLocal] = useState('')
    const [ownerLocationAddressLocal,setOwnerLocationAddressLocal] = useState('')
    const [ownerNameLocal, setOwnerNameLocal] = useState('')
    const [buyingPriceTotal, setBuyingPriceTotal] = useState(0)
    const [piledItemInfoJSON, setPiledItemInfoJSON] = useState('')
    const [piledItemList, setPiledItemList] = useState([])
    const [chargedMoney, setChargedMoney] = useState('');
    const [chargedMoneyInt, setChargedMoneyInt] = useState(0);

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

    const handleChargedMoney = async (ownerId) => {
        const { data, error } = await supabase
            .from('shop_owner_table')
            .select('charged_money')
            .eq('member_id',ownerId)
        if (error) {
        } else {
            // console.log(data[0].money_for_supplies)
            setChargedMoneyInt(data[0].charged_money)
            setChargedMoney(data[0].charged_money)
            const chargedMoneyString = data[0].charged_money.toString()
            setChargedMoney(numberThousandFormat(chargedMoneyString))
            // console.log(chargedMoney)
        }
    }

    let tempJSON = {}
    let tempList =[]

    const handleMakingPiledBItemList = () => {
        tempJSON = JSON.parse(piledItemInfoJSON)
        var endIndex = Number(tempJSON["item_count"])
        // console.log(endIndex)
        setPiledItemList([...tempList])
        let tempPriceTotal = 0;
        for (var i=1; i<=endIndex; i++){
            console.log(tempJSON["item_info_json"][i.toString()])
            tempPriceTotal += Number(tempJSON["item_info_json"][i.toString()]["itemBuyingCount"])
                * Number(tempJSON["item_info_json"][i.toString()]["itemPrice"])
            tempList.push(tempJSON["item_info_json"][i.toString()])
        }
        setBuyingPriceTotal(tempPriceTotal)
        setPiledItemList(tempList)
        console.log(tempPriceTotal)

    }

    const updateShoppingBagTable = async (tempJSON, tempItemCount,ownerId) => {
        console.log('======================')
        console.log(tempJSON.item_info_json)
        console.log(tempItemCount)
        console.log(ownerId)
        await supabase
            .from('shop_owner_shopping_bag')
            .update({
                item_info_json : tempJSON.item_info_json,
                item_count : tempItemCount
            })
            .eq('owner_id',ownerId)
        console.log('!')
    }

    const deleteFromPiledItemList = (index) => {
        tempJSON = JSON.parse(piledItemInfoJSON)
        console.log("----------------------")
        console.log("----------------------")
        console.log("----------------------")
        console.log(tempJSON)
        tempItemInfoJSON = tempJSON.item_info_json
        delete tempItemInfoJSON[index+1]
        console.log("----------------------")
        for (var i=index+2; i<=tempJSON.item_count; i++){
            console.log(i)
            console.log(tempItemInfoJSON[i])
            Object.assign(tempJSON.item_info_json,{ [i-1] : tempItemInfoJSON[i]})
            delete tempJSON.item_info_json[i]
            console.log(tempJSON.item_info_json)
        }

        console.log("----------------------")
        console.log(tempItemInfoJSON)

        tempJSON.item_info_json = tempItemInfoJSON
        console.log("----------------------")
        console.log(tempJSON)
        getData('owner_id').then(ownerId => {
            console.log(ownerId)
            setOwnerIdLocal(ownerId)
        })
        updateShoppingBagTable(tempJSON,tempJSON.item_count-1,ownerIdLocal)

    }

    const functionForMakingScrollView = () => {
        if (piledItemList.length <= 4){
            return(
                <>
                    {piledItemList.map((piledItem,index) => (
                        <View key={index} style={styles.seperateDash}>
                            <Pressable onPress = {() => {deleteFromPiledItemList(index)}} style={{position:'absolute', left: 10,alignSelf: 'flex-end'}}>
                                <Text style={{fontWeight:'bold'}}>⨉</Text>
                            </Pressable>

                            <Text style={styles.label}>{piledItem.itemName}</Text>

                            <View style ={{flexDirection: 'row',marginTop:5}}>
                                <Pressable><Text>-</Text></Pressable>
                                <Text style={{marginLeft:13,marginRight:10}}>{piledItem.itemBuyingCount}</Text>
                                <Pressable><Text>+</Text></Pressable>
                            </View>
                            <Text>{numberThousandFormat(piledItem.itemPrice)}원</Text>
                        </View>
                    ))}
                </>
            )
        }
        else {
            return (
                <View style={styles.scrollContainerStyle}>
                    <ScrollView style={styles.scrollStyle}>
                        {piledItemList.map((piledItem,index) => (
                            <View key={index} style={styles.seperateDash}>
                                <Pressable onPress = {() => {console.log('!')}} style={{position:'absolute', left: 10,alignSelf: 'flex-end'}}>
                                    <Text style={{fontWeight:'bold'}}>⨉</Text>
                                </Pressable>

                                <Text style={styles.label}>{piledItem.itemName}</Text>

                                <View style ={{flexDirection: 'row',marginTop:5}}>
                                    <Pressable><Text>-</Text></Pressable>
                                    <Text style={{marginLeft:13,marginRight:10}}>{piledItem.itemBuyingCount}</Text>
                                    <Pressable><Text>+</Text></Pressable>
                                </View>
                                <Text>{numberThousandFormat(piledItem.itemPrice)}원</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )
        }
    }

    const getPiledOrderList = async (ownerId) => {
        const { data, error } = await supabase
            .from('shop_owner_shopping_bag')
            .select('*')
            .eq('owner_id',ownerId)
        if (error){
        }
        else {
            // console.log('-------------------------')
            setPiledItemInfoJSON(JSON.stringify(data[0]))
            // console.log(piledItemInfoJSON)
            handleMakingPiledBItemList()
        }
    }


    useEffect( () => {
        getData('owner_id')
            .then(ownerId => {
            getPiledOrderList(ownerId)
            handleChargedMoney(ownerId)
        })
        },[piledItemInfoJSON])

    const saveToOrderHistory = async () => {
        await supabase
            .from('order_history_table')
            .insert([
                {
                    owner_id : ownerIdLocal,
                    member_name : ownerNameLocal,
                    member_location_address : ownerLocationAddressLocal,
                    member_order_list: piledItemList,
                    member_order_total_price : buyingPriceTotal,
                    order_status : '발주 준비 중'
                }
            ])
    }

    const deleteFromShoppingBagTable = async () => {
        await supabase
            .from('shop_owner_shopping_bag')
            .delete()
            .match({'owner_id':ownerIdLocal})
    }

    const submitPiledItemToOrderHistory = () => {
        console.log('!')
        getData('owner_id')
            .then(ownerId => {
                setOwnerIdLocal(ownerId)
            })
        getData('owner_location_address')
            .then(ownerLocalAddress => {
                setOwnerLocationAddressLocal(ownerLocalAddress)
            })
        getData('owner_name')
            .then(ownerName => {
                setOwnerNameLocal(ownerName)
            })
    }

    useEffect(() => {
        if (ownerIdLocal !=='' && ownerNameLocal !== '' && ownerLocationAddressLocal!== '') {
            console.log(ownerIdLocal)
            console.log(ownerNameLocal)
            console.log(ownerLocationAddressLocal)
            saveToOrderHistory()
            deleteFromShoppingBagTable()
        }

    }, [ownerIdLocal, ownerNameLocal, ownerLocationAddressLocal])

    return (
        <View style={styles.container}>

            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            발주를 제출하시겠습니까?
                        </Text>
                        <Pressable onPress={() => setErrorModalVisible(false)}>
                            <Text style={{fontSize:15,}}>취소</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            submitPiledItemToOrderHistory()
                            setErrorModalVisible(false)
                            setErrorModalVisibleForResultShow(true)
                        }}>
                            <Text style={{fontSize:15,}}>확인</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>

            <Modal
                visible={errorModalVisibleForResultShow}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisibleForResultShow(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            발주가 완료되었습니다.
                        </Text>
                        <Pressable onPress={() => {
                            setErrorModalVisibleForResultShow(false)
                            navigation.navigate('OrderScreen')}}>
                            <Text style={{fontSize:15,}}>확인</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>

            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Image source = {require('../../images/logo.jpg')} style = {styles.logoImage} />
                    <Pressable onPress={() => drawer.openDrawer()} style={styles.sideBarIconContainerStyle}>
                        <Image source = {require('../../images/sideBarIcon.jpg')} style = {styles.sideBarIconStyle} />
                    </Pressable>
                </View>
                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>발주 목록 제출</Text>
                </View>
            </View>
            <Text style={[{
                alignSelf:'flex-start',left:40,fontSize:15,fontWeight:'bold',
                marginBottom:10,
            }]}>
                담은 물건
            </Text>

            {functionForMakingScrollView()}

            <View style ={styles.containerForChargedMoneyStyle}>
                <Text style={styles.label}>충전 금액 : {chargedMoney}원</Text>
                <Text style={[styles.label, {marginTop:5,}]}>결제 금액 : {numberThousandFormat(buyingPriceTotal.toString())}원</Text>
                <Text style={[styles.label, {marginTop:5,}]}>
                    예상 잔액 : {numberThousandFormat((chargedMoneyInt-buyingPriceTotal).toString())}원
                </Text>
            </View>

            <Pressable style ={styles.underPopUpBarForNavigatingSubmitScreen}
            onPress = {() => setErrorModalVisible(true)}>
                <Text style ={styles.label}>발주 목록 제출</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
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
        height : 100,
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
        borderColor:'black',
    },
    scrollStyle: {
        flex:0.5,
    },
    containerForChargedMoneyStyle:{
        top:'70%',
        marginTop:20,
        position:'absolute'
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

export default OrderSubmitScreen;