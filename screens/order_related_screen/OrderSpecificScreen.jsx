import {Alert, BackHandler, Image, Pressable, StyleSheet, Text, View,ScrollView,SafeAreaView} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";


function OrderSpecificScreen({ navigation, route}){
    const { drawer, itemClass, brandList } = route.params;

    const [itemSpecificClassList, setItemSpecificClassList] = useState([]);
    const [chargedMoney, setChargedMoney] = useState(0);
    let tempList = [];

    const handleSearchItemSpecificClass = async (itemClass, brandName) => {
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

    const handleChargedMoney = async (ownerId) => {
        const { data, error } = await supabase
            .from('shop_owner_table')
            .select('charged_money')
            .eq('member_id',ownerId)
        if (error) {
        } else {
            // console.log(data[0].money_for_supplies)
            setChargedMoney(data[0].charged_money)
            // console.log(chargedMoney)
        }
    }

    const functionForMakingScrollView = () => {
        if (itemSpecificClassList.length <= 4){
            return(
                <>
                    {itemSpecificClassList.map((itemSpecificClass,index) => (
                        <Pressable key={index} style={styles.seperateDash}
                                   onPress={() => navigation.navigate('OrderSuppliesScreen', {drawer: drawer, itemClass : itemClass, itemSpecificClass : itemSpecificClass, brandList : brandList})}>
                            <Text style={styles.label}>{itemSpecificClass}</Text>
                        </Pressable>
                    ))}
                </>
            )
        }
        else {
            return (
                <View style={styles.scrollContainerStyle}>
                    <ScrollView style={styles.scrollStyle}>
                        {itemSpecificClassList.map((itemSpecificClass,index) => (
                            <Pressable key={index} style={styles.seperateDash}
                                       onPress={() => navigation.navigate('OrderSuppliesScreen', {drawer: drawer, itemClass : itemClass, itemSpecificClass : itemSpecificClass, brandList : brandList})}>
                                <Text style={styles.label}>{itemSpecificClass}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

            )
        }
    }



    useEffect(() => {
        setItemSpecificClassList([])
        brandList.map(async(brandName) => await handleSearchItemSpecificClass(itemClass, brandName));
        // handleSearchItemSpecificClass(itemClass);
        getData('owner_id').then(ownerId => {
            handleChargedMoney(ownerId)
        })

    }, [brandList])


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

            <View style ={styles.containerForChargedMoneyStyle}>
                <Text style={styles.label}>충전 금액 : {chargedMoney}</Text>
            </View>

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
        flex:0.4,
        alignItems:'center',
        justifyContent:'center',
    },
    scrollStyle: {
        flex:0.5,
    },
    containerForChargedMoneyStyle:{
        top:'76%',
        position:'absolute'
    }
})

export default OrderSpecificScreen;