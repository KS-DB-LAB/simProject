import {Alert, BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView, Modal, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation, useIsFocused} from "@react-navigation/native";
import {storeData, getData, getAllData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";


function OrderSuppliesScreen({ navigation, route}){
    const { drawer, itemClass, itemSpecificClass, brandList } = route.params;

    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const [itemNameList, setItemNameList] = useState([]);
    const [chargedMoney, setChargedMoney] = useState('');
    const [modalItemName, setModalItemName] = useState('');
    const [modalItemPrice, setModalItemPrice] = useState('');
    const [itemBuyingCount, setItemBuyingCount] = useState(1)
    const [modalItemPriceInteger,setModalItemPriceInteger] = useState(0)

    const [ownerIdInLocal, setOwnerIdInLocal] = useState('')
    const [itemCountForBottom ,setItemCountForBottom] = useState(0)

    const isFocused = useIsFocused();
    const [hiddenState, setHiddenState] = useState(false)
    let tempList = [];

    const handleSearchItemName = async (itemClass, itemSpecificClass,brandName) => {
        const { data, error } = await supabase
            .from('supply_item_table')
            .select('*')
            .eq('supply_item_class',itemClass)
            .eq('supply_item_specify_class',itemSpecificClass)
            .eq('brands',brandName)

        if (error){
        } else {
            // console.log(data)
            setItemNameList([...tempList])

            data.map(item => {
                if (!(tempList.includes(item.supply_item_name))){
                    tempList.push(item)
                }
            });
            setItemNameList(tempList);
        }
    }

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

    const storeBuyingItemsAndCounts = async (itemNameAndCountsSelected) => {
        const { data, error } = await supabase
            .from('shop_owner_shopping_bag')
            .select('*')
            .eq('owner_id',ownerIdInLocal)

        if (error){
        } else {
            // console.log(data[0])
            if (data[0]==undefined) {
                await supabase
                    .from('shop_owner_shopping_bag')
                    .insert([
                        {
                            owner_id : ownerIdInLocal,
                            item_info_json : {1:itemNameAndCountsSelected},
                            item_count : 1
                        }
                    ])
                setItemCountForBottom(1)
            }
            else {
                let tempJSON = data[0].item_info_json
                let tempItemCount = data[0].item_count

                let mergeJSON = true
                Object.keys(tempJSON).forEach(key => {
                    // console.log(key)
                    if (tempJSON[key].itemName == itemNameAndCountsSelected.itemName){
                        tempJSON[key].itemBuyingCount += itemNameAndCountsSelected.itemBuyingCount
                        mergeJSON =false
                    }
                })
                if (mergeJSON ==true){
                    tempItemCount +=1
                    setItemCountForBottom(tempItemCount)
                    setHiddenState(true)
                    Object.assign(tempJSON,{[tempItemCount.toString()]:itemNameAndCountsSelected})
                }

                await supabase
                    .from('shop_owner_shopping_bag')
                    .update({
                        item_info_json : tempJSON,
                        item_count : tempItemCount
                    })
                    .eq('owner_id',ownerIdInLocal)

                setItemCountForBottom(tempItemCount)
            }
        }
    }

    const functionForMakingScrollView = () => {
        if (itemNameList.length <= 4){
            return(
                <>
                    {itemNameList.map((itemName,index) => (
                        <Pressable key={index} style={styles.seperateDash} onPress={() => {
                            setModalItemName(itemName.supply_item_name)
                            setModalItemPriceInteger(itemName.supply_item_price)
                            setModalItemPrice(numberThousandFormat(itemName.supply_item_price))
                            setErrorModalVisible(true)}
                            }>
                            <Text style={styles.label}>{itemName.supply_item_name} - {itemName.supply_item_price}원</Text>
                        </Pressable>
                    ))}
                </>
            )
        }
        else {
            return (
                <View style={styles.scrollContainerStyle}>
                    <ScrollView style={styles.scrollStyle}>
                        {itemNameList.map((itemName,index) => (
                            <Pressable key={index} style={styles.seperateDash} onPress={() => {
                                setModalItemName(itemName.supply_item_name)
                                setModalItemPriceInteger(itemName.supply_item_price)
                                setModalItemPrice(numberThousandFormat(itemName.supply_item_price))
                                setErrorModalVisible(true)}
                            }>
                                <Text style={styles.label}>{itemName.supply_item_name} - {itemName.supply_item_price}원</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )
        }
    }

    const setStoredItemCountInSupabase = async (ownerId) => {
        const {data, error} = await supabase
            .from('shop_owner_shopping_bag')
            .select('*')
            .eq('owner_id', ownerId)
        if (error){
        }
        else {
            // console.log(data[0].item_count)
            if (data[0].item_count > 0) setHiddenState(true)
            setItemCountForBottom(data[0].item_count)
        }
    }

    const setValuesForBottomPopUp = async (ownerId) => {
        const {data,error} = await supabase
            .from('shop_owner_shopping_bag')
            .select('*')
            .eq('owner_id' , ownerId)
        if(error){
        }else{
            if (data[0]==undefined){
                setItemCountForBottom(0)
                setHiddenState(false)
            }
            else{
                setItemCountForBottom(data[0].item_count)
                setHiddenState(true)
            }
        }
    }

    const bottomUp = () => {
        if (hiddenState == true){
            //test 입니당
            console.log(itemCountForBottom)
            return(
                <>
                    <Pressable onPress = {() => {
                        navigation.navigate('OrderSubmitScreen')}} style ={styles.underPopUpBarForNavigatingSubmitScreen}>
                        <Text style ={styles.label}>발주하기({itemCountForBottom})</Text>
                    </Pressable>
                </>
            )
        }
    }

    useEffect(() => {
        setItemNameList([])
        brandList.map(async(brandName) => await handleSearchItemName(itemClass, itemSpecificClass, brandName));
        getData('owner_id').then(ownerId => {
            setOwnerIdInLocal(ownerId)
            setStoredItemCountInSupabase(ownerId)
            handleChargedMoney(ownerId)
        })
    }, [navigation])


    useEffect(() => {
        getData('owner_id').then(ownerId=> {
            setValuesForBottomPopUp(ownerId)
            bottomUp()
        })
    },[isFocused])

    return (
        <View style={styles.container}>
            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{fontWeight: 'bold', marginBottom:10, fontSize:15,}}>
                            {modalItemName} - {modalItemPrice}원
                        </Text>
                        <View style={styles.itemBuyingCount}>
                            <Pressable style={{}} onPress = {
                                () => { itemBuyingCount-1 > 0 ? setItemBuyingCount(itemBuyingCount-1) : '' }}>
                                <Text style={{width:20,fontWeight:'bold'}}>-</Text></Pressable>
                            <TextInput style={{fontWeight:'bold', alignItems:'center',justifyContent:'center'}}
                            keyboardType = "number-pad">
                                {itemBuyingCount}
                            </TextInput>
                            <Pressable style={{}} onPress = {
                                () => setItemBuyingCount(itemBuyingCount+1)}>
                                <Text style={{width:20,fontWeight:'bold'}}>+</Text></Pressable>
                        </View>
                        <View style = {{flexDirection : 'row'}}>
                            <Pressable onPress={() => {
                                setItemBuyingCount(1)
                                setErrorModalVisible(false)
                            }}
                            style = {{marginRight:40}}>
                                <Text style={{fontSize:15, fontWeight : 'bold'}}>취소</Text>
                            </Pressable>
                            <Pressable onPress={() => {{
                                // setItemBuyingCount(1)
                                storeBuyingItemsAndCounts({
                                    'itemName' : modalItemName, 'itemPrice' : modalItemPriceInteger, 'itemBuyingCount' : itemBuyingCount})
                                setHiddenState(true)
                                setItemBuyingCount(1)
                                setErrorModalVisible(false)
                            }
                            }}>
                                <Text style={{fontSize:15, fontWeight : 'bold'}}>확인</Text>
                            </Pressable>
                        </View>

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
                    <Text style ={styles.titleStyle}>{itemSpecificClass}</Text>
                </View>
            </View>

            {functionForMakingScrollView()}

            <Pressable onPress = {() => {
                navigation.navigate("ChargingMoneyScreen")
            }}
                style ={styles.containerForChargedMoneyStyle}>
                <Text>충전 금액 : {chargedMoney}원</Text>
            </Pressable>

            {bottomUp()}

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
        height : 60,
        borderRadius : 7,
        marginBottom : 12,

    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign : "center",
    },
    scrollContainerStyle:{
        flex:0.4,
        alignItems:'center',
        justifyContent:'center',
    },
    scrollStyle: {
        flex:0.5,
    },
    containerForChargedMoneyStyle:{
        top:'78%',
        position:'absolute',
        alignItems : 'flex-end'
    },
    itemBuyingCount : {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        height:30,
        width:'50%',
        marginBottom:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius : 10,

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

export default OrderSuppliesScreen;