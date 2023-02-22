import React from "react";
import {View, Text, StyleSheet, Image, Platform} from "react-native";
import {Shadow} from "react-native-shadow-2";

function SplashScreen() {
    return (
        <View style ={styles.container}>
            <Image source = {require('../images/logo.jpg')} style = {styles.logoImage}  />
        </View>
    );
}


const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

    logoImage : {
        resizeMode : 'stretch',
        width: 344,
        height: 185,
    },
})

export default SplashScreen;