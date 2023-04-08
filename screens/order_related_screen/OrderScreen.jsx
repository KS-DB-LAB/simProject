import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView
,Alert} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useIsFocused} from "@react-navigation/native";

function OrderScreen({navigation, route}){
    const {drawer, brandName} =  route.params;

    const [brandList, setBrandList] = useState([]);
    const [itemClassList, setItemClassList] = useState([]);
    const [chargedMoney, setChargedMoney] = useState('');
    let tempList = [];

    const handleSearchItemClass = async () => {
        const { data, error } = await supabase
            .from('supply_item_table')
            .select('supply_item_class')
            .eq('brands',brandName)

        if (error){
        } else{
            // console.log(brandName)
            // console.log(data.length)
            setItemClassList([...tempList])

            data.map(itemClass => {

                if (!(tempList.includes(itemClass.supply_item_class))){
                    tempList.push(itemClass.supply_item_class)
                }
            });
            setItemClassList(tempList);
            //console.log(tempList)
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
            //console.log(data[0].charged_money)
            setChargedMoney(data[0].charged_money)
            const chargedMoneyString = data[0].charged_money.toString()
            setChargedMoney(numberThousandFormat(chargedMoneyString))
            // console.log(chargedMoney)
        }
    }

    const functionForMakingScrollView = () => {
        // console.log('getScrollView')
        if (itemClassList.length <= 4){
            return(
                <>
                {itemClassList.map((itemClass,index) => (
                        <Pressable key={index} style={styles.seperateDash}
                                   onPress={() => navigation.navigate('OrderSpecificScreen', {drawer: drawer, itemClass : itemClass, brandName : brandName})}>
                            <Text style={styles.label}>{itemClass}</Text>
                        </Pressable>
                    ))}
                </>
            )
        }
        else {
            return (
                <View style={styles.scrollContainerStyle}>
                    <ScrollView style={styles.scrollStyle}>
                        {itemClassList.map((itemClass,index) => (
                            <Pressable key={index} style={styles.seperateDash}
                                       onPress={() => navigation.navigate('OrderSpecificScreen', {drawer: drawer, itemClass : itemClass, brandList : brandList})}>
                                <Text style={styles.label}>{itemClass}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )
        }
    }


    const isFocused = useIsFocused();
    const [hiddenState, setHiddenState] = useState(false)
    const [itemCountForBottom ,setItemCountForBottom] = useState(0)

    const setValuesForBottomPopUp = async (ownerId) => {
        //console.log('isFocused')
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
                //console.log('not undefined')
                setItemCountForBottom(data[0].item_count)
                setHiddenState(true)
            }
        }
    }

    useEffect(() => {
        //console.log('openedScreen')
        getData('owner_id').then(ownerId=> {
            handleSearchItemClass()
            handleChargedMoney(ownerId)
            setValuesForBottomPopUp(ownerId)
            bottomUp()
        })

    },[isFocused])

    const bottomUp = () => {
        if (hiddenState == true){
            //test 입니당
            //console.log(itemCountForBottom)
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
                    <Text style ={styles.titleStyle}>발주 품목 (대분류)</Text>
                </View>
            </View>

            {functionForMakingScrollView()}

            <Pressable onPress = {() => {
                //console.log('pressed charge money')
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
        flex:0.5,
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

export default OrderScreen;