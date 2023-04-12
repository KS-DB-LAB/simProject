import React,{useEffect} from "react";
import { StyleSheet, View ,Image } from "react-native";
import { FastImage } from "react-native-fast-image"
import {useIsFocused} from "@react-navigation/native";
import {storeData} from '../../lib/asyncstorage';
function LoadingForReRenderScreen({navigation}) {
    const isFocused = useIsFocused()
    useEffect(() => {
        // console.log('LoadingForReRenderScreen')
        setTimeout(() => {
            navigation.navigate('BrandListScreen')
        },500)
    },[isFocused])

    return(
        <View style={styles.container}>
            <Image source = {require('../../images/loading-image.gif')} style = {styles.loadingGifStyle}  />
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF'
    },
    loadingGifStyle : {
        width:200,
        height:200,
    }

})

export default LoadingForReRenderScreen;