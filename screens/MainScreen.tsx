import React from "react";
import { Shadow } from 'react-native-shadow-2'
import {View, Text, StyleSheet, Image} from "react-native";

function MainScreen() {
    return (
        <View style={styles.container}>
            <Image source = {require('../images/logo.jpg')} style = {styles.logoImage}  />
            <Text style={styles.text}>점장님을 응원합니다 !</Text>
            <View style={styles.whole}>
                <Text>예상 가게 매출</Text>
            </View>
            <View style={styles.seperate}>
                <Text>배달의 민족</Text>
            </View>
            <View style={styles.seperate}>
                <Text>쿠팡이츠</Text>
            </View>
            <View style={styles.seperate}>
                <Text>땡겨요</Text>
            </View>
            <View style={styles.seperate}>
                <Text>요기요</Text>
            </View>
        </View>

    );
}

const data = [
    {id : 'expect', title : '예상 가게 매출'},
    {id : 'baemin', title : '배달의 민족'},
    {id : 'coupang', title : '쿠팡이츠'},
    {id : 'tteang', title : '땡겨요'},
    {id : 'yogiyo', title : '요기요'},
]

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor : '#ffffff',
    },

    logoImage : {
        resizeMode : 'stretch',
        width: 100,
        height: 70,
        backgroundColor: '(0,0,0,0.5)',
        bottom : 230
    },

    text : {
        fontSize : 18,
        fontWeight : 'bold',
        color : 'black',
        position : 'absolute',
        top : 140,
        left : 35,

    },

    whole : {
//         alignItems: 'flex-start',
//         justifyContent: 'flex-start',
        backgroundColor : '#D8D8D8',
        width : 350,
        height : 200,
        borderRadius : 7,
        marginBottom : 25,
    },

    seperate : {
        //         alignItems: 'flex-start',
        //         justifyContent: 'flex-start',
        backgroundColor : '#D8D8D8',
        width : 350,
        height : 60,
        borderRadius : 7,
        marginBottom : 25,

    }

})

export default MainScreen;