import React, {useState} from "react";
import {View, Text, StyleSheet, Pressable, Modal} from "react-native";
import {storeData} from "../../lib/asyncstorage"

const SettingMenuScreen = ({navigation, route}) => {

    const {navigationScreenNavigator, navigatorForInitialScreen} = route.params

    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const handleLogout = () => {
        // console.log(navigationScreenNavigator)
        // console.log(navigatorForInitialScreen)

        storeData('loginStatus', 'false')
        storeData('owner_name', '')
        storeData('owner_id', '')
        storeData('owner_brands', '')
        storeData('owner_location_address','')
        storeData('allocated_admin','')

    }

    return (


        <View style={styles.container}>

            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisible(false)}>
                <View style={styles.errorModalMessageContainer}>
                    <View style={styles.errorModalMessageBox}>
                        <Text style={{marginBottom:30, fontSize:15, textAlign:'center'}}>
                            로그아웃 하시겠습니까?
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable style={{marginRight : 40}}
                                       onPress={() => setErrorModalVisible(false)}>
                                <Text style={{fontSize:15,}}>취소</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                handleLogout()
                                setErrorModalVisible(false)
                            }}>
                                <Text style={{fontSize:15,}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>

            <View style ={styles.upperComponentGroupStyle}>
                <View style={styles.upperComponentsContainerStyle}>
                    <View style = {styles.logoImage} />
                    <View style={styles.sideBarIconContainerStyle}>
                        <View style = {styles.sideBarIconStyle} />
                    </View>
                </View>

                <View style = {styles.titleContainerStyle}>
                    <Text style ={styles.titleStyle}>설정</Text>
                </View>
            </View>

            <View style ={styles.downerComponentGroupStyle}>
                <Pressable style = {styles.menuSelectingOptionTitleStyle} onPress={() =>
                    navigation.navigate("PasswordInputScreen",{redirectScreen:'SettingForAllocatedAdminScreen'})}>
                    <Text style ={styles.titleStyle}>발주 권한 요청</Text>
                </Pressable>

                <Pressable style = {styles.menuSelectingOptionTitleStyle} onPress={() =>
                    navigation.navigate("PasswordInputScreen",{redirectScreen:'UserPasswordOnChangeScreen'})}>
                    <Text style ={styles.titleStyle}>비밀번호 변경</Text>
                </Pressable>

                <Pressable style = {styles.menuSelectingOptionTitleStyle} onPress={() =>
                    navigation.navigate("PasswordInputScreen",{redirectScreen : "UserShopInfoOnChangeScreen"})}>
                    <Text style ={styles.titleStyle}>가게 정보 변경</Text>
                </Pressable>

                <Pressable style = {styles.menuSelectingOptionTitleStyle} onPress={() =>
                    navigation.navigate("PasswordInputScreen", {redirectScreen : "PlatformChangeScreen"})}>
                    <Text style ={styles.titleStyle}>배달 플랫폼 계정 정보 변경</Text>
                </Pressable>


                <Pressable onPress = {() => setErrorModalVisible(true)} style = {styles.menuSelectingOptionTitleStyle}>
                    <Text style ={styles.titleStyle}>로그아웃</Text>
                </Pressable>

            </View>


        </View>
    )

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
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

    menuOptionStyle : {
        fontSize : 18,
        fontWeight : 'bold',
        textAlign:'left',
        paddingBottom : 20,
    },

    downerComponentGroupStyle : {
        flex:1,
        justifyContent : 'center',
        alignSelf:'flex-start'
    },
    menuSelectingOptionTitleStyle : {
        paddingLeft : 38,
        paddingBottom : 25
    },
    errorModalMessageContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor :"rgba(0,0,0,0.5)"
    },
    errorModalMessageBox:{
        width:350,
        height:200,
        backgroundColor:"#ffffff",
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',

    },
})
///
export default SettingMenuScreen;
