import {Modal,BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useNavigation} from "@react-navigation/native";

function OrderSubmitScreen({navigation}){

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorModalForMoneyNotSatisfiedVisible, setErrorModalForMoneyNotSatisfiedVisible] = useState(false)
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [navigatingToOrderScreenVisibie, setNavigatingToOrderScreenVisible] = useState(false);

    const [modalItemName, setModalItemName] = useState('')
    const [modalIndex, setModalIndex] = useState(0)

    const [ownerIdLocal,setOwnerIdLocal] = useState('')
    const [ownerLocationAddressLocal,setOwnerLocationAddressLocal] = useState('')
    const [ownerNameLocal, setOwnerNameLocal] = useState('')
    const [buyingPriceTotal, setBuyingPriceTotal] = useState(0)
    const [piledItemInfoJSON, setPiledItemInfoJSON] = useState('')
    const [piledItemList, setPiledItemList] = useState([])
    const [chargedMoney, setChargedMoney] = useState('');
    const [chargedMoneyInteger, setChargedMoneyInteger] = useState(0)

    const [styleOfRemainingMoneyText, setStyleOfRemainingMoneyText] = useState('red')

    const numberThousandFormat = (chargedMoneyString) => {
        if (chargedMoneyString.includes('-')){
            return "충전 금액이 모자랍니다!"
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

        return tempChargedMoneyString.split('').reverse().join("") + '원'

    }

    const handleChargedMoney = async (ownerId) => {
        const { data, error } = await supabase
            .from('shop_owner_table')
            .select('charged_money')
            .eq('member_id',ownerId)
        if (error) {
        } else {
            // console.log(data[0].money_for_supplies)
            setChargedMoneyInteger(Number(data[0].charged_money))
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
                //console.log(tempJSON["item_info_json"][i.toString()])
                tempPriceTotal += Number(tempJSON["item_info_json"][i.toString()]["itemBuyingCount"])
                    * Number(tempJSON["item_info_json"][i.toString()]["itemPrice"])
            tempList.push(tempJSON["item_info_json"][i.toString()])
        }
        setBuyingPriceTotal(tempPriceTotal)
        setPiledItemList(tempList)
        //console.log(tempPriceTotal)
    }

    const deletePiledItemToSupabase = async (index,tempOwnerId) => {

        let tempPiledItemInfoJSON = JSON.parse(piledItemInfoJSON).item_info_json
        delete tempPiledItemInfoJSON[index+1]

        //console.log(JSON.parse(piledItemInfoJSON).item_info_json)
        //console.log("->")
        //console.log(index)
        //console.log(tempOwnerId)
        //console.log(tempPiledItemInfoJSON)

        const endIndex = JSON.parse(piledItemInfoJSON).item_count
        for (var i=index+2; i<=endIndex; i++){
            Object.assign(tempPiledItemInfoJSON,{[(i-1).toString()]:tempPiledItemInfoJSON[i]})
            delete tempPiledItemInfoJSON[i]
        }
        //console.log('changed tempPiledItemInfoJSON')
        //console.log(tempPiledItemInfoJSON)


        await supabase
            .from('shop_owner_shopping_bag')
            .update({
                item_info_json : tempPiledItemInfoJSON,
                item_count : JSON.parse(piledItemInfoJSON).item_count -1
            })
            .eq('owner_id',tempOwnerId)

    }

    const decreaseOrIncreaseItemCount = async (index,tempOwnerId, sumAnnotaion) => {
        //console.log(piledItemList)
        //console.log(piledItemInfoJSON)

        //console.log(index)
        //console.log(piledItemList[index].itemBuyingCount - 1)
        let tempPiledItemList = [...piledItemList]

        //console.log('piledItemList')
        if (sumAnnotaion == '-'){
            if (piledItemList[index].itemBuyingCount - 1 != 0){
                //console.log(piledItemList[index])
                tempPiledItemList[index].itemBuyingCount = piledItemList[index].itemBuyingCount - 1
            }
            setPiledItemList(tempPiledItemList)
            //console.log(tempPiledItemList)
        }
        else if(sumAnnotaion == '+'){
            //console.log(piledItemList[index])
            tempPiledItemList[index].itemBuyingCount = piledItemList[index].itemBuyingCount + 1
            setPiledItemList(tempPiledItemList)
            //console.log(tempPiledItemList)
        }


        let tempPiledItemJSON = piledItemInfoJSON
        let tempPiledItemInfoJSON = {}
        var i=1
        //console.log(piledItemInfoJSON)
        tempPiledItemList.map(itemInfo => {
            //console.log({[i.toString()]:itemInfo})
            Object.assign(tempPiledItemInfoJSON,{[i.toString()]:itemInfo})
            i++
        })
        //console.log('tempPil')
        //console.log(tempPiledItemInfoJSON)
        // jsonParsedTempPiledItemJSON.item_info_json[(index+1).toString()] = JSON.parse(tempPiledItemInfoJSON)
        // console.log(piledItemInfoJSON)


        await supabase
            .from('shop_owner_shopping_bag')
            .update({
                item_info_json : tempPiledItemInfoJSON,
            })
            .eq('owner_id',tempOwnerId)

        let tempTotalPrice =0
        piledItemList.map(piledItem => {
            tempTotalPrice += piledItem.itemBuyingCount * Number(piledItem.itemPrice)
            //console.log(piledItem.itemBuyingCount)
            //console.log(piledItem.itemPrice)

            // setPiledItemInfoJSON(tempPiledItemInfoJSON)

        })

        //console.log(tempTotalPrice)
        setBuyingPriceTotal(tempTotalPrice)


    }

    const functionForMakingScrollView = () => {
        if (piledItemList.length == 0) {
            return (
                <>
                    <Text>이 없습니다! 뒤로 가셔서 물품을 담아주세요!</Text>
                </>
            )
        }
        else if (piledItemList.length <= 3){
            return(
                <>
                    {piledItemList.map((piledItem,index) => (
                        <View key={index} style={styles.seperateDash}>
                            <Pressable onPress = {() => {
                                //console.log('pressed delete item')
                                //console.log(piledItem)
                                setModalItemName(piledItem.itemName)
                                setModalIndex(index)
                                setConfirmModalVisible(true)
                                // deletePiledItemToSupabase(index)
                            }}
                                style={{position:'absolute', left: 10,alignSelf: 'flex-end'}}>
                                <Text style={{fontWeight:'bold'}}>⨉</Text>
                            </Pressable>

                            <Text style={styles.label}>{piledItem.itemName}</Text>

                            <View key={index} style ={{flexDirection: 'row',marginTop:5}}>
                                <Pressable onPress={() => {
                                    getData('owner_id').then(ownerId => {
                                        decreaseOrIncreaseItemCount(index,ownerId, '-')
                                        //console.log('decreaseItemCOunt end')
                                    })
                                }}>
                                    <Text>-</Text>
                                </Pressable>

                                <Text style={{marginLeft:13,marginRight:10}}>{piledItem.itemBuyingCount}</Text>
                                <Pressable onPress={() => {
                                        getData('owner_id').then(ownerId => {
                                            decreaseOrIncreaseItemCount(index,ownerId, '+')
                                            //console.log('decreaseItemCOunt end')
                                        })
                                    }}>
                                    <Text>+</Text>
                                </Pressable>
                            </View>
                            <Text>{numberThousandFormat(piledItem.itemPrice)}</Text>
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
                                <Pressable onPress = {() => {
                                    //console.log('pressed delete item')
                                    //console.log(piledItem)
                                    setModalItemName(piledItem.itemName)
                                    setModalIndex(index)
                                    setConfirmModalVisible(true)
                                    // deletePiledItemToSupabase(index)
                                }}
                                           style={{position:'absolute', left: 10,alignSelf: 'flex-end'}}>
                                    <Text style={{fontWeight:'bold'}}>⨉</Text>
                                </Pressable>

                                <Text style={styles.label}>{piledItem.itemName}</Text>

                                <View key={index} style ={{flexDirection: 'row',marginTop:5}}>
                                    <Pressable onPress={() => {
                                        getData('owner_id').then(ownerId => {
                                            decreaseOrIncreaseItemCount(index,ownerId, '-')
                                            //console.log('decreaseItemCOunt end')
                                        })
                                    }}>
                                        <Text>-</Text>
                                    </Pressable>

                                    <Text style={{marginLeft:13,marginRight:10}}>{piledItem.itemBuyingCount}</Text>
                                    <Pressable onPress={() => {
                                        getData('owner_id').then(ownerId => {
                                            decreaseOrIncreaseItemCount(index,ownerId, '+')
                                            //console.log('decreaseItemCOunt end')
                                        })
                                    }}>
                                        <Text>+</Text>
                                    </Pressable>
                                </View>
                                <Text>{numberThousandFormat(piledItem.itemPrice)}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )
        }
    }

    const getPiledOrderList = async (ownerId) => {
        //console.log('getPiledOrderList')
        setTimeout( async () => {
            const { data, error } = await supabase
                .from('shop_owner_shopping_bag')
                .select('*')
                .eq('owner_id',ownerId)
            if (error){
            }
            else {
                //console.log('getJSON')
                if (data[0].item_count == 0) {
                    deleteFromShoppingBagTable()
                    setBuyingPriceTotal(0)
                    setPiledItemList([])
                    setTimeout( () => {
                        navigation.navigate('BrandListScreen')
                        },50)
                }
                else {
                    setPiledItemInfoJSON(JSON.stringify(data[0]));
                    //console.log(piledItemInfoJSON);
                    handleMakingPiledBItemList();
                }
            }
        }, 10)

    }


    useEffect( () => {
        getData('owner_id')
            .then(ownerId => {
            getPiledOrderList(ownerId)
            handleChargedMoney(ownerId)
        })
        setTimeout(() => {
            setHiddenState(true)
        },1000)
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


        await supabase
            .from('shop_owner_table')
            .update({
                charged_money : chargedMoneyInteger - buyingPriceTotal
            })
            .eq('member_id',ownerIdLocal)
    }

    const deleteFromShoppingBagTable = async () => {
        //console.log('deleteFromShoppingBagTable')
        getData('owner_id').then( async (ownerId) => {
            //console.log(ownerId),
                await supabase
                    .from('shop_owner_shopping_bag')
                    .delete()
                    .eq('owner_id', ownerId)
        })
    }

    const submitPiledItemToOrderHistory = () => {
        //console.log('!')
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
            //console.log(ownerIdLocal)
            //console.log(ownerNameLocal)
            //console.log(ownerLocationAddressLocal)
            saveToOrderHistory()
            deleteFromShoppingBagTable()
        }

    }, [ownerIdLocal, ownerNameLocal, ownerLocationAddressLocal])


    const checkIfMoneyIsSatisfied = () => {
        if (numberThousandFormat((chargedMoneyInteger-buyingPriceTotal).toString()) == "충전 금액이 모자랍니다!") {
            setErrorModalForMoneyNotSatisfiedVisible(true)
        }
        else {
            setErrorModalVisible(true)
        }
    }

    const [hiddenState, setHiddenState] = useState(false)
    const bottomUp = () => {
        if (hiddenState == true){
            //test 입니당
            return(
                <>
                    <Pressable style ={styles.underPopUpBarForNavigatingSubmitScreen}
                               onPress = {() => {
                                   checkIfMoneyIsSatisfied()
                               }}>
                        <Text style ={styles.label}>발주 목록 제출</Text>
                    </Pressable>
                </>
            )
        }
    }


    return (
        <View style={styles.container}>

            <Modal
                visible={errorModalForMoneyNotSatisfiedVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalForMoneyNotSatisfiedVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            충전 금액이 모자랍니다.
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={() => {
                                setErrorModalForMoneyNotSatisfiedVisible(false)
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
                            발주를 제출하시겠습니까?
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable style={{marginRight : 40}}
                                       onPress={() => setErrorModalVisible(false)}>
                                <Text style={{fontSize:15,}}>취소</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                submitPiledItemToOrderHistory()
                                setErrorModalVisible(false)
                                setNavigatingToOrderScreenVisible(true)
                                }}>
                                <Text style={{fontSize:15,}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>


            <Modal
                visible={navigatingToOrderScreenVisibie}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setNavigatingToOrderScreenVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            발주가 제출되었습니다.
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={() => {
                                navigation.navigate('OrderScreen')
                                // setTimeout(() => {
                                //
                                // }, 100)
                                setNavigatingToOrderScreenVisible(false)}}>
                                <Text style={{fontSize:15,}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>

            <Modal
                visible={confirmModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setConfirmModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:10, fontSize:15, fontWeight:'bold', textAlign:'center'}}>{modalItemName}</Text>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>을 삭제하시겠습니까?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable onPress={() => setConfirmModalVisible(false)}>
                                <Text style={{fontSize:15,marginRight:40}}>취소</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                getData('owner_id').then(ownerId => {
                                    deletePiledItemToSupabase(modalIndex,ownerId)
                                    getPiledOrderList(ownerId)
                                })
                                setConfirmModalVisible(false)
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
                    <Text style ={styles.titleStyle}>발주 요청</Text>
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
                <View style={{flexDirection: 'row', alignItems:'space-around'}}>
                    <Text>충전 금액 : </Text>
                    <Text style={{alignItems:'flex-end'}}>{chargedMoney}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems:'space-around'}}>
                    <Text>발주 금액 : </Text>
                    <Text style={{alignItems:'flex-end'}}>{numberThousandFormat(buyingPriceTotal.toString())}</Text>
                </View>

                <Text style={{color: styleOfRemainingMoneyText}}>예상 잔액 : {numberThousandFormat((chargedMoneyInteger-buyingPriceTotal).toString())}</Text>
            </View>


            {bottomUp()}
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
        top:'78%',
        position:'absolute',
        alignItems : 'center',
        width : 400
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