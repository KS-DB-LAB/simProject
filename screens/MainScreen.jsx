// @ts-ignore
import React, {useEffect, useState} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {View, Text, StyleSheet, Image, Button, Pressable, TouchableOpacity, BackHandler, Alert} from "react-native";

import 'react-native-gesture-handler'
import SalesAndProfitScreen from "./SalesAndProfitScreen";
import SideMenu from "../components/SideMenu";
import LoginScreen from "./LoginScreen";

import {getData} from "../lib/asyncstorage";



function MainScreen({navigation}) {

    const [ownerName, setOwnerName] = useState('');

    useEffect(() => {
        getData('owner_name').then(res => setOwnerName(res));
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
    },[]);



    {/*TODO : 크롤링으로 가져온 데이터 삽입*/}
    return (

        <View style={styles.container}>

            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Image source = {require('../images/logo.jpg')} style = {styles.logoImage} />
                    <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                        <Pressable onPress={() => navigation.openDrawer()} style={styles.sideBarIconContainerStyle}>
                            <Image source = {require('../images/sideBarIcon.jpg')} style = {styles.sideBarIconStyle} />
                        </Pressable>
                    </View>
                </View>

                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>{ownerName} 점장님을 응원합니다!</Text>
                </View>
            </View>



            <View style={{marginTop:100,}}>

                <View style={styles.wholeDash}>
                    <Text style={styles.wholeText}>예상 가게 매출</Text>
                    <Text style={styles.wholeSales}> 원</Text>
                </View>

                <View style={styles.seperateDash}>
                    <View style={styles.baeminTagColor}></View>
                    <View style={{left : 50, bottom : 42}}>
                        <Text style={{fontSize : 18}}>배달의 민족</Text>
                    </View>
                    <View style={{left : 200, bottom : 65}}>
                        <Text style={{fontSize : 18, fontWeight : 'bold'}}>원</Text>
                    </View>
                </View>

                <View style={styles.seperateDash}>
                    <View style={styles.coupangEatsTagColor}></View>
                    <View style={{left : 50, bottom : 42}}>
                        <Text style={{fontSize : 18}}>쿠팡 이츠</Text>
                    </View>
                    <View style={{left : 200, bottom : 65}}>
                        <Text style={{fontSize : 18, fontWeight : 'bold'}}>원</Text>
                    </View>
                </View>

                <View style={styles.seperateDash}>
                    <View style={styles.ddangeoyoTagColor}></View>
                    <View style={{left : 50, bottom : 42}}>
                        <Text style={{fontSize : 18}}>땡겨요</Text>
                    </View>
                    <View style={{left : 200, bottom : 65}}>
                        <Text style={{fontSize : 18, fontWeight : 'bold'}}>원</Text>
                    </View>
                </View>

                <View style={styles.seperateDash}>
                    <View style={styles.yogiyoTagColor}></View>
                    <View style={{left : 50, bottom : 42}}>
                        <Text style={{fontSize : 18}}>요기요</Text>
                    </View>
                    <View style={{left : 200, bottom : 65}}>
                        <Text style={{fontSize : 18, fontWeight : 'bold'}}>원</Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.detailed} onPress={() => navigation.navigate("SalesAndProfitScreen")}>
                        <Text style={styles.detailed}>자세히 보기</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>


    );
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

    wholeText : {
        fontSize : 21,
        color : 'black',
        position : 'absolute',
        top : 50,
        left : 45,
    },

    wholeSales : {
        fontSize : 25,
        fontWeight : 'bold',
        color : 'black',
        position : 'absolute',
        top : 100,
        left : 45,
    },

    cheerText : {
        fontSize : 18,
        fontWeight : 'bold',
        color : 'black',
        position : 'absolute',
        top : 105,
        left : 30,

    },

    wholeDash : {
//         alignItems: 'flex-start',
//         justifyContent: 'flex-start',
        backgroundColor : '#D8D8D8',
        width : 350,
        height : 200,
        borderRadius : 7,
        marginBottom : 12,
    },

    seperateDash : {
        //         alignItems: 'flex-start',
        //         justifyContent: 'flex-start',
        backgroundColor : '#D8D8D8',
        width : 350,
        height : 60,
        borderRadius : 7,
        marginBottom : 12,

    },

    baeminTagColor: {
        width: 40,
        height: 60,
        backgroundColor:'#39C5C4',
        borderRadius : 10,
    },

    yogiyoTagColor: {
        width: 40,
        height: 60,
        backgroundColor:'#FA0050',
        borderRadius : 10,
    },

    coupangEatsTagColor: {
        width: 40,
        height: 60,
        backgroundColor: '#31B4DD',
        borderRadius: 10,
    },

    ddangeoyoTagColor:{
        width: 40,
        height: 60,
        backgroundColor: '#FB521C',
        borderRadius: 10,
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

    detailed: {
        fontSize : 18,
        alignItems: 'center',
        // backgroundColor: '#DDDDDD',
        //padding: 10,
        opacity : 0.8,
    },
})

export default MainScreen;