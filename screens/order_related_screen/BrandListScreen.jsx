import {Image, Pressable, StyleSheet, Text, View, BackHandler, Alert, ScrollView} from "react-native";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {getData} from "../../lib/asyncstorage.js";
import {supabase} from "../../lib/supabase";
import {useIsFocused} from "@react-navigation/native";

function BrandListScreen({navigation,route}){
    const {drawer} =  route.params;

    const [orderList, setOrderList] = useState([]);
    const [chargedMoney, setChargedMoney] = useState('')
    const [hiddenState, setHiddenState] = useState(false)
    const [itemCountForBottom ,setItemCountForBottom] = useState(0)
    const [reRender, setReRender] = useState(true)

    const handleSearch = async (ownerId) => {

        const { data, error } = await supabase
            .from('shop_owner_table')
            .select('*')
            .eq('member_id',ownerId)
        if (error) {
        } else {
            setOrderList([].concat(data[0].member_brands.split(', ')))
            // console.log(orderList)
            // brandsList.map(item => console.log(item))
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

    const isFocused = useIsFocused()


    useEffect(() => {
        setTimeout(() => {
            getData('owner_id').then(ownerId => {
                handleSearch(ownerId)
                handleChargedMoney(ownerId)
                setValuesForBottomPopUp(ownerId)
                bottomUp()
                // navigation.navigate('LoadingForReRenderScreen')
            })
        }, 500)

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

    const functionForMakingScrollView = () => {
        // console.log('getScrollView')
        if (orderList.length == 0){
            return(
                <>
                    <Text style={{marginBottom : 5, fontWeight:'bold'}}>아직 브랜드가 승인되지 않았습니다!</Text>
                    <Text style={{marginBottom : 20, fontWeight:'bold'}}>브랜드 관리자에게 문의하시기 바랍니다.</Text>
                    <Pressable onPress={() => {navigation.navigate('LoadingForReRenderScreen')}}><Text>요청 후 새로고침으로 확인해보세요! (터치)</Text></Pressable>
                </>
            )
        }
        else if (orderList.length <= 4){
            return(
                <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',}}>
                    {orderList.map((listName,index) => (
                        <Pressable key={index} style={styles.seperateDash} onPress={() => {
                            navigation.navigate('OrderScreen', {drawer:drawer, brandName:listName})
                        }}>
                            <Text style={styles.labelForBrandListSection}>{listName}</Text>
                        </Pressable>
                    ))}
                </View>
            )
        }
        else {
            return (
                <View style={styles.scrollContainerStyle}>
                    <ScrollView contentContainerStyle = {{ flexDirection:'row',
                        flexWrap:'wrap',justifyContent:'space-between',}} style={styles.scrollStyle}>
                        {orderList.map((listName,index) => (
                            <Pressable key={index} style={styles.seperateDash} onPress={() => {
                                navigation.navigate('OrderScreen', {drawer:drawer, brandName:listName})
                            }}>
                                <Text style={styles.labelForBrandListSection}>{listName}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )
        }
    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                '종료',
                '앱을 종료하시겠습니까?',
                [
                    {
                        text: '취소',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: '확인', onPress: () => BackHandler.exitApp() },
                ],
                { cancelable: false }
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
        navigation.navigate("LoadingForReRenderScreen")
    },[])


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
                    <Text style ={styles.titleStyle}>재료 구매 / 발주</Text>
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
        width : '47%',
        height : 170,
        borderRadius : 7,
        marginBottom : 12,

    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign : "center",
    },
    labelForBrandListSection : {
        fontSize: 13,
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

export default BrandListScreen;