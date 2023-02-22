import React from "react";
import { Shadow } from 'react-native-shadow-2'
import {View, Text, StyleSheet, Image} from "react-native";

function MainScreen() {
    return (
        <View style={styles.container}>
            <Text>MainScreen</Text>
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
        width: 100,
        height: 100,
        backgroundColor: '(0,0,0,0.5)',
    },
})

export default MainScreen;