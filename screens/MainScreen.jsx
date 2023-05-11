// @ts-ignore
import React, {useState} from "react";
import Carousel from "../components/Carousel.jsx";
import {View, Text, StyleSheet, Image, Button, Pressable, TouchableOpacity, Dimensions} from "react-native";
import 'react-native-gesture-handler'
import SalesAndProfitScreen from "./SalesAndProfitScreen";
import SideMenu from "../components/SideMenu.jsx";
import LoginScreen from "./account_related_screen/LoginScreen.jsx";


const DashboardList =
    [
        {id: 0, name: "예상 가게 매출"},
        {id: 1, name: "예상 가게 지출"},
        {id: 2, name: "예상 가게 수익"},
    ]

const DashboardPages = ({ item }) => {
    return (
        <View style={styles.wholeDash}>
            <Text style={styles.wholeText}>{item.name}</Text>
            <Text style={styles.wholeSales}> 원</Text>
        </View>
    );
};


function MainScreen({navigation}) {

    const [page, setPage] = useState(0);

    {/*TODO : 크롤링으로 가져온 데이터 삽입*/}
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
                    <Text style ={styles.titleStyle}>점장님을 응원합니다!</Text>
                </View>
            </View>

            <View style={{marginTop : 100}}>
                <Carousel
                    page={page}
                    setPage={setPage}
                    gap={15}
                    data={DashboardList}
                    pageWidth={350}
                    RenderItem={DashboardPages}
                />
            </View>

            <View>
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