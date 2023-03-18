import {BackHandler, Image, Pressable, StyleSheet, Text, View, ScrollView,SafeAreaView} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage";
import {supabase} from "../../lib/supabase";
import {useNavigation} from "@react-navigation/native";

function OrderScreen({navigation, route}){
    const {drawer} =  route.params;

    const [brandList, setBrandList] = useState([]);
    const [itemClassList, setItemClassList] = useState([]);
    let tempList = [];

    const handleSearchItemClass = async (brandName, brandList) => {
        const { data, error } = await supabase
            .from('supply_item_table')
            .select('supply_item_class')
            .eq('brands',brandName)

        if (error){
        } else{
            // console.log(data.length)
            setItemClassList([...tempList])

            data.map(itemClass => {

                if (!(tempList.includes(itemClass.supply_item_class))){
                    tempList.push(itemClass.supply_item_class)
                }
            });
            setItemClassList(tempList);
        }
    }

    const handleSearch = async (ownerId) => {
        const { data, error } = await supabase
            .from('shop_owner_table')
            .select('*')
            .eq('member_id',ownerId)
        if (error) {
        } else {
            const brandListTemp = data[0].member_brands.split(', ')
            // console.log(brandListTemp)
            setBrandList(brandListTemp)
            brandListTemp.map(async(brandName) => await handleSearchItemClass(brandName, brandListTemp));
        }
    }

    const functionForMakingScrollView = () => {
        if (itemClassList.length <= 4){
            return(
                <>
                {itemClassList.map((itemClass,index) => (
                        <Pressable key={index} style={styles.seperateDash}
                                   onPress={() => navigation.navigate('OrderSpecificScreen', {drawer: drawer, itemClass : itemClass, brandList : brandList})}>
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

    useEffect(() => {
            getData('owner_id').then(ownerId => {
                handleSearch(ownerId)
            })
        }
        ,[])

    return (
        <View style={styles.container}>
            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Image source = {require('../../images/logo.jpg')} style = {styles.logoImage} />
                    <Pressable onPress={() => drawer.openDrawer()} style={styles.sideBarIconContainerStyle}>
                        <Image source = {require('../../images/sideBarIcon.jpg')} style = {styles.sideBarIconStyle} />
                    </Pressable>
                </View>

                <View style = {styles.titleContthainerStyle}>
                    <Text style ={styles.titleStyle}>재료 / 발주</Text>
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
})

export default OrderScreen;