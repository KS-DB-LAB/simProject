import {Alert, BackHandler, Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {supabase} from "../../lib/supabase";


function OrderSpecificScreen({ navigation, route}){
    const { drawer, itemClass } = route.params;

    const [itemSpecificClassList, setItemSpecificClassList] = useState([]);


    const handleSearchItemSpecificClass = async (itemClass) => {
        const { data, error } = await supabase
            .from('supply_item_table')
            .select('supply_item_specify_class')
            .eq('supply_item_class',itemClass)

        if (error){
        } else{
            let tempList = [];

            setItemSpecificClassList([...tempList])

            data.map(itemSpecificClass => {
                if (!(tempList.includes(itemSpecificClass.supply_item_specify_class))){

                    tempList.push(itemSpecificClass.supply_item_specify_class)
                }
            });
            setItemSpecificClassList(tempList);

        }
    }

    useEffect(() => {
        setItemSpecificClassList([])
        handleSearchItemSpecificClass(itemClass);
    }, [itemClass])


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
                    <Text style ={styles.titleStyle}>재료 / 발주 (소분류)</Text>
                </View>
            </View>

            {itemSpecificClassList.map((itemSpecificClass,index) => (
                <Pressable key={index} style={styles.seperateDash}
                           onPress={() => navigation.navigate('OrderSuppliesScreen', {drawer: drawer, itemClass : itemClass, itemSpecificClass : itemSpecificClass})}>
                    <Text style={styles.label}>{itemSpecificClass}</Text>
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

export default OrderSpecificScreen;