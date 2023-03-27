import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useNavigation} from "@react-navigation/native";

function OrderSubmitScreen({navigation}){

    const [piledItemInfoJSON, setPiledItemInfoJSON] = useState('')
    const [piledItemList, setPiledItemList] = useState([])
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
                            <Text style={styles.label}>{piledItem.itemName}</Text>
                            <View style ={{flexDirection: 'row'}}>
                                <Pressable><Text>-</Text></Pressable>
                                <Text style={{marginLeft:13,marginRight:10}}>{piledItem.itemBuyingCount}</Text>
                                <Pressable><Text>+</Text></Pressable>
                            </View>

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
                                <Text style={styles.label}>{piledItem.itemName}</Text>
                                <View style ={{flexDirection: 'row'}}>
                                    <Pressable><Text>-</Text></Pressable>
                                    <Text style={{marginLeft:13,marginRight:10}}>{piledItem.itemBuyingCount}</Text>
                                    <Pressable><Text>+</Text></Pressable>
                                </View>
                                <Text>{piledItem.itemPrice}원</Text>

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
        getData('owner_id').then(ownerId => {
            getPiledOrderList(ownerId)
        })
        },[piledItemInfoJSON])


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
                    <Text style ={styles.titleStyle}>발주하기</Text>
                </View>
            </View>

            {functionForMakingScrollView()}
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
        height : 90,
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
        top:'76%',
        position:'absolute'
    }
})

export default OrderSubmitScreen;