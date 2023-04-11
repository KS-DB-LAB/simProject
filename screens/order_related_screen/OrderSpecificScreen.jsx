import {Alert, BackHandler, Image, Pressable, StyleSheet, Text, View,ScrollView,SafeAreaView} from "react-native";
import React, {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";


function OrderSpecificScreen({ navigation, route}){
    const { drawer, itemClass, brandName } = route.params;

    const [itemSpecificClassList, setItemSpecificClassList] = useState([]);
    const [chargedMoney, setChargedMoney] = useState('');
    let tempList = [];

    const handleSearchItemSpecificClass = async (itemClass) => {
        const { data, error } = await supabase
            .from('supply_item_table')
            .select('supply_item_specify_class')
            .eq('supply_item_class',itemClass)
            .eq('brands',brandName)

        if (error){
        } else{
            setItemSpecificClassList([...tempList])

            data.map(itemSpecificClass => {
                if (!(tempList.includes(itemSpecificClass.supply_item_specify_class))){

                    tempList.push(itemSpecificClass.supply_item_specify_class)
                }
            });
            setItemSpecificClassList(tempList);

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

    const functionForMakingScrollView = () => {
        if (itemSpecificClassList.length <= 4){
            return(
                <View style={{width:'90%',flexDirection:'row',flexWrap:'wrap'}}>
                    {itemSpecificClassList.map((itemSpecificClass,index) => (
                        <Pressable key={index} style={styles.seperateDash}
                                   onPress={() => navigation.navigate('OrderSuppliesScreen', {drawer: drawer, itemClass : itemClass, itemSpecificClass : itemSpecificClass, brandName : brandName})}>
                            <Text style={styles.labelForBrandListSection}>{itemSpecificClass}</Text>
                        </Pressable>
                    ))}
                </View>
            )
        }
        else {
            return (
                <View style={styles.scrollContainerStyle}>
                    <ScrollView contentContainerStyle = {{ flexDirection:'row',
                        flexWrap:'wrap',}} style={styles.scrollStyle}>
                        {itemSpecificClassList.map((itemSpecificClass,index) => (
                            <Pressable key={index} style={styles.seperateDash}
                                       onPress={() => navigation.navigate('OrderSuppliesScreen', {drawer: drawer, itemClass : itemClass, itemSpecificClass : itemSpecificClass, brandName : brandName})}>
                                <Text style={styles.labelForBrandListSection}>{itemSpecificClass}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

            )
        }
    }



    useEffect(() => {
        setItemSpecificClassList([])
        handleSearchItemSpecificClass(itemClass);
        // handleSearchItemSpecificClass(itemClass);
        getData('owner_id').then(ownerId => {
            handleChargedMoney(ownerId)
        })

    }, [navigation])

    const isFocused = useIsFocused();
    const [hiddenState, setHiddenState] = useState(false)
    const [itemCountForBottom ,setItemCountForBottom] = useState(0)

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

    useEffect(() => {
        getData('owner_id').then(ownerId=> {
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
                    <Text style ={styles.titleStyle}>{itemClass}</Text>
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
        width : 170,
        height : 170,
        marginLeft:10,
        borderRadius : 7,
        marginBottom : 12,

    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign : "center",
    },
    labelForBrandListSection : {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign : "center",
        position:'absolute',
        bottom:20,
    },
    scrollContainerStyle:{
        flex:0.5,
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        flexDirection:'row',
        flexWrap:'wrap',
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

export default OrderSpecificScreen;