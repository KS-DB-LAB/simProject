import {Alert, BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView, Modal} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";


function OrderSuppliesScreen({ navigation, route}){
    const { drawer, itemClass, itemSpecificClass, brandList } = route.params;

    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const [itemNameList, setItemNameList] = useState([]);
    const [chargedMoney, setChargedMoney] = useState(0);
    const [modalItemName, setModalItemName] = useState('');

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
            console.log(data)
            setItemNameList([...tempList])

            data.map(itemName => {
                if (!(tempList.includes(itemName.supply_item_name))){
                    tempList.push(itemName.supply_item_name)
                }
            });
            setItemNameList(tempList);
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
        if (itemNameList.length <= 4){
            return(
                <>
                    {itemNameList.map((itemName,index) => (
                        <Pressable key={index} style={styles.seperateDash} onPress={() => {
                            setModalItemName(itemName)
                            setErrorModalVisible(true)}
                            }>
                            <Text style={styles.label}>{itemName}</Text>
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
                            <Pressable key={index} style={styles.seperateDash}>
                                <Text style={styles.label}>{itemName}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )
        }
    }




    useEffect(() => {
        setItemNameList([])
        brandList.map(async(brandName) => await handleSearchItemName(itemClass, itemSpecificClass, brandName));
        getData('owner_id').then(ownerId => {
            handleChargedMoney(ownerId)
        })
    }, [brandList])


    return (
        <View style={styles.container}>

            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15,}}>{modalItemName}</Text>
                        <Pressable onPress={() => setErrorModalVisible(false)}>
                            <Text style={{fontSize:15,}}>취소</Text>
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
                    <Text style ={styles.titleStyle}>{itemSpecificClass}</Text>
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
        top:'76%',
        position:'absolute'
    }
})

export default OrderSuppliesScreen;