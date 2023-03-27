import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useNavigation} from "@react-navigation/native";

function OrderSubmitScreen({navigation}){


    const [ownerIdLocal,setOwnerIdLocal] = useState('')
    const [ownerLocationAddressLocal,setOwnerLocationAddressLocal] = useState('')
    const [ownerNameLocal, setOwnerNameLocal] = useState('')

    const [piledItemInfoJSON, setPiledItemInfoJSON] = useState('')
    const [piledItemList, setPiledItemList] = useState([])
    const [chargedMoney, setChargedMoney] = useState('');

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
        console.log(endIndex)
        setPiledItemList([...tempList])
        for (var i=1; i<=endIndex; i++){
            console.log(tempJSON["item_info_json"][i.toString()])
            tempList.push(tempJSON["item_info_json"][i.toString()])
        }
        setPiledItemList(tempList)


    }

    const functionForMakingScrollView = () => {
        if (piledItemList.length <= 4){
            return(
                <>
                    {piledItemList.map((piledItem,index) => (
                        <View key={index} style={styles.seperateDash}>
                            <View style ={{flexDirection: 'row'}}>
                                <Text style={styles.label}>{piledItem.itemName}</Text>
                                <Pressable style={{position:'absolute', left: 10,alignSelf: 'flex-end'}}><Text>⨉</Text></Pressable>
                            </View>

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
                                <Pressable style={{position:'absolute', left: 10,alignSelf: 'flex-end'}}>
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
            console.log('-------------------------')
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
                }
            ])
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
        saveToOrderHistory()
    }


    return (
        <View style={styles.container}>
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
            </View>

            <Pressable style ={styles.underPopUpBarForNavigatingSubmitScreen}
            onPress = {() => submitPiledItemToOrderHistory()}>
                <Text style ={styles.label}>발주 목록 제출</Text>
            </Pressable>

        </View>
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
        top:'76%',
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