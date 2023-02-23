import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";

function MainScreen() {
    return (
        <View style={styles.container}>

            <Image source = {require('../images/logo.jpg')} style = {styles.logoImage}  />
        </View>
    );
}



const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems : 'center',
        backgroundColor : '#ffffff',
    },

    logoImage : {
        resizeMode : 'stretch',
        width: 100,
        height: 80,
        backgroundColor: '(0,0,0,0.5)',
    },
})

export default MainScreen;