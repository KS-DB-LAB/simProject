import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";


    return (
        <View style={styles.container}>
            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <Image source = {require('../images/logo.jpg')} style = {styles.logoImage} />
                    <Pressable onPress={() => navigation.openDrawer()} style={styles.sideBarIconContainerStyle}>
                    <Image source = {require('../images/sideBarIcon.jpg')} style = {styles.sideBarIconStyle} />
                </Pressable>
                </View>
                    <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>재료 / 발주 (소분류)</Text>
                </View>
            </View>

            {itemSpecificClassList.map((itemSpecificClass,index) => (
                <Pressable key={index} style={styles.seperateDash}
                           onPress={() => navigation.navigate('OrderSpecificScreen', {itemSpecificClass : itemSpecificClass})}>
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