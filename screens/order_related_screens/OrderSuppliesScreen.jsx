import {Alert, BackHandler, Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {supabase} from "../../lib/supabase";


function OrderSuppliesScreen({ navigation, route}){
    const { itemClass, itemSpecificClass } = route.params;

    const [itemNameList, setItemNameList] = useState([]);


    const handleSearchItemName = async (itemClass, itemSpecificClass) => {
        const { data, error } = await supabase
            .from('supply_item_table')
            .select('supply_item_name')
            .eq('supply_item_class',itemClass)
            .eq('supply_item_specify_class',itemSpecificClass)

        if (error){
        } else{
            let tempList = [];
            setItemNameList([...tempList])

            data.map(itemName => {
                if (!(tempList.includes(itemName.supply_item_name))){
                    tempList.push(itemName.supply_item_name)
                }
            });
            setItemNameList(tempList);

        }
    }

    useEffect(() => {
        setItemNameList([])
        handleSearchItemName(itemClass, itemSpecificClass);
    }, [itemClass])


    return (
        <View style={styles.container}>
            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Image source = {require('../../images/logo.jpg')} style = {styles.logoImage} />
                    <Pressable onPress={() => navigation.openDrawer()} style={styles.sideBarIconContainerStyle}>
                        <Image source = {require('../../images/sideBarIcon.jpg')} style = {styles.sideBarIconStyle} />
                    </Pressable>
                </View>
                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>재료 / 발주 (이름 리스트)</Text>
                </View>
            </View>

            {itemNameList.map((itemName,index) => (
                <Pressable key={index} style={styles.seperateDash}>
                    <Text style={styles.label}>{itemName}</Text>
                </Pressable>
            ))}
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
})

export default OrderSuppliesScreen;